const preorderTravLineMaps = {
  python: {
    1: { lines: [1, 2, 3], operation: "start" },
    2: { lines: [4], operation: "visit" },
    3: { lines: [5], operation: "traverse_left" },
    4: { lines: [4], operation: "visit" },
    5: { lines: [5], operation: "traverse_left" },
    6: { lines: [4], operation: "visit" },
    7: { lines: [6], operation: "traverse_right" },
    8: { lines: [6], operation: "backtrack" },
    9: { lines: [4], operation: "visit" },
    10: { lines: [1, 2, 3], operation: "complete" }
  },
  cpp: {
    1: { lines: [1, 2, 3], operation: "start" },
    2: { lines: [4], operation: "visit" },
    3: { lines: [5], operation: "traverse_left" },
    4: { lines: [4], operation: "visit" },
    5: { lines: [5], operation: "traverse_left" },
    6: { lines: [4], operation: "visit" },
    7: { lines: [6], operation: "traverse_right" },
    8: { lines: [6], operation: "backtrack" },
    9: { lines: [4], operation: "visit" },
    10: { lines: [1, 2, 3], operation: "complete" }
  },
  java: {
    1: { lines: [1, 2, 3], operation: "start" },
    2: { lines: [4], operation: "visit" },
    3: { lines: [5], operation: "traverse_left" },
    4: { lines: [4], operation: "visit" },
    5: { lines: [5], operation: "traverse_left" },
    6: { lines: [4], operation: "visit" },
    7: { lines: [6], operation: "traverse_right" },
    8: { lines: [6], operation: "backtrack" },
    9: { lines: [4], operation: "visit" },
    10: { lines: [1, 2, 3], operation: "complete" }
  }
};

export default preorderTravLineMaps;