const kWayMergeSteps = [
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [0, 0, 0],
    heap: [],
    result: [],
    phase: "initialize",
    note: "Start: Initialize pointers and empty heap for merging 3 sorted lists",
    highlightLine: 1
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [0, 0, 0],
    heap: [{value: 1, listIndex: 0, elementIndex: 0}],
    result: [],
    phase: "building",
    note: "Add first element from list 0: value=1",
    highlightLine: 4,
    currentList: 0
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [0, 0, 0],
    heap: [
      {value: 1, listIndex: 0, elementIndex: 0},
      {value: 1, listIndex: 1, elementIndex: 0}
    ],
    result: [],
    phase: "building",
    note: "Add first element from list 1: value=1",
    highlightLine: 4,
    currentList: 1
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [0, 0, 0],
    heap: [
      {value: 1, listIndex: 0, elementIndex: 0},
      {value: 1, listIndex: 1, elementIndex: 0},
      {value: 2, listIndex: 2, elementIndex: 0}
    ],
    result: [],
    phase: "building",
    note: "Add first element from list 2: value=2. Heap initialization complete",
    highlightLine: 4,
    currentList: 2
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [1, 0, 0],
    heap: [
      {value: 1, listIndex: 1, elementIndex: 0},
      {value: 4, listIndex: 0, elementIndex: 1},
      {value: 2, listIndex: 2, elementIndex: 0}
    ],
    result: [1],
    phase: "merging",
    note: "Pop min value 1 from list 0, add to result. Push next element 4 from list 0",
    highlightLine: 7,
    poppedValue: 1,
    poppedFrom: 0
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [1, 1, 0],
    heap: [
      {value: 2, listIndex: 2, elementIndex: 0},
      {value: 4, listIndex: 0, elementIndex: 1},
      {value: 3, listIndex: 1, elementIndex: 1}
    ],
    result: [1, 1],
    phase: "merging",
    note: "Pop min value 1 from list 1, add to result. Push next element 3 from list 1",
    highlightLine: 10,
    poppedValue: 1,
    poppedFrom: 1
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [1, 1, 1],
    heap: [
      {value: 3, listIndex: 1, elementIndex: 1},
      {value: 4, listIndex: 0, elementIndex: 1},
      {value: 6, listIndex: 2, elementIndex: 1}
    ],
    result: [1, 1, 2],
    phase: "merging",
    note: "Pop min value 2 from list 2, add to result. Push next element 6 from list 2",
    highlightLine: 10,
    poppedValue: 2,
    poppedFrom: 2
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [1, 2, 1],
    heap: [
      {value: 4, listIndex: 0, elementIndex: 1},
      {value: 4, listIndex: 1, elementIndex: 2},
      {value: 6, listIndex: 2, elementIndex: 1}
    ],
    result: [1, 1, 2, 3],
    phase: "merging",
    note: "Pop min value 3 from list 1, add to result. Push next element 4 from list 1",
    highlightLine: 10,
    poppedValue: 3,
    poppedFrom: 1
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [2, 2, 1],
    heap: [
      {value: 4, listIndex: 1, elementIndex: 2},
      {value: 5, listIndex: 0, elementIndex: 2},
      {value: 6, listIndex: 2, elementIndex: 1}
    ],
    result: [1, 1, 2, 3, 4],
    phase: "merging",
    note: "Pop min value 4 from list 0, add to result. Push next element 5 from list 0",
    highlightLine: 10,
    poppedValue: 4,
    poppedFrom: 0
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [2, 3, 1],
    heap: [
      {value: 5, listIndex: 0, elementIndex: 2},
      {value: 6, listIndex: 2, elementIndex: 1}
    ],
    result: [1, 1, 2, 3, 4, 4],
    phase: "merging",
    note: "Pop min value 4 from list 1, add to result. List 1 exhausted, no more elements",
    highlightLine: 7,
    poppedValue: 4,
    poppedFrom: 1
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [3, 3, 1],
    heap: [
      {value: 6, listIndex: 2, elementIndex: 1}
    ],
    result: [1, 1, 2, 3, 4, 4, 5],
    phase: "merging",
    note: "Pop min value 5 from list 0, add to result. List 0 exhausted, no more elements",
    highlightLine: 7,
    poppedValue: 5,
    poppedFrom: 0
  },
  {
    lists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ],
    pointers: [3, 3, 2],
    heap: [],
    result: [1, 1, 2, 3, 4, 4, 5, 6],
    phase: "complete",
    note: "Pop final value 6 from list 2. All lists merged successfully!",
    highlightLine: 13,
    poppedValue: 6,
    poppedFrom: 2
  }
];

export default kWayMergeSteps;