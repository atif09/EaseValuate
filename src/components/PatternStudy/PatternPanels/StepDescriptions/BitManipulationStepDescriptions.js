const bitManipulationStepDescriptions = {
  1: {
    title: "Initialize Result",
    description: "Start with result = 0. XOR property: a ^ a = 0, a ^ 0 = a",
    operation: "initialize"
  },
  2: {
    title: "XOR with Element 4",
    description: "XOR result (0) with 4: 00000000 ^ 00000100 = 00000100",
    operation: "xor_processing"
  },
  3: {
    title: "XOR with Element 1",
    description: "XOR result (4) with 1: 00000100 ^ 00000001 = 00000101",
    operation: "xor_processing"
  },
  4: {
    title: "XOR with Element 2",
    description: "XOR result (5) with 2: 00000101 ^ 00000010 = 00000111",
    operation: "xor_processing"
  },
  5: {
    title: "XOR with Element 1",
    description: "XOR result (7) with 1: 00000111 ^ 00000001 = 00000110",
    operation: "xor_processing"
  },
  6: {
    title: "XOR with Element 2",
    description: "XOR result (6) with 2: 00000110 ^ 00000010 = 00000100",
    operation: "xor_processing"
  },
  7: {
    title: "Single Number Found",
    description: "All duplicates cancelled out, single number is 4",
    operation: "complete"
  }
};
export default bitManipulationStepDescriptions;