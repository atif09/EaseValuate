const patternBoilerplates = {
  "Sliding Window": {
    python: `
def closeDuplicates(nums,k):
    window = set()
    LEFT = 0
    
    for RIGHT in range(len(nums)):
        if RIGHT - LEFT + 1 > k:
            window.remove(nums[LEFT])
            LEFT += 1
        if nums[RIGHT] in window:
            return True
        window.add(nums[RIGHT])
        
    return False
`,
    cpp: `
bool closeDuplicates(vector<int>& nums, int k) {
    unordered_set<int> window;
    int LEFT = 0;

    for (int RIGHT = 0; RIGHT < nums.size(); RIGHT++) {
        if (RIGHT - LEFT + 1 > k) {
            window.erase(nums[LEFT]);
            LEFT ++;
        }
        if (window.count(nums[RIGHT]) > 0) {
            return true;
        }
        window.insert(nums[RIGHT]);
    }

    return false;
}`,

    java: `
public static boolean closeDuplicates(int[] nums, int k) {
    HashSet<Integer> window = new HashSet<>();
    int LEFT = 0;

    for (int RIGHT = 0; RIGHT < nums.length; RIGHT++) {
        if (RIGHT - LEFT + 1 > k) {
            window.remove(nums[LEFT]);
            LEFT++;
        }
        if (window.contains(nums[RIGHT])) {
            return true;
        }
        window.add(nums[RIGHT]);
    }

    return false;
}`
  }
};

export default patternBoilerplates;