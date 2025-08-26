import * as React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { IdeaNode } from "@/entities/IdeaNode";

export type GraphProps = {
  parentNode: IdeaNode;
  width?: number;
  height?: number;
};

export const Graph: React.FC<GraphProps> = ({
  parentNode,
  width = 400,
  height = 300,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Prepare nodes and links for D3 force simulation
    const nodes = parentNode.childNodes.map((n, i) => ({
      ...n,
      index: i, // Index for D3 internal use
      x: width / 2 + Math.random() * 100, // Initial position
      y: height / 2 + Math.random() * 100,
    }));

    const links = parentNode.edges.map((l) => ({
      source: l.sourceNodeId,
      target: l.targetNodeId,
    }));

    const body = d3.select(ref.current);
    body.selectAll("svg").remove();

    // Create SVG
    const svg = body
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));

    // Create edges (links)
    const link = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);

    // Create nodes
    const node = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 15)
      .attr("fill", "#ccc")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Create labels
    const label = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text(d => d.content)
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#333");

    // Drag functionality
    const drag = d3.drag<SVGCircleElement, any>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    // Apply drag to nodes and labels
    node.call(drag);
    label.call(d3.drag<SVGTextElement, any>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      })
    );

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [parentNode, width, height]);

  return <div ref={ref} style={{ width, height }} />;
};
