const greedySteps = [
 
  {
    array: [7, 1, 5, 3, 6, 4],
    minPrice: 7,
    maxProfit: 0,
    currentIndex: -1,
    currentPrice: null,
    greedyChoice: "Initialize min_price and max_profit",
    profitCalculation: null,
    decision: "Set base values",
    phase: "initialize",
    note: "Initialize min_price = first element, max_profit = 0",
    highlightLine: 1
  },
  {
    array: [7, 1, 5, 3, 6, 4],
    minPrice: 7,
    maxProfit: 0,
    currentIndex: 0,
    currentPrice: 7,
    greedyChoice: "Keep min_price = 7",
    profitCalculation: "7 - 7 = 0",
    decision: "No profit possible",
    phase: "processing",
    note: "Price 7: min(7,7)=7, max(0, 7-7)=0",
    highlightLine: 4
  },
  {
    array: [7, 1, 5, 3, 6, 4],
    minPrice: 1,
    maxProfit: 0,
    currentIndex: 1,
    currentPrice: 1,
    greedyChoice: "Update min_price to 1",
    profitCalculation: "1 - 1 = 0",
    decision: "Found better buying opportunity",
    phase: "processing",
    note: "Price 1: min(7,1)=1, max(0, 1-1)=0. New minimum found!",
    highlightLine: 4
  },
  {
    array: [7, 1, 5, 3, 6, 4],
    minPrice: 1,
    maxProfit: 4,
    currentIndex: 2,
    currentPrice: 5,
    greedyChoice: "Keep min_price = 1",
    profitCalculation: "5 - 1 = 4",
    decision: "Update max_profit to 4",
    phase: "processing",
    note: "Price 5: min(1,5)=1, max(0, 5-1)=4. Better profit found!",
    highlightLine: 4
  },
  {
    array: [7, 1, 5, 3, 6, 4],
    minPrice: 1,
    maxProfit: 4,
    currentIndex: 3,
    currentPrice: 3,
    greedyChoice: "Keep min_price = 1",
    profitCalculation: "3 - 1 = 2",
    decision: "Keep max_profit = 4",
    phase: "processing",
    note: "Price 3: min(1,3)=1, max(4, 3-1)=4. Current profit not better",
    highlightLine: 4
  },
  {
    array: [7, 1, 5, 3, 6, 4],
    minPrice: 1,
    maxProfit: 5,
    currentIndex: 4,
    currentPrice: 6,
    greedyChoice: "Keep min_price = 1",
    profitCalculation: "6 - 1 = 5",
    decision: "Update max_profit to 5",
    phase: "processing",
    note: "Price 6: min(1,6)=1, max(4, 6-1)=5. Even better profit!",
    highlightLine: 4
  },
  {
    array: [7, 1, 5, 3, 6, 4],
    minPrice: 1,
    maxProfit: 5,
    currentIndex: 5,
    currentPrice: 4,
    greedyChoice: "Keep min_price = 1",
    profitCalculation: "4 - 1 = 3",
    decision: "Keep max_profit = 5",
    phase: "processing",
    note: "Price 4: min(1,4)=1, max(5, 4-1)=5. Final iteration",
    highlightLine: 4
  },
  {
    array: [7, 1, 5, 3, 6, 4],
    minPrice: 1,
    maxProfit: 5,
    currentIndex: -1,
    currentPrice: null,
    greedyChoice: "Algorithm complete",
    profitCalculation: null,
    decision: "Return max_profit = 5",
    phase: "complete",
    note: "Greedy approach found optimal solution: buy at 1, sell at 6",
    highlightLine: 5
  }
];

export default greedySteps;