const bfsStepDescriptions = {
  1: {
    title: "Initialize Queue",
    description: "Start BFS by adding root node 1 to queue",
    operation: "initialize_queue"
  },
  2: {
    title: "Process Root Node",
    description: "Pop node 1 from queue, print it, and enqueue its children (2, 3)",
    operation: "process_node"
  },
  3: {
    title: "Begin Level 1",
    description: "Start processing level 1 nodes - queue contains nodes 2 and 3",
    operation: "level_processing"
  },
  4: {
    title: "Process Node 2",
    description: "Pop node 2 from queue, print it, and enqueue its children (4, 5)",
    operation: "process_node"
  },
  5: {
    title: "Process Node 3",
    description: "Pop node 3 from queue, print it, and enqueue its child (6)",
    operation: "process_node"
  },
  6: {
    title: "Begin Level 2",
    description: "Start processing level 2 nodes - queue contains nodes 4, 5, 6",
    operation: "level_processing"
  },
  7: {
    title: "Process Node 4",
    description: "Pop node 4 from queue, print it (no children to add)",
    operation: "process_node"
  },
  8: {
    title: "Process Node 5",
    description: "Pop node 5 from queue, print it (no children to add)",
    operation: "process_node"
  },
  9: {
    title: "Process Node 6",
    description: "Pop node 6 from queue, print it (no children to add)",
    operation: "process_node"
  },
  10: {
    title: "BFS Complete",
    description: "Queue is empty, all nodes have been visited in level order",
    operation: "complete"
  }
};
export default bfsStepDescriptions;