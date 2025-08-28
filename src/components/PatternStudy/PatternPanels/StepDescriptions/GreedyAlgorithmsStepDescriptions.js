const greedyAlgorithmsStepDescriptions = {
  1: {
    title: "Initialize Variables",
    description: "Set min_price to first element and max_profit to 0",
    operation: "initialize"
  },
  2: {
    title: "Process First Price",
    description: "Update min_price and calculate profit for current price",
    operation: "processing"
  },
  3: {
    title: "Found New Minimum",
    description: "Update min_price to new lower value, reset profit calculation",
    operation: "processing"
  },
  4: {
    title: "Calculate Profit",
    description: "Compare current profit with max_profit and update if better",
    operation: "processing"
  },
  5: {
    title: "Keep Current Best",
    description: "Current profit not better than max_profit, maintain existing values",
    operation: "processing"
  },
  6: {
    title: "Update Maximum Profit",
    description: "Found better profit opportunity, update max_profit",
    operation: "processing"
  },
  7: {
    title: "Final Iteration",
    description: "Process last price and finalize profit calculations",
    operation: "processing"
  },
  8: {
    title: "Return Result",
    description: "Algorithm complete, return the maximum profit found",
    operation: "complete"
  }
};
export default greedyAlgorithmsStepDescriptions;