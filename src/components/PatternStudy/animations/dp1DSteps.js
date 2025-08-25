const dp1DSteps = [
  {
    houses: [2, 7, 9, 3, 1],
    dp: [],
    currentIndex: -1,
    currentHouse: null,
    phase: "initialize",
    note: "Start: Rob houses without alerting police (no adjacent houses)",
    highlightLine: 1,
    decision: null,
    maxMoney: 0
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [0, 0, 0, 0, 0],
    currentIndex: -1,
    currentHouse: null,
    phase: "setup",
    note: "Initialize DP array to track maximum money at each position",
    highlightLine: 2,
    decision: null,
    maxMoney: 0
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 0, 0, 0, 0],
    currentIndex: 0,
    currentHouse: 2,
    phase: "base_case",
    note: "Base case: dp[0] = houses[0] = 2 (only one house, must rob it)",
    highlightLine: 3,
    decision: "rob",
    maxMoney: 2
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 0, 0, 0, 0],
    currentIndex: 1,
    currentHouse: 7,
    phase: "comparing",
    note: "Compare: Rob house 0 (2) vs Rob house 1 (7)",
    highlightLine: 4,
    decision: null,
    comparison: { robPrevious: 2, robCurrent: 7 },
    maxMoney: 2
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 7, 0, 0, 0],
    currentIndex: 1,
    currentHouse: 7,
    phase: "base_case",
    note: "dp[1] = max(2, 7) = 7 (better to rob house 1)",
    highlightLine: 4,
    decision: "rob",
    maxMoney: 7
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 7, 0, 0, 0],
    currentIndex: 2,
    currentHouse: 9,
    phase: "comparing",
    note: "Compare: Don't rob house 2 (dp[1]=7) vs Rob house 2 (dp[0]+9=11)",
    highlightLine: 6,
    decision: null,
    comparison: { dontRob: 7, robCurrent: 2 + 9, robCurrentTotal: 11 },
    maxMoney: 7
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 7, 11, 0, 0],
    currentIndex: 2,
    currentHouse: 9,
    phase: "updating",
    note: "dp[2] = max(7, 11) = 11 (rob houses 0 and 2)",
    highlightLine: 6,
    decision: "rob",
    maxMoney: 11
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 7, 11, 0, 0],
    currentIndex: 3,
    currentHouse: 3,
    phase: "comparing",
    note: "Compare: Don't rob house 3 (dp[2]=11) vs Rob house 3 (dp[1]+3=10)",
    highlightLine: 6,
    decision: null,
    comparison: { dontRob: 11, robCurrent: 7 + 3, robCurrentTotal: 10 },
    maxMoney: 11
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 7, 11, 11, 0],
    currentIndex: 3,
    currentHouse: 3,
    phase: "updating",
    note: "dp[3] = max(11, 10) = 11 (don't rob house 3, keep previous max)",
    highlightLine: 6,
    decision: "skip",
    maxMoney: 11
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 7, 11, 11, 0],
    currentIndex: 4,
    currentHouse: 1,
    phase: "comparing",
    note: "Compare: Don't rob house 4 (dp[3]=11) vs Rob house 4 (dp[2]+1=12)",
    highlightLine: 6,
    decision: null,
    comparison: { dontRob: 11, robCurrent: 11 + 1, robCurrentTotal: 12 },
    maxMoney: 11
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 7, 11, 11, 12],
    currentIndex: 4,
    currentHouse: 1,
    phase: "updating",
    note: "dp[4] = max(11, 12) = 12 (rob houses 0, 2, and 4)",
    highlightLine: 6,
    decision: "rob",
    maxMoney: 12
  },
  {
    houses: [2, 7, 9, 3, 1],
    dp: [2, 7, 11, 11, 12],
    currentIndex: -1,
    currentHouse: null,
    phase: "complete",
    note: "Complete! Maximum money robbed: 12 (houses 0, 2, 4)",
    highlightLine: 8,
    decision: null,
    result: 12,
    maxMoney: 12,
    robbedHouses: [0, 2, 4]
  }
];

export default dp1DSteps;