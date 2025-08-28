const binarySearchLineMaps = {
  python: {
    1: { lines: [2, 4, 5], operation: "initialize_and_calculate_mid" },
    2: { lines: [6, 7], operation: "compare_and_move_left" },
    3: { lines: [10, 11], operation: "target_found" }
  },
  cpp: {
    1: { lines: [2, 3, 4], operation: "initialize_and_calculate_mid" },
    2: { lines: [5, 6], operation: "compare_and_move_left" },
    3: { lines: [9, 10], operation: "target_found" }
  },
  java: {
    1: { lines: [2, 5, 6], operation: "initialize_and_calculate_mid" },
    2: { lines: [7, 8], operation: "compare_and_move_left" },
    3: { lines: [11, 12], operation: "target_found" }
  }
};
export default binarySearchLineMaps;