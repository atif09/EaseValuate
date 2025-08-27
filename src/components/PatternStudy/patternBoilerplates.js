import slidingWindowBoilerplate from "./boilerplates/SlidingWindow";
import twoPointersBoilerplate from "./boilerplates/TwoPointers";
import fastAndSlowPointersBoilerplate from "./boilerplates/FastAndSlowPointers";
import mergeIntervalsBoilerplate from "./boilerplates/MergeIntervals";
import cyclicSortBoilerplate from "./boilerplates/CyclicSort"; 
import LLReversalBoilerplate from "./boilerplates/LlReversal";
import bfsBoilerplate from "./boilerplates/BFS";
import inorderTraversalBoilerplate from "./boilerplates/InorderTraversal"; 
import preorderTraversalBoilerplate from "./boilerplates/PreorderTraversal"; 
import postorderTraversalBoilerplate from "./boilerplates/PostorderTraversal";
import topKElementsBoilerplate from "./boilerplates/TopKElements";
import kWayMergeBoilerplate from "./boilerplates/KWayMerge";
import backtrackingBoilerplate from "./boilerplates/Backtracking";
import bitManipulationBoilerplate from "./boilerplates/BitManipulation";
import oneDDPBoilerplate from "./boilerplates/OneDDP";
import twoDDPBoilerplate from "./boilerplates/TwoDDP";
import greedyAlgorithmsBoilerplate from "./boilerplates/GreedyAlgorithms";
import binarySearchBoilerplate from "./boilerplates/BinarySearch";

const patternBoilerplates = {
  "Sliding Window": slidingWindowBoilerplate,
  "Two Pointers": twoPointersBoilerplate,
  "Fast & Slow Pointers": fastAndSlowPointersBoilerplate,
  "Merge Intervals": mergeIntervalsBoilerplate,
  "Cyclic Sort": cyclicSortBoilerplate,
  "In-place Reversal of a Linked List": LLReversalBoilerplate,
  "Breadth-First Search (BFS)": bfsBoilerplate,
  "Inorder Traversal (DFS)": inorderTraversalBoilerplate,
  "Preorder Traversal (DFS)": preorderTraversalBoilerplate,
  "Postorder Traversal (DFS)": postorderTraversalBoilerplate,
  "Top K Elements (Heap)": topKElementsBoilerplate,
  "K-way Merge": kWayMergeBoilerplate,
  "Subsets (Backtracking)": backtrackingBoilerplate,
  "Bit Manipulation": bitManipulationBoilerplate,
  "1-Dimension DP": oneDDPBoilerplate,
  "2-Dimension DP": twoDDPBoilerplate,
  "Greedy Algorithms": greedyAlgorithmsBoilerplate,
  "Binary Search": binarySearchBoilerplate
};
export default patternBoilerplates;