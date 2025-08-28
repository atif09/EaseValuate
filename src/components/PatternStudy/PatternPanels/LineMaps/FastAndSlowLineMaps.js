const fastAndSlowLineMaps = {
  python: {
    1: { lines: [2, 3], operation: "initialize" },
    2: { lines: [5, 6], operation: "move" },
    3: { lines: [7, 8], operation: "check" },
    4: { lines: [5, 6], operation: "move" },
    5: { lines: [7, 8], operation: "check" },
    6: { lines: [5, 6], operation: "move" },
    7: { lines: [7, 8], operation: "check" },
    8: { lines: [8], operation: "complete" }
  },
  cpp: {
    1: { lines: [2, 3], operation: "initialize" },
    2: { lines: [5, 6], operation: "move" },
    3: { lines: [7, 8], operation: "check" },
    4: { lines: [5, 6], operation: "move" },
    5: { lines: [7, 8], operation: "check" },
    6: { lines: [5, 6], operation: "move" },
    7: { lines: [7, 8], operation: "check" },
    8: { lines: [8], operation: "complete" }
  },
  java: {
    1: { lines: [3, 4], operation: "initialize" },
    2: { lines: [6, 7], operation: "move" },
    3: { lines: [8, 9], operation: "check" },
    4: { lines: [6, 7], operation: "move" },
    5: { lines: [8, 9], operation: "check" },
    6: { lines: [6, 7], operation: "move" },
    7: { lines: [8, 9], operation: "check" },
    8: { lines: [9], operation: "complete" }
  }
};
export default fastAndSlowLineMaps;