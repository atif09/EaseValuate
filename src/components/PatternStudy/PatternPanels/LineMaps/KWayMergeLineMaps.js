const kWayMergeLineMaps = {
  python: {
    1: { lines: [2, 3, 4], operation: "initialize" },
    2: { lines: [6, 7, 8], operation: "building" },
    3: { lines: [6, 7, 8], operation: "building" },
    4: { lines: [6, 7, 8], operation: "building" },
    5: { lines: [10, 11, 12], operation: "merging" },
    6: { lines: [10, 11, 12, 14, 15, 16], operation: "merging" },
    7: { lines: [10, 11, 12, 14, 15, 16], operation: "merging" },
    8: { lines: [10, 11, 12, 14, 15, 16], operation: "merging" },
    9: { lines: [10, 11, 12, 14, 15, 16], operation: "merging" },
    10: { lines: [10, 11, 12], operation: "merging" },
    11: { lines: [10, 11, 12], operation: "merging" },
    12: { lines: [18], operation: "complete" }
  },
  cpp: {
    1: { lines: [2, 3], operation: "initialize" },
    2: { lines: [5, 6, 7, 8, 9], operation: "building" },
    3: { lines: [5, 6, 7, 8, 9], operation: "building" },
    4: { lines: [5, 6, 7, 8, 9], operation: "building" },
    5: { lines: [11, 12, 13, 14], operation: "merging" },
    6: { lines: [11, 12, 13, 14, 16, 17, 18, 19], operation: "merging" },
    7: { lines: [11, 12, 13, 14, 16, 17, 18, 19], operation: "merging" },
    8: { lines: [11, 12, 13, 14, 16, 17, 18, 19], operation: "merging" },
    9: { lines: [11, 12, 13, 14, 16, 17, 18, 19], operation: "merging" },
    10: { lines: [11, 12, 13, 14], operation: "merging" },
    11: { lines: [11, 12, 13, 14], operation: "merging" },
    12: { lines: [22], operation: "complete" }
  },
  java: {
    1: { lines: [2, 3], operation: "initialize" },
    2: { lines: [5, 6, 7, 8, 9], operation: "building" },
    3: { lines: [5, 6, 7, 8, 9], operation: "building" },
    4: { lines: [5, 6, 7, 8, 9], operation: "building" },
    5: { lines: [11, 12, 13, 14, 15, 17], operation: "merging" },
    6: { lines: [11, 12, 13, 14, 15, 17, 19, 20, 21, 22], operation: "merging" },
    7: { lines: [11, 12, 13, 14, 15, 17, 19, 20, 21, 22], operation: "merging" },
    8: { lines: [11, 12, 13, 14, 15, 17, 19, 20, 21, 22], operation: "merging" },
    9: { lines: [11, 12, 13, 14, 15, 17, 19, 20, 21, 22], operation: "merging" },
    10: { lines: [11, 12, 13, 14, 15, 17], operation: "merging" },
    11: { lines: [11, 12, 13, 14, 15, 17], operation: "merging" },
    12: { lines: [25], operation: "complete" }
  }
};

export default kWayMergeLineMaps;