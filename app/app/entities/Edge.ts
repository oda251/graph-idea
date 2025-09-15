import type { IdeaNode, GraphNode } from "app/entities/IdeaNode";
import { type SimulationLinkDatum } from "d3-force";

export type Edge = {
  id?: string;
  // The ID of the source node
  source: string;
  // The ID of the target node
  target: string;
  strength?: number;
  belongingNodes: IdeaNode[];
};

export type GraphLink = Edge & SimulationLinkDatum<GraphNode>;
