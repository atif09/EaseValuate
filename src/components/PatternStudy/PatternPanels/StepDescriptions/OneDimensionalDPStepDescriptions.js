const oneDimensionalDPStepDescriptions = {
  1: {
    title: "Initialize Problem",
    description: "Handle edge cases and start house robber dynamic programming",
    operation: "initialize"
  },
  2: {
    title: "Setup DP Array",
    description: "Create DP array to store maximum money at each position",
    operation: "setup"
  },
  3: {
    title: "Base Case - First House",
    description: "Set dp[0] = houses[0], only one choice for first house",
    operation: "base_case"
  },
  4: {
    title: "Evaluate Second House",
    description: "Compare robbing first house vs robbing second house",
    operation: "comparing"
  },
  5: {
    title: "Base Case - Second House",
    description: "Set dp[1] = max(houses[0], houses[1]) for optimal choice",
    operation: "base_case"
  },
  6: {
    title: "Compare Options - House 2",
    description: "Compare not robbing (dp[1]) vs robbing house 2 (dp[0] + houses[2])",
    operation: "comparing"
  },
  7: {
    title: "Update DP - House 2",
    description: "Choose optimal decision and update dp[2] with maximum value",
    operation: "updating"
  },
  8: {
    title: "Compare Options - House 3",
    description: "Compare not robbing (dp[2]) vs robbing house 3 (dp[1] + houses[3])",
    operation: "comparing"
  },
  9: {
    title: "Update DP - House 3",
    description: "Choose optimal decision and update dp[3] with maximum value",
    operation: "updating"
  },
  10: {
    title: "Compare Options - House 4",
    description: "Compare not robbing (dp[3]) vs robbing house 4 (dp[2] + houses[4])",
    operation: "comparing"
  },
  11: {
    title: "Update DP - House 4",
    description: "Choose optimal decision and update dp[4] with maximum value",
    operation: "updating"
  },
  12: {
    title: "Return Maximum Profit",
    description: "Algorithm complete, return dp[n-1] as maximum money robbed",
    operation: "complete"
  }
};
export default oneDimensionalDPStepDescriptions;