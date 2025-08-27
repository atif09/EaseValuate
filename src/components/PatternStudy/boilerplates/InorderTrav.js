const inorderTraversalBoilerplate = {
  python: `def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.val)
    inorder(root.right)
`,
    cpp: `void inorder(TreeNode* root) {
    if(!root) {
        return;
    }
    inorder(root->left);
    cout << root->val_ << endl;
    inorder(root->right);
}`,
    java: `public void inorder(TreeNode root) {
    if(root == null) {
        return;
    }
    inorder(root.left);
    System.out.println(root.val);
    inorder(root.right);
}`,
}
export default inorderTraversalBoilerplate;