const inorderTraversalLineMaps = {
  python: {
    1: { lines: [1, 2], operation: "initialize" },
    2: { lines: [3], operation: "traverse_left" },
    3: { lines: [3], operation: "traverse_left" },
    4: { lines: [4], operation: "visit" },
    5: { lines: [5], operation: "traverse_right" },
    6: { lines: [2], operation: "backtrack" },
    7: { lines: [4], operation: "visit" },
    8: { lines: [5], operation: "traverse_right" },
    9: { lines: [3, 4, 5], operation: "continue" },
    10: { lines: [], operation: "complete" }
  },
  cpp: {
    1: { lines: [1, 2], operation: "initialize" },
    2: { lines: [4], operation: "traverse_left" },
    3: { lines: [4], operation: "traverse_left" },
    4: { lines: [5], operation: "visit" },
    5: { lines: [6], operation: "traverse_right" },
    6: { lines: [2], operation: "backtrack" },
    7: { lines: [5], operation: "visit" },
    8: { lines: [6], operation: "traverse_right" },
    9: { lines: [4, 5, 6], operation: "continue" },
    10: { lines: [], operation: "complete" }
  },
  java: {
    1: { lines: [1, 2], operation: "initialize" },
    2: { lines: [4], operation: "traverse_left" },
    3: { lines: [4], operation: "traverse_left" },
    4: { lines: [5], operation: "visit" },
    5: { lines: [6], operation: "traverse_right" },
    6: { lines: [2], operation: "backtrack" },
    7: { lines: [5], operation: "visit" },
    8: { lines: [6], operation: "traverse_right" },
    9: { lines: [4, 5, 6], operation: "continue" },
    10: { lines: [], operation: "complete" }
  }
};
export default inorderTraversalLineMaps;