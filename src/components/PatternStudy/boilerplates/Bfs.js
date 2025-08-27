const bfsBoilerplate = {
  python: `def bfs(root):
    queue = deque()
    if root:
        queue.append(root)
    level = 0
    while len(queue) > 0:
        print("level: ", level)
        for i in range(len(queue)):
            curr = queue.popleft()
            print(curr.val)
            if curr.left:
                queue.append(curr.left)
            if curr.right: 
                queue.append(curr.right)
        level += 1
`,
    cpp: `void dfs(TreeNode* root) {
    queue<TreeNode*> queue;
    if(root) {
        queue.push(root);
    }
    int level = 0;
    while (queue.size() > 0) {
        cout << "level: " << level << endl;
        int length = queue.size();
        for (int i = 0; i < length; i++) {
            TreeNode* curr = queue.front();
            queue.pop();
            cout << curr->val_<< ' ';
            if (curr->left) {
                queue.push(curr->left);
            }
            if (curr->right) {
                queue.push(curr->right);
            }
        }
        level++;
        cout << endl; 
    }
}`, 
    java: `public void bfs(TreeNode root) {
    Deque<TreeNode> queue = new Array Deque<TreeNode>();
    if (root != null) {
        queue.add(root);
    }
    int level = 0;
    while(!queue.isEmpty()) {
        System.out.print("level " + level + ": ");
        int levelLength = queue.size();
        for (int i = 0; i < levelLength; i++) {
            TreeNode curr = queue.removeFirst();
            System.out.print(curr.val + " ");
            if (curr.left != null) {
                queue.add(curr.left);
            }
            if (curr.right != null) {
                queue.add(curr.right);
            }
        }
        level++;
        System.out.println();
    }
}`
}
export default bfsBoilerplate;