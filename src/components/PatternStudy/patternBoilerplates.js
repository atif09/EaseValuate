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
  "Inorder Traversal (DFS)": {
    python: `def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.val)
    inorder(root.right)
`,
    cpp: `void inorder(TreeNode* root) {
    if(!root) {
        return;
    }
    inorder(root->left);
    cout << root->val_ << endl;
    inorder(root->right);
}`,
    java: `public void inorder(TreeNode root) {
    if(root == null) {
        return;
    }
    inorder(root.left);
    System.out.println(root.val);
    inorder(root.right);
}`,
  },
  "Preorder Traversal (DFS)": {
    python: `def preorder(root):
    if not root: 
        return
    print(root.val)
    preorder(root.left)
    preorder(root.right)
`,
    cpp: `void preorder(TreeNode* root) {
    if (!root) {
        return;
    }
    cout << root->val_ << endl;
    preorder(root->left);
    preorder(root->right);
}`,
    java: `public void preorder(TreeNode root) {
    if (root == null) {
        return;
    }
    System.out.println(root.val);
    preorder(root.left);
    preorder(root.right);
}`
  },
  "Postorder Traversal (DFS)": {
    python: `def postorder(root):
    if not root:
        return
    postorder(root.left)
    postorder(root.right)
    print(root.val)
`,
    cpp: `void postorder(TreeNode* root) {
    if (!root) {
        return;
    }
    postorder(root->left);
    postorder(root->right);
    cout << root->val_ << endl; 
}`,
    java: `public void postorder(TreeNode root) {
    if (root == null) {
        return;
    }
    postorder(root.left);
    postorder(root.right);
    System.out.println(root.val);
}`
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
  "Merge Intervals": {
    python: `def merge_intervals(intervals):
    if not intervals: 
        return []

    intervals.sort( key = lambda x: x[0] )
    merged = [intervals[0]]

    for current in intervals[1:]:
        last_merged = merged[-1]

        if current[0] <= last_merged[1]:
            merged[-1] = [last_merged[0], max(last_merged[1], current[1])]
        else:
            merged.append(current)
    return merged
`,
    cpp: `vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};

    sort( inervals.begin(), intervals.end());
    vector<vector<int>> merged = {intervals[0]};

    for ( int i = 1; i < intervals.size(); i++ ) {
        vector<int>& current = intervals[i];
        vector<int>& last_merged = merged.back();

        if (current[0] <= last_merged[1]) {
            last_merged[1] = max(last_merged[1], current[1]);
        } else {
            merged.push_back(current);
        }
    }

    return merged;
}`,
    java: `public class MergeIntervals {
    public static int[][] merge( int[][] intervals) {
        if( intervals == null || intervals.length == 0) {
            return new int[0][];
        }

        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        List<int[]> merged = new ArrayList<>();
        merged.add(intervals[0]);

        for (int i = 1; i < intervals.length; i++) {
            int[] current = intervals[i];
            int[] lastMerged = merged.get(merged.size() - 1);

            if (current[0] <= lastMerged[1]) {
                lastMerged[1] = Math.max(lastMerged[1], current[1]);
            } else {
                merged.add(current);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}`
  },
  "Fast & Slow Pointers": {
    python: `def has_cycle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
`,
    cpp:`bool hasCycle(ListNode *head) {
    ListNode *slow = head;
    ListNode *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}`,
    java:`public class LinkedListCycle {
    public static boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
    }
}`
  },
  "Top K Elements (Heap)": {
    python: `def findKthLargest(nums, k):
    import heapq
    minHeap = nums[:k]
    heapq.heapify(minHeap)
    
    for num in nums[k:]:
        if num > minHeap[0]:
            heapq.heappushpop(minHeap, num)
    return minHeap[0]`,
    cpp: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int i = 0; i < k; i++) {
        minHeap.push(nums[i]);
    }
    
    for (int i = k; i < nums.size(); i++) {
        if (nums[i] > minHeap.top()) {
            minHeap.pop();
            minHeap.push(nums[i]);
        }
    }
    
    return minHeap.top();
}`,
    java: `public static int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    
    for (int i = 0; i < k; i++) {
        minHeap.offer(nums[i]);
    }
    
    for (int i = k; i < nums.length; i++) {
        if (nums[i] > minHeap.peek()) {
            minHeap.poll();
            minHeap.offer(nums[i]);
        }
    }
    
    return minHeap.peek();
}`
  },
  "K-way Merge": {
    python: `def mergeKSortedLists(lists):
    import heapq
    minHeap = []
    result = []
    
    for i in range(len(lists)):
        if lists[i]:
            heapq.heappush(minHeap, (lists[i][0], i, 0))
    
    while minHeap:
        value, listIndex, elementIndex = heapq.heappop(minHeap)
        result.append(value)
        
        if elementIndex + 1 < len(lists[listIndex]):
            nextValue = lists[listIndex][elementIndex + 1]
            heapq.heappush(minHeap, (nextValue, listIndex, elementIndex + 1))
    
    return result`,
    
    cpp: `vector<int> mergeKSortedLists(vector<vector<int>>& lists) {
    priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<>> minHeap;
    vector<int> result;
    
    for (int i = 0; i < lists.size(); i++) {
        if (!lists[i].empty()) {
            minHeap.push({lists[i][0], i, 0});
        }
    }
    
    while (!minHeap.empty()) {
        auto [value, listIndex, elementIndex] = minHeap.top();
        minHeap.pop();
        result.push_back(value);
        
        if (elementIndex + 1 < lists[listIndex].size()) {
            int nextValue = lists[listIndex][elementIndex + 1];
            minHeap.push({nextValue, listIndex, elementIndex + 1});
        }
    }
    
    return result;
}`,
    
    java: `public static List<Integer> mergeKSortedLists(List<List<Integer>> lists) {
    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    List<Integer> result = new ArrayList<>();
    
    for (int i = 0; i < lists.size(); i++) {
        if (!lists.get(i).isEmpty()) {
            minHeap.offer(new int[]{lists.get(i).get(0), i, 0});
        }
    }
    
    while (!minHeap.isEmpty()) {
        int[] current = minHeap.poll();
        int value = current[0];
        int listIndex = current[1];
        int elementIndex = current[2];
        
        result.add(value);
        
        if (elementIndex + 1 < lists.get(listIndex).size()) {
            int nextValue = lists.get(listIndex).get(elementIndex + 1);
            minHeap.offer(new int[]{nextValue, listIndex, elementIndex + 1});
        }
    }
    
    return result;
}`,
  },
  "Bit Manipulation": {
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
}`,
  },
  "Greedy Algorithms": {
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
}`,
  },
  "1-Dimension DP": {
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
  },
  "2-Dimension DP": {
    python: `def unique_paths(m, n):
    if m == 0 or n == 0:
        return 0
    dp = [[0] * n for _ in range(m)]
    for i in range(m):
        dp[i][0] = 1
    for j in range(n):
        dp[0][j] = 1
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]`,

    cpp: `int uniquePaths(int m, int n) {
    if(m == 0 || n == 0) return 0;
    vector<vector<int>> dp(m, vector<int>(n, 0));
    for(int i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for(int j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}`,

    java: `public int uniquePaths(int m, int n) {
    if(m == 0 || n == 0) return 0;
    int[][] dp = new int[m][n];
    for(int i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for(int j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}`
  },

}
export default patternBoilerplates;