const inorderTraversalStepDescriptions = {
  1: {
    title: "Start at Root",
    description: "Begin traversal at the root node. We need to visit left subtree first.",
    operation: "initialize"
  },
  2: {
    title: "Go to Left Child",
    description: "Move to the left child. Continue going left until we reach a leaf.",
    operation: "traverse_left"
  },
  3: {
    title: "Reach Leftmost Node",
    description: "Found the leftmost node! This has no left child, so we process it.",
    operation: "traverse_left"
  },
  4: {
    title: "Visit Leftmost Node",
    description: "Process the current node (print/add to result).",
    operation: "visit"
  },
  5: {
    title: "Check Right Subtree",
    description: "After visiting current node, check if it has a right child.",
    operation: "traverse_right"
  },
  6: {
    title: "Backtrack to Parent",
    description: "No right child, so backtrack to parent node.",
    operation: "backtrack"
  },
  7: {
    title: "Visit Parent Node",
    description: "Process the parent node (left subtree already visited).",
    operation: "visit"
  },
  8: {
    title: "Process Right Subtree",
    description: "Now traverse the right subtree of the parent.",
    operation: "traverse_right"
  },
  9: {
    title: "Continue Pattern",
    description: "Repeat the same pattern for each subtree: go left first, visit node, then go right.",
    operation: "continue"
  },
  10: {
    title: "Traversal Complete",
    description: "All nodes visited in inorder sequence!",
    operation: "complete"
  }
};
export default inorderTraversalStepDescriptions;