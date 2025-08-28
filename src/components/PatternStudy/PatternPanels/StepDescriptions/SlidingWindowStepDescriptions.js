const slidingWindowStepDescriptions = {
1: {
    title: "Initialize Window",
    description: "Start with empty window set and LEFT pointer at 0",
    operation: "initialize"
  },
  2: {
    title: "Expand Window (RIGHT=0)",
    description: "Add element 1 to window, check if duplicate exists",
    operation: "expand"
  },
  3: {
    title: "Expand Window (RIGHT=1)",
    description: "Add element 2 to window, check if duplicate exists",
    operation: "expand"
  },
  4: {
    title: "Expand Window (RIGHT=2)",
    description: "Add element 3 to window, check if duplicate exists",
    operation: "expand"
  },
  5: {
    title: "Window Size Exceeds k",
    description: "Window size (4) > k (3), remove leftmost element and shift LEFT",
    operation: "shrink"
  },
  6: {
    title: "Expand Window (RIGHT=3)",
    description: "Add element 4 to window, check if duplicate exists",
    operation: "expand"
  },
  7: {
    title: "Duplicate Found",
    description: "Element 2 already exists in window, return True",
    operation: "duplicate_found"
  }
};
export default slidingWindowStepDescriptions;