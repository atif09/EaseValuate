const slidingWindowSteps = [
  {
    array: [1, 2, 3, 2, 3, 3],
    window: [0],
    hashset: [],
    L: 0,
    R: 0,
    note: "",
  },
  {
    array: [1, 2, 3, 2, 3, 3],
    window: [0, 1],
    hashset: [1],
    L: 0,
    R: 1,
    note: "",
  },
  {
    array: [1, 2, 3, 2, 3, 3],
    window: [0, 1, 2],
    hashset: [1, 2],
    L: 0,
    R: 2,
    note: "",
  },
  {
    array: [1, 2, 3, 2, 3, 3],
    window: [1, 2, 3],
    hashset: [2, 3],
    L: 1,
    R: 3,
    note: "",
  },
  {
    array: [1, 2, 3, 2, 3, 3],
    window: [2, 3, 4],
    hashset: [3, 2],
    L: 2,
    R: 4,
    note: "",
  },
  {
    array: [1, 2, 3, 2, 3, 3],
    window: [3, 4, 5],
    hashset: [2, 3],
    L: 3,
    R: 5,
    note: "valid window found!",
  },
];

export default slidingWindowSteps;