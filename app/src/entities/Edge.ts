import type { IdeaNode } from "@/entities/IdeaNode";

export type Edge = {
  id?: string;
  sourceNodeId: string;
  targetNodeId: string;
  belongingNodes: IdeaNode[];
};

export const Edge = {
  from: (
    sourceNodeId: string,
    targetNodeId: string,
    belongingNodes: IdeaNode[]
  ): Edge => ({
    sourceNodeId,
    targetNodeId,
    belongingNodes,
  }),
};
