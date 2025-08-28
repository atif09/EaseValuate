const oneDimensionalDPLineMaps = {
  python: {
    1: { lines: [1, 2], operation: "initialize" },
    2: { lines: [5], operation: "setup" },
    3: { lines: [6], operation: "base_case" },
    4: { lines: [7], operation: "comparing" },
    5: { lines: [7], operation: "base_case" },
    6: { lines: [9], operation: "comparing" },
    7: { lines: [9], operation: "updating" },
    8: { lines: [9], operation: "comparing" },
    9: { lines: [9], operation: "updating" },
    10: { lines: [9], operation: "comparing" },
    11: { lines: [9], operation: "updating" },
    12: { lines: [10], operation: "complete" }
  },
  cpp: {
    1: { lines: [2, 3], operation: "initialize" },
    2: { lines: [4], operation: "setup" },
    3: { lines: [5], operation: "base_case" },
    4: { lines: [6], operation: "comparing" },
    5: { lines: [6], operation: "base_case" },
    6: { lines: [8], operation: "comparing" },
    7: { lines: [8], operation: "updating" },
    8: { lines: [8], operation: "comparing" },
    9: { lines: [8], operation: "updating" },
    10: { lines: [8], operation: "comparing" },
    11: { lines: [8], operation: "updating" },
    12: { lines: [10], operation: "complete" }
  },
  java: {
    1: { lines: [2, 3], operation: "initialize" },
    2: { lines: [4], operation: "setup" },
    3: { lines: [5], operation: "base_case" },
    4: { lines: [6], operation: "comparing" },
    5: { lines: [6], operation: "base_case" },
    6: { lines: [8], operation: "comparing" },
    7: { lines: [8], operation: "updating" },
    8: { lines: [8], operation: "comparing" },
    9: { lines: [8], operation: "updating" },
    10: { lines: [8], operation: "comparing" },
    11: { lines: [8], operation: "updating" },
    12: { lines: [10], operation: "complete" }
  }
};
export default oneDimensionalDPLineMaps;