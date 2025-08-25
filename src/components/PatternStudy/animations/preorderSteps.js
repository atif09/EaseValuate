const preorderSteps = [
  {
    step: 1,
    title: "Start at Root",
    description: "Begin traversal at the root node. In preorder, we visit the root FIRST!",
    highlightNodes: ["root"],
    visitedNodes: [],
    currentNode: "root",
    action: "start",
    explanation: "Preorder follows Root → Left → Right pattern. We process the current node immediately."
  },
  {
    step: 2,
    title: "Visit Root Node",
    description: "Process the root node first (print/add to result).",
    highlightNodes: [],
    visitedNodes: ["root"],
    currentNode: "root",
    action: "visit",
    explanation: "Root ✓ → Left → Right. Add root's value to result before exploring children."
  },
  {
    step: 3,
    title: "Move to Left Child",
    description: "After visiting root, move to its left child.",
    highlightNodes: ["left_child"],
    visitedNodes: ["root"],
    currentNode: "left_child",
    action: "traverse_left",
    explanation: "Now we explore the left subtree. Apply same pattern: Root → Left → Right"
  },
  {
    step: 4,
    title: "Visit Left Child",
    description: "Process the left child node immediately upon arrival.",
    highlightNodes: [],
    visitedNodes: ["root", "left_child"],
    currentNode: "left_child",
    action: "visit",
    explanation: "Root ✓ → Left → Right. Visit this node before exploring its children."
  },
  {
    step: 5,
    title: "Go to Left Grandchild",
    description: "Continue to the left child's left child (if exists).",
    highlightNodes: ["left_grandchild"],
    visitedNodes: ["root", "left_child"],
    currentNode: "left_grandchild",
    action: "traverse_left",
    explanation: "Keep going left in the subtree, visiting each node as we encounter it."
  },
  {
    step: 6,
    title: "Visit Left Grandchild",
    description: "Process this node immediately (no left child, so visit now).",
    highlightNodes: [],
    visitedNodes: ["root", "left_child", "left_grandchild"],
    currentNode: "left_grandchild",
    action: "visit",
    explanation: "This node has no left child, so we visit it right away."
  },
  {
    step: 7,
    title: "Check Right Child",
    description: "After visiting current node, check its right child.",
    highlightNodes: ["right_of_grandchild"],
    visitedNodes: ["root", "left_child", "left_grandchild"],
    currentNode: "right_of_grandchild",
    action: "traverse_right",
    explanation: "Root ✓ → Left ✓ → Right. Now explore right subtree of current node."
  },
  {
    step: 8,
    title: "Backtrack and Explore",
    description: "If no right child, backtrack to parent and explore its right subtree.",
    highlightNodes: ["parent_right"],
    visitedNodes: ["root", "left_child", "left_grandchild"],
    currentNode: "parent_right",
    action: "backtrack",
    explanation: "Return to parent level and explore remaining right subtrees."
  },
  {
    step: 9,
    title: "Visit Right Subtree Nodes",
    description: "Apply same pattern to right subtree: visit root of subtree first.",
    highlightNodes: [],
    visitedNodes: ["root", "left_child", "left_grandchild", "right_nodes"],
    currentNode: "right_subtree_root",
    action: "visit",
    explanation: "Each subtree follows the same Root → Left → Right pattern."
  },
  {
    step: 10,
    title: "Traversal Complete",
    description: "All nodes visited in preorder sequence!",
    highlightNodes: [],
    visitedNodes: ["all_nodes"],
    currentNode: null,
    action: "complete",
    explanation: "Final result shows nodes in the order they were first encountered: Root → Left → Right"
  }
];

export default preorderSteps;