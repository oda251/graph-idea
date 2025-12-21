import React, { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export type SidebarProps = {
  position?: "left" | "right";
  children?: React.ReactNode;
  width?: number | string;
  className?: string;
  defaultOpen?: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({
  position = "left",
  children,
  width = 280,
  className = "",
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const isLeft = position === "left";

  return (
    <aside
      className={`fixed top-0 ${
        isLeft ? "left-0" : "right-0"
      } z-20 flex h-full flex-col border-gray-200 bg-white text-black shadow transition-transform duration-300 ease-in-out ${
        open
          ? "translate-x-0"
          : isLeft
            ? "-translate-x-full"
            : "translate-x-full"
      } ${className}`}
      style={{ width }}
    >
      <button
        className={`absolute top-4 ${isLeft ? "-right-4" : "-left-4"} z-30 flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow transition-transform duration-300`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "サイドバーを閉じる" : "サイドバーを開く"}
        style={{
          transform: open
            ? ""
            : isLeft
              ? "translateX(100%)"
              : "translateX(-100%)",
        }}
      >
        {isLeft ? (
          open ? (
            <FaAngleDoubleLeft size={20} />
          ) : (
            <FaAngleDoubleRight size={20} />
          )
        ) : open ? (
          <FaAngleDoubleRight size={20} />
        ) : (
          <FaAngleDoubleLeft size={20} />
        )}
      </button>
      {children}
    </aside>
  );
};
