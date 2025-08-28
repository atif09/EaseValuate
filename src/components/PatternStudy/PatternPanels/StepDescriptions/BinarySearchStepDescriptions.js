const binarySearchStepDescriptions = {
  1: {
    title: "Initialize Search Range",
    description: "Set LEFT=0, RIGHT=6, calculate MID=3. Compare target 13 with arr[3]=10",
    operation: "initialize_and_calculate_mid"
  },
  2: {
    title: "Search Right Half",
    description: "Target (13) > arr[MID] (10), so search right half. Move LEFT to MID+1",
    operation: "compare_and_move_left"
  },
  3: {
    title: "Target Found",
    description: "Target equals arr[MID]: 13 == 13. Found at index 4",
    operation: "target_found"
  }
};
export default binarySearchStepDescriptions;