const kWayMergeStepDescriptions = {
  1: {
    title: "Initialize Data Structures",
    description: "Create empty min-heap and result array, prepare to process k sorted lists",
    operation: "initialize"
  },
  2: {
    title: "Add First Element from List 0",
    description: "Push first element (1) from list 0 into min-heap with metadata",
    operation: "building"
  },
  3: {
    title: "Add First Element from List 1",
    description: "Push first element (1) from list 1 into min-heap with metadata",
    operation: "building"
  },
  4: {
    title: "Add First Element from List 2",
    description: "Push first element (2) from list 2 into min-heap. Heap initialization complete",
    operation: "building"
  },
  5: {
    title: "Extract Min and Add Next (List 0)",
    description: "Pop minimum value 1 from heap, add to result. Push next element 4 from list 0",
    operation: "merging"
  },
  6: {
    title: "Extract Min and Add Next (List 1)",
    description: "Pop minimum value 1 from heap, add to result. Push next element 3 from list 1",
    operation: "merging"
  },
  7: {
    title: "Extract Min and Add Next (List 2)",
    description: "Pop minimum value 2 from heap, add to result. Push next element 6 from list 2",
    operation: "merging"
  },
  8: {
    title: "Extract Min and Add Next (List 1)",
    description: "Pop minimum value 3 from heap, add to result. Push next element 4 from list 1",
    operation: "merging"
  },
  9: {
    title: "Extract Min and Add Next (List 0)",
    description: "Pop minimum value 4 from heap, add to result. Push next element 5 from list 0",
    operation: "merging"
  },
  10: {
    title: "Extract Min - List 1 Exhausted",
    description: "Pop minimum value 4 from heap, add to result. List 1 has no more elements",
    operation: "merging"
  },
  11: {
    title: "Extract Min - List 0 Exhausted",
    description: "Pop minimum value 5 from heap, add to result. List 0 has no more elements",
    operation: "merging"
  },
  12: {
    title: "Algorithm Complete",
    description: "Pop final value 6, heap empty. All lists merged: [1,1,2,3,4,4,5,6]",
    operation: "complete"
  }
};

export default kWayMergeStepDescriptions;