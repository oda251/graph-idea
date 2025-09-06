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
import { drag, type D3DragEvent } from "d3-drag";
import { select } from "d3-selection";
import { createRoot } from "react-dom/client";
import type { GraphNode, IdeaNode } from "app/entities/IdeaNode";
import { Node } from "app/widgets/node";
import { type GraphLink } from "app/entities/Edge";
import type { S } from "vitest/dist/chunks/config.d.D2ROskhv.js";

export type GraphProps = {
  parentNode: IdeaNode;
  width?: number;
  height?: number;
};

const LINK_DISTANCE = 90;
const FORCE_RADIUS_FACTOR = 2;
const NODE_STRENGTH = -100;
const RADIUS = 20;

export const Graph: React.FC<GraphProps> = ({
  parentNode,
  width = 400,
  height = 300,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // useMemoを使って、ノードとリンクをメモ化
  const nodes: GraphNode[] = useMemo(
    () => parentNode.childNodes,
    [parentNode.childNodes]
  );
  const links: GraphLink[] = useMemo(
    () => parentNode.edges,
    [parentNode.edges]
  );

  // シミュレーションインスタンスをuseRefで保持
  const simulationRef = useRef<ReturnType<
    typeof forceSimulation<GraphNode, GraphLink>
  > | null>(null);

  const filledLinks = useMemo(() => {
    const nodesMap = new Map(nodes.map((n) => [n.id, n]));
    return links.map((link) => ({
      ...link,
      source: nodesMap.get(link.source)!,
      target: nodesMap.get(link.target)!,
    }));
  }, [links, nodes]);

  // 初回マウント時のみ実行
  useEffect(() => {
    if (!svgRef.current) return;

    // シミュレーションを初期化
    const simulation = forceSimulation<GraphNode, GraphLink>()
      .force("charge", forceManyBody().strength(NODE_STRENGTH))
      .force("collision", forceCollide(RADIUS * FORCE_RADIUS_FACTOR))
      .force("center", forceCenter(width / 2, height / 2));

    // シミュレーションをuseRefに格納
    simulationRef.current = simulation;

    // ノードとリンクの描画
    const linksSelection = select(svgRef.current)
      .selectAll("line.link")
      .data(filledLinks)
      .join("line")
      .classed("link", true)
      .attr("stroke-width", (d) => d.strength || 1)
      .attr("stroke", "black");

    const nodesSelection = select(svgRef.current)
      .selectAll<SVGForeignObjectElement, GraphNode>("foreignObject.node")
      .data(nodes)
      .join("foreignObject")
      .classed("node", true)
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", -30)
      .attr("y", -60)
      .attr("overflow", "visible");

    nodesSelection?.each(function (node) {
      const raiseNode = () => {
        this.parentNode?.appendChild(this);
      };
      const root = createRoot(this as SVGForeignObjectElement);
      root.render(<Node node={node} onHover={raiseNode} />);
    });

    // ドラッグイベントの定義
    nodesSelection.call(
      drag<SVGForeignObjectElement, GraphNode, GraphNode>()
        .on("start", (event) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on("drag", (event) => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on("end", (event) => {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        })
    );

    // シミュレーションのtickイベントハンドラ
    simulation.on("tick", () => {
      linksSelection
        .attr("x1", (d) => d.source.x!)
        .attr("y1", (d) => d.source.y!)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y!);

      nodesSelection.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });
  }, [width, height]);

  // nodes/linksが更新された時にシミュレーションに新しいデータを適用
  useEffect(() => {
    if (!simulationRef.current) return;
    simulationRef.current
      .nodes(nodes)
      .force(
        "link",
        forceLink<GraphNode, SimulationLinkDatum<GraphNode>>(filledLinks)
          .id((d) => d.id!)
          .distance(LINK_DISTANCE)
      )
      .alpha(1) // シミュレーションを再加熱
      .restart();
  }, [nodes, filledLinks]);

  return <svg width={width} height={height} ref={svgRef}></svg>;
};
