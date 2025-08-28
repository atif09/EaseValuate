const twoPointersStepDescriptions = {
1: {
    title: "Initialize Pointers",
    description: "LEFT=0, RIGHT=3, sum=17 > target=9, move RIGHT--",
    operation: "check_sum"
  },
  2: {
    title: "Move Right Pointer",
    description: "LEFT=0, RIGHT=2, sum=13 > target=9, move RIGHT--",
    operation: "check_sum"
  },
  3: {
    title: "Target Found",
    description: "LEFT=0, RIGHT=1, sum=9 == target=9, return indices",
    operation: "found"
  }
};
export default twoPointersStepDescriptions;