import { useEffect, useRef, useMemo, useCallback } from "react";
import {
  forceLink,
  forceCenter,
  forceSimulation,
  forceManyBody,
  forceCollide,
  type SimulationLinkDatum,
} from "d3-force";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { createRoot, type Root } from "react-dom/client";
import type { GraphNode, IdeaNode } from "app/entities/IdeaNode";
import { Node } from "app/widgets/node";
import { type GraphLink } from "app/entities/Edge";

export type GraphProps = {
  parentNode: IdeaNode;
  width: number;
  height: number;
};

const LINK_DISTANCE = 90;
const FORCE_RADIUS_FACTOR = 2;
const NODE_STRENGTH = -100;
const RADIUS = 20;

export const Graph: React.FC<GraphProps> = ({ parentNode, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // シミュレーションとReactルートを管理するためのref
  const simulationRef = useRef<ReturnType<
    typeof forceSimulation<GraphNode, GraphLink>
  > | null>(null);
  const reactRootsRef = useRef<Map<string, Root>>(new Map());

  const nodes: GraphNode[] = useMemo(
    () => parentNode.childNodes,
    [parentNode.childNodes],
  );

  const links: GraphLink[] = useMemo(
    () => parentNode.edges,
    [parentNode.edges],
  );

  const filledLinks = useMemo(() => {
    const nodesMap = new Map(nodes.map((n) => [n.id, n]));
    return links.map((link) => ({
      ...link,
      source: nodesMap.get(link.source)!,
      target: nodesMap.get(link.target)!,
    }));
  }, [links, nodes]);

  // クリーンアップ関数
  const cleanup = useCallback(() => {
    // シミュレーションを停止
    if (simulationRef.current) {
      simulationRef.current.stop();
      simulationRef.current = null;
    }

    // Reactルートをアンマウント
    reactRootsRef.current.forEach((root) => {
      root.unmount();
    });
    reactRootsRef.current.clear();

    // SVG要素をクリア
    if (svgRef.current) {
      select(svgRef.current).selectAll("*").remove();
    }
  }, []);

  // シミュレーションとSVGの初期化
  const initializeGraph = useCallback(() => {
    if (!svgRef.current) return;

    // 既存のものをクリーンアップ
    cleanup();

    // 新しいシミュレーションを作成
    const simulation = forceSimulation<GraphNode, GraphLink>(nodes)
      .force("charge", forceManyBody().strength(NODE_STRENGTH))
      .force("collision", forceCollide(RADIUS * FORCE_RADIUS_FACTOR))
      .force("center", forceCenter(width / 2, height / 2))
      .force(
        "link",
        forceLink<GraphNode, SimulationLinkDatum<GraphNode>>(filledLinks)
          .id((d) => d.id!)
          .distance(LINK_DISTANCE),
      );

    simulationRef.current = simulation;

    const svg = select(svgRef.current);

    // リンクを描画
    const linksSelection = svg
      .selectAll("line.link")
      .data(filledLinks)
      .join("line")
      .classed("link", true)
      .attr("stroke-width", (d) => d.strength || 1)
      .attr("stroke", "black");

    // ノードを描画
    const nodesSelection = svg
      .selectAll<SVGForeignObjectElement, GraphNode>("foreignObject.node")
      .data(nodes)
      .join("foreignObject")
      .classed("node", true)
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", -30)
      .attr("y", -60)
      .attr("overflow", "visible");

    // 各ノードにReactコンポーネントをレンダリング
    nodesSelection.each(function (node) {
      const raiseNode = () => {
        this.parentNode?.appendChild(this);
      };
      const root = createRoot(this as SVGForeignObjectElement);
      reactRootsRef.current.set(node.id!, root);
      root.render(<Node node={node} onHover={raiseNode} />);
    });

    // ドラッグ機能を追加
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
        }),
    );

    // tick イベントでグラフを更新
    simulation.on("tick", () => {
      linksSelection
        .attr("x1", (d) => d.source.x!)
        .attr("y1", (d) => d.source.y!)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y!);

      nodesSelection.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });
  }, [nodes, filledLinks, width, height, cleanup]);

  // データの更新のみ（軽量な更新）
  const updateSimulationData = useCallback(() => {
    if (!simulationRef.current) return;

    simulationRef.current
      .nodes(nodes)
      .force(
        "link",
        forceLink<GraphNode, SimulationLinkDatum<GraphNode>>(filledLinks)
          .id((d) => d.id!)
          .distance(LINK_DISTANCE),
      )
      .alpha(0.3) // 軽く再加熱
      .restart();
  }, [nodes, filledLinks]);

  // ノードやリンクのIDが変わった場合は完全に再初期化、そうでなければ軽量更新
  const prevNodesRef = useRef<GraphNode[]>([]);
  const prevLinksRef = useRef<GraphLink[]>([]);

  useEffect(() => {
    const nodeIdsChanged =
      prevNodesRef.current.length !== nodes.length ||
      prevNodesRef.current.some((node, i) => node.id !== nodes[i]?.id);

    const linkIdsChanged =
      prevLinksRef.current.length !== links.length ||
      prevLinksRef.current.some(
        (link, i) =>
          link.source !== links[i]?.source || link.target !== links[i]?.target,
      );

    if (nodeIdsChanged || linkIdsChanged) {
      // 構造が変わった場合は完全に再初期化
      initializeGraph();
    } else {
      // データのみ変更の場合は軽量更新
      updateSimulationData();
    }

    prevNodesRef.current = nodes;
    prevLinksRef.current = links;
  }, [nodes, links, initializeGraph, updateSimulationData]);

  // サイズが変わった場合の処理
  useEffect(() => {
    if (simulationRef.current) {
      simulationRef.current
        .force("center", forceCenter(width / 2, height / 2))
        .alpha(0.1)
        .restart();
    }
  }, [width, height]);

  // コンポーネントのアンマウント時にクリーンアップ
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return <svg width={width} height={height} ref={svgRef}></svg>;
};
