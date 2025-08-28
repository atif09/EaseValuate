const LLReversalStepDescriptions = {
  1: {
    title: "Initialize Pointers",
    description: "Set prev=null, curr=head to start reversal process",
    operation: "initialize"
  },
  2: {
    title: "Reverse Node 1",
    description: "Store next, reverse link: 1 -> null. Move pointers: prev=1, curr=2",
    operation: "reverse"
  },
  3: {
    title: "Reverse Node 2", 
    description: "Store next, reverse link: 2 -> 1. Move pointers: prev=2, curr=3",
    operation: "reverse"
  },
  4: {
    title: "Reverse Node 3",
    description: "Store next, reverse link: 3 -> 2. Move pointers: prev=3, curr=4",
    operation: "reverse"
  },
  5: {
    title: "Reverse Node 4",
    description: "Store next, reverse link: 4 -> 3. Move pointers: prev=4, curr=5",
    operation: "reverse"
  },
  6: {
    title: "Reversal Complete",
    description: "Final node reversed: 5 -> 4. Return prev as new head of reversed list",
    operation: "complete"
  }
};

export default LLReversalStepDescriptions;