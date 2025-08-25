const dp2DSteps = [
  {
    grid: [],
    dp: [],
    m: 3,
    n: 4,
    currentRow: -1,
    currentCol: -1,
    phase: "initialize",
    note: "Start: Find number of unique paths from top-left to bottom-right",
    highlightLine: 1,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: -1,
    currentCol: -1,
    phase: "setup",
    note: "Initialize 3x4 DP grid with zeros",
    highlightLine: 2,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 0,
    currentCol: 0,
    phase: "base_case_rows",
    note: "Base case: Fill first column with 1s (only one way to reach each cell)",
    highlightLine: 3,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 0,
    currentCol: 0,
    phase: "base_case_cols",
    note: "Base case: Fill first row with 1s (only one way to reach each cell)",
    highlightLine: 4,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 1,
    currentCol: 1,
    phase: "calculating",
    note: "Calculate dp[1][1]: paths from top (1) + paths from left (1) = 2",
    highlightLine: 6,
    fromTop: 1,
    fromLeft: 1,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 0, 0],
      [1, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 1,
    currentCol: 1,
    phase: "updating",
    note: "dp[1][1] = 2 (can reach from 2 different paths)",
    highlightLine: 6,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 0, 0],
      [1, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 1,
    currentCol: 2,
    phase: "calculating",
    note: "Calculate dp[1][2]: paths from top (1) + paths from left (2) = 3",
    highlightLine: 6,
    fromTop: 1,
    fromLeft: 2,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 0],
      [1, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 1,
    currentCol: 2,
    phase: "updating",
    note: "dp[1][2] = 3 (accumulating paths)",
    highlightLine: 6,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 0],
      [1, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 1,
    currentCol: 3,
    phase: "calculating",
    note: "Calculate dp[1][3]: paths from top (1) + paths from left (3) = 4",
    highlightLine: 6,
    fromTop: 1,
    fromLeft: 3,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 1,
    currentCol: 3,
    phase: "updating",
    note: "dp[1][3] = 4 (row 1 complete)",
    highlightLine: 6,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 0, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 2,
    currentCol: 1,
    phase: "calculating",
    note: "Calculate dp[2][1]: paths from top (2) + paths from left (1) = 3",
    highlightLine: 6,
    fromTop: 2,
    fromLeft: 1,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 2,
    currentCol: 1,
    phase: "updating",
    note: "dp[2][1] = 3",
    highlightLine: 6,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 0, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 2,
    currentCol: 2,
    phase: "calculating",
    note: "Calculate dp[2][2]: paths from top (3) + paths from left (3) = 6",
    highlightLine: 6,
    fromTop: 3,
    fromLeft: 3,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 6, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 2,
    currentCol: 2,
    phase: "updating",
    note: "dp[2][2] = 6",
    highlightLine: 6,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 6, 0]
    ],
    m: 3,
    n: 4,
    currentRow: 2,
    currentCol: 3,
    phase: "calculating",
    note: "Calculate dp[2][3]: paths from top (4) + paths from left (6) = 10",
    highlightLine: 6,
    fromTop: 4,
    fromLeft: 6,
    totalPaths: 0
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 6, 10]
    ],
    m: 3,
    n: 4,
    currentRow: 2,
    currentCol: 3,
    phase: "updating",
    note: "dp[2][3] = 10 (destination reached!)",
    highlightLine: 6,
    totalPaths: 10
  },
  {
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    dp: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 6, 10]
    ],
    m: 3,
    n: 4,
    currentRow: -1,
    currentCol: -1,
    phase: "complete",
    note: "Complete! There are 10 unique paths from top-left to bottom-right",
    highlightLine: 8,
    result: 10,
    totalPaths: 10
  }
];

export default dp2DSteps;