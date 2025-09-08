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
      className={`group bg-base border-primary text-primary hover:border-primary-emphasis hover:text-primary-emphasis flex h-32 w-32 cursor-pointer flex-col justify-center rounded-xl border shadow-md transition-all select-none hover:scale-110 focus:outline-none ${className ?? ""}`}
      onMouseEnter={onHover}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="flex h-full flex-col justify-center px-2">
        <h2 className="font-semibold break-words">{node.content}</h2>
      </div>
      <div className="border-primary group-hover:border-primary-emphasis flex w-full border-t px-2 py-1 transition-all">
        <p className="text-center text-sm">{node.author.name}</p>
      </div>
    </div>
  );
};
