const LLReversalLineMaps = {
  python: {
    1: { lines: [3], operation: "initialize" },
    2: { lines: [5, 6, 7, 8, 9], operation: "reverse" },
    3: { lines: [5, 6, 7, 8, 9], operation: "reverse" },
    4: { lines: [5, 6, 7, 8, 9], operation: "reverse" },
    5: { lines: [5, 6, 7, 8, 9], operation: "reverse" },
    6: { lines: [10], operation: "complete" }
  },
  cpp: {
    1: { lines: [4, 5], operation: "initialize" },
    2: { lines: [6, 7, 8, 9, 10, 11], operation: "reverse" },
    3: { lines: [6, 7, 8, 9, 10, 11], operation: "reverse" },
    4: { lines: [6, 7, 8, 9, 10, 11], operation: "reverse" },
    5: { lines: [6, 7, 8, 9, 10, 11], operation: "reverse" },
    6: { lines: [12], operation: "complete" }
  },
  java: {
    1: { lines: [3, 4], operation: "initialize" },
    2: { lines: [5, 6, 7, 8, 9, 10], operation: "reverse" },
    3: { lines: [5, 6, 7, 8, 9, 10], operation: "reverse" },
    4: { lines: [5, 6, 7, 8, 9, 10], operation: "reverse" },
    5: { lines: [5, 6, 7, 8, 9, 10], operation: "reverse" },
    6: { lines: [11], operation: "complete" }
  }
};

export default LLReversalLineMaps;