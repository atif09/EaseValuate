const kWayMergeBoilerplate = {
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
}
export default kWayMergeBoilerplate;