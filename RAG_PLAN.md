# Ohmm RAG Backend — Architecture Plan

This document lays out a concrete plan for turning Ohmm from a small in-browser
FAQ bot into a retrieval-augmented chatbot grounded in verified Hindu
scriptures and scholarship. No code has been written for this yet — we agree
on the shape of the thing before we build it.

## The approach in one paragraph

We are **not** training a model. Training a language model from scratch on
Sanskrit philosophy is an eight-figure research project. Fine-tuning is still
an expensive hardware-plus-ML-expertise effort that, on its own, produces a
bot that hallucinates confidently. The right tool for "a chatbot that knows
the scriptures" is **retrieval-augmented generation (RAG)**: we build a
curated corpus of source texts, index it into a vector database, and at query
time retrieve the most relevant passages and feed them to an off-the-shelf
LLM (Claude, GPT, or a self-hosted open model). The LLM writes the answer
using the retrieved text and can cite which passage each claim came from.
This gives us "trained on scriptures" behavior for a tiny fraction of the
cost, with honest citations and no hallucination risk from missing data.

## System architecture

```
                     ┌────────────────────────────────┐
                     │         Source corpus          │
                     │ (verified originals + transl.) │
                     └───────────────┬────────────────┘
                                     │  ingest once, refresh periodically
                                     ▼
         ┌────────────────┐   chunks    ┌──────────────────────┐
         │  Ingestion     │────────────▶│   Vector database    │
         │  pipeline      │             │  (embeddings + text) │
         └────────────────┘             └──────────┬───────────┘
                                                   │
         user question                             │ top-k retrieval
              │                                    │
              ▼                                    ▼
 ┌──────────────────────┐      ┌────────────────────────────────────┐
 │  React app (Ohmm UI) │─────▶│  Backend API  ──▶  LLM (Claude/…)  │
 │  on your laptop/phone │◀─────│   (FastAPI / Node)                 │
 └──────────────────────┘      └────────────────────────────────────┘
                    answer + citations
```

The React front-end keeps everything we already have (the tree, the detail
panel, the chat modal). The only change on the client is that Ohmm now
POSTs to an API instead of calling the in-browser answer engine.

## Corpus — what goes in, and the verification rule

This is the single most important decision. "Verified original" will mean
different things for different kinds of source.

### Tier 1 — Primary Sanskrit texts (public domain, easy)

These are ancient and out of copyright; the work is sourcing a clean,
scholarly digital edition rather than scraping a random website.

- **Vedas** (Rig, Sāma, Yajur, Atharva) — use the GRETIL / TITUS electronic
  corpora.
- **Upaniṣads** — the principal ten, from GRETIL or the Muktabodha Indological
  Research Institute archive.
- **Bhagavad Gītā** — the Kashmiri Recension and the vulgate Gītā side by
  side, from GRETIL.
- **Brahma Sūtras**, **Yoga Sūtras**, **Nyāya Sūtras**, **Vaiśeṣika Sūtras**,
  **Mīmāṃsā Sūtras**, **Sāṃkhya Kārikā** — GRETIL.
- **Mahābhārata** — the Bhandarkar Oriental Research Institute (BORI)
  **critical edition** is the scholarly gold standard.
- **Rāmāyaṇa** — the Mysore / Baroda critical edition.
- **Purāṇas** — GRETIL has most of them in machine-readable form.

### Tier 2 — Classical commentaries (public domain)

The great commentarial tradition is how Indian philosophy actually works, and
all of it is out of copyright. All available from GRETIL/Muktabodha.

- Śaṅkara's **Upadeśasāhasrī**, his Bhāṣyas on the Brahma Sūtras, principal
  Upaniṣads, and Gītā.
- Rāmānuja's **Śrī Bhāṣya** and Gītā Bhāṣya.
- Madhva's Brahma Sūtra Bhāṣya and Gītā Bhāṣya.
- Vātsyāyana's Nyāya Bhāṣya, Praśastapāda's Padārtha-dharma-saṃgraha.
- Buddhist logicians: Dignāga, Dharmakīrti (where relevant to comparative
  sections).

### Tier 3 — English translations (mix of public domain and licensed)

Public-domain (safe to ingest freely):

- Max Müller's **Sacred Books of the East** series (Upaniṣads, Gītā, Laws of
  Manu, etc.) — published 1879–1910, now public domain.
- R. E. Hume's *Thirteen Principal Upanishads* (1921).
- S. Radhakrishnan's *The Principal Upaniṣads* — copyright varies by country;
  treat as licensed to be safe.
- Kisari Mohan Ganguli's translation of the **complete Mahābhārata** (public
  domain).

Modern academic translations (Olivelle, Doniger, Flood, Halbfass, Matilal,
Mohanty, Ram-Prasad) are **copyrighted**. We do not ingest them verbatim;
we can paraphrase them in our own corpus or link to them.

### Tier 4 — Research papers and monographs

- **Open access only.** arXiv humanities, DOAJ, the open-JSTOR subset, PhilArchive,
  university repositories (Oxford ORA, Cambridge Apollo).
- Works of scholars who have donated PDFs to the public (Halbfass, Matilal
  estate, etc.).

### Tier 5 — Manuscripts

- **National Mission for Manuscripts** (India) — they have catalogued and
  digitized a large corpus. Most records are metadata-only, but full scans
  exist for a subset.
- **British Library Endangered Archives Programme** — South Asian manuscripts.
- **BnF Gallica** — Sanskrit manuscripts from the Bibliothèque nationale.

Manuscripts are scans, not text. They require OCR specifically trained for
Devanāgarī / Grantha scripts. This is a phase-three ambition.

### The verification rule

Every ingested document gets metadata:

| field | example |
| --- | --- |
| `id` | `upanisad.mundaka.1.1.7` |
| `source_name` | "Muṇḍaka Upaniṣad" |
| `edition` | "GRETIL critical edition, 2020-03 revision" |
| `translator` | "Max Müller, 1879" (for English) |
| `license` | "Public domain" |
| `language` | "Sanskrit" / "English" |
| `verified` | `true` / `false` |

A passage may only be indexed if it comes from an edition we have recorded.
The bot's answer always returns source IDs so the user can audit where each
claim came from.

## Ingestion pipeline

A one-time (plus periodic refresh) pipeline, written in Python:

1. **Fetch** — `requests`/curl each source into `corpus/raw/<source_id>/…`.
   GRETIL and Muktabodha ship TEI XML; Sacred Books of the East are on
   Project Gutenberg as plain text.
2. **Normalize** — strip navigation, footnotes, page-break artifacts.
   Transliterate Sanskrit consistently (IAST preferred).
3. **Chunk** — split into semantically meaningful units. For verse
   collections, one verse = one chunk. For prose, ~500 tokens with ~80-token
   overlap.
4. **Embed** — use a sentence-embedding model. For English text,
   `text-embedding-3-small` (OpenAI, cheap) or `bge-small-en-v1.5` (open,
   runs on CPU). For Sanskrit, `LaBSE` (multilingual) or `muril-base` work
   reasonably.
5. **Index** — write `{id, text, embedding, metadata}` into the vector DB.

## Vector database

Three reasonable options, in order of "just run it locally" to
"production-grade":

| option | where | cost | why pick it |
| --- | --- | --- | --- |
| **Chroma** | Docker on your Mac / a cheap VPS | free | Easiest to set up. Fine up to ~1M vectors. |
| **pgvector** | Postgres + extension | free; $5–20/mo hosted | Already know SQL, want one DB for everything. |
| **Pinecone / Weaviate Cloud** | SaaS | $0–$70/mo | Zero ops, scales, has managed backups. |

Start with Chroma. Migrate only if the corpus grows past a million chunks
or we need multi-region replication.

## Backend API

A small FastAPI (Python) or Express (Node) service with two endpoints:

- `POST /ask { question }` → runs retrieval, calls the LLM, returns
  `{ answer, citations: [{id, source, excerpt}] }`.
- `GET /source/:id` → returns the raw passage so the UI can show it when a
  citation is clicked.

The LLM prompt is the critical piece. A skeleton:

```
You are Ohmm, a guide to Hindu philosophy. Answer the user's question using
only the passages provided below. If the passages don't contain enough
information, say so — do not invent. Cite each claim by the passage id in
square brackets.

Passages:
[mundaka.1.1.7] "As a spider projects forth and draws in its threads..."
[sankara.brahma_sutra_bhasya.1.1.4] "The sūtrakāra argues that …"
...

User's question: {question}
```

The user sees citation chips below the answer; clicking a chip opens the
original passage in a side panel. Existing Ohmm UI already has a "picks"
pattern we can reuse.

## LLM choice

| choice | monthly cost at modest use | pros | cons |
| --- | --- | --- | --- |
| **Claude via Anthropic API** | ~$10–50 | High quality, good with long context, follows "don't invent" well | API-dependent |
| **GPT-4o via OpenAI** | ~$10–50 | Similar quality, mature SDK | same |
| **Self-hosted Llama 3.1 70B** | $0 cloud, ~$800–2k GPU | Free-at-the-margin, no API dependency, data stays local | Needs a GPU server |
| **Llama 3.1 8B on a laptop** | $0 | Private, works offline | Answer quality noticeably lower |

Recommendation: start on **Claude / GPT**. Swap to self-hosted once the
usage pattern is clear.

## Hosting

The current project is a static site (the React bundle + `standalone.html`).
A RAG backend changes that. Concretely:

- **Front-end**: unchanged — deploy to Vercel / Netlify / plain S3.
- **Backend**: a single Python process behind an API gateway. Options:
  - **Fly.io / Railway / Render** — managed container hosts, $5–20/mo.
  - **A VPS** (Hetzner, DigitalOcean) — $5–10/mo, you manage it.
  - **Local-only** — run the backend on your Mac, point the front-end at
    `localhost:8000`. Zero cost, only available when your Mac is on.
- **Vector store** and backend on the same host to keep retrieval fast.

## Cost estimate

For a small personal-use deployment:

| component | monthly |
| --- | --- |
| Backend host (Fly.io / Railway) | $5–15 |
| LLM API (Claude/GPT at ~1000 questions/mo) | $5–20 |
| Vector DB | $0 (self-hosted Chroma) |
| Domain | $1 |
| **Total** | **$10–40 / month** |

Corpus build is a one-time effort: maybe 40–80 hours of focused work to
assemble Tier 1 through Tier 3, not counting reading time.

## Build phases

I'd suggest doing this in four phases. Each phase ships something usable.

**Phase 1 — Corpus spine (week 1–2)**
- Clone GRETIL's TEI distribution for the Tier 1 texts.
- Pull Sacred Books of the East as plain text from Project Gutenberg.
- Write a single `ingest.py` that produces a `corpus.jsonl` — one line per
  chunk with `{id, text, source, license, language}`.
- Run basic sanity checks: no duplicates, every chunk under 1000 tokens,
  every chunk has a source citation.

**Phase 2 — RAG service (week 3–4)**
- Spin up Chroma locally, embed the corpus, persist to disk.
- Write the FastAPI `/ask` endpoint with Claude as the LLM.
- Front-end: swap the `answerEngine.js` call in `OhmmChat.jsx` for a
  `fetch("/ask", …)` call; render citations as clickable chips.
- Running against `localhost` is fine for phase 2.

**Phase 3 — Hosting + commentaries (week 5–6)**
- Deploy the backend to Fly.io behind a domain.
- Add the Tier 2 commentaries (Śaṅkara, Rāmānuja, Madhva) — these are the
  biggest quality wins.
- Harden the prompt with a "refuse to answer if no relevant passages"
  instruction.

**Phase 4 — Research papers + manuscripts (ongoing)**
- Expand with open-access papers (DOAJ, arXiv hum).
- If ambition holds: pilot OCR on a few digitized manuscripts from NMM.

## What I'd NOT do

- **Ingest copyrighted modern translations wholesale.** It's a legal and
  ethical problem, and it's not necessary — the public-domain translations
  plus the Sanskrit originals give us excellent coverage.
- **Train or fine-tune first.** You don't need a custom model to get a bot
  that "knows" these texts. Build RAG, run it for three months, *then*
  decide whether fine-tuning fixes anything RAG doesn't.
- **Use a scraped web corpus.** The web is full of secondhand,
  misattributed, or paraphrased versions. The point of this project is
  verified sources; the corpus has to be built from primary editions only.

## Open questions for you

Before I write any ingestion code, I'd want to know:

1. **Budget ceiling.** Is $10–40/mo for hosting+LLM okay, or should we aim
   for "runs on my Mac only"?
2. **Scope of bot.** Strictly Hindu philosophy, or should comparative
   Buddhist and Jain texts be in-corpus too?
3. **Language.** English-only answers, or should the bot also answer in
   Hindi / Sanskrit when asked?
4. **Privacy stance.** Are you comfortable with questions going to Claude /
   OpenAI's servers, or should we plan around a self-hosted model from
   phase 1?
5. **Audience.** Is this for yourself, a classroom, or a public launch?
   That changes how much rate-limiting, moderation, and caching we need.

Once we agree on those, phase 1 is a clean one-to-two-week project and
we'll have a bot that can say, for example, "According to
Muṇḍaka Upaniṣad 1.1.7 [cited] and Śaṅkara's commentary on it [cited],
Brahman is the primary cause of the universe in the sense that…" — with
every sentence traceable back to a verified source.
