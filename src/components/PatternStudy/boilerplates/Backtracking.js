const backtrackingBoilerplate = {
  python: `def helper(i, nums, curSet, subsets):
    if i >= len(nums):
        subsets.append(curSet.copy())
        return
    curSet.append(nums[i])
    helper(i + 1, nums, curSet, subsets)
    curSet.pop()
    
    helper(i + 1, nums, curSet, subsets)`,
    
    cpp: `void helper(int i, vector<int>& nums, vector<int>& curSet,
    vector<vector<int>>& subsets) {
        if (i >= nums.size()) {
            subsets.push_back(vector<int>(curSet));
            return;
        }
        
        curSet.push_back(nums[i]);
        helper(i + 1, nums, curSet, subsets);
        curSet.pop_back();
        
        helper(i + 1, nums, curSet, subsets);
}`,
    
    java: `public static void helper(int i, int[] nums, List<Integer> curSet,
    List<List<Integer>> subsets) {
        if (i >= nums.length) {
            subsets.add(new ArrayList<>(curSet));
            return;
        }
        
        curSet.add(nums[i]);
        helper(i + 1, nums, curSet, subsets);
        curSet.remove(curSet.size() - 1);
        
        helper(i + 1, nums, curSet, subsets);
}`
}
export default backtrackingBoilerplate;