const twoPointersLineMaps = {
  python: {
    1: { lines: [2, 3, 4, 5], operation: "check_sum" },    
    2: { lines: [3, 4, 5], operation: "check_sum" },        
    3: { lines: [3, 8, 9], operation: "found" }             
  },
  cpp: {
    1: { lines: [2, 3, 4, 5], operation: "check_sum" },    
    2: { lines: [3, 4, 5], operation: "check_sum" },       
    3: { lines: [3, 8, 9], operation: "found" }            
  },
  java: {
    1: { lines: [2, 3, 4, 5], operation: "check_sum" },     
    2: { lines: [3, 4, 5], operation: "check_sum" },       
    3: { lines: [3, 8, 9], operation: "found" }            
  }
};
export default twoPointersLineMaps;