const nums = [1, 2, 3];
export {nums};

function buildSubsetsTree(nums, i = 0, curSet = [], id = "root", level = 0) {
  const node = {
    id,
    i,
    curSet: [...curSet],
    children: [],
    level,
  };

  if (i === nums.length) {
    return node;
  }

 
  const includeChild = buildSubsetsTree(nums, i + 1, [...curSet, nums[i]], id + "I", level + 1);
  includeChild.decision = "include";
  includeChild.decisionValue = nums[i];
  includeChild.level = level + 1;

  
  const excludeChild = buildSubsetsTree(nums, i + 1, curSet, id + "E", level + 1);
  excludeChild.decision = "exclude";
  excludeChild.decisionValue = nums[i];
  excludeChild.level = level + 1;

  node.children = [includeChild, excludeChild];
  return node;
}

const subsetsTree = buildSubsetsTree(nums);


function generateTraversalOrder(tree) {
  const order = [];
  
  function dfsTraversal(node) {
    if (!node) return;
    
    order.push(node.id);
    
    
    if (node.i === nums.length) {
      return;
    }
    
    
    if (node.children[0]) {
      dfsTraversal(node.children[0]);
    }
    
    
    if (node.children[1]) {
      dfsTraversal(node.children[1]);
    }
  }
  
  dfsTraversal(tree);
  return order;
}

const traversalOrder = generateTraversalOrder(subsetsTree);

export function getStepInfo(stepNumber, revealedIds, tree) {
  if (stepNumber === 1) {
    return {
      step: 1,
      title: "Start Backtracking",
      description: "Begin with empty subset at root, check base case",
      operation: "start",
      highlightedLines: {
        python: [2],
        cpp: [3],
        java: [3]
      }
    };
  }

  
  const currentNodeId = traversalOrder[stepNumber - 1];
  const currentNode = findNodeById(tree, currentNodeId);
  
  if (!currentNode) {
    return null;
  }

  
  if (currentNode.i === nums.length) {
    return {
      step: stepNumber,
      title: "Save Subset",
      description: `Base case reached: save subset [${currentNode.curSet.join(', ')}]`,
      operation: "save",
      highlightedLines: {
        python: [3, 4],
        cpp: [4, 5],
        java: [4, 5]
      }
    };
  }

  
  if (currentNode.decision === "include") {
    return {
      step: stepNumber,
      title: `Include ${currentNode.decisionValue}`,
      description: `Add ${currentNode.decisionValue} to current subset`,
      operation: "include",
      highlightedLines: {
        python: [5],
        cpp: [7],
        java: [7]
      }
    };
  }

  
  if (currentNode.decision === "exclude") {
    return {
      step: stepNumber,
      title: `Backtrack & Exclude ${currentNode.decisionValue}`,
      description: `Remove ${currentNode.decisionValue} and try exclude path`,
      operation: "backtrack_exclude",
      highlightedLines: {
        python: [7, 9],
        cpp: [9, 11],
        java: [9, 11]
      }
    };
  }

  
  return {
    step: stepNumber,
    title: "Check Base Case",
    description: `At element ${currentNode.i}, check if we've processed all elements`,
    operation: "base_check",
    highlightedLines: {
      python: [1],
      cpp: [3],
      java: [3]
    }
  };
}

function findNodeById(tree, id) {
  if (!tree) return null;
  if (tree.id === id) return tree;
  
  for (const child of tree.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}

function findParentNode(tree, childId) {
  if (!tree) return null;
  
  for (const child of tree.children) {
    if (child.id === childId) return tree;
    
    const found = findParentNode(child, childId);
    if (found) return found;
  }
  return null;
}

function hasExploredIncludeBranch(node, revealedIds) {
  if (!node.children.length) return false;
  const includeChild = node.children[0];
  return revealedIds.includes(includeChild.id);
}

export default subsetsTree;



  
