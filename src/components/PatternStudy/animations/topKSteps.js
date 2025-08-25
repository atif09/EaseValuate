const topKSteps = [
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [],
    k: 4,
    currentIndex: -1,
    currentElement: null,
    phase: "initialize",
    note: "Start: Find 4th largest element using min-heap of size 4",
    highlightLine: 1
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [7],
    k: 4,
    currentIndex: 0,
    currentElement: 7,
    phase: "building",
    note: "Add first element 7 to min-heap",
    highlightLine: 2
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [7, 10],
    k: 4,
    currentIndex: 1,
    currentElement: 10,
    phase: "building",
    note: "Add second element 10 to min-heap",
    highlightLine: 2
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [4, 10, 7],
    k: 4,
    currentIndex: 2,
    currentElement: 4,
    phase: "building",
    note: "Add third element 4 to min-heap",
    highlightLine: 2
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [3, 10, 7, 4],
    k: 4,
    currentIndex: 3,
    currentElement: 3,
    phase: "building",
    note: "Add fourth element 3 to min-heap. Heap size = k",
    highlightLine: 2
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [3, 10, 7, 4],
    k: 4,
    currentIndex: 4,
    currentElement: 20,
    phase: "comparing",
    note: "Compare 20 with heap root 3: 20 > 3, replace needed",
    highlightLine: 5
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [4, 10, 7, 20],
    k: 4,
    currentIndex: 4,
    currentElement: 20,
    phase: "replacing",
    note: "Replace 3 with 20. New heap: [4, 10, 7, 20]",
    highlightLine: 6
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [4, 10, 7, 20],
    k: 4,
    currentIndex: 5,
    currentElement: 15,
    phase: "comparing",
    note: "Compare 15 with heap root 4: 15 > 4, replace needed",
    highlightLine: 5
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [7, 10, 15, 20],
    k: 4,
    currentIndex: 5,
    currentElement: 15,
    phase: "replacing",
    note: "Replace 4 with 15. New heap: [7, 10, 15, 20]",
    highlightLine: 6
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [7, 10, 15, 20],
    k: 4,
    currentIndex: 6,
    currentElement: 8,
    phase: "comparing",
    note: "Compare 8 with heap root 7: 8 > 7, replace needed",
    highlightLine: 5
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [8, 10, 15, 20],
    k: 4,
    currentIndex: 6,
    currentElement: 8,
    phase: "replacing",
    note: "Replace 7 with 8. New heap: [8, 10, 15, 20]",
    highlightLine: 6
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [8, 10, 15, 20],
    k: 4,
    currentIndex: 7,
    currentElement: 2,
    phase: "comparing",
    note: "Compare 2 with heap root 8: 2 ≤ 8, no change",
    highlightLine: 5
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [8, 10, 15, 20],
    k: 4,
    currentIndex: 8,
    currentElement: 1,
    phase: "comparing",
    note: "Compare 1 with heap root 8: 1 ≤ 8, no change",
    highlightLine: 5
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [8, 10, 15, 20],
    k: 4,
    currentIndex: 9,
    currentElement: 12,
    phase: "comparing",
    note: "Compare 12 with heap root 8: 12 > 8, replace needed",
    highlightLine: 5
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [10, 12, 15, 20],
    k: 4,
    currentIndex: 9,
    currentElement: 12,
    phase: "replacing",
    note: "Replace 8 with 12. New heap: [10, 12, 15, 20]",
    highlightLine: 6
  },
  {
    array: [7, 10, 4, 3, 20, 15, 8, 2, 1, 12],
    heap: [10, 12, 15, 20],
    k: 4,
    currentIndex: -1,
    currentElement: null,
    phase: "complete",
    note: "Complete! The 4th largest element is 10 (heap root)",
    highlightLine: 8,
    result: 10
  }
];

export default topKSteps;