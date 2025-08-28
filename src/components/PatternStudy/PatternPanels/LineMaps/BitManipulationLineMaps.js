const bitManipulationLineMaps = {
  python: {
    1: { lines: [2], operation: "initialize" },
    2: { lines: [3, 4], operation: "xor_processing" },
    3: { lines: [3, 4], operation: "xor_processing" },
    4: { lines: [3, 4], operation: "xor_processing" },
    5: { lines: [3, 4], operation: "xor_processing" },
    6: { lines: [3, 4], operation: "xor_processing" },
    7: { lines: [5], operation: "complete" }
  },
  cpp: {
    1: { lines: [2], operation: "initialize" },
    2: { lines: [3, 4], operation: "xor_processing" },
    3: { lines: [3, 4], operation: "xor_processing" },
    4: { lines: [3, 4], operation: "xor_processing" },
    5: { lines: [3, 4], operation: "xor_processing" },
    6: { lines: [3, 4], operation: "xor_processing" },
    7: { lines: [6], operation: "complete" }
  },
  java: {
    1: { lines: [2], operation: "initialize" },
    2: { lines: [3, 4], operation: "xor_processing" },
    3: { lines: [3, 4], operation: "xor_processing" },
    4: { lines: [3, 4], operation: "xor_processing" },
    5: { lines: [3, 4], operation: "xor_processing" },
    6: { lines: [3, 4], operation: "xor_processing" },
    7: { lines: [6], operation: "complete" }
  }
};
export default bitManipulationLineMaps;