const cyclicSortStepDescriptions = {
  1: {
    title: "Initialize Variables",
    description: "Start with i=0, begin scanning array from first position",
    operation: "initialize"
  },
  2: {
    title: "Check Position (i=0)",
    description: "Element 3 at index 0, correct position is index 2. Need to swap",
    operation: "check_and_swap"
  },
  3: {
    title: "Swap Elements (3↔5)",
    description: "Element 5 at index 0, correct position is index 4. Need to swap",
    operation: "check_and_swap"
  },
  4: {
    title: "Swap Elements (5↔2)",
    description: "Element 2 at index 0, correct position is index 1. Need to swap",
    operation: "check_and_swap"
  },
  5: {
    title: "Element in Place",
    description: "Element 1 is at correct position (index 0). Move to next position",
    operation: "increment"
  },
  6: {
    title: "Element in Place",
    description: "Element 2 is at correct position (index 1). Move to next position",
    operation: "increment"
  },
  7: {
    title: "Element in Place",
    description: "Element 3 is at correct position (index 2). Move to next position",
    operation: "increment"
  },
  8: {
    title: "Element in Place",
    description: "Element 4 is at correct position (index 3). Move to next position",
    operation: "increment"
  },
  9: {
    title: "Sorting Complete",
    description: "All elements are in their correct positions [1 to n]",
    operation: "complete"
  }
};
export default cyclicSortStepDescriptions;