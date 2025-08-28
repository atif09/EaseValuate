const mergeIntervalsLineMaps = {
  python: {
    1: { lines: [2, 3], operation: "start" },
    2: { lines: [5, 6], operation: "initialize" },
    3: { lines: [8, 10], operation: "check_overlap" },
    4: { lines: [11], operation: "merge" },
    5: { lines: [8, 10], operation: "check_overlap" },
    6: { lines: [13], operation: "add_new" },
    7: { lines: [8, 10], operation: "check_overlap" },
    8: { lines: [13], operation: "add_new" },
    9: { lines: [14], operation: "complete" }
  },
  cpp: {
    1: { lines: [2], operation: "start" },
    2: { lines: [4, 5], operation: "initialize" },
    3: { lines: [7, 10], operation: "check_overlap" },
    4: { lines: [11], operation: "merge" },
    5: { lines: [7, 10], operation: "check_overlap" },
    6: { lines: [13], operation: "add_new" },
    7: { lines: [7, 10], operation: "check_overlap" },
    8: { lines: [13], operation: "add_new" },
    9: { lines: [17], operation: "complete" }
  },
  java: {
    1: { lines: [2, 3, 4], operation: "start" },
    2: { lines: [6, 7, 8], operation: "initialize" },
    3: { lines: [10, 13], operation: "check_overlap" },
    4: { lines: [14], operation: "merge" },
    5: { lines: [10, 13], operation: "check_overlap" },
    6: { lines: [16], operation: "add_new" },
    7: { lines: [10, 13], operation: "check_overlap" },
    8: { lines: [16], operation: "add_new" },
    9: { lines: [20], operation: "complete" }
  }
};

export default mergeIntervalsLineMaps;