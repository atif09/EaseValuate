function buildSubsetsTree(nums, path = [], i=0, id = 'root') {
  if(i===nums.length) {
    return{
      id,
      curSet: [...path],
      i,
      children: []
    };
  }
  const left = buildSubsetsTree(nums, [...path, nums[i]], i+1, id+'LEFT');
  const right = buildSubsetsTree(nums, path, i+1,id+'RIGHT');
  return {
    id,
    curSet: [...path],
    i,
    children:[left,right]
  };
}

const subsetsTree = buildSubsetsTree([1,2,3]);

export default subsetsTree;