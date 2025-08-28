const topKElementsLineMaps = {
  python: {
    1: { lines: [2, 3, 4], operation: "initialize" },
    2: { lines: [4], operation: "building" },
    3: { lines: [4], operation: "building" },
    4: { lines: [4], operation: "building" },
    5: { lines: [4], operation: "building" },
    6: { lines: [7], operation: "comparing" },
    7: { lines: [8], operation: "replacing" },
    8: { lines: [7], operation: "comparing" },
    9: { lines: [8], operation: "replacing" },
    10: { lines: [7], operation: "comparing" },
    11: { lines: [8], operation: "replacing" },
    12: { lines: [7], operation: "comparing" },
    13: { lines: [7], operation: "comparing" },
    14: { lines: [7], operation: "comparing" },
    15: { lines: [8], operation: "replacing" },
    16: { lines: [9], operation: "return_result" }
  },
  cpp: {
    1: { lines: [2], operation: "initialize" },
    2: { lines: [4, 5, 6], operation: "building" },
    3: { lines: [4, 5, 6], operation: "building" },
    4: { lines: [4, 5, 6], operation: "building" },
    5: { lines: [4, 5, 6], operation: "building" },
    6: { lines: [9], operation: "comparing" },
    7: { lines: [10, 11], operation: "replacing" },
    8: { lines: [9], operation: "comparing" },
    9: { lines: [10, 11], operation: "replacing" },
    10: { lines: [9], operation: "comparing" },
    11: { lines: [10, 11], operation: "replacing" },
    12: { lines: [9], operation: "comparing" },
    13: { lines: [9], operation: "comparing" },
    14: { lines: [9], operation: "comparing" },
    15: { lines: [10, 11], operation: "replacing" },
    16: { lines: [15], operation: "return_result" }
  },
  java: {
    1: { lines: [2], operation: "initialize" },
    2: { lines: [4, 5, 6], operation: "building" },
    3: { lines: [4, 5, 6], operation: "building" },
    4: { lines: [4, 5, 6], operation: "building" },
    5: { lines: [4, 5, 6], operation: "building" },
    6: { lines: [9], operation: "comparing" },
    7: { lines: [10, 11], operation: "replacing" },
    8: { lines: [9], operation: "comparing" },
    9: { lines: [10, 11], operation: "replacing" },
    10: { lines: [9], operation: "comparing" },
    11: { lines: [10, 11], operation: "replacing" },
    12: { lines: [9], operation: "comparing" },
    13: { lines: [9], operation: "comparing" },
    14: { lines: [9], operation: "comparing" },
    15: { lines: [10, 11], operation: "replacing" },
    16: { lines: [15], operation: "return_result" }
  }
};

export default topKElementsLineMaps;