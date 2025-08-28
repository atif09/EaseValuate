const preorderTravStepDescriptions = {
  1: {
    title: "Start at Root",
    description: "Begin traversal at the root node. In preorder, we visit the root FIRST!",
    operation: "start"
  },
  2: {
    title: "Visit Root Node",
    description: "Process the root node first (print/add to result).",
    operation: "visit"
  },
  3: {
    title: "Move to Left Child",
    description: "After visiting root, move to its left child.",
    operation: "traverse_left"
  },
  4: {
    title: "Visit Left Child",
    description: "Process the left child node immediately upon arrival.",
    operation: "visit"
  },
  5: {
    title: "Go to Left Grandchild",
    description: "Continue to the left child's left child (if exists).",
    operation: "traverse_left"
  },
  6: {
    title: "Visit Left Grandchild",
    description: "Process this node immediately (no left child, so visit now).",
    operation: "visit"
  },
  7: {
    title: "Check Right Child",
    description: "After visiting current node, check its right child.",
    operation: "traverse_right"
  },
  8: {
    title: "Backtrack and Explore",
    description: "If no right child, backtrack to parent and explore its right subtree.",
    operation: "backtrack"
  },
  9: {
    title: "Visit Right Subtree Nodes",
    description: "Apply same pattern to right subtree: visit root of subtree first.",
    operation: "visit"
  },
  10: {
    title: "Traversal Complete",
    description: "All nodes visited in preorder sequence!",
    operation: "complete"
  }
};

export default preorderTravStepDescriptions;