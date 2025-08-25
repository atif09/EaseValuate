const inorderSteps = [
  {
    step: 1,
    title: "Start at Root",
    description: "Begin traversal at the root node. We need to visit left subtree first.",
    highlightNodes: ["root"],
    visitedNodes: [],
    currentNode: "root",
    action: "start",
    explanation: "In inorder traversal, we follow Left → Root → Right pattern. Start by going to the leftmost node first."
  },
  {
    step: 2,
    title: "Go to Left Child",
    description: "Move to the left child. Continue going left until we reach a leaf.",
    highlightNodes: ["root", "left"],
    visitedNodes: [],
    currentNode: "left",
    action: "traverse_left",
    explanation: "Keep moving left until we find a node with no left child."
  },
  {
    step: 3,
    title: "Reach Leftmost Node",
    description: "Found the leftmost node! This has no left child, so we process it.",
    highlightNodes: ["leftmost"],
    visitedNodes: [],
    currentNode: "leftmost",
    action: "found_leftmost",
    explanation: "This is our first node to visit since it has no left subtree."
  },
  {
    step: 4,
    title: "Visit Leftmost Node",
    description: "Process the current node (print/add to result).",
    highlightNodes: [],
    visitedNodes: ["leftmost"],
    currentNode: "leftmost",
    action: "visit",
    explanation: "Add this node's value to our result. In inorder: Left ✓ → Root (current) → Right"
  },
  {
    step: 5,
    title: "Check Right Subtree",
    description: "After visiting current node, check if it has a right child.",
    highlightNodes: ["leftmost_right"],
    visitedNodes: ["leftmost"],
    currentNode: "leftmost_right",
    action: "check_right",
    explanation: "Now we check the right subtree of the current node."
  },
  {
    step: 6,
    title: "Backtrack to Parent",
    description: "No right child, so backtrack to parent node.",
    highlightNodes: ["parent"],
    visitedNodes: ["leftmost"],
    currentNode: "parent",
    action: "backtrack",
    explanation: "Return to parent node. Now we can visit the parent since its left subtree is complete."
  },
  {
    step: 7,
    title: "Visit Parent Node",
    description: "Process the parent node (left subtree already visited).",
    highlightNodes: [],
    visitedNodes: ["leftmost", "parent"],
    currentNode: "parent",
    action: "visit",
    explanation: "Left subtree ✓ → Root (current) → Right. Add parent to result."
  },
  {
    step: 8,
    title: "Process Right Subtree",
    description: "Now traverse the right subtree of the parent.",
    highlightNodes: ["parent_right"],
    visitedNodes: ["leftmost", "parent"],
    currentNode: "parent_right",
    action: "traverse_right",
    explanation: "Move to right subtree and repeat the same process: Left → Root → Right"
  },
  {
    step: 9,
    title: "Continue Pattern",
    description: "Repeat the same pattern for each subtree: go left first, visit node, then go right.",
    highlightNodes: ["next_node"],
    visitedNodes: ["leftmost", "parent", "previous_nodes"],
    currentNode: "next_node",
    action: "continue",
    explanation: "Keep following Left → Root → Right pattern for remaining nodes."
  },
  {
    step: 10,
    title: "Traversal Complete",
    description: "All nodes visited in inorder sequence!",
    highlightNodes: [],
    visitedNodes: ["all_nodes"],
    currentNode: null,
    action: "complete",
    explanation: "Final result shows all nodes in sorted order (for BST) following Left → Root → Right pattern."
  }
];

export default inorderSteps;