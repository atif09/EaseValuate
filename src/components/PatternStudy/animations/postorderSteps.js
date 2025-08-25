const postorderSteps = [
  {
    step: 1,
    title: "Start at Root",
    description: "Begin at root, but DON'T visit it yet! We need to explore children first.",
    highlightNodes: ["root"],
    visitedNodes: [],
    currentNode: "root",
    action: "start",
    explanation: "Postorder follows Left → Right → Root. We visit the root LAST, after all children."
  },
  {
    step: 2,
    title: "Go to Left Child",
    description: "Move to left child without visiting the root yet.",
    highlightNodes: ["root", "left_child"],
    visitedNodes: [],
    currentNode: "left_child",
    action: "traverse_left",
    explanation: "Explore left subtree first. We'll come back to root later."
  },
  {
    step: 3,
    title: "Keep Going Left",
    description: "Continue to leftmost node without visiting any nodes yet.",
    highlightNodes: ["left_child", "leftmost"],
    visitedNodes: [],
    currentNode: "leftmost",
    action: "traverse_left",
    explanation: "Go as far left as possible. Still haven't visited any nodes!"
  },
  {
    step: 4,
    title: "Reach Leftmost Leaf",
    description: "Found a leaf node with no children. Check if it has right child first.",
    highlightNodes: ["leftmost"],
    visitedNodes: [],
    currentNode: "leftmost",
    action: "found_leaf",
    explanation: "This node has no left OR right children, so we can finally visit it."
  },
  {
    step: 5,
    title: "Visit First Node",
    description: "Process the leftmost leaf node (our first visit!).",
    highlightNodes: [],
    visitedNodes: ["leftmost"],
    currentNode: "leftmost",
    action: "visit",
    explanation: "Left ✓ → Right ✓ → Root. Both children processed (none exist), so visit this node."
  },
  {
    step: 6,
    title: "Backtrack to Parent",
    description: "Return to parent node, but don't visit it yet! Check its right child.",
    highlightNodes: ["parent"],
    visitedNodes: ["leftmost"],
    currentNode: "parent",
    action: "backtrack",
    explanation: "Left subtree ✓ → Right → Root. Now we need to process right subtree."
  },
  {
    step: 7,
    title: "Explore Right Child",
    description: "Move to right child of current node (if exists).",
    highlightNodes: ["parent", "right_child"],
    visitedNodes: ["leftmost"],
    currentNode: "right_child",
    action: "traverse_right",
    explanation: "Before visiting parent, we must process its right subtree completely."
  },
  {
    step: 8,
    title: "Process Right Subtree",
    description: "Apply same pattern to right subtree: Left → Right → Root.",
    highlightNodes: ["right_child"],
    visitedNodes: ["leftmost"],
    currentNode: "right_child",
    action: "process_subtree",
    explanation: "Treat this right subtree the same way: explore its children before visiting it."
  },
  {
    step: 9,
    title: "Visit Right Subtree Nodes",
    description: "After processing all descendants, finally visit the right subtree nodes.",
    highlightNodes: [],
    visitedNodes: ["leftmost", "right_subtree_nodes"],
    currentNode: "right_child",
    action: "visit",
    explanation: "Right subtree completely processed, now we can visit these nodes."
  },
  {
    step: 10,
    title: "Visit Parent Node",
    description: "Both left and right subtrees complete! Now we can visit the parent.",
    highlightNodes: [],
    visitedNodes: ["leftmost", "right_subtree_nodes", "parent"],
    currentNode: "parent",
    action: "visit",
    explanation: "Left ✓ → Right ✓ → Root. Finally visit this node after all its descendants."
  },
  {
    step: 11,
    title: "Continue Up the Tree",
    description: "Repeat pattern: visit nodes only after ALL their descendants are processed.",
    highlightNodes: [],
    visitedNodes: ["previous_nodes", "current_level"],
    currentNode: "next_node",
    action: "continue",
    explanation: "Keep following Left → Right → Root pattern up the tree."
  },
  {
    step: 12,
    title: "Visit Root Last",
    description: "The original root is visited LAST, after all other nodes!",
    highlightNodes: [],
    visitedNodes: ["all_nodes_except_root", "root"],
    currentNode: "root",
    action: "visit",
    explanation: "Root is always the final node visited in postorder traversal."
  },
  {
    step: 13,
    title: "Traversal Complete",
    description: "All nodes visited in postorder sequence!",
    highlightNodes: [],
    visitedNodes: ["all_nodes"],
    currentNode: null,
    action: "complete",
    explanation: "Final result: children are always visited before their parents. Perfect for tree deletion!"
  }
];

export default postorderSteps;