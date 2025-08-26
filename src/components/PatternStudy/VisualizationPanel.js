import React from 'react';


import BacktrackingVisualization from './visualizations/BacktrackingVisualization';
import BfsVisualization from './visualizations/BfsVisualization';
import BinarySearchVisualization from './visualizations/BinarySearchVisualization';
import BitManipulationVisualization from './visualizations/BitManipulationVisualization';
import CyclicSortVisualization from './visualizations/CyclicSortVisualization';
import FastSlowPointersVisualization from './visualizations/FastSlowPointersVisualization';
import GreedyVisualization from './visualizations/GreedyVisualization';
import InorderTraversalVisualization from './visualizations/InorderTraversalVisualization';
import KWayMergeVisualization from './visualizations/KWayMergeVisualization';
import LlReversalVisualization from './visualizations/LlReversalVisualization';
import MergeIntervalsVisualization from './visualizations/MergeIntervalsVisualization';
import OneDDpVisualization from './visualizations/OneDDpVisualization';
import PostorderVisualization from './visualizations/PostorderVisualization';
import PreorderTraversalVisualization from './visualizations/PreorderTraversalVisualization';
import SlidingWindowVisualization from './visualizations/SlidingWindowVisualization';
import TopKElementsVisualization from './visualizations/TopKElementsVisualization';
import TwoDDpVisualization from './visualizations/TwoDDpVisualization';
import TwoPointersVisualization from './visualizations/TwoPointersVisualization';

const visualizationMap = {
  'Subsets (Backtracking)': BacktrackingVisualization,
  'Breadth-First Search (BFS)': BfsVisualization,
  'Binary Search': BinarySearchVisualization,
  'Bit Manipulation': BitManipulationVisualization,
  'Cyclic Sort': CyclicSortVisualization,
  'Fast & Slow Pointers': FastSlowPointersVisualization,
  'Greedy Algorithms': GreedyVisualization,
  'Inorder Traversal (DFS)': InorderTraversalVisualization,
  'K-Way Merge': KWayMergeVisualization,
  'In-place Reversal of a Linked List': LlReversalVisualization,
  'Merge Intervals': MergeIntervalsVisualization,
  '1-Dimension DP': OneDDpVisualization,
  'Postorder Traversal (DFS)': PostorderVisualization,
  'Preorder Traversal (DFS)': PreorderTraversalVisualization,
  'Sliding Window': SlidingWindowVisualization,
  'Top K Elements (Heap)': TopKElementsVisualization,
  '2-Dimension DP': TwoDDpVisualization,
  'Two Pointers': TwoPointersVisualization,
};

function VisualizationPanel({
  patternName,
  onStepChange,
  onReset,
  currentStepInfo,
  ...restProps
}) {
  const VisualizationComponent = visualizationMap[patternName];

  if (!VisualizationComponent) {
    return (
      <div style={{
        color: '#fff',
        background: 'rgba(30,32,48,0.8)',
        borderRadius: 12,
        padding: '2rem',
        textAlign: 'center',
        border: '1px solid rgba(161,32,255,0.2)'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '1rem' }}>
          No Visualization Available
        </div>
        <div style={{ fontSize: '16px', color: '#ccc' }}>
          Visualization for <strong>{patternName}</strong> is not implemented yet.
        </div>
      </div>
    );
  }

  return (
    <VisualizationComponent
      onStepChange={onStepChange}
      onReset={onReset}
      currentStepInfo={currentStepInfo}
      {...restProps}
    />
  );
}

export default VisualizationPanel;
  

        