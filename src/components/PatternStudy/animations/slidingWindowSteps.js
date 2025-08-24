const slidingWindowSteps = [
  {
    arr: [1,2,3,2,4],
    k: 3,
    LEFT: 0,
    RIGHT: 0,
    window: [],
    step: 1,
    description: 'Initialize: Empty window, LEFT=0, k=3'
  },
  {
    arr: [1, 2, 3, 2, 4],
    k: 3,
    LEFT: 0,
    RIGHT: 0,
    window: [1],
    step: 2,
    description: "Add element 1: window=[1], size=1 ≤ k=3"
  },
  {
    arr: [1, 2, 3, 2, 4],
    k: 3,
    LEFT: 0,
    RIGHT: 1,
    window: [1, 2],
    step: 3,
    description: "Add element 2: window=[1,2], size=2 ≤ k=3"
  },
  {
    arr: [1,2,3,2,4],
    k: 3,
    LEFT: 0,
    RIGHT: 2,
    window: [1,2,3],
    step: 4,
    description: 'Add element 3: window=[1,2,3], size=3 ≤ k=3'
    },  
    {
    arr: [1, 2, 3, 2, 4],
    k: 3,
    LEFT: 1,
    RIGHT: 3,
    window: [2, 3, 2],
    step: 5,
    description: "Window size > k: remove 1, LEFT=1, window=[2,3,2]"
    },
    {
    arr: [1, 2, 3, 2, 4],
    k: 3,
    LEFT: 1,
    RIGHT: 3,
    window: [2, 3, 2],
    step: 6,
    description: "Duplicate found: element 2 already in window"
    },
    {
    arr: [1, 2, 3, 2, 4],
    k: 3,
    LEFT: 1,
    RIGHT: 3,
    window: [2, 3, 2],
    step: 7,
    description: "Result: True (duplicate found within k distance)"
    }
];

export default slidingWindowSteps;