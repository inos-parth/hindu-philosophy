# Hindu Philosophy · Interactive Hierarchy

An interactive, clickable hierarchy graph of Hindu philosophy — the six orthodox (āstika) schools, the heterodox (nāstika) traditions, Vedāntic sub-schools, core concepts, and foundational texts. Built with React and D3, and paired with an in-app bot named **Ohmm** that answers questions about the material.

All node descriptions, FAQ entries, and bot replies are original paraphrased summaries written for this project. Nothing is quoted verbatim from any reference.

## Two ways to run it

### 1. No install — open `standalone.html`

Just double-click `standalone.html`. It pulls React, D3, and the Babel JSX transformer from a CDN and renders the full app in your browser, including the Ohmm bot. Needs an internet connection the first time you open it. The optional dictation mic inside the chat uses the Web Speech API, so it works best in Chromium-based browsers (Chrome, Edge, Brave); typing questions works everywhere, including iPhone Safari.

### 2. Full React project (Vite)

```bash
npm install
npm run dev
```

Vite starts a dev server (default http://localhost:5173) and opens it in your browser. Build a production bundle with `npm run build` and preview it with `npm run preview`.

## How to use the graph

- **Click a node** to read about it in the side panel.
- **Click the same node again** (if it has children) to expand or collapse its branch.
- **Drag** the background to pan. **Scroll** to zoom.
- The graph loads with the top two levels expanded. Everything else starts collapsed so it's legible.

## Ohmm — the in-app guide

Ohmm is a small chat assistant that answers questions about anything in the tree, plus a curated FAQ set (Trimūrti, Daśāvatāra, the three guṇas, karma / bhakti / jñāna yoga, Śaṅkara, Rāmānuja, Madhva, the Buddha, Vivekananda, mokṣa vs. nirvāṇa, Purāṇas, Mahābhārata, Rāmāyaṇa, chakras, māyā, Om, and more).

**Two ways to open Ohmm:**

- Click the pulsing **ॐ** button in the bottom-right corner.
- Press `/` (or `Shift + O`) anywhere outside an input.

**Inside the chat you can:**

- Type a question and press Enter. Ohmm answers and, where possible, offers an **Open <node>** chip that jumps the tree to that topic.
- Tap the 🎤 mic to dictate a question (auto-sends when you stop speaking). Chromium-based browsers only — on Safari the mic button is inert and you can just type instead.

**What Ohmm knows:**

- The six orthodox schools and Vedānta's sub-schools, with summaries of each.
- The heterodox systems (Cārvāka, Jainism, Buddhism → Theravāda, Mahāyāna → Madhyamaka, Yogācāra).
- Core concepts: dharma, karma, saṃsāra, mokṣa, ātman, brahman, pramāṇas, puruṣārthas, guṇas, āśramas.
- Major teachers (Śaṅkara, Rāmānuja, Madhva, Caitanya, Vivekananda), epics, and the Purāṇic corpus.
- Comparison questions of the form "Compare X and Y" or "difference between X and Y".
- Spelling is forgiving: `Shankara`, `Śaṅkara`, `moksha`, `mokṣa`, `om`, and `aum` all resolve to the right entry.

Ohmm runs entirely offline — there is no network call, no API key, no telemetry. All matching is done against an in-app corpus built from the tree plus the FAQ file.

## Responsive design

The app adapts to whatever screen it's on. On desktop it runs as a side-by-side tree and detail panel. Below 960 px the detail panel drops underneath the tree. Below 600 px the header legend hides, text sizes tighten, and the Ohmm modal switches to a bottom-sheet style. The floating ॐ button stays reachable on all sizes.

## What's in the tree

The root is `Hindu Philosophy (Darśana)`. It branches into four top-level groups:

- **Foundational Texts** — Vedas, Upaniṣads, Bhagavad Gītā, and the aphoristic sūtra-plus-commentary genre.
- **Orthodox Schools (Āstika)** — Nyāya, Vaiśeṣika, Sāṃkhya, Yoga, Mīmāṃsā, and Vedānta. Vedānta expands into six sub-schools (Advaita, Viśiṣṭādvaita, Dvaita, Dvaitādvaita, Śuddhādvaita, Acintya Bhedābheda).
- **Heterodox Schools (Nāstika)** — Cārvāka, Jainism, and Buddhism. Buddhism expands into Theravāda and Mahāyāna; Mahāyāna further into Madhyamaka and Yogācāra.
- **Core Concepts** — dharma, karma, saṃsāra, mokṣa, ātman, brahman, pramāṇas, puruṣārthas.

Colors encode the top-level branch:

| Color  | Branch |
| ------ | ------ |
| Amber  | Root |
| Blue   | Foundational Texts |
| Orange | Orthodox (Āstika) |
| Purple | Heterodox (Nāstika) |
| Green  | Core Concepts |

## Project layout

```
.
├── index.html              # Vite entry
├── standalone.html         # Self-contained, CDN-powered version (double-click to open)
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── HierarchyTree.jsx   # D3 collapsible tree
    │   ├── DetailPanel.jsx     # Side panel with paraphrased descriptions
    │   └── OhmmChat.jsx        # Chat modal with optional mic dictation
    ├── lib/
    │   └── answerEngine.js     # Offline tokenizer + scored retrieval
    └── data/
        ├── hierarchy.js        # The whole tree (schools, sub-schools, concepts)
        └── faqs.js             # FAQ topics that extend beyond the tree
```

## Notes on scope

The user picked a React-only build for this project, so there is no Express backend or MongoDB. The hierarchy, the FAQ corpus, and the answer engine all live in the frontend. If you want to add a MERN backend later, the data shape in `src/data/hierarchy.js` and `src/data/faqs.js` would serve the API directly, and `src/lib/answerEngine.js` could either stay client-side or move behind an endpoint.

Ohmm is a beta. It covers the main topics and the most-asked questions; deeper material (individual sūtras, commentarial traditions, regional variations) can be added by extending `src/data/faqs.js` — no code changes needed.
