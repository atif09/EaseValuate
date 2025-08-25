const dp1DSteps = [
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [],
    currentIndex: -1,
    currentElement: null,
    phase: "initialize",
    note: "Start: Find maximum element using 1D DP approach",
    highlightLine: 1,
    comparison: null
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [0, 0, 0, 0, 0, 0],
    currentIndex: -1,
    currentElement: null,
    phase: "setup",
    note: "Initialize DP array with zeros",
    highlightLine: 2,
    comparison: null
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 0, 0, 0, 0, 0],
    currentIndex: 0,
    currentElement: 1,
    phase: "base_case",
    note: "Base case: dp[0] = arr[0] = 1",
    highlightLine: 3,
    comparison: null
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 0, 0, 0, 0, 0],
    currentIndex: 1,
    currentElement: 4,
    phase: "comparing",
    note: "Compare: dp[0] = 1 vs arr[1] = 4",
    highlightLine: 5,
    comparison: { prev: 1, current: 4 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 0, 0, 0, 0],
    currentIndex: 1,
    currentElement: 4,
    phase: "updating",
    note: "dp[1] = max(1, 4) = 4",
    highlightLine: 5,
    comparison: { prev: 1, current: 4, result: 4 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 0, 0, 0, 0],
    currentIndex: 2,
    currentElement: 2,
    phase: "comparing",
    note: "Compare: dp[1] = 4 vs arr[2] = 2",
    highlightLine: 5,
    comparison: { prev: 4, current: 2 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 4, 0, 0, 0],
    currentIndex: 2,
    currentElement: 2,
    phase: "updating",
    note: "dp[2] = max(4, 2) = 4",
    highlightLine: 5,
    comparison: { prev: 4, current: 2, result: 4 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 4, 0, 0, 0],
    currentIndex: 3,
    currentElement: 7,
    phase: "comparing",
    note: "Compare: dp[2] = 4 vs arr[3] = 7",
    highlightLine: 5,
    comparison: { prev: 4, current: 7 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 4, 7, 0, 0],
    currentIndex: 3,
    currentElement: 7,
    phase: "updating",
    note: "dp[3] = max(4, 7) = 7",
    highlightLine: 5,
    comparison: { prev: 4, current: 7, result: 7 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 4, 7, 0, 0],
    currentIndex: 4,
    currentElement: 3,
    phase: "comparing",
    note: "Compare: dp[3] = 7 vs arr[4] = 3",
    highlightLine: 5,
    comparison: { prev: 7, current: 3 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 4, 7, 7, 0],
    currentIndex: 4,
    currentElement: 3,
    phase: "updating",
    note: "dp[4] = max(7, 3) = 7",
    highlightLine: 5,
    comparison: { prev: 7, current: 3, result: 7 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 4, 7, 7, 0],
    currentIndex: 5,
    currentElement: 5,
    phase: "comparing",
    note: "Compare: dp[4] = 7 vs arr[5] = 5",
    highlightLine: 5,
    comparison: { prev: 7, current: 5 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 4, 7, 7, 7],
    currentIndex: 5,
    currentElement: 5,
    phase: "updating",
    note: "dp[5] = max(7, 5) = 7",
    highlightLine: 5,
    comparison: { prev: 7, current: 5, result: 7 }
  },
  {
    array: [1, 4, 2, 7, 3, 5],
    dp: [1, 4, 4, 7, 7, 7],
    currentIndex: -1,
    currentElement: null,
    phase: "complete",
    note: "Complete! Maximum element is 7 (dp[n-1])",
    highlightLine: 7,
    comparison: null,
    result: 7
  }
];

export default dp1DSteps;