// Ohmm bot — offline answer engine.
// Given a natural-language question, it searches a corpus built from the
// hierarchy tree + FAQ entries and returns a best-effort answer.
// No network calls, no API key.

import hierarchy from "../data/hierarchy.js";
import faqs from "../data/faqs.js";

// ---------- Tokenizer / normalizer ----------

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "of", "in", "on", "at", "to", "for", "with", "by", "about", "from",
  "and", "or", "but", "so", "than",
  "what", "who", "which", "where", "when", "why", "how",
  "do", "does", "did", "can", "could", "would", "should", "may", "might",
  "will", "shall", "have", "has", "had",
  "tell", "me", "you", "your", "my", "mine", "our", "we", "i",
  "this", "that", "these", "those", "it", "its", "there", "here",
  "please", "kindly", "ohmm", "hi", "hello", "hey",
  "namaste", "namaskar",
  "explain", "describe", "define", "meaning",
  "vs", "versus", "compare", "comparison", "between", "difference",
  "like", "just", "really", "very", "also", "some", "any", "all", "each",
  "s"
]);

function stripDiacritics(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalize(s) {
  return stripDiacritics(String(s || "").toLowerCase())
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Common transliteration flattening so "Shankara" matches "Śaṅkara" ("sankara"
// after diacritics are stripped), "moksha" matches "moksa", etc.
function looseVariants(w) {
  const out = new Set([w]);
  // "sh" → "s"
  if (/sh/.test(w)) out.add(w.replace(/sh/g, "s"));
  // "ksha"/"ksh" → "ks"  (mokṣa/mokṣa, yakṣa…)
  if (/ksh/.test(w)) out.add(w.replace(/ksh/g, "ks"));
  // drop doubled vowels at the start ("aatman" → "atman")
  out.add(w.replace(/([aeiou])\1+/g, "$1"));
  return [...out];
}

function tokens(s) {
  if (!s) return [];
  const base = normalize(s)
    .split(" ")
    .filter((w) => w && w.length > 1 && !STOPWORDS.has(w));
  // Short queries like "om" or "aum" should survive the min-length filter.
  if (base.length === 0) {
    const raw = normalize(s).split(" ").filter(Boolean);
    return raw.filter((w) => w.length >= 2);
  }
  return base;
}

function expandTokens(qTokens) {
  const out = [];
  for (const t of qTokens) {
    for (const v of looseVariants(t)) out.push(v);
  }
  return Array.from(new Set(out));
}

// ---------- Build corpus ----------

function flattenHierarchy(node, acc) {
  acc.push({
    id: node.id,
    kind: "node",
    name: node.name,
    sanskrit: node.sanskrit || "",
    summary: node.summary || "",
    description: node.description || "",
    children: Array.isArray(node.children)
      ? node.children.map((c) => ({ id: c.id, name: c.name }))
      : []
  });
  if (Array.isArray(node.children)) {
    node.children.forEach((c) => flattenHierarchy(c, acc));
  }
  return acc;
}

const corpus = (() => {
  const fromTree = flattenHierarchy(hierarchy, []);
  const fromFaqs = faqs.map((f) => ({
    id: f.id,
    kind: "faq",
    name: f.name,
    sanskrit: f.sanskrit || "",
    summary: f.summary || "",
    description: f.description || "",
    children: []
  }));

  // Pre-tokenize each entry for faster scoring.
  return [...fromTree, ...fromFaqs].map((e) => ({
    ...e,
    _nameTokens: tokens(e.name + " " + e.sanskrit),
    _summaryTokens: tokens(e.summary),
    _descTokens: tokens(e.description)
  }));
})();

// Index by id for quick lookup (hierarchy node ids are usable by App to
// select a node in the tree when the user taps a chip).
const byId = new Map(corpus.map((e) => [e.id, e]));

// ---------- Scoring ----------

function scoreEntry(entry, queryTokens) {
  let score = 0;
  for (const t of queryTokens) {
    if (entry._nameTokens.includes(t)) score += 10;
    if (entry._summaryTokens.includes(t)) score += 3;
    if (entry._descTokens.includes(t)) score += 1;
  }
  // Bonus for exact substring match of the whole query in the name.
  const qJoined = queryTokens.join(" ");
  if (qJoined && normalize(entry.name).includes(qJoined)) score += 6;
  return score;
}

function rank(queryTokens, limit = 5) {
  if (!queryTokens.length) return [];
  const expanded = expandTokens(queryTokens);
  const scored = corpus
    .map((e) => ({ entry: e, score: scoreEntry(e, expanded) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

// ---------- Canned / special-case responses ----------

function looksLikeGreeting(q) {
  return /^\s*(hi|hello|hey|namaste|namaskar|ohmm+|ohm+|om+|aum+)\b/i.test(q.trim());
}

function looksLikeCapability(q) {
  const n = normalize(q);
  return (
    /who are you/.test(n) ||
    /what can you do/.test(n) ||
    /^help( me)?$/.test(n) ||
    /^\s*help\s*$/.test(n) ||
    /what do you know/.test(n)
  );
}

function looksLikeThanks(q) {
  return /^(thanks?|thank you|ty)\b/i.test(q.trim());
}

function looksLikeList(q) {
  const n = normalize(q);
  return (
    /list.*(school|darshan|darsana)/.test(n) ||
    /what are the.*(school|darshan|six)/.test(n) ||
    /six.*(school|darshan|darsana)/.test(n) ||
    /orthodox.*(school|darshan)/.test(n) ||
    /heterodox.*(school|darshan)/.test(n)
  );
}

function looksLikeCompare(q) {
  const n = normalize(q);
  if (/^(compare|contrast)\b/.test(n)) return true;
  if (/\bdifference\b/.test(n)) return true;
  if (/\bvs\b|\bversus\b/.test(n)) return true;
  if (/ and /.test(n) && (/differ/.test(n) || /compar/.test(n))) return true;
  return false;
}

function extractComparePair(queryTokens) {
  // Find the top 2 distinct entries (preferring different kinds/branches).
  const ranked = rank(queryTokens, 8);
  if (ranked.length < 2) return null;
  return [ranked[0].entry, ranked[1].entry];
}

// ---------- Main API ----------

export function answer(question) {
  const raw = String(question || "").trim();
  if (!raw) {
    return {
      kind: "empty",
      text: "Ask me anything about Hindu philosophy — schools, teachers, concepts, or texts.",
      suggestions: defaultSuggestions()
    };
  }

  if (looksLikeGreeting(raw) && raw.length < 30) {
    return {
      kind: "greeting",
      text:
        "Namaste. I'm Ohmm, a guide to the schools, concepts, and texts of Hindu philosophy. What would you like to explore?",
      suggestions: defaultSuggestions()
    };
  }

  if (looksLikeThanks(raw)) {
    return {
      kind: "thanks",
      text: "Of course. Ask me another — I have time.",
      suggestions: defaultSuggestions()
    };
  }

  if (looksLikeCapability(raw)) {
    return {
      kind: "capability",
      text:
        "I can talk about the six orthodox schools (Nyāya, Vaiśeṣika, Sāṃkhya, Yoga, Mīmāṃsā, Vedānta) and their sub-schools, the heterodox systems (Cārvāka, Jainism, Buddhism with Theravāda, Mahāyāna, Madhyamaka, Yogācāra), core concepts like dharma, karma, saṃsāra, mokṣa, ātman, and Brahman, foundational texts, and major teachers. Try a 'what is…' or 'compare X and Y' question.",
      suggestions: defaultSuggestions()
    };
  }

  if (looksLikeList(raw)) {
    return {
      kind: "list",
      text:
        "The six orthodox schools, traditionally grouped in three pairs, are Nyāya and Vaiśeṣika, Sāṃkhya and Yoga, and Mīmāṃsā and Vedānta. The main heterodox systems are Cārvāka, Jainism, and Buddhism. Tap any to dive in.",
      picks: [
        ref("nyaya"), ref("vaisesika"),
        ref("samkhya"), ref("yoga"),
        ref("mimamsa"), ref("vedanta"),
        ref("carvaka"), ref("jain"), ref("buddhism")
      ].filter(Boolean)
    };
  }

  const qTokens = tokens(raw);

  if (looksLikeCompare(raw)) {
    const pair = extractComparePair(qTokens);
    if (pair) {
      const [a, b] = pair;
      return {
        kind: "compare",
        text: composeComparison(a, b),
        picks: [ref(a.id), ref(b.id)].filter(Boolean),
        suggestions: relatedSuggestions([a, b])
      };
    }
  }

  const ranked = rank(qTokens, 4);
  if (!ranked.length) {
    return {
      kind: "unknown",
      text:
        "I don't have a clear match for that yet. In beta I only have the topics built into the tree and a curated FAQ set. Try asking about a specific school, teacher, text, or concept.",
      suggestions: defaultSuggestions()
    };
  }

  const top = ranked[0].entry;
  const runnerUp = ranked[1]?.entry;
  const confidenceGap = ranked[0].score - (ranked[1]?.score || 0);

  // If the top two are close in score and complementary, suggest them both.
  if (runnerUp && confidenceGap < 4 && top.id !== runnerUp.id) {
    return {
      kind: "best-guess",
      text:
        composeSingle(top) +
        "\n\nIf you meant " +
        runnerUp.name +
        ", ask again with that name and I'll give you its summary.",
      picks: [ref(top.id), ref(runnerUp.id)].filter(Boolean),
      suggestions: relatedSuggestions([top, runnerUp])
    };
  }

  return {
    kind: "match",
    text: composeSingle(top),
    picks: [ref(top.id)].filter(Boolean),
    suggestions: relatedSuggestions([top])
  };
}

// ---------- Composers ----------

function composeSingle(entry) {
  const headline = entry.sanskrit && entry.sanskrit !== entry.name
    ? `${entry.name} (${entry.sanskrit}):`
    : `${entry.name}:`;
  const body = entry.summary
    ? `${entry.summary}${entry.description ? "\n\n" + entry.description : ""}`
    : entry.description || "No extended description.";
  return `${headline} ${body}`;
}

function composeComparison(a, b) {
  const aHead = a.sanskrit && a.sanskrit !== a.name ? `${a.name} (${a.sanskrit})` : a.name;
  const bHead = b.sanskrit && b.sanskrit !== b.name ? `${b.name} (${b.sanskrit})` : b.name;
  const aBody = a.summary || a.description || "";
  const bBody = b.summary || b.description || "";
  return [
    `${aHead}: ${aBody}`,
    `${bHead}: ${bBody}`,
    "Each entry's side panel has a longer discussion."
  ].join("\n\n");
}

// ---------- Suggestions / picks ----------

function ref(id) {
  const entry = byId.get(id);
  if (!entry) return null;
  return { id: entry.id, name: entry.name, kind: entry.kind };
}

function defaultSuggestions() {
  return [
    "What is Advaita Vedānta?",
    "Compare Sāṃkhya and Yoga",
    "Difference between mokṣa and nirvāṇa",
    "Who was Śaṅkara?",
    "What are the three guṇas?"
  ];
}

function relatedSuggestions(entries) {
  const out = [];
  for (const e of entries) {
    (e.children || []).slice(0, 2).forEach((c) => {
      out.push(`What is ${c.name}?`);
    });
  }
  if (out.length < 3) {
    defaultSuggestions().forEach((s) => {
      if (out.length < 4) out.push(s);
    });
  }
  return Array.from(new Set(out)).slice(0, 4);
}

// ---------- Debug/test helpers ----------

export function _tokensForTest(s) { return tokens(s); }
export function _corpusSize() { return corpus.length; }
