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
    cpp: `bool closeDuplicates(vector<int>& nums, int k) {
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

    java: `public static boolean closeDuplicates(int[] nums, int k) {
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
  "Breadth-First Search (BFS)": {
    python: `def bfs(root):
    queue = deque()
    if root:
        queue.append(root)
    level = 0
    while len(queue) > 0:
        print("level: ", level)
        for i in range(len(queue)):
            curr = queue.popleft()
            print(curr.val)
            if curr.left:
                queue.append(curr.left)
            if curr.right: 
                queue.append(curr.right)
        level += 1
`,
    cpp: `void dfs(TreeNode* root) {
    queue<TreeNode*> queue;
    if(root) {
        queue.push(root);
    }
    int level = 0;
    while (queue.size() > 0) {
        cout << "level: " << level << endl;
        int length = queue.size();
        for (int i = 0; i < length; i++) {
            TreeNode* curr = queue.front();
            queue.pop();
            cout << curr->val_<< ' ';
            if (curr->left) {
                queue.push(curr->left);
            }
            if (curr->right) {
                queue.push(curr->right);
            }
        }
        level++;
        cout << endl; 
    }
}`, 
    java: `public void bfs(TreeNode root) {
    Deque<TreeNode> queue = new Array Deque<TreeNode>();
    if (root != null) {
        queue.add(root);
    }
    int level = 0;
    while(!queue.isEmpty()) {
        System.out.print("level " + level + ": ");
        int levelLength = queue.size();
        for (int i = 0; i < levelLength; i++) {
            TreeNode curr = queue.removeFirst();
            System.out.print(curr.val + " ");
            if (curr.left != null) {
                queue.add(curr.left);
            }
            if (curr.right != null) {
                queue.add(curr.right);
            }
        }
        level++;
        System.out.println();
    }
}`,
  },
  "Binary Search": {
    python: `def binarySearch(arr, target): 
    LEFT, RIGHT = 0, len(arr) - 1
        
    while LEFT <= RIGHT:
        MID = (LEFT + RIGHT) // 2
        if target > arr[MID]:
            LEFT = MID + 1
        elif target < arr[MID]:
            RIGHT = MID - 1
        else: 
            return MID
    return -1
`,
    cpp: `int binarySearch(vector<int> arr, int target) {
    int LEFT = 0, RIGHT = arr.size();
    while (LEFT<=RIGHT) {
        int MID = (LEFT + RIGHT) / 2;
        if (target > arr[MID]) {
            LEFT = MID + 1;
        } else if (target < arr[MID]) {
            RIGHT = MID - 1;
        } else {
            return MID;
        }
    }
    return -1;
}`,
    java: `public static int binarySearch(int[] arr, int target) {
    int LEFT = 0, RIGHT = arr.length - 1;
    int MID
    
    while (LEFT <= RIGHT) {
        MID = (LEFT + RIGHT) / 2;
        if (target > arr[MID]) {
            LEFT = MID + 1;
        } else if (target < arr[MID]) {
            RIGHT = MID - 1;
        } else {
            return MID;
        }
    }
    return -1;
}`,
  },
  "Subsets (Backtracking)": {
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

  },
  "Cyclic Sort" : {
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
  },

};



    

export default patternBoilerplates;