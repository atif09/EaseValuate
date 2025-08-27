const oneDDPBoilerplate = {
  python: `def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    dp = [0] * len(nums)
    dp[0] = nums[0]  # Base case: rob first house
    dp[1] = max(nums[0], nums[1])
    for i in range(2, len(nums)):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    return dp[len(nums)-1]
`,
    cpp: `int rob(vector<int>& nums) {
    if(nums.empty()) return 0;
    if(nums.size() == 1) return nums[0];
    vector<int> dp(nums.size());
    dp[0] = nums[0];  
    dp[1] = max(nums[0], nums[1]);  
    for(int i = 2; i < nums.size(); i++) {
        dp[i] = max(dp[i-1], dp[i-2] + nums[i]);  
    }
    return dp[nums.size()-1];
}`,
    java: `public int rob(int[] nums) {
    if(nums.length == 0) return 0;
    if(nums.length == 1) return nums[0];
    int[] dp = new int[nums.length];
    dp[0] = nums[0];  
    dp[1] = Math.max(nums[0], nums[1]);  
    for(int i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);  
    }
    return dp[nums.length-1];
}`
}
export default oneDDPBoilerplate;