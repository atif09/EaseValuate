const twoPointersBoilerplate = {
  python: `def targetSum(nums, target):
    LEFT, RIGHT = 0, len(nums) - 1
    while LEFT < RIGHT:
        if nums[LEFT] + nums[RIGHT] > target:
            RIGHT -= 1
        elif nums[LEFT] + nums[RIGHT] < target:
            LEFT += 1
        else:
            return [LEFT,RIGHT]
`,
    cpp: `vector<int> targetSum(vector<int>& nums, int target) {
    int LEFT = 0, RIGHT = nums.size() - 1;
    while (LEFT < RIGHT) {
        if (nums[LEFT] + nums[RIGHT] > target) {
            RIGHT--;
        } else if (nums[LEFT] + nums[RIGHT] < target) {
            LEFT++;
        } else {
            return vector<int>{LEFT,RIGHT}
        }
    }
}`,
  
  
    java: `public static int[] targetSum(int[] nums, int target) {
    int LEFT = 0, RIGHT = nums.length - 1;
    while (LEFT < RIGHT) {
        if (nums[LEFT] + nums[RIGHT] > target) {
            RIGHT--;
        } else if (nums[LEFT] + nums[RIGHT] < target) {
            LEFT++;
        } else {
            return new int[]{LEFT, RIGHT};
        }
    }
    return null;
}`
}
export default twoPointersBoilerplate;