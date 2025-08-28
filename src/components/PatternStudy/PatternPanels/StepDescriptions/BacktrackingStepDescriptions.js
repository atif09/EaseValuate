const subsetStepDescriptions = {
1: {
    title: "Start Backtracking",
    description: "Begin at root with empty subset, check base case",
    operation: "start"
  },
  2: {
    title: "Include 1",
    description: "Add element 1 to current subset",
    operation: "include"
  },
  3: {
    title: "Include 2", 
    description: "Add element 2 to subset [1]",
    operation: "include"
  },
  4: {
    title: "Include 3",
    description: "Add element 3 to subset [1,2]",
    operation: "include"
  },
  5: {
    title: "Save [1,2,3]",
    description: "Base case: save complete subset [1,2,3]",
    operation: "save"
  },
  6: {
    title: "Backtrack & Exclude 3",
    description: "Remove 3 from [1,2,3], try exclude path",
    operation: "backtrack_exclude"
  },
  7: {
    title: "Save [1,2]",
    description: "Base case: save subset [1,2]",
    operation: "save"
  },
  8: {
    title: "Backtrack & Exclude 2",
    description: "Remove 2 from [1,2], try exclude path",
    operation: "backtrack_exclude"
  },
  9: {
    title: "Include 3",
    description: "Add element 3 to subset [1]",
    operation: "include"
  },
  10: {
    title: "Save [1,3]",
    description: "Base case: save subset [1,3]",
    operation: "save"
  },
  11: {
    title: "Backtrack & Exclude 3",
    description: "Remove 3 from [1,3], try exclude path",
    operation: "backtrack_exclude"
  },
  12: {
    title: "Save [1]",
    description: "Base case: save subset [1]",
    operation: "save"
  },
  13: {
    title: "Backtrack & Exclude 1",
    description: "Remove 1 from [1], try exclude path",
    operation: "backtrack_exclude"
  },
  14: {
    title: "Include 2",
    description: "Add element 2 to empty subset",
    operation: "include"
  },
  15: {
    title: "Include 3",
    description: "Add element 3 to subset [2]",
    operation: "include"
  },
  16: {
    title: "Save [2,3]",
    description: "Base case: save subset [2,3]",
    operation: "save"
  }
};
export default subsetStepDescriptions;