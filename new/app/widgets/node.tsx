import type { IdeaNode } from "app/entities/IdeaNode";

export interface NodeProps {
  node: IdeaNode;
  className?: string;
  onHover?: () => void;
  onClick?: () => void;
}

export const Node: React.FC<NodeProps> = ({
  node,
  className,
  onHover,
  onClick,
}) => {
  return (
    <div
      className={`group bg-base border border-primary shadow-md rounded-xl w-32 h-32 flex flex-col justify-center cursor-pointer select-none text-primary hover:border-primary-emphasis hover:text-primary-emphasis hover:scale-110 transition-all focus:outline-none ${className ?? ""}`}
      onMouseEnter={onHover}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="h-full flex flex-col justify-center px-2">
        <h2 className="font-semibold break-words">{node.content}</h2>
      </div>
      <div className="border-t border-primary group-hover:border-primary-emphasis transition-all w-full flex px-2 py-1">
        <p className="text-center text-sm">{node.author.name}</p>
      </div>
    </div>
  );
};
