const mergeIntervalsSteps = [
  {
    intervals: [[1,3], [2,6], [8,10], [15,18]],
    merged: [],
    currentIndex: -1,
    lastMerged: null,
    operation: "start",
    note: "Input intervals: [[1,3], [2,6], [8,10], [15,18]] - already sorted by start time",
    checking: null
  },
  {
    intervals: [[1,3], [2,6], [8,10], [15,18]],
    merged: [[1,3]],
    currentIndex: 0,
    lastMerged: [1,3],
    operation: "initialize",
    note: "Initialize merged array with first interval [1,3]",
    checking: null
  },
  {
    intervals: [[1,3], [2,6], [8,10], [15,18]],
    merged: [[1,3]],
    currentIndex: 1,
    lastMerged: [1,3],
    operation: "check_overlap",
    note: "Check if [2,6] overlaps with [1,3]. Since 2 <= 3, they overlap",
    checking: [2,6]
  },
  {
    intervals: [[1,3], [2,6], [8,10], [15,18]],
    merged: [[1,6]],
    currentIndex: 1,
    lastMerged: [1,6],
    operation: "merge",
    note: "Merge [1,3] and [2,6] → [1,6]. Update last merged interval",
    checking: [2,6]
  },
  {
    intervals: [[1,3], [2,6], [8,10], [15,18]],
    merged: [[1,6]],
    currentIndex: 2,
    lastMerged: [1,6],
    operation: "check_overlap",
    note: "Check if [8,10] overlaps with [1,6]. Since 8 > 6, no overlap",
    checking: [8,10]
  },
  {
    intervals: [[1,3], [2,6], [8,10], [15,18]],
    merged: [[1,6], [8,10]],
    currentIndex: 2,
    lastMerged: [8,10],
    operation: "add_new",
    note: "No overlap, add [8,10] as new interval to merged array",
    checking: [8,10]
  },
  {
    intervals: [[1,3], [2,6], [8,10], [15,18]],
    merged: [[1,6], [8,10]],
    currentIndex: 3,
    lastMerged: [8,10],
    operation: "check_overlap",
    note: "Check if [15,18] overlaps with [8,10]. Since 15 > 10, no overlap",
    checking: [15,18]
  },
  {
    intervals: [[1,3], [2,6], [8,10], [15,18]],
    merged: [[1,6], [8,10], [15,18]],
    currentIndex: 3,
    lastMerged: [15,18],
    operation: "add_new",
    note: "No overlap, add [15,18] as new interval to merged array",
    checking: [15,18]
  },
  {
    intervals: [[1,3], [2,6], [8,10], [15,18]],
    merged: [[1,6], [8,10], [15,18]],
    currentIndex: 4,
    lastMerged: [15,18],
    operation: "complete",
    note: "All intervals processed. Final merged intervals: [[1,6], [8,10], [15,18]]",
    checking: null
  }
];

export default mergeIntervalsSteps;