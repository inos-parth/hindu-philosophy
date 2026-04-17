import React from "react";

export default function DetailPanel({ node }) {
  if (!node) {
    return (
      <div className="detail empty">
        <p>Select a node on the left to read about it.</p>
      </div>
    );
  }

  return (
    <article className="detail">
      <header className="detail-head">
        {node.sanskrit && <div className="detail-sanskrit">{node.sanskrit}</div>}
        <h2>{node.name}</h2>
        {node.summary && <p className="detail-summary">{node.summary}</p>}
      </header>

      {node.description && (
        <section className="detail-body">
          {splitParagraphs(node.description).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>
      )}

      {Array.isArray(node.children) && node.children.length > 0 && (
        <section className="detail-children">
          <h3>Branches</h3>
          <ul>
            {node.children.map((c) => (
              <li key={c.id}>
                <span className="child-name">{c.name}</span>
                {c.sanskrit && <span className="child-sanskrit"> · {c.sanskrit}</span>}
                {c.summary && <p className="child-summary">{c.summary}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

function splitParagraphs(text) {
  // Description strings are single paragraphs in this project, but split on
  // double newlines in case someone adds multi-paragraph copy later.
  return String(text)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
