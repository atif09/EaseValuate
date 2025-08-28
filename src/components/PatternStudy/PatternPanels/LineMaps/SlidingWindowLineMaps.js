const slidingWindowLineMaps = {
python: {
    1: { lines: [2, 3], operation: "initialize" },   
    2: { lines: [5, 11], operation: "expand" },    
    3: { lines: [5, 11], operation: "expand" },   
    4: { lines: [5, 11], operation: "expand" },    
    5: { lines: [5,6,7,8], operation: "shrink" },        
    6: { lines: [9,10], operation: "expand" },   
    7: { lines: [10], operation: "duplicate_found" } 
  },
  cpp: {
    1: { lines: [2, 3], operation: "initialize" },  
    2: { lines: [4,12], operation: "expand" }, 
    3: { lines: [4, 12], operation: "expand" }, 
    4: { lines: [4, 12], operation: "expand" }, 
    5: { lines: [4,5, 6, 7], operation: "shrink" },        
    6: { lines: [4, 9, 10, 11], operation: "expand" }, 
    7: { lines: [ 10], operation: "duplicate_found" } 
  },
  java: {
    1: { lines: [2, 3], operation: "initialize" },   
    2: { lines: [5, 12], operation: "expand" }, 
    3: { lines: [5, 12], operation: "expand" }, 
    4: { lines: [5, 12], operation: "expand" },
    5: { lines: [5,6,7,8], operation: "shrink" },        
    6: { lines: [5,9,10,11], operation: "expand" }, 
    7: { lines: [10], operation: "duplicate_found" } 
  }
};
export default slidingWindowLineMaps;