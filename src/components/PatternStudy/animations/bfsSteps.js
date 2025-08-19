const bfsSteps = [
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [1],
    level: 0,
    curr: null,
    printed: [],
    note: "Start: queue contains root node 1",
    highlightLine: 3
  },
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [2, 3],
    level: 0,
    curr: 1,
    printed: [1],
    note: "Pop 1, print 1, enqueue 2 and 3",
    highlightLine: 8
  },
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [2, 3],
    level: 1,
    curr: null,
    printed: [1],
    note: "Level 1: queue contains 2 and 3",
    highlightLine: 6
  },
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [3, 4, 5],
    level: 1,
    curr: 2,
    printed: [1, 2],
    note: "Pop 2, print 2 , enqueue 4 and 5",
    highlightLine: 8
  },
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [4, 5, 6],
    level: 1,
    curr: 3,
    printed: [1, 2, 3],
    note: "Pop 3, print 3, enqueue 6",
    highlightLine: 8
  },
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [4, 5, 6],
    level: 2,
    curr: null,
    printed: [1, 2, 3],
    note: "Level 2: queue contains 4, 5, 6",
    highlightLine: 6
  },
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [5, 6],
    level: 2,
    curr: 4,
    printed: [1, 2, 3, 4],
    note: "Pop 4, print 4",
    highlightLine: 8
  },
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [6],
    level: 2,
    curr: 5,
    printed: [1, 2, 3, 4, 5],
    note: "Pop 5, print 5",
    highlightLine: 8
  },
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [],
    level: 2,
    curr: 6,
    printed: [1, 2, 3, 4, 5, 6],
    note: "Pop 6, print 6",
    highlightLine: 8
  },
  {
    graph: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
    queue: [],
    level: 3,
    curr: null,
    printed: [1, 2, 3, 4, 5, 6],
    note: "All nodes have been visited, BFS Complete",
    highlightLine: 6
  }
];
export default bfsSteps;