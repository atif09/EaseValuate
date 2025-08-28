const postorderTravStepDescriptions = {
  1: {
    title: "Start at Root",
    description: "Begin at root, but DON'T visit it yet! We need to explore children first.",
    operation: "start"
  },
  2: {
    title: "Go to Left Child",
    description: "Move to left child without visiting the root yet.",
    operation: "traverse_left"
  },
  3: {
    title: "Keep Going Left",
    description: "Continue to leftmost node without visiting any nodes yet.",
    operation: "traverse_left"
  },
  4: {
    title: "Reach Leftmost Leaf",
    description: "Found a leaf node with no children. Check if it has right child first.",
    operation: "found_leaf"
  },
  5: {
    title: "Visit First Node",
    description: "Process the leftmost leaf node (our first visit!).",
    operation: "visit"
  },
  6: {
    title: "Backtrack to Parent",
    description: "Return to parent node, but don't visit it yet! Check its right child.",
    operation: "backtrack"
  },
  7: {
    title: "Explore Right Child",
    description: "Move to right child of current node (if exists).",
    operation: "traverse_right"
  },
  8: {
    title: "Process Right Subtree",
    description: "Apply same pattern to right subtree: Left → Right → Root.",
    operation: "process_subtree"
  },
  9: {
    title: "Visit Right Subtree Nodes",
    description: "After processing all descendants, finally visit the right subtree nodes.",
    operation: "visit"
  },
  10: {
    title: "Visit Parent Node",
    description: "Both left and right subtrees complete! Now we can visit the parent.",
    operation: "visit"
  },
  11: {
    title: "Continue Up the Tree",
    description: "Repeat pattern: visit nodes only after ALL their descendants are processed.",
    operation: "continue"
  },
  12: {
    title: "Visit Root Last",
    description: "The original root is visited LAST, after all other nodes!",
    operation: "visit"
  },
  13: {
    title: "Traversal Complete",
    description: "All nodes visited in postorder sequence!",
    operation: "complete"
  }
};

export default postorderTravStepDescriptions;