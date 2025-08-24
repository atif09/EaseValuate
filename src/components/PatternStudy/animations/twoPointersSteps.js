const twoPointersSteps = [
  {
    array: [2, 7, 11, 15],
    left: 0,
    right: 3,
    target: 9,
    sum: 17,
    note: "Start: LEFT at 0, RIGHT at 5",
    hightlightLine: 6
  },
  {
    array: [2, 7, 11, 15],
    left: 0,
    right: 2,
    target: 9,
    sum: 13,
    note: "Move LEFT pointer to 1",
    highlightLine: 6
  },
  {
    array: [2, 7, 11, 15],
    left: 0,
    right: 1,
    target: 9,
    sum: 9,
    note: "Move RIGHT pointer to 4",
    highlightLine: 8
  }
  
];
export default twoPointersSteps;