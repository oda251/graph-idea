import type { User } from "@/entities/User";
import type { Edge } from "@/entities/Edge";

export type IdeaNode = {
  id: string | undefined;
  content: string;
  parentNodes: IdeaNode[];
  childNodes: IdeaNode[];
  subNodes: IdeaNode[];
  edges: Edge[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
};

export const IdeaNode = {
  create(params: {
    id: string;
    content: string;
    author: User;
    parentNodes?: IdeaNode[];
    childNodes?: IdeaNode[];
    subNodes?: IdeaNode[];
    edges?: Edge[];
    createdAt?: Date;
    updatedAt?: Date;
  }): IdeaNode {
    return {
      id: params.id,
      content: params.content,
      parentNodes: params.parentNodes ?? [],
      childNodes: params.childNodes ?? [],
      subNodes: params.subNodes ?? [],
      edges: params.edges ?? [],
      author: params.author,
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.updatedAt ?? new Date(),
    };
  },
  isRoot(node: IdeaNode): boolean {
    return node.parentNodes.length === 0;
  },
  getSubNodeCount(node: IdeaNode): number {
    return node.subNodes.length;
  },
};
