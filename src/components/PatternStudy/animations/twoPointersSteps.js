const twoPointersSteps = [
  {
    array: [2, 7, 11, 15],
    left: 0,
    right: 3,
    target: 9,
    sum: 17,
    note: "left=0, right=3, sum=17 > target, move right--",
    hightlightLine: 6
  },
  {
    array: [2, 7, 11, 15],
    left: 0,
    right: 2,
    target: 9,
    sum: 13,
    note: "left=0, right=2, sum=13 > target, move right--",
    highlightLine: 6
  },
  {
    array: [2, 7, 11, 15],
    left: 0,
    right: 1,
    target: 9,
    sum: 9,
    note: "left=0, right=1, sum=9 == target, found!",
    highlightLine: 8
  }
  
];
export default twoPointersSteps;