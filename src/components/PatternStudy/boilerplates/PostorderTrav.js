const postorderTraversalBoilerplate = {
  python: `def postorder(root):
    if not root:
        return
    postorder(root.left)
    postorder(root.right)
    print(root.val)
`,
    cpp: `void postorder(TreeNode* root) {
    if (!root) {
        return;
    }
    postorder(root->left);
    postorder(root->right);
    cout << root->val_ << endl; 
}`,
    java: `public void postorder(TreeNode root) {
    if (root == null) {
        return;
    }
    postorder(root.left);
    postorder(root.right);
    System.out.println(root.val);
}`
}
export default postorderTraversalBoilerplate;