const fastAndSlowStepDescriptions = {
  1: {
    title: "Initialize Pointers",
    description: "Set both slow and fast pointers to head node",
    operation: "initialize"
  },
  2: {
    title: "Move Pointers First Time",
    description: "Move slow pointer 1 step and fast pointer 2 steps",
    operation: "move"
  },
  3: {
    title: "Check for Meeting Point",
    description: "Compare if slow and fast pointers are at same position",
    operation: "check"
  },
  4: {
    title: "Move Pointers Second Time",
    description: "Continue moving pointers at different speeds",
    operation: "move"
  },
  5: {
    title: "Check Again",
    description: "Compare pointer positions - no collision yet",
    operation: "check"
  },
  6: {
    title: "Move Pointers Third Time",
    description: "Fast pointer loops back due to cycle, approaching slow pointer",
    operation: "move"
  },
  7: {
    title: "Final Check",
    description: "Pointers meet - collision detected at same node",
    operation: "check"
  },
  8: {
    title: "Cycle Detected",
    description: "Algorithm complete - cycle confirmed in linked list",
    operation: "complete"
  }
};
export default fastAndSlowStepDescriptions;