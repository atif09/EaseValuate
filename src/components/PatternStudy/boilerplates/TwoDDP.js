const twoDDPBoilerplate = {
  python: `def unique_paths(m, n):
    if m == 0 or n == 0:
        return 0
    dp = [[0] * n for _ in range(m)]
    for i in range(m):
        dp[i][0] = 1
    for j in range(n):
        dp[0][j] = 1
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]`,

    cpp: `int uniquePaths(int m, int n) {
    if(m == 0 || n == 0) return 0;
    vector<vector<int>> dp(m, vector<int>(n, 0));
    for(int i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for(int j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}`,

    java: `public int uniquePaths(int m, int n) {
    if(m == 0 || n == 0) return 0;
    int[][] dp = new int[m][n];
    for(int i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for(int j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}`
}
export default twoDDPBoilerplate;