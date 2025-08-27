const binarySearchBoilerplate = {
  python: `def binarySearch(arr, target): 
    LEFT, RIGHT = 0, len(arr) - 1
        
    while LEFT <= RIGHT:
        MID = (LEFT + RIGHT) // 2
        if target > arr[MID]:
            LEFT = MID + 1
        elif target < arr[MID]:
            RIGHT = MID - 1
        else: 
            return MID
    return -1
`,
    cpp: `int binarySearch(vector<int> arr, int target) {
    int LEFT = 0, RIGHT = arr.size();
    while (LEFT<=RIGHT) {
        int MID = (LEFT + RIGHT) / 2;
        if (target > arr[MID]) {
            LEFT = MID + 1;
        } else if (target < arr[MID]) {
            RIGHT = MID - 1;
        } else {
            return MID;
        }
    }
    return -1;
}`,
    java: `public static int binarySearch(int[] arr, int target) {
    int LEFT = 0, RIGHT = arr.length - 1;
    int MID
    
    while (LEFT <= RIGHT) {
        MID = (LEFT + RIGHT) / 2;
        if (target > arr[MID]) {
            LEFT = MID + 1;
        } else if (target < arr[MID]) {
            RIGHT = MID - 1;
        } else {
            return MID;
        }
    }
    return -1;
}`
}
export default binarySearchBoilerplate;