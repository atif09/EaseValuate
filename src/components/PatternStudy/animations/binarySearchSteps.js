const binarySearchSteps = [
  {
    arr: [2, 4, 7, 10, 13, 18, 21],
    target: 13,
    LEFT: 0,
    RIGHT: 6,
    MID: 3,
    found: false,
    highlightLine: 5,
    note: "Start: LEFT=0, RIGHT=6, MID=3"
  },
  {
    arr: [2, 4, 7, 10, 13, 18, 21],
    target: 13,
    LEFT: 4,
    RIGHT: 6,
    MID: 5,
    found: false,
    highlightLine: 7,
    note: "target > arr[MID] (13 > 10), move LEFT to MID+1"
  },
  {
    arr: [2, 4, 7, 10, 13, 18, 21],
    target: 13,
    LEFT: 4,
    RIGHT: 4,
    MID: 4,
    found: true,
    highlightLine: 13,
    note: "target == arr[MID] (13 == 13), found at index 4"
  }
];

export default binarySearchSteps;