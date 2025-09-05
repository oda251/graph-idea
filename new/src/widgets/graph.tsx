import * as React from "react";
import { useEffect, useRef, useMemo } from "react";
import {
  forceLink,
  forceCenter,
  forceSimulation,
  forceManyBody,
  forceCollide,
  type SimulationLinkDatum,
} from "d3-force";
import { select } from "d3-selection";
import { createRoot } from "react-dom/client";
import type { GraphNode, IdeaNode } from "@/entities/IdeaNode";
import { Node } from "@/widgets/node";
import { type GraphLink } from "@/entities/Edge";

export type GraphProps = {
  parentNode: IdeaNode;
  width?: number;
  height?: number;
};

const LINK_DISTANCE = 90;
const FORCE_RADIUS_FACTOR = 2;
const NODE_STRENGTH = -100;
const RADIUS = 20;

const simulation = forceSimulation<GraphNode, GraphLink>()
  .force("charge", forceManyBody().strength(NODE_STRENGTH))
  .force("collision", forceCollide(RADIUS * FORCE_RADIUS_FACTOR));

export const Graph: React.FC<GraphProps> = ({
  parentNode,
  width = 400,
  height = 300,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const nodes: GraphNode[] = parentNode.childNodes;
  const links: GraphLink[] = parentNode.edges;
  const filledLinks = useMemo(() => {
    const nodesMap = new Map(nodes.map((n) => [n.id, n]));
    return links.map((link) => ({
      ...link,
      source: nodesMap.get(link.source)!,
      target: nodesMap.get(link.target)!,
    }));
  }, [links, nodes]);

  useEffect(() => {
    simulation
      .nodes(nodes)
      .force(
        "link",
        forceLink<GraphNode, SimulationLinkDatum<GraphNode>>(filledLinks)
          .id((d) => d.id!)
          .distance(LINK_DISTANCE)
      )
      .force("center", forceCenter(width / 2, height / 2).strength(0.05));

    const linksSelection = select(svgRef.current)
      .selectAll("line.link")
      .data(filledLinks)
      .join("line")
      .classed("link", true)
      .attr("stroke-width", (d) => d.strength || 1)
      .attr("stroke", "black");

    const nodesSelection = select(svgRef.current)
      .selectAll("foreignObject.node")
      .data(nodes)
      .join("foreignObject")
      .classed("node", true)
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", -30)
      .attr("y", -60)
      .attr("overflow", "visible");

    nodesSelection?.each(function (node) {
      const root = createRoot(this as SVGForeignObjectElement);
      root.render(<Node node={node} />);
    });

    simulation.on("tick", () => {
      linksSelection
        .attr("x1", (d) => d.source.x!)
        .attr("y1", (d) => d.source.y!)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y!);

      nodesSelection.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });
  }, [height, width, nodes, filledLinks]);

  return <svg width={width} height={height} ref={svgRef}></svg>;
};
