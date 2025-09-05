import type { User } from "@/entities/User";
import type { Edge } from "@/entities/Edge";
import { type SimulationNodeDatum } from "d3-force";

export type IdeaNode = {
  id?: string;
  content: string;
  parentNodes: IdeaNode[];
  childNodes: IdeaNode[];
  subNodes: IdeaNode[];
  edges: Edge[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
};

export type GraphNode = IdeaNode & SimulationNodeDatum;
