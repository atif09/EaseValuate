const topKElementsBoilerplate = {
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
}
export default topKElementsBoilerplate;