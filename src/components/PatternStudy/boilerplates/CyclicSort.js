const cyclicSortBoilerplate = {
  python: `def cyclic_sort(nums):
    i = 0
    while i < len(nums): 
        correct_idx = nums[i] - 1
        if nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else: 
            i += 1
    return nums
`,
    cpp: `void cyclicSort( vector<int>& nums ) {
    int i = 0;
    while ( i < nums.size() ) {
        int correctIdx = nums[i] - 1;
        if ( nums[i] != nums[correctIdx] ) {
            swap( nums[i], nums[correctIdx] );
        } else {
            i++;
        }
    }
}`,
    java: `public class CyclicSort {
    public static void cyclicSort(int[] nums) {
        int i = 0;
        while ( i < nums.length ) {
            int correctIdx = nums[i] - 1;
            if ( nums[i] != nums[correctIdx] ) {
                int temp = nums[i];
                nums[i] = nums[correctIdx];
                nums[correctIdx] = temp;
            } else {
                i++;
            }
        }
    }
}`
}
export default cyclicSortBoilerplate;