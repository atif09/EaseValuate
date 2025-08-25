const fastAndSlowPointersSteps = [
  {
    nodes: [1, 2, 3, 4, 5, 6],
    cycleStart: 2,
    slowPointer: 0,
    fastPointer: 0,
    operation: "initialize",
    note: "Initialize both slow and fast pointers to head node (index 0)",
    checking: false,
    cycleDetected: false,
    iteration: 0
  },
  {
    nodes: [1, 2, 3, 4, 5, 6],
    cycleStart: 2,
    slowPointer: 1,
    fastPointer: 2,
    operation: "move",
    note: "Move slow pointer 1 step (0→1), fast pointer 2 steps (0→1→2)",
    checking: false,
    cycleDetected: false,
    iteration: 1
  },
  {
    nodes: [1, 2, 3, 4, 5, 6],
    cycleStart: 2,
    slowPointer: 1,
    fastPointer: 2,
    operation: "check",
    note: "Check if slow == fast. Node 2 ≠ Node 3, continue searching",
    checking: true,
    cycleDetected: false,
    iteration: 1
  },
  {
    nodes: [1, 2, 3, 4, 5, 6],
    cycleStart: 2,
    slowPointer: 2,
    fastPointer: 4,
    operation: "move",
    note: "Move slow pointer 1 step (1→2), fast pointer 2 steps (2→3→4)",
    checking: false,
    cycleDetected: false,
    iteration: 2
  },
  {
    nodes: [1, 2, 3, 4, 5, 6],
    cycleStart: 2,
    slowPointer: 2,
    fastPointer: 4,
    operation: "check",
    note: "Check if slow == fast. Node 3 ≠ Node 5, continue searching",
    checking: true,
    cycleDetected: false,
    iteration: 2
  },
  {
    nodes: [1, 2, 3, 4, 5, 6],
    cycleStart: 2,
    slowPointer: 3,
    fastPointer: 3,
    operation: "move",
    note: "Move slow pointer 1 step (2→3), fast pointer 2 steps (4→5→2→3)",
    checking: false,
    cycleDetected: false,
    iteration: 3
  },
  {
    nodes: [1, 2, 3, 4, 5, 6],
    cycleStart: 2,
    slowPointer: 3,
    fastPointer: 3,
    operation: "check",
    note: "Check if slow == fast. Both at Node 4 - COLLISION DETECTED!",
    checking: true,
    cycleDetected: false,
    iteration: 3
  },
  {
    nodes: [1, 2, 3, 4, 5, 6],
    cycleStart: 2,
    slowPointer: 3,
    fastPointer: 3,
    operation: "complete",
    note: "Cycle detected! Fast pointer caught up to slow pointer, proving cycle exists",
    checking: false,
    cycleDetected: true,
    iteration: 3
  }
];

export default fastAndSlowPointersSteps;