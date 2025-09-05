import type { IdeaNode } from "@/entities/IdeaNode";

export interface NodeProps {
  node: IdeaNode;
  className?: string;
}

export const Node: React.FC<NodeProps> = ({ node, className }) => {
  return (
    <div className=" bg-blue-300 rounded-full border border-blue-800 px-5 py-1 hover:border-white cursor-pointer select-none">
      <h2>{node.content} </h2>
    </div>
  );
};
