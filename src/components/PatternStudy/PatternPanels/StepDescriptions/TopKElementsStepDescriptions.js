const topKElementsStepDescriptions = {
  1: {
    title: "Initialize Algorithm",
    description: "Start with empty min-heap to find Kth largest element",
    operation: "initialize"
  },
  2: {
    title: "Add to Heap (Building Phase)",
    description: "Add first element to min-heap",
    operation: "building"
  },
  3: {
    title: "Add to Heap (Building Phase)",
    description: "Add second element to min-heap",
    operation: "building"
  },
  4: {
    title: "Add to Heap (Building Phase)",
    description: "Add third element to min-heap",
    operation: "building"
  },
  5: {
    title: "Add to Heap (Building Phase)",
    description: "Add fourth element to min-heap, heap size equals K",
    operation: "building"
  },
  6: {
    title: "Compare Element",
    description: "Compare current element with heap root (minimum)",
    operation: "comparing"
  },
  7: {
    title: "Replace Minimum",
    description: "Replace heap minimum with larger element",
    operation: "replacing"
  },
  8: {
    title: "Compare Element",
    description: "Compare current element with heap root (minimum)",
    operation: "comparing"
  },
  9: {
    title: "Replace Minimum",
    description: "Replace heap minimum with larger element",
    operation: "replacing"
  },
  10: {
    title: "Compare Element",
    description: "Compare current element with heap root (minimum)",
    operation: "comparing"
  },
  11: {
    title: "Replace Minimum",
    description: "Replace heap minimum with larger element",
    operation: "replacing"
  },
  12: {
    title: "Compare Element",
    description: "Element smaller than heap minimum, no change",
    operation: "comparing"
  },
  13: {
    title: "Compare Element",
    description: "Element smaller than heap minimum, no change",
    operation: "comparing"
  },
  14: {
    title: "Compare Element",
    description: "Compare current element with heap root (minimum)",
    operation: "comparing"
  },
  15: {
    title: "Replace Minimum",
    description: "Replace heap minimum with larger element",
    operation: "replacing"
  },
  16: {
    title: "Algorithm Complete",
    description: "Return heap root as Kth largest element",
    operation: "return_result"
  }
};

export default topKElementsStepDescriptions;