const cyclicSortLineMaps = {
  python: {
    1: { lines: [2, 3], operation: "initialize" },
    2: { lines: [3, 4, 5, 6], operation: "check_and_swap" },
    3: { lines: [3, 4, 5, 6], operation: "check_and_swap" },
    4: { lines: [3, 4, 5, 6], operation: "check_and_swap" },
    5: { lines: [7, 8], operation: "increment" },
    6: { lines: [7, 8], operation: "increment" },
    7: { lines: [7, 8], operation: "increment" },
    8: { lines: [7, 8], operation: "increment" },
    9: { lines: [9], operation: "complete" }
  },
  cpp: {
    1: { lines: [2, 3], operation: "initialize" },
    2: { lines: [3, 4, 5, 6], operation: "check_and_swap" },
    3: { lines: [3, 4, 5, 6], operation: "check_and_swap" },
    4: { lines: [3, 4, 5, 6], operation: "check_and_swap" },
    5: { lines: [7, 8], operation: "increment" },
    6: { lines: [7, 8], operation: "increment" },
    7: { lines: [7, 8], operation: "increment" },
    8: { lines: [7, 8], operation: "increment" },
    9: { lines: [11], operation: "complete" }
  },
  java: {
    1: { lines: [3, 4], operation: "initialize" },
    2: { lines: [4, 5, 6, 7, 8, 9], operation: "check_and_swap" },
    3: { lines: [4, 5, 6, 7, 8, 9], operation: "check_and_swap" },
    4: { lines: [4, 5, 6, 7, 8, 9], operation: "check_and_swap" },
    5: { lines: [10, 11], operation: "increment" },
    6: { lines: [10, 11], operation: "increment" },
    7: { lines: [10, 11], operation: "increment" },
    8: { lines: [10, 11], operation: "increment" },
    9: { lines: [14], operation: "complete" }
  }
};
export default cyclicSortLineMaps;