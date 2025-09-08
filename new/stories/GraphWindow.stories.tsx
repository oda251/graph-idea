import { GraphWindow } from "app/widgets/graphWindow";
import { type IdeaNode } from "app/entities/IdeaNode";
import type { StoryFn } from "@storybook/react-vite";

export default {
  title: "Widgets/GraphWindow",
  component: GraphWindow,
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: "100%", height: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

const user = { id: "u1", name: "Alice" };
const now = new Date();
const child1: IdeaNode = {
  id: "1",
  content: "Node 1",
  parentNodes: [],
  childNodes: [],
  subNodes: [],
  edges: [],
  author: user,
  createdAt: now,
  updatedAt: now,
};
const child2: IdeaNode = {
  id: "2",
  content: "Node 2",
  parentNodes: [],
  childNodes: [],
  subNodes: [],
  edges: [],
  author: user,
  createdAt: now,
  updatedAt: now,
};
const child3: IdeaNode = {
  id: "3",
  content: "Node 3",
  parentNodes: [],
  childNodes: [],
  subNodes: [],
  edges: [],
  author: user,
  createdAt: now,
  updatedAt: now,
};

const parent: IdeaNode = {
  id: "0",
  content: "Parent Node",
  parentNodes: [],
  childNodes: [child1, child2, child3],
  subNodes: [],
  edges: [
    { source: "1", target: "2", belongingNodes: [] },
    { source: "2", target: "3", belongingNodes: [] },
  ],
  author: user,
  createdAt: now,
  updatedAt: now,
};

export const Default = () => <GraphWindow parentNode={parent} />;

// Large GraphWindow with many nodes
const createLargeGraph = () => {
  const user = { id: "u1", name: "Alice" };
  const now = new Date();
  const nodes: IdeaNode[] = [];
  const edges = [];

  // Create 20 nodes
  for (let i = 1; i <= 20; i++) {
    nodes.push({
      id: i.toString(),
      content: `Node ${i}`,
      parentNodes: [],
      childNodes: [],
      subNodes: [],
      edges: [],
      author: user,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Create random connections
  for (let i = 1; i <= 20; i++) {
    const numConnections = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numConnections; j++) {
      const target = Math.floor(Math.random() * 20) + 1;
      if (target !== i) {
        edges.push({
          source: i.toString(),
          target: target.toString(),
          belongingNodes: [],
        });
      }
    }
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Large GraphWindow Parent",
    parentNodes: [],
    childNodes: nodes,
    subNodes: [],
    edges: edges,
    author: user,
    createdAt: now,
    updatedAt: now,
  };

  return parent;
};

export const LargeGraph = () => <GraphWindow parentNode={createLargeGraph()} />;

// Star GraphWindow - one central node connected to all others
const createStarGraph = () => {
  const user = { id: "u1", name: "Alice" };
  const now = new Date();
  const nodes: IdeaNode[] = [];
  const edges = [];

  // Create central node
  const centerNode: IdeaNode = {
    id: "center",
    content: "Center Node",
    parentNodes: [],
    childNodes: [],
    subNodes: [],
    edges: [],
    author: user,
    createdAt: now,
    updatedAt: now,
  };

  nodes.push(centerNode);

  // Create 8 peripheral nodes
  for (let i = 1; i <= 8; i++) {
    const node: IdeaNode = {
      id: `peripheral-${i}`,
      content: `Peripheral ${i}`,
      parentNodes: [],
      childNodes: [],
      subNodes: [],
      edges: [],
      author: user,
      createdAt: now,
      updatedAt: now,
    };
    nodes.push(node);

    // Connect to center
    edges.push({
      source: "center",
      target: `peripheral-${i}`,
      belongingNodes: [],
    });
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Star GraphWindow Parent",
    parentNodes: [],
    childNodes: nodes,
    subNodes: [],
    edges: edges,
    author: user,
    createdAt: now,
    updatedAt: now,
  };

  return parent;
};

export const StarGraph = () => <GraphWindow parentNode={createStarGraph()} />;

// Tree GraphWindow - hierarchical structure
const createTreeGraph = () => {
  const user = { id: "u1", name: "Alice" };
  const now = new Date();
  const nodes: IdeaNode[] = [];
  const edges = [];

  // Level 1 (root)
  nodes.push({
    id: "root",
    content: "Root",
    parentNodes: [],
    childNodes: [],
    subNodes: [],
    edges: [],
    author: user,
    createdAt: now,
    updatedAt: now,
  });

  // Level 2 (children of root)
  for (let i = 1; i <= 3; i++) {
    nodes.push({
      id: `level2-${i}`,
      content: `Level 2-${i}`,
      parentNodes: [],
      childNodes: [],
      subNodes: [],
      edges: [],
      author: user,
      createdAt: now,
      updatedAt: now,
    });

    edges.push({
      source: "root",
      target: `level2-${i}`,
      belongingNodes: [],
    });
  }

  // Level 3 (children of level 2)
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 2; j++) {
      nodes.push({
        id: `level3-${i}-${j}`,
        content: `Level 3-${i}-${j}`,
        parentNodes: [],
        childNodes: [],
        subNodes: [],
        edges: [],
        author: user,
        createdAt: now,
        updatedAt: now,
      });

      edges.push({
        source: `level2-${i}`,
        target: `level3-${i}-${j}`,
        belongingNodes: [],
      });
    }
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Tree GraphWindow Parent",
    parentNodes: [],
    childNodes: nodes,
    subNodes: [],
    edges: edges,
    author: user,
    createdAt: now,
    updatedAt: now,
  };

  return parent;
};

export const TreeGraph = () => <GraphWindow parentNode={createTreeGraph()} />;

// Complete GraphWindow - all nodes connected to each other
const createCompleteGraph = () => {
  const user = { id: "u1", name: "Alice" };
  const now = new Date();
  const nodes: IdeaNode[] = [];
  const edges = [];

  // Create 6 nodes
  for (let i = 1; i <= 6; i++) {
    nodes.push({
      id: i.toString(),
      content: `Node ${i}`,
      parentNodes: [],
      childNodes: [],
      subNodes: [],
      edges: [],
      author: user,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Connect every node to every other node
  for (let i = 1; i <= 6; i++) {
    for (let j = i + 1; j <= 6; j++) {
      edges.push({
        source: i.toString(),
        target: j.toString(),
        belongingNodes: [],
      });
    }
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Complete GraphWindow Parent",
    parentNodes: [],
    childNodes: nodes,
    subNodes: [],
    edges: edges,
    author: user,
    createdAt: now,
    updatedAt: now,
  };

  return parent;
};

export const CompleteGraph = () => (
  <GraphWindow parentNode={createCompleteGraph()} />
);

// Chain GraphWindow - linear structure
const createChainGraph = () => {
  const user = { id: "u1", name: "Alice" };
  const now = new Date();
  const nodes: IdeaNode[] = [];
  const edges = [];

  // Create 10 nodes in a chain
  for (let i = 1; i <= 10; i++) {
    nodes.push({
      id: i.toString(),
      content: `Node ${i}`,
      parentNodes: [],
      childNodes: [],
      subNodes: [],
      edges: [],
      author: user,
      createdAt: now,
      updatedAt: now,
    });

    // Connect to previous node (except first)
    if (i > 1) {
      edges.push({
        source: (i - 1).toString(),
        target: i.toString(),
        belongingNodes: [],
      });
    }
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Chain GraphWindow Parent",
    parentNodes: [],
    childNodes: nodes,
    subNodes: [],
    edges: edges,
    author: user,
    createdAt: now,
    updatedAt: now,
  };

  return parent;
};

export const ChainGraph = () => <GraphWindow parentNode={createChainGraph()} />;

// Empty GraphWindow - no nodes
const createEmptyGraph = () => {
  const user = { id: "u1", name: "Alice" };
  const now = new Date();

  const parent: IdeaNode = {
    id: "0",
    content: "Empty GraphWindow Parent",
    parentNodes: [],
    childNodes: [],
    subNodes: [],
    edges: [],
    author: user,
    createdAt: now,
    updatedAt: now,
  };

  return parent;
};

export const EmptyGraph = () => <GraphWindow parentNode={createEmptyGraph()} />;

// Single node
const createSingleNodeGraph = () => {
  const user = { id: "u1", name: "Alice" };
  const now = new Date();

  const singleNode: IdeaNode = {
    id: "single",
    content: "Single Node",
    parentNodes: [],
    childNodes: [],
    subNodes: [],
    edges: [],
    author: user,
    createdAt: now,
    updatedAt: now,
  };

  const parent: IdeaNode = {
    id: "0",
    content: "Single Node Parent",
    parentNodes: [],
    childNodes: [singleNode],
    subNodes: [],
    edges: [],
    author: user,
    createdAt: now,
    updatedAt: now,
  };

  return parent;
};

export const SingleNode = () => (
  <GraphWindow parentNode={createSingleNodeGraph()} />
);
