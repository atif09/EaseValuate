const nums = [1, 2, 3];
export {nums};

function buildSubsetsTree(nums, i = 0, curSet = [], id = "root") {
  const node = {
    id,
    i,
    curSet: [...curSet],
    children: [],
  };

  if (i === nums.length) {
    return node;
  }

  const includeChild = buildSubsetsTree(nums, i + 1, [...curSet, nums[i]], id + "I");
  includeChild.decision = "include";
  includeChild.decisionValue = nums[i];

  const excludeChild = buildSubsetsTree(nums, i + 1, curSet, id + "E");
  excludeChild.decision = "exclude";
  excludeChild.decisionValue = nums[i];

  node.children = [includeChild, excludeChild];
  return node;
}

const subsetsTree = buildSubsetsTree(nums);

export default subsetsTree;