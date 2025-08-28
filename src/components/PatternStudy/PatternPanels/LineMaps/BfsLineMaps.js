const bfsLineMaps = {
  python: {
    1: { lines: [2, 3, 4], operation: "initialize_queue" },
    2: { lines: [8, 9, 10], operation: "process_node" },
    3: { lines: [5, 6, 7], operation: "level_processing" },
    4: { lines: [8, 9, 10, 11, 12], operation: "process_node" },
    5: { lines: [8, 9, 10, 11, 12, 13, 14], operation: "process_node" },
    6: { lines: [5, 6, 7, 15], operation: "level_processing" },
    7: { lines: [8, 9, 10], operation: "process_node" },
    8: { lines: [8, 9, 10], operation: "process_node" },
    9: { lines: [8, 9, 10], operation: "process_node" },
    10: { lines: [6], operation: "complete" }
  },
  cpp: {
    1: { lines: [2, 3, 4], operation: "initialize_queue" },
    2: { lines: [10, 11, 12], operation: "process_node" },
    3: { lines: [6, 7, 8, 9], operation: "level_processing" },
    4: { lines: [10, 11, 12, 13, 14], operation: "process_node" },
    5: { lines: [10, 11, 12, 13, 14, 15, 16], operation: "process_node" },
    6: { lines: [6, 7, 8, 9, 19, 20], operation: "level_processing" },
    7: { lines: [10, 11, 12], operation: "process_node" },
    8: { lines: [10, 11, 12], operation: "process_node" },
    9: { lines: [10, 11, 12], operation: "process_node" },
    10: { lines: [7], operation: "complete" }
  },
  java: {
    1: { lines: [2, 3, 4], operation: "initialize_queue" },
    2: { lines: [10, 11, 12], operation: "process_node" },
    3: { lines: [6, 7, 8, 9], operation: "level_processing" },
    4: { lines: [10, 11, 12, 13, 14], operation: "process_node" },
    5: { lines: [10, 11, 12, 13, 14, 15, 16], operation: "process_node" },
    6: { lines: [6, 7, 8, 9, 18, 19], operation: "level_processing" },
    7: { lines: [10, 11, 12], operation: "process_node" },
    8: { lines: [10, 11, 12], operation: "process_node" },
    9: { lines: [10, 11, 12], operation: "process_node" },
    10: { lines: [7], operation: "complete" }
  }
};
export default bfsLineMaps;