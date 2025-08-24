const cyclicSortSteps = [
  {
    array: [3, 1, 5, 4, 2],
    i: 0,
    correctIdx: 2,
    note: "Start: i=0, nums[0]=3, correct position for 3 is index 2",
    operation: "check",
    swapIndices: null,
    sorted: []
  },
  {
    array: [5, 1, 3, 4, 2],
    i: 0,
    correctIdx: 4,
    note: "Swapped 3 and 5. Now nums[0]=5, correct position for 5 is index 4",
    operation: "swap",
    swapIndices: [0, 2],
    sorted: []
  },
  {
    array: [2, 1, 3, 4, 5],
    i: 0,
    correctIdx: 1,
    note: "Swapped 5 and 2. Now nums[0]=2, correct position for 2 is index 1",
    operation: "swap",
    swapIndices: [0, 4],
    sorted: [4]
  },
  {
    array: [1, 2, 3, 4, 5],
    i: 0,
    correctIdx: 0,
    note: "Swapped 2 and 1. Now nums[0]=1, which is in correct position",
    operation: "swap",
    swapIndices: [0, 1],
    sorted: [1, 4]
  },
  {
    array: [1, 2, 3, 4, 5],
    i: 1,
    correctIdx: 1,
    note: "Move to i=1. nums[1]=2 is already in correct position",
    operation: "move",
    swapIndices: null,
    sorted: [0, 1, 4]
  },
  {
    array: [1, 2, 3, 4, 5],
    i: 2,
    correctIdx: 2,
    note: "Move to i=2. nums[2]=3 is already in correct position",
    operation: "move",
    swapIndices: null,
    sorted: [0, 1, 2, 4]
  },
  {
    array: [1, 2, 3, 4, 5],
    i: 3,
    correctIdx: 3,
    note: "Move to i=3. nums[3]=4 is already in correct position",
    operation: "move",
    swapIndices: null,
    sorted: [0, 1, 2, 3, 4]
  },
  {
    array: [1, 2, 3, 4, 5],
    i: 4,
    correctIdx: 4,
    note: "Move to i=4. nums[4]=5 is already in correct position",
    operation: "move",
    swapIndices: null,
    sorted: [0, 1, 2, 3, 4]
  },
  {
    array: [1, 2, 3, 4, 5],
    i: 5,
    correctIdx: null,
    note: "Done! All elements are in their correct positions (1 to n)",
    operation: "complete",
    swapIndices: null,
    sorted: [0, 1, 2, 3, 4]
  }
];

export default cyclicSortSteps;