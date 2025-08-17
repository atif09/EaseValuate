const patternBoilerplates = {
  "Sliding Window": {
    python: `def closeDuplicates(nums,k):
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
  },
  "Two Pointers": {
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
  },
  "In-place Reversal of a Linked List": {
    python: `class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        prev, curr = None, head

        while curr:
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp
        return prev
`,
    cpp: `class Solution {
    public:
        ListNode* reverseList(ListNode* head) {
            ListNode* prev = nullptr;
            ListNode* curr = head;
            while (curr) {
                ListNode* next = curr->next;
                curr->next = prev;
                prev = curr;
                curr = next;
            }
            return prev;
        }
}`,
    java: `public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`
  },

};


    

export default patternBoilerplates;