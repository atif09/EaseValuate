const inPlaceReversalSteps = [
  {
    nodes: [1,2,3,4,5],
    prev: null,
    curr: 0,
    next: 1,
    note: "Start: prev=null, curr=1, next=2",
    
  },
  {
    nodes: [1, 2, 3, 4, 5],
    prev: 0,
    curr: 1,
    next: 2,
    reversed: [1],
    note: "Reverse 1: prev=1, curr=2, next=3",
    
  },
  {
    nodes: [1, 2, 3, 4, 5],
    prev: 1,
    curr: 2,
    next: 3,
    reversed: [2, 1],
    note: "Reverse 2: prev=2, curr=3, next=4",
  },
  {
    nodes: [1, 2, 3, 4, 5],
    prev: 2,
    curr: 3,
    next: 4,
    reversed: [3, 2, 1],
    note: "Reverse 3: prev=3, curr=4, next=5",
   
  },
  {
    nodes: [1, 2, 3, 4, 5],
    prev: 3,
    curr: 4,
    next: null,
    reversed: [4, 3, 2, 1],
    note: "Reverse 4: prev=4, curr=5, next=None",
  },
  {
    nodes: [1, 2, 3, 4, 5],
    prev: 4,
    curr: null,
    next: null,
    reversed: [5, 4, 3, 2, 1],
    note: "Done! prev=5 (new head), curr=None",
  }
];

export default inPlaceReversalSteps;