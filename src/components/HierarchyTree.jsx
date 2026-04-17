import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Colors keyed by the top-level branch id. Descendants inherit the color
// of the nearest ancestor whose id is listed here.
const BRANCH_COLORS = {
  root: "#b8860b",
  texts: "#2a7ab0",
  astika: "#c2572b",
  nastika: "#7b3aa8",
  concepts: "#2e8b57"
};

const HALO_FILL = "#f9f4e9";
const TRANSITION_MS = 550;
const EASE = d3.easeCubicInOut;

function branchColor(d3Node) {
  let cursor = d3Node;
  while (cursor) {
    const id = cursor.data.id;
    if (BRANCH_COLORS[id]) return BRANCH_COLORS[id];
    cursor = cursor.parent;
  }
  return "#444";
}

// Toggle children between `children` (visible) and `_children` (collapsed).
function toggle(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else if (d._children) {
    d.children = d._children;
    d._children = null;
  }
}

// Start with everything past the second level collapsed so the tree is
// readable on first load.
function collapseBelowDepth(d, maxDepth) {
  if (d.depth >= maxDepth && d.children) {
    d._children = d.children;
    d.children = null;
  }
  const kids = d.children || d._children;
  if (kids) kids.forEach((c) => collapseBelowDepth(c, maxDepth));
}

export default function HierarchyTree({ data, selectedId, onSelect }) {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const rootRef = useRef(null);
  const zoomRef = useRef(null);
  const selectedRef = useRef(selectedId);
  const onSelectRef = useRef(onSelect);
  const hoverRef = useRef(null);

  // Keep latest refs so the d3 closures always see current values.
  useEffect(() => {
    selectedRef.current = selectedId;
  }, [selectedId]);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // One-time setup: create the root hierarchy, zoom behavior, and initial layout.
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);

    const root = d3.hierarchy(data);
    root.x0 = 0;
    root.y0 = 0;
    collapseBelowDepth(root, 2);
    rootRef.current = root;

    const zoom = d3
      .zoom()
      .scaleExtent([0.3, 2.5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    zoomRef.current = zoom;
    svg.call(zoom);

    // Reasonable initial transform so the root is left-aligned and vertically centered.
    const { height } = svgRef.current.getBoundingClientRect();
    svg
      .transition()
      .duration(400)
      .call(zoom.transform, d3.zoomIdentity.translate(80, height / 2).scale(0.9));

    render(root);

    // Re-render on window resize.
    const onResize = () => render(rootRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Re-render whenever the selection changes so the highlight updates.
  useEffect(() => {
    if (rootRef.current) render(rootRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  // Compute visual attributes for a node given current selection/hover state.
  // Both halo and foreground labels use the SAME font-weight so their glyph
  // widths stay aligned — that avoids the doubled-text artifact that
  // happened when only one of the two labels was bolded.
  function labelWeight(d) {
    return d.data.id === selectedRef.current ? 700 : 500;
  }
  function labelFill(d) {
    return d.data.id === selectedRef.current ? branchColor(d) : "#2a241c";
  }
  function circleFill(d) {
    if (d._children) return branchColor(d);
    return d.data.id === selectedRef.current ? branchColor(d) : "#ffffff";
  }
  function circleRadius(d) {
    if (d.data.id === selectedRef.current) return 9;
    if (d.data.id === hoverRef.current) return 7.5;
    return 6;
  }

  function render(root, source) {
    const g = d3.select(gRef.current);

    // Layout: horizontal tree, x = vertical, y = horizontal distance from root.
    const dx = 36; // vertical spacing between siblings
    const dy = 230; // horizontal spacing between levels
    const treeLayout = d3.tree().nodeSize([dx, dy]);
    treeLayout(root);

    const nodes = root.descendants();
    const links = root.links();

    const originX = source ? source.x0 : root.x;
    const originY = source ? source.y0 : root.y;

    // --- Links ---
    const linkGen = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    const link = g
      .selectAll("path.link")
      .data(links, (d) => d.target.data.id);

    const linkEnter = link
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#c9bfae")
      .attr("stroke-opacity", 0.7)
      .attr("stroke-width", 1.5)
      .attr("stroke-linecap", "round")
      .attr("d", () => {
        const o = { x: originX, y: originY };
        return linkGen({ source: o, target: o });
      });

    // Merge enter + update and animate together. Running enter and update
    // as separate transitions caused the update transition to interrupt the
    // enter one, leaving the lines stuck at stroke-opacity 0.
    linkEnter
      .merge(link)
      .transition()
      .duration(TRANSITION_MS)
      .ease(EASE)
      .attr("stroke-opacity", 0.7)
      .attr("d", (d) => linkGen({ source: d.source, target: d.target }));

    link
      .exit()
      .transition()
      .duration(TRANSITION_MS)
      .ease(EASE)
      .attr("stroke-opacity", 0)
      .attr("d", () => {
        const o = { x: source ? source.x : root.x, y: source ? source.y : root.y };
        return linkGen({ source: o, target: o });
      })
      .remove();

    // --- Nodes ---
    const node = g
      .selectAll("g.node")
      .data(nodes, (d) => d.data.id);

    const nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", () => `translate(${originY},${originX})`)
      .style("cursor", "pointer")
      .style("opacity", 0)
      .on("click", (event, d) => {
        event.stopPropagation();
        const id = d.data.id;
        const currentlySelected = selectedRef.current === id;
        const hasChildren = !!(d.children || d._children);

        // If clicking an already-selected node with children, toggle expand/collapse.
        // Otherwise, select the node.
        if (currentlySelected && hasChildren) {
          toggle(d);
          render(rootRef.current, d);
        } else {
          onSelectRef.current(id);
        }
      })
      .on("mouseenter", (event, d) => {
        hoverRef.current = d.data.id;
        d3.select(event.currentTarget)
          .select("circle")
          .transition()
          .duration(150)
          .ease(EASE)
          .attr("r", circleRadius(d));
      })
      .on("mouseleave", (event, d) => {
        if (hoverRef.current === d.data.id) hoverRef.current = null;
        d3.select(event.currentTarget)
          .select("circle")
          .transition()
          .duration(200)
          .ease(EASE)
          .attr("r", circleRadius(d));
      });

    nodeEnter
      .append("circle")
      .attr("r", 0)
      .attr("stroke-width", 2);

    // Halo label (rendered underneath, thick light stroke to separate from
    // the tree lines). Uses .label-halo so we never select it in updates.
    nodeEnter
      .append("text")
      .attr("class", "label-halo")
      .attr("dy", "0.32em")
      .attr("x", (d) => (d.children || d._children ? -14 : 14))
      .attr("text-anchor", (d) =>
        d.children || d._children ? "end" : "start"
      )
      .text((d) => d.data.name)
      .attr("fill", HALO_FILL)
      .attr("stroke", HALO_FILL)
      .attr("stroke-width", 5)
      .attr("stroke-linejoin", "round")
      .attr("paint-order", "stroke");

    // Foreground label — this is the one updates target.
    nodeEnter
      .append("text")
      .attr("class", "label")
      .attr("dy", "0.32em")
      .attr("x", (d) => (d.children || d._children ? -14 : 14))
      .attr("text-anchor", (d) =>
        d.children || d._children ? "end" : "start"
      )
      .text((d) => d.data.name);

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate
      .transition()
      .duration(TRANSITION_MS)
      .ease(EASE)
      .style("opacity", 1)
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    nodeUpdate
      .select("circle")
      .transition()
      .duration(TRANSITION_MS)
      .ease(EASE)
      .attr("fill", circleFill)
      .attr("stroke", (d) => branchColor(d))
      .attr("r", circleRadius);

    // Update BOTH halo and foreground in lockstep. They share the same
    // font-weight so their glyph widths match — no more ghosting when selected.
    nodeUpdate
      .select("text.label-halo")
      .transition()
      .duration(TRANSITION_MS)
      .ease(EASE)
      .attr("font-weight", labelWeight);

    nodeUpdate
      .select("text.label")
      .transition()
      .duration(TRANSITION_MS)
      .ease(EASE)
      .attr("font-weight", labelWeight)
      .attr("fill", labelFill);

    node
      .exit()
      .transition()
      .duration(TRANSITION_MS)
      .ease(EASE)
      .attr(
        "transform",
        () => `translate(${source ? source.y : root.y},${source ? source.x : root.x})`
      )
      .style("opacity", 0)
      .remove();

    // Stash positions for the next transition.
    root.eachBefore((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  return (
    <div className="tree-wrap">
      <svg ref={svgRef} className="tree-svg" role="img" aria-label="Hindu philosophy hierarchy">
        <g ref={gRef} />
      </svg>
    </div>
  );
}
