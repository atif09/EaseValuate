const bitManipulationSteps = [
  {
    array: [4, 1, 2, 1, 2],
    result: 0,
    currentIndex: -1,
    currentNum: null,
    binaryResult: "00000000",
    binaryArray: ["00000100", "00000001", "00000010", "00000001", "00000010"],
    binaryOperation: null,
    operationResult: null,
    phase: "initialize",
    note: "Initialize result = 0. XOR property: a ^ a = 0, a ^ 0 = a",
    highlightLine: 1
  },
  {
    array: [4, 1, 2, 1, 2],
    result: 4,
    currentIndex: 0,
    currentNum: 4,
    binaryResult: "00000100",
    binaryArray: ["00000100", "00000001", "00000010", "00000001", "00000010"],
    binaryOperation: "00000000 ^ 00000100",
    operationResult: "00000100",
    phase: "processing",
    note: "XOR 0 with 4: 00000000 ^ 00000100 = 00000100",
    highlightLine: 4
  },
  {
    array: [4, 1, 2, 1, 2],
    result: 5,
    currentIndex: 1,
    currentNum: 1,
    binaryResult: "00000101",
    binaryArray: ["00000100", "00000001", "00000010", "00000001", "00000010"],
    binaryOperation: "00000100 ^ 00000001",
    operationResult: "00000101",
    phase: "processing",
    note: "XOR 4 with 1: 00000100 ^ 00000001 = 00000101",
    highlightLine: 4
  },
  {
    array: [4, 1, 2, 1, 2],
    result: 7,
    currentIndex: 2,
    currentNum: 2,
    binaryResult: "00000111",
    binaryArray: ["00000100", "00000001", "00000010", "00000001", "00000010"],
    binaryOperation: "00000101 ^ 00000010",
    operationResult: "00000111",
    phase: "processing",
    note: "XOR 5 with 2: 00000101 ^ 00000010 = 00000111",
    highlightLine: 4
  },
  {
    array: [4, 1, 2, 1, 2],
    result: 6,
    currentIndex: 3,
    currentNum: 1,
    binaryResult: "00000110",
    binaryArray: ["00000100", "00000001", "00000010", "00000001", "00000010"],
    binaryOperation: "00000111 ^ 00000001",
    operationResult: "00000110",
    phase: "processing",
    note: "XOR 7 with 1: 00000111 ^ 00000001 = 00000110",
    highlightLine: 4
  },
  {
    array: [4, 1, 2, 1, 2],
    result: 4,
    currentIndex: 4,
    currentNum: 2,
    binaryResult: "00000100",
    binaryArray: ["00000100", "00000001", "00000010", "00000001", "00000010"],
    binaryOperation: "00000110 ^ 00000010",
    operationResult: "00000100",
    phase: "processing",
    note: "XOR 6 with 2: 00000110 ^ 00000010 = 00000100",
    highlightLine: 4
  },
  {
    array: [4, 1, 2, 1, 2],
    result: 4,
    currentIndex: -1,
    currentNum: null,
    binaryResult: "00000100",
    binaryArray: ["00000100", "00000001", "00000010", "00000001", "00000010"],
    binaryOperation: null,
    operationResult: null,
    phase: "complete",
    note: "Algorithm complete! Single number found: 4 (duplicates cancelled out)",
    highlightLine: 5
  }
];

export default bitManipulationSteps;