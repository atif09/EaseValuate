const mergeIntervalsBoilerplate = {
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
}
export default mergeIntervalsBoilerplate;