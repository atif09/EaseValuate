const twoDimensionalDPStepDescriptions = {
  1: {
    title: "Initialize Problem",
    description: "Start finding unique paths from top-left to bottom-right",
    operation: "initialize"
  },
  2: {
    title: "Setup DP Grid",
    description: "Initialize 3x4 DP grid with zeros",
    operation: "setup"
  },
  3: {
    title: "Fill Base Case (First Column)",
    description: "Fill first column with 1s - only one way to reach each cell",
    operation: "base_case_rows"
  },
  4: {
    title: "Fill Base Case (First Row)",
    description: "Fill first row with 1s - only one way to reach each cell",
    operation: "base_case_cols"
  },
  5: {
    title: "Calculate dp[1][1]",
    description: "Calculate paths from top (1) + paths from left (1) = 2",
    operation: "calculating"
  },
  6: {
    title: "Update dp[1][1]",
    description: "dp[1][1] = 2 (can reach from 2 different paths)",
    operation: "updating"
  },
  7: {
    title: "Calculate dp[1][2]",
    description: "Calculate paths from top (1) + paths from left (2) = 3",
    operation: "calculating"
  },
  8: {
    title: "Update dp[1][2]",
    description: "dp[1][2] = 3 (accumulating paths)",
    operation: "updating"
  },
  9: {
    title: "Calculate dp[1][3]",
    description: "Calculate paths from top (1) + paths from left (3) = 4",
    operation: "calculating"
  },
  10: {
    title: "Update dp[1][3]",
    description: "dp[1][3] = 4 (row 1 complete)",
    operation: "updating"
  },
  11: {
    title: "Calculate dp[2][1]",
    description: "Calculate paths from top (2) + paths from left (1) = 3",
    operation: "calculating"
  },
  12: {
    title: "Update dp[2][1]",
    description: "dp[2][1] = 3",
    operation: "updating"
  },
  13: {
    title: "Calculate dp[2][2]",
    description: "Calculate paths from top (3) + paths from left (3) = 6",
    operation: "calculating"
  },
  14: {
    title: "Update dp[2][2]",
    description: "dp[2][2] = 6",
    operation: "updating"
  },
  15: {
    title: "Calculate dp[2][3]",
    description: "Calculate paths from top (4) + paths from left (6) = 10",
    operation: "calculating"
  },
  16: {
    title: "Update dp[2][3]",
    description: "dp[2][3] = 10 (destination reached!)",
    operation: "updating"
  },
  17: {
    title: "Solution Complete",
    description: "Complete! There are 10 unique paths from top-left to bottom-right",
    operation: "complete"
  }
};

export default twoDimensionalDPStepDescriptions;