const preorderTraversalBoilerplate = {
  python: `def preorder(root):
    if not root: 
        return
    print(root.val)
    preorder(root.left)
    preorder(root.right)
`,
    cpp: `void preorder(TreeNode* root) {
    if (!root) {
        return;
    }
    cout << root->val_ << endl;
    preorder(root->left);
    preorder(root->right);
}`,
    java: `public void preorder(TreeNode root) {
    if (root == null) {
        return;
    }
    System.out.println(root.val);
    preorder(root.left);
    preorder(root.right);
}`
}
export default preorderTraversalBoilerplate;