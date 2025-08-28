const postorderTravLineMaps = {
  python: {
    1: { lines: [1, 2, 3], operation: "start" },
    2: { lines: [4], operation: "traverse_left" },
    3: { lines: [4], operation: "traverse_left" },
    4: { lines: [1, 2, 3], operation: "found_leaf" },
    5: { lines: [6], operation: "visit" },
    6: { lines: [4], operation: "backtrack" },
    7: { lines: [5], operation: "traverse_right" },
    8: { lines: [4, 5], operation: "process_subtree" },
    9: { lines: [6], operation: "visit" },
    10: { lines: [6], operation: "visit" },
    11: { lines: [4, 5, 6], operation: "continue" },
    12: { lines: [6], operation: "visit" },
    13: { lines: [1, 2, 3], operation: "complete" }
  },
  cpp: {
    1: { lines: [1, 2, 3], operation: "start" },
    2: { lines: [4], operation: "traverse_left" },
    3: { lines: [4], operation: "traverse_left" },
    4: { lines: [1, 2, 3], operation: "found_leaf" },
    5: { lines: [6], operation: "visit" },
    6: { lines: [4], operation: "backtrack" },
    7: { lines: [5], operation: "traverse_right" },
    8: { lines: [4, 5], operation: "process_subtree" },
    9: { lines: [6], operation: "visit" },
    10: { lines: [6], operation: "visit" },
    11: { lines: [4, 5, 6], operation: "continue" },
    12: { lines: [6], operation: "visit" },
    13: { lines: [1, 2, 3], operation: "complete" }
  },
  java: {
    1: { lines: [1, 2, 3], operation: "start" },
    2: { lines: [4], operation: "traverse_left" },
    3: { lines: [4], operation: "traverse_left" },
    4: { lines: [1, 2, 3], operation: "found_leaf" },
    5: { lines: [6], operation: "visit" },
    6: { lines: [4], operation: "backtrack" },
    7: { lines: [5], operation: "traverse_right" },
    8: { lines: [4, 5], operation: "process_subtree" },
    9: { lines: [6], operation: "visit" },
    10: { lines: [6], operation: "visit" },
    11: { lines: [4, 5, 6], operation: "continue" },
    12: { lines: [6], operation: "visit" },
    13: { lines: [1, 2, 3], operation: "complete" }
  }
};

export default postorderTravLineMaps;