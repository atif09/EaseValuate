const greedyAlgorithmsBoilerplate = {
  python: `def maxProfit(prices):
    if not prices:
        return 0
    
    min_price = prices[0]
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit`,
    
    cpp: `int maxProfit(vector<int>& prices) {
    if (prices.empty()) return 0;
    
    int minPrice = prices[0];
    int maxProfit = 0;
    
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}`,
    
    java: `public int maxProfit(int[] prices) {
    if (prices.length == 0) return 0;
    
    int minPrice = prices[0];
    int maxProfit = 0;
    
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit; 
}`
}
export default greedyAlgorithmsBoilerplate;