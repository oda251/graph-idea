import { type IdeaNode } from "@/entities/IdeaNode";
import { Graph } from "./graph";
import { useState, useRef, useEffect } from "react";

export type GraphWindowProps = {
  parentNode: IdeaNode;
};

export const GraphWindow: React.FC<GraphWindowProps> = (props) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleResize(rect: DOMRectReadOnly) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSize({ width: rect.width, height: rect.height });
    }, 200);
  }

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        handleResize(entry.contentRect);
      }
    });
    observer.observe(element);
    handleResize(element.getBoundingClientRect());
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="h-full w-full" ref={containerRef}>
      <Graph {...props} width={size.width} height={size.height} />
    </div>
  );
};
