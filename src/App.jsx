import React, { useState, useMemo, useCallback, useEffect } from "react";
import hierarchy from "./data/hierarchy.js";
import HierarchyTree from "./components/HierarchyTree.jsx";
import DetailPanel from "./components/DetailPanel.jsx";
import OhmmChat from "./components/OhmmChat.jsx";

export default function App() {
  const [selectedId, setSelectedId] = useState("root");
  const [chatOpen, setChatOpen] = useState(false);

  const selectedNode = useMemo(() => findNode(hierarchy, selectedId), [selectedId]);

  const onPick = useCallback((id) => {
    if (findNode(hierarchy, id)) {
      setSelectedId(id);
      setChatOpen(false);
    }
  }, []);

  // Keyboard shortcut: "/" or Shift+O opens Ohmm from anywhere outside an input.
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "/" || (e.key.toLowerCase() === "o" && e.shiftKey)) {
        e.preventDefault();
        setChatOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="om">ॐ</span>
          <div>
            <h1>Hindu Philosophy</h1>
            <p className="subtitle">An interactive hierarchy of schools, sub-schools, and core concepts</p>
          </div>
        </div>
        <div className="legend">
          <span><i className="swatch swatch-astika" /> Orthodox (Āstika)</span>
          <span><i className="swatch swatch-nastika" /> Heterodox (Nāstika)</span>
          <span><i className="swatch swatch-texts" /> Texts</span>
          <span><i className="swatch swatch-concepts" /> Concepts</span>
        </div>
      </header>

      <main className="app-main">
        <section className="tree-pane">
          <HierarchyTree
            data={hierarchy}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <div className="tree-hint">
            Click a node to read · Click again to expand/collapse · Drag to pan · Scroll to zoom · Tap ॐ or press / to ask Ohmm
          </div>
        </section>

        <aside className="detail-pane">
          <DetailPanel node={selectedNode} />
        </aside>
      </main>

      <footer className="app-footer">
        Built with React + D3 · Tap the pulsing ॐ to open Ohmm · All descriptions are original paraphrased summaries
      </footer>

      <button
        className="ohmm-fab pulsing"
        aria-label="Open Ohmm chat"
        title="Open Ohmm chat"
        onClick={() => setChatOpen(true)}
      >
        <span className="ohmm-fab-label">ॐ</span>
      </button>

      <OhmmChat
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onPick={onPick}
      />
    </div>
  );
}

function findNode(node, id) {
  if (node.id === id) return node;
  if (!node.children) return null;
  for (const child of node.children) {
    const hit = findNode(child, id);
    if (hit) return hit;
  }
  return null;
}
