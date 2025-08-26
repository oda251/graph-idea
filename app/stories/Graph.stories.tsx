import React from "react";
import { Graph } from "../src/widgets/graph";
import { IdeaNode } from "../src/entities/IdeaNode";

export default {
  title: "Widgets/Graph",
  component: Graph,
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
    { sourceNodeId: "1", targetNodeId: "2", belongingNodes: [] },
    { sourceNodeId: "2", targetNodeId: "3", belongingNodes: [] },
  ],
  author: user,
  createdAt: now,
  updatedAt: now,
};

export const Default = () => <Graph parentNode={parent} />;

// Large graph with many nodes
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
          sourceNodeId: i.toString(),
          targetNodeId: target.toString(),
          belongingNodes: []
        });
      }
    }
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Large Graph Parent",
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

export const LargeGraph = () => <Graph parentNode={createLargeGraph()} width={800} height={600} />;

// Star graph - one central node connected to all others
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
      sourceNodeId: "center",
      targetNodeId: `peripheral-${i}`,
      belongingNodes: []
    });
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Star Graph Parent",
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

export const StarGraph = () => <Graph parentNode={createStarGraph()} width={600} height={600} />;

// Tree graph - hierarchical structure
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
      sourceNodeId: "root",
      targetNodeId: `level2-${i}`,
      belongingNodes: []
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
        sourceNodeId: `level2-${i}`,
        targetNodeId: `level3-${i}-${j}`,
        belongingNodes: []
      });
    }
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Tree Graph Parent",
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

export const TreeGraph = () => <Graph parentNode={createTreeGraph()} width={700} height={500} />;

// Complete graph - all nodes connected to each other
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
        sourceNodeId: i.toString(),
        targetNodeId: j.toString(),
        belongingNodes: []
      });
    }
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Complete Graph Parent",
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

export const CompleteGraph = () => <Graph parentNode={createCompleteGraph()} width={600} height={600} />;

// Chain graph - linear structure
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
        sourceNodeId: (i - 1).toString(),
        targetNodeId: i.toString(),
        belongingNodes: []
      });
    }
  }

  const parent: IdeaNode = {
    id: "0",
    content: "Chain Graph Parent",
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

export const ChainGraph = () => <Graph parentNode={createChainGraph()} width={800} height={300} />;

// Empty graph - no nodes
const createEmptyGraph = () => {
  const user = { id: "u1", name: "Alice" };
  const now = new Date();

  const parent: IdeaNode = {
    id: "0",
    content: "Empty Graph Parent",
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

export const EmptyGraph = () => <Graph parentNode={createEmptyGraph()} width={400} height={300} />;

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

export const SingleNode = () => <Graph parentNode={createSingleNodeGraph()} width={400} height={300} />;
