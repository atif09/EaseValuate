const bitManipulationBoilerplate = {
   python: `def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result`,
    
    cpp: `int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}`,
    
    java: `public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}`
}
export default bitManipulationBoilerplate;