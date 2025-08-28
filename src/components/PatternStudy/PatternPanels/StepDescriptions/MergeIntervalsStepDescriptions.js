const mergeIntervalsStepDescriptions = {
  1: {
    title: "Initialize and Sort",
    description: "Sort intervals by start time and handle edge cases",
    operation: "start"
  },
  2: {
    title: "Initialize Merged Array",
    description: "Add first interval to merged result as starting point",
    operation: "initialize"
  },
  3: {
    title: "Check Overlap [2,6] with [1,3]",
    description: "Compare current interval start with last merged end: 2 ≤ 3",
    operation: "check_overlap"
  },
  4: {
    title: "Merge Overlapping Intervals",
    description: "Merge [1,3] and [2,6] into [1,6] by extending the end",
    operation: "merge"
  },
  5: {
    title: "Check Overlap [8,10] with [1,6]",
    description: "Compare current interval start with last merged end: 8 > 6",
    operation: "check_overlap"
  },
  6: {
    title: "Add Non-overlapping Interval",
    description: "No overlap found, add [8,10] as separate interval",
    operation: "add_new"
  },
  7: {
    title: "Check Overlap [15,18] with [8,10]",
    description: "Compare current interval start with last merged end: 15 > 10",
    operation: "check_overlap"
  },
  8: {
    title: "Add Final Interval",
    description: "No overlap found, add [15,18] as separate interval",
    operation: "add_new"
  },
  9: {
    title: "Merging Complete",
    description: "All intervals processed. Return merged result: [[1,6], [8,10], [15,18]]",
    operation: "complete"
  }
};

export default mergeIntervalsStepDescriptions;