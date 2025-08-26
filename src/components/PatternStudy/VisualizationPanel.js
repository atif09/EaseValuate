import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import slidingWindowSteps from './animations/slidingWindowSteps';
import twoPointersSteps from './animations/twoPointersSteps';
import inPlaceReversalSteps from './animations/inPlaceReversalSteps';
import bfsSteps from './animations/bfsSteps';
import binarySearchSteps from './animations/binarySearchSteps';
import subsetsTree, {nums, getStepInfo} from './animations/subsetsTree';
import cyclicSortSteps from './animations/cyclicSortSteps';
import mergeIntervalsSteps from './animations/mergeIntervalsSteps';
import fastAndSlowPointersSteps from './animations/fastAndSlowPointers';
import topKSteps from './animations/topKSteps';
import kWayMergeSteps from './animations/kWayMergeSteps';
import bitManipulationSteps from './animations/bitManipulationSteps';
import greedySteps from './animations/greedySteps';
import inorderSteps from './animations/inorderSteps';
import preorderSteps from './animations/preorderSteps';
import postorderSteps from './animations/postorderSteps';
import dp1DSteps from './animations/dp1DSteps';
import dp2DSteps from './animations/dp2DSteps';

function VisualizationPanel({patternName, onStepChange, onReset, selectedLanguage, currentStepInfo}) {
  let steps = [];
  if(patternName === "Sliding Window") steps = slidingWindowSteps;
  else if(patternName === "Two Pointers") steps = twoPointersSteps;
  else if(patternName === "In-place Reversal of a Linked List") steps = inPlaceReversalSteps;
  else if(patternName === "Breadth-First Search (BFS)") steps = bfsSteps;
  else if(patternName === "Binary Search") steps = binarySearchSteps;
  else if(patternName === "Cyclic Sort") steps = cyclicSortSteps;
  else if(patternName === "Merge Intervals") steps = mergeIntervalsSteps;
  else if(patternName === "Fast & Slow Pointers") steps = fastAndSlowPointersSteps;
  else if(patternName === "Top K Elements (Heap)") steps = topKSteps;
  else if(patternName === "K-way Merge") steps = kWayMergeSteps;
  else if(patternName === "Bit Manipulation") steps = bitManipulationSteps;
  else if(patternName === "Greedy Algorithms") steps = greedySteps;
  else if(patternName === "Inorder Traversal (DFS)") steps = inorderSteps;
  else if(patternName === "Preorder Traversal (DFS)") steps = preorderSteps;
  else if(patternName === "Postorder Traversal (DFS)") steps = postorderSteps;
  else if(patternName === "1-Dimension DP") steps = dp1DSteps;
  else if(patternName === "2-Dimension DP") steps = dp2DSteps;

  const [revealCount, setRevealCount] = useState(1);
  const [step, setStep] = useState(0);
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;

  useEffect(() => {
    if(patternName === 'Subsets (Backtracking)') {
      setRevealCount(1);
    }
  }, [patternName]);

  useEffect(() => {
    if (patternName === 'Subsets (Backtracking)' && onStepChange) {
      const revealedIds = getRevealedNodeIds(subsetsTree, revealCount);
      const stepInfo = getStepInfo(revealCount, revealedIds, subsetsTree);
      onStepChange(revealCount, stepInfo);
    }
  }, [revealCount, patternName, onStepChange]);

  useEffect(() => {
    if (patternName === 'Sliding Window' && onStepChange && steps.length > 0) {
      onStepChange(step + 1);
    }
  }, [step, patternName, onStepChange, steps.length]);

  const nodeRefs = useRef({});
  const containerRef = useRef(null);
  const [treeReady, setTreeReady] = useState(false);

  useLayoutEffect(() => {
    if(patternName === 'Subsets (Backtracking)') {
      setTreeReady(false);
      requestAnimationFrame(() => setTreeReady(true));
    }
  }, [revealCount, patternName]);

  const generateTraversalOrder = (tree) => {
    const order = [];
    
    function dfsTraversal(node) {
      if (!node) return;
      order.push(node.id);
      if (node.i === nums.length) return;
      if (node.children[0]) dfsTraversal(node.children[0]);
      if (node.children[1]) dfsTraversal(node.children[1]);
    }
    
    dfsTraversal(tree);
    return order;
  };

  const getTotalSteps = () => {
    if (patternName === 'Subsets (Backtracking)') {
      return generateTraversalOrder(subsetsTree).length;
    }
    return steps.length;
  };

  function getRevealedNodeIds(tree, count) {
    return generateTraversalOrder(tree).slice(0, count);
  }

  function getVisibleNodeIds(tree, currentStep) {
    const traversalOrder = generateTraversalOrder(tree);
    const currentlyRevealed = traversalOrder.slice(0, currentStep);
    const visibleNodes = new Set();
    
    function addPathToRoot(nodeId) {
      const node = findNodeById(tree, nodeId);
      if (!node) return;
      visibleNodes.add(nodeId);
      const parent = findParentNode(tree, nodeId);
      if (parent) addPathToRoot(parent.id);
    }
    
    currentlyRevealed.forEach(nodeId => addPathToRoot(nodeId));
    return Array.from(visibleNodes);
  }

  function findNodeById(tree, id) {
    if (!tree) return null;
    if (tree.id === id) return tree;
    for (const child of tree.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
    return null;
  }

  function findParentNode(tree, childId) {
    if (!tree) return null;
    for (const child of tree.children) {
      if (child.id === childId) return tree;
      const found = findParentNode(child, childId);
      if (found) return found;
    }
    return null;
  }

  function renderBranches(tree, visibleIds) {
    const lines = [];
    let containerRect = null;
    let width = 0;
    let height = 0;
    
    if (containerRef.current) {
      containerRect = containerRef.current.getBoundingClientRect();
      width = containerRect.width;
      height = containerRect.height;
    }

    function dfs(node) {
      if (!node || !visibleIds.includes(node.id)) return;
      const parentEl = nodeRefs.current[node.id];
      
      node.children.forEach((child, idx) => {
        if (visibleIds.includes(child.id)) {
          const childEl = nodeRefs.current[child.id];
          if (parentEl && childEl && containerRect) {
            const parentRect = parentEl.getBoundingClientRect();
            const childRect = childEl.getBoundingClientRect();
            const x1 = parentRect.left + parentRect.width / 2 - containerRect.left;
            const y1 = parentRect.bottom - containerRect.top;
            const x2 = childRect.left + childRect.width / 2 - containerRect.left;
            const y2 = childRect.top - containerRect.top;

            const isInclude = idx === 0;
            const label = `${isInclude ? 'Include' : 'Exclude'} ${nums[node.i]}`;
            const labelColor = isInclude ? "#00e676" : "#ff5722";
            const labelX = isInclude ? x1 * 0.7 + x2 * 0.3 : x1 * 0.3 + x2 * 0.7;
            const labelY = isInclude ? y1 * 0.7 + y2 * 0.3 - 12 : y1 * 0.3 + y2 * 0.7 + 14;

            lines.push({ x1, y1, x2, y2, key: node.id + '-' + child.id, label, labelColor, labelX, labelY });
          }
        }
        dfs(child);
      });
    }
    
    dfs(tree);
    if (!width || !height) return null;
    
    return (
      <svg
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          width: width,
          height: height,
          zIndex: 0
        }}
        width={width}
        height={height}
      >
        {lines.map(line => (
          <g key={line.key}>
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.labelColor}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <text
              x={line.labelX}
              y={line.labelY}
              fill={line.labelColor}
              fontSize='13'
              fontWeight='700'
              textAnchor='middle'
              alignmentBaseline='middle'
              style={{
                paintOrder: 'stroke',
                stroke: 'rgba(5,8,15,0.9)',
                strokeWidth: 4,
                strokeLinejoin: 'round',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
              }}
            >
              {line.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  function renderTree(node, visibleIds, currentId) {
    if (!visibleIds.includes(node.id)) return null;
    
    const visibleChildren = node.children ? node.children.filter(child => visibleIds.includes(child.id)) : [];
    const hasVisibleChildren = visibleChildren.length > 0;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div
          ref={el => {if (el) nodeRefs.current[node.id] = el; }} 
          style={{
            padding: '12px 16px',
            margin: 8,
            border: node.id === currentId ? '3px solid #a120ff' : '2px solid rgba(255,255,255,0.1)',
            background: node.id === currentId 
              ? 'rgba(161,32,255,0.3)' 
              : 'rgba(35,36,58,0.9)',
            borderRadius: 10,
            color: '#fff',
            fontWeight: node.id === currentId ? 800 : 500,
            minWidth: 60,
            zIndex: 1,
            position: 'relative',
            fontSize: '15px',
            fontFamily: 'monospace',
            boxShadow: node.id === currentId 
              ? '0 0 20px rgba(161,32,255,0.5), 0 4px 15px rgba(0,0,0,0.3)' 
              : '0 4px 12px rgba(0,0,0,0.4)'
          }}>
          [{node.curSet.join(', ')}]
        </div>
        
        {hasVisibleChildren && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position: 'relative', height: 50 }}>
            {visibleChildren.map((child) => {
              const originalIdx = node.children.findIndex(c => c.id === child.id);
              const isInclude = originalIdx === 0;
              return (
                <div key={child.id} style={{ position: 'relative', margin: '0 40px', textAlign: 'center' }}>
                  <div style={{ height: 20 }} />
                  <div style={{
                    width: 3,
                    height: 40,
                    background: isInclude ? '#00e676' : '#ff5722',
                    margin: '0 auto',
                    borderRadius: '0 0 2px 2px'
                  }} />
                </div>
              );
            })}
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {visibleChildren.map(child => (
            <div key={child.id}>
              {renderTree(child, visibleIds, currentId)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (patternName === "Subsets (Backtracking)") {
    const traversalOrder = generateTraversalOrder(subsetsTree);
    const currentId = traversalOrder[revealCount - 1];
    const visibleIds = getVisibleNodeIds(subsetsTree, revealCount);
    const maxSteps = getTotalSteps();
    const currentStepInfo = getStepInfo(revealCount, getRevealedNodeIds(subsetsTree, revealCount), subsetsTree);

    function collectSubsets(tree, revealedIds, arr = []) {
      if (!tree || !revealedIds.includes(tree.id)) return arr;
      if (tree.children.length === 0) arr.push(tree.curSet);
      tree.children.forEach(child => collectSubsets(child, revealedIds, arr));
      return arr;
    }
    const revealedSubsets = collectSubsets(subsetsTree, getRevealedNodeIds(subsetsTree, revealCount), []);

    return (
      <div style={{ 
        color: '#fff',
        background: '#1a1d2e',
        borderRadius: 12,
        padding: '1.5rem',
        border: '1px solid rgba(161,32,255,0.2)'
      }}>
        <div style={{
          background: 'rgba(35,36,58,0.4)',
          border: '1px solid #a120ff',
          borderRadius: 8,
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#a120ff',
            textAlign: 'center'
          }}>
            Subsets Backtracking Algorithm
          </div>
          
          {currentStepInfo && (
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1rem',
              border: '1px solid rgba(161,32,255,0.2)'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '0.5rem',
                color: currentStepInfo.operation === 'include' ? '#00e676' : 
                       currentStepInfo.operation === 'backtrack_exclude' ? '#ff5722' :
                       currentStepInfo.operation === 'save' ? '#ffeb3b' :
                       currentStepInfo.operation === 'start' ? '#a120ff' : '#a120ff'
              }}>
                Step {currentStepInfo.step}: {currentStepInfo.title}
              </div>
              <div style={{ 
                fontSize: '14px', 
                color: '#ccc',
                lineHeight: '1.4'
              }}>
                {currentStepInfo.description}
              </div>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              textAlign: 'center'
            }}>
              <div style={{ color: '#ccc', fontSize: '14px', marginBottom: '0.25rem' }}>
                Input Array
              </div>
              <div style={{ 
                color: '#a120ff', 
                fontSize: '16px', 
                fontWeight: 700,
                fontFamily: 'monospace'
              }}>
                [{nums.join(', ')}]
              </div>
            </div>
            
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              textAlign: 'center'
            }}>
              <div style={{ color: '#ccc', fontSize: '14px', marginBottom: '0.25rem' }}>
                Subsets Found
              </div>
              <div style={{ 
                color: '#00e676', 
                fontSize: '16px', 
                fontWeight: 700
              }}>
                {revealedSubsets.length}
              </div>
            </div>
            
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              textAlign: 'center'
            }}>
              <div style={{ color: '#ccc', fontSize: '14px', marginBottom: '0.25rem' }}>
                Progress
              </div>
              <div style={{ 
                color: '#ffc107', 
                fontSize: '16px', 
                fontWeight: 700
              }}>
                {revealCount}/{maxSteps}
              </div>
            </div>
          </div>
        </div>

        <div ref={containerRef} style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          margin: '1.5rem 0',
          minHeight: 400,
          background: 'rgba(10,13,22,0.3)',
          borderRadius: 12,
          padding: '1.5rem',
          border: '1px solid rgba(161,32,255,0.2)'
        }}>
          {treeReady && renderBranches(subsetsTree, visibleIds)}
          {renderTree(subsetsTree, visibleIds, currentId)}
        </div>

        <div style={{
          background: 'rgba(35,36,58,0.4)',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#a120ff',
            textAlign: 'center'
          }}>
            Generated Subsets
          </div>
          
          <div style={{ 
            color: '#fff',
            fontSize: '16px',
            fontFamily: 'monospace',
            background: 'rgba(10,13,22,0.5)',
            padding: '1rem',
            borderRadius: 8,
            textAlign: 'center',
            lineHeight: '1.6',
            minHeight: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            [
            {revealedSubsets.map((s, i) => (
              <span key={i}>
                <span style={{color: '#00e676'}}>[{s.join(', ')}]</span>
                {i < revealedSubsets.length - 1 ? ', ' : ''}
              </span>
            ))}
            ]
          </div>
          
          <div style={{
            fontSize: '14px',
            color: '#ccc',
            textAlign: 'center',
            marginTop: '0.75rem'
          }}>
            Total: <span style={{ color: '#00e676', fontWeight: 700 }}>{revealedSubsets.length}</span> subset{revealedSubsets.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div style={{
          background: 'rgba(35,36,58,0.4)',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#a120ff',
            textAlign: 'center'
          }}>
            Legend
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(35,36,58,0.6)',
              padding: '0.5rem 0.75rem',
              borderRadius: 6
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 4,
                border: '2px solid #a120ff',
                background: '#a120ff22'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Current Node</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(35,36,58,0.6)',
              padding: '0.5rem 0.75rem',
              borderRadius: 6
            }}>
              <div style={{
                width: '20px',
                height: '4px',
                borderRadius: 2,
                background: '#00e676'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Include Branch</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(35,36,58,0.6)',
              padding: '0.5rem 0.75rem',
              borderRadius: 6
            }}>
              <div style={{
                width: '20px',
                height: '4px',
                borderRadius: 2,
                background: '#ff5722'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Exclude Branch</span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => {
              const newRevealCount = Math.max(1, revealCount - 1);
              setRevealCount(newRevealCount);
            }}
            disabled={revealCount === 1}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: revealCount === 1 ? 'rgba(255,255,255,0.1)' : '#6c757d',
              color: revealCount === 1 ? '#666' : '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: revealCount === 1 ? 'not-allowed' : 'pointer',
              opacity: revealCount === 1 ? 0.5 : 1
            }}>
            ← Previous
          </button>
          <button
            onClick={() => {
              if (revealCount < maxSteps) {
                const nextRevealCount = revealCount + 1;
                setRevealCount(nextRevealCount);
              } else {
                setRevealCount(1);
                if (onReset) onReset();
              }
            }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: revealCount >= maxSteps ? '#dc3545' : '#a120ff',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer'
            }}>
            {revealCount >= maxSteps ? 'Reset' : 'Next →'}
          </button>
        </div>
      </div>
    );
  }

  
  if (patternName === "Merge Intervals") {
  const maxSteps = steps ? steps.length : 0;
  const info = currentStepInfo || current || {};

  const renderIntervals = () => {
    if (!current || !current.intervals || !Array.isArray(current.intervals)) return null;

    const allValues = [...current.intervals.flat()];
    if (current.merged && current.merged.length > 0 && Array.isArray(current.merged)) {
      allValues.push(...current.merged.flat());
    }
    if (allValues.length === 0) return null;
    const maxVal = Math.max(...allValues) + 2;
    const scale = 500 / maxVal;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center'
      }}>
        
        <div style={{
          width: '600px',
          height: '30px',
          position: 'relative',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {Array.from({length: maxVal + 1}, (_, i) => i).filter(i => i % 2 === 0).map(tick => (
            <div key={tick} style={{
              position: 'absolute',
              left: `${(tick * scale)}px`,
              top: '100%',
              fontSize: '12px',
              color: '#888',
              transform: 'translateX(-50%)',
              marginTop: '5px'
            }}>
              {tick}
            </div>
          ))}
        </div>

        <div style={{
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#2196f3'
          }}>
            Input Intervals
          </div>
          <div style={{
            position: 'relative',
            width: '600px',
            height: '50px',
            margin: '0 auto'
          }}>
            {current.intervals && Array.isArray(current.intervals) ? current.intervals.map((interval, idx) => {
              const isCurrent = current.currentIndex === idx;
              const isChecking = current.checking && 
                current.checking[0] === interval[0] && 
                current.checking[1] === interval[1];
              
              return (
                <div key={idx} style={{
                  position: 'absolute',
                  left: `${interval[0] * scale}px`,
                  width: `${(interval[1] - interval[0]) * scale}px`,
                  height: '35px',
                  top: '7px',
                  background: (isCurrent || isChecking) ? 
                    (current.operation === 'merge' ? 'rgba(233,30,99,0.8)' : 'rgba(255,152,0,0.8)') :
                    'rgba(33,150,243,0.6)',
                  border: `2px solid ${(isCurrent || isChecking) ? 
                    (current.operation === 'merge' ? '#e91e63' : '#ff9800') : 
                    '#2196f3'}`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 700,
                  boxShadow: (isCurrent || isChecking) ? 
                    '0 4px 12px rgba(255,152,0,0.4)' : 
                    '0 2px 6px rgba(33,150,243,0.3)',
                  transition: 'all 0.3s ease',
                  transform: (isCurrent || isChecking) ? 'scale(1.05)' : 'scale(1)',
                  zIndex: (isCurrent || isChecking) ? 10 : 1
                }}>
                  [{interval[0]},{interval[1]}]
                  {(isCurrent || isChecking) && (
                    <div style={{
                      position: 'absolute',
                      top: '-25px',
                      background: current.operation === 'merge' ? '#e91e63' : '#ff9800',
                      color: '#fff',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: '10px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>
                      {current.operation === 'merge' ? 'MERGING' : 'CURRENT'}
                    </div>
                  )}
                </div>
              );
            }) : null}
          </div>
        </div>

        {current && current.merged && Array.isArray(current.merged) && current.merged.length > 0 && (
          <div style={{
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#4caf50'
            }}>
              Merged Result
            </div>
            <div style={{
              position: 'relative',
              width: '600px',
              height: '50px',
              margin: '0 auto'
            }}>
              {current.merged && Array.isArray(current.merged) ? current.merged.map((interval, idx) => {
                const isLastMerged = current.lastMerged && 
                  current.lastMerged[0] === interval[0] && 
                  current.lastMerged[1] === interval[1];
                
                return (
                  <div key={idx} style={{
                    position: 'absolute',
                    left: `${interval[0] * scale}px`,
                    width: `${(interval[1] - interval[0]) * scale}px`,
                    height: '35px',
                    top: '7px',
                    background: isLastMerged ? 'rgba(76,175,80,0.9)' : 'rgba(76,175,80,0.6)',
                    border: `2px solid ${isLastMerged ? '#4caf50' : '#66bb6a'}`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    boxShadow: isLastMerged ? 
                      '0 4px 12px rgba(76,175,80,0.4)' : 
                      '0 2px 6px rgba(76,175,80,0.3)',
                    transition: 'all 0.3s ease',
                    transform: isLastMerged ? 'scale(1.05)' : 'scale(1)',
                    zIndex: isLastMerged ? 10 : 1
                  }}>
                    [{interval[0]},{interval[1]}]
                    {isLastMerged && (
                      <div style={{
                        position: 'absolute',
                        top: '-25px',
                        background: '#4caf50',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: '10px',
                        fontWeight: 700
                      }}>
                        LAST MERGED
                      </div>
                    )}
                  </div>
                );
              }) : null}
            </div>
          </div>
        )}

        {current && current.checking && current.lastMerged && current.operation === 'check_overlap' && (
          <div style={{
            background: 'rgba(255,152,0,0.1)',
            border: '1px solid #ff9800',
            borderRadius: 12,
            padding: '1rem',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#ff9800',
              marginBottom: '0.5rem'
            }}>
              Overlap Check
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff',
              marginBottom: '0.5rem',
              fontFamily: 'monospace'
            }}>
              current.start ≤ last_merged.end
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              {current && current.checking && current.lastMerged &&
                `${current.checking[0]} ≤ ${current.lastMerged[1]} = ${current.checking[0] <= current.lastMerged[1] ? 'TRUE' : 'FALSE'}`}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ccc',
              marginTop: '0.5rem'
            }}>
              {current && current.checking && current.lastMerged && 
                (current.checking[0] <= current.lastMerged[1] ? 
                'Intervals overlap - they will be merged' : 
                'No overlap - add as separate interval')}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ color: '#fff' }}>
      {info && (
        <div style={{
          background: 'rgba(33,150,243,0.1)',
          border: '1px solid #2196f3',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: (current && current.operation === 'complete') ? '#4caf50' :
                   (current && current.operation === 'merge') ? '#e91e63' :
                   (current && current.operation === 'add_new') ? '#ff9800' :
                   '#2196f3'
          }}>
            Step {(step || 0) + 1}: {
              (current && current.operation === 'complete') ? 'Merging Complete' :
              (current && current.operation === 'merge') ? 'Merging Overlapping Intervals' :
              (current && current.operation === 'add_new') ? 'Adding Non-overlapping Interval' :
              (current && current.operation === 'check_overlap') ? 'Checking for Overlap' :
              (current && current.operation === 'initialize') ? 'Initialize with First Interval' :
              'Starting Process'
            }
          </div>
          <div style={{
            fontSize: '14px',
            color: '#ccc'
          }}>
            {(current && current.note) || ''}
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Processed: </span>
              <span style={{ color: '#2196f3', fontSize: '16px', fontWeight: 700 }}>
                {Math.max(0, (current && typeof current.currentIndex === 'number' ? Math.min(current.currentIndex + 1, current.intervals ? current.intervals.length : 0) : 0))}/{(current && current.intervals) ? current.intervals.length : 0}
              </span>
            </div>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Merged: </span>
              <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                {(current && current.merged) ? current.merged.length : 0}
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={{
        background: 'rgba(10,13,22,0.3)',
        borderRadius: 12,
        padding: '1.5rem',
        border: '1px solid rgba(33,150,243,0.2)'
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
          minHeight: '200px',
          alignItems: 'center'
        }}>
          {renderIntervals()}
        </div>

        {current && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 12,
              padding: '1rem 1.5rem',
              minWidth: '140px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#ff9800'
              }}>
                Current Interval
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.checking) ? 
                  `[${current.checking[0]},${current.checking[1]}]` : 
                  (current && current.currentIndex >= 0 && current.intervals && current.currentIndex < current.intervals.length) ?
                  `[${current.intervals[current.currentIndex][0]},${current.intervals[current.currentIndex][1]}]` :
                  'N/A'}
              </div>
            </div>

            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 12,
              padding: '1rem 1.5rem',
              minWidth: '140px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#4caf50'
              }}>
                Last Merged
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.lastMerged) ? 
                  `[${current.lastMerged[0]},${current.lastMerged[1]}]` : 
                  'None'}
              </div>
            </div>

            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 12,
              padding: '1rem 1.5rem',
              minWidth: '140px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#2196f3'
              }}>
                Action
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.operation === 'merge') ? 'MERGE' :
                 (current && current.operation === 'add_new') ? 'ADD' :
                 (current && current.operation === 'check_overlap') ? 'CHECK' :
                 (current && current.operation === 'complete') ? 'DONE' :
                 (current && current.operation === 'initialize') ? 'INIT' :
                 'START'}
              </div>
            </div>
          </div>
        )}

        {current && (
          <div style={{
            background: 'rgba(35,36,58,0.6)',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#2196f3'
            }}>
              Current Operation
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              {(current && current.operation === 'complete') ? 
                'return merged[]' :
                (current && current.operation === 'merge') ?
                'merged[-1] = [start, max(end1, end2)]' :
                (current && current.operation === 'add_new') ?
                'merged.append(current)' :
                (current && current.operation === 'check_overlap') ?
                'if current.start <= merged[-1].end' :
                (current && current.operation === 'initialize') ?
                'merged = [intervals[0]]' :
                'sort(intervals, key=lambda x: x[0])'
              }
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 500,
              color: (current && current.operation === 'complete') ? '#4caf50' :
                     (current && current.operation === 'merge') ? '#e91e63' :
                     (current && current.operation === 'add_new') ? '#ff9800' :
                     '#2196f3'
            }}>
              {(current && current.operation === 'complete') ? 
                'All intervals successfully merged' :
                (current && current.operation === 'merge') ? 
                'Combining overlapping intervals into one' :
                (current && current.operation === 'add_new') ?
                '➕ Adding non-overlapping interval to result' :
                (current && current.operation === 'check_overlap') ?
                'Determining if intervals can be merged' :
                (current && current.operation === 'initialize') ?
                'Starting with first interval as base' :
                'Sorting intervals by start time'
              }
            </div>
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => {
              const prev = Math.max(0, step - 1);
              setStep(prev);
              if (onStepChange) onStepChange(prev + 1);
            }}
            disabled={!step || step === 0}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: (!step || step === 0) ? 'rgba(255,255,255,0.1)' : '#6c757d',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: (!step || step === 0) ? 'not-allowed' : 'pointer',
              opacity: (!step || step === 0) ? 0.5 : 1
            }}
          >
            ← Previous
          </button>

          <button
            onClick={() => {
              if ((step || 0) < maxSteps - 1) {
                const next = (step || 0) + 1;
                setStep && setStep(next);
                onStepChange && onStepChange(next + 1);
              } else {
                setStep && setStep(0);
                onReset && onReset();
                onStepChange && onStepChange(1);
              }
            }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: (step || 0) >= maxSteps - 1 ? '#dc3545' : '#2196f3',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(33,150,243,0.3)'
            }}
          >
            {(step || 0) >= maxSteps - 1 ? 'Reset' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
  
  if (patternName === "Cyclic Sort") {
  const maxSteps = steps.length;
  const info = currentStepInfo || current || {};

  const renderArray = () => {
    if (!current || !current.array) return null;

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {current.array.map((value, idx) => (
          <div key={idx} style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {(current.i === idx || current.correctIdx === idx) && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '8px',
                gap: '2px'
              }}>
                {current.i === idx && (
                  <div style={{
                    background: '#2196f3',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: '10px',
                    fontWeight: 700
                  }}>
                    i
                  </div>
                )}
                {current.correctIdx === idx && current.i !== idx && (
                  <div style={{
                    background: '#ff9800',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: '10px',
                    fontWeight: 700
                  }}>
                    TARGET
                  </div>
                )}
              </div>
            )}
            
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '8px',
              border: `3px solid ${
                current.i === idx ? '#2196f3' :
                current.correctIdx === idx ? '#ff9800' :
                (current.swapIndices && current.swapIndices.includes(idx)) ? '#e91e63' :
                (current.sorted && current.sorted.includes(idx)) ? '#4caf50' :
                '#666'
              }`,
              background: 
                current.i === idx ? 'rgba(33,150,243,0.2)' :
                current.correctIdx === idx ? 'rgba(255,152,0,0.2)' :
                (current.swapIndices && current.swapIndices.includes(idx)) ? 'rgba(233,30,99,0.2)' :
                (current.sorted && current.sorted.includes(idx)) ? 'rgba(76,175,80,0.2)' :
                'rgba(255,255,255,0.1)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '18px',
              boxShadow: 
                current.i === idx ? '0 4px 12px rgba(33,150,243,0.4)' :
                current.correctIdx === idx ? '0 4px 12px rgba(255,152,0,0.4)' :
                (current.swapIndices && current.swapIndices.includes(idx)) ? '0 4px 12px rgba(233,30,99,0.4)' :
                (current.sorted && current.sorted.includes(idx)) ? '0 4px 12px rgba(76,175,80,0.4)' :
                'none',
              transition: 'all 0.3s ease',
              transform: (current.swapIndices && current.swapIndices.includes(idx)) ? 'scale(1.05)' : 'scale(1)'
            }}>
              <div>{value}</div>
              <div style={{
                fontSize: '10px',
                color: '#ccc',
                fontWeight: 500
              }}>
                [{idx}]
              </div>
              {(current.sorted && current.sorted.includes(idx)) && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  fontSize: '16px',
                  color: '#4caf50'
                }}>
                  ✓
                </div>
              )}
            </div>

            {value !== idx + 1 && !current.sorted?.includes(idx) && current.operation !== 'complete' && (
              <div style={{
                position: 'absolute',
                bottom: '-25px',
                fontSize: '12px',
                color: '#f44336',
                fontWeight: 600,
                background: 'rgba(244,67,54,0.1)',
                padding: '2px 4px',
                borderRadius: 4,
                border: '1px solid rgba(244,67,54,0.3)'
              }}>
                Should be {idx + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSwapAnimation = () => {
    if (!current.swapIndices || current.operation !== 'swap') return null;

    const [idx1, idx2] = current.swapIndices;
    return (
      <div style={{
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#e91e63',
          marginBottom: '0.5rem'
        }}>
          Swapping: Index {idx1} ↔ Index {idx2}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#ccc'
        }}>
          Moving {current.array[idx1]} to its correct position
        </div>
      </div>
    );
  };

  return (
    <div style={{ color: '#fff' }}>
      {info && (
        <div style={{
          background: 'rgba(33,150,243,0.1)',
          border: '1px solid #2196f3',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: current.operation === 'complete' ? '#4caf50' :
                   current.operation === 'swap' ? '#e91e63' :
                   current.operation === 'move' ? '#ff9800' :
                   '#2196f3'
          }}>
            Step {step + 1}: {
              current.operation === 'complete' ? 'Sorting Complete' :
              current.operation === 'swap' ? 'Swapping Elements' :
              current.operation === 'move' ? 'Moving to Next Position' :
              'Checking Position'
            }
          </div>
          <div style={{
            fontSize: '14px',
            color: '#ccc'
          }}>
            {current.note || ''}
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Current Position: </span>
              <span style={{ color: '#2196f3', fontSize: '16px', fontWeight: 700 }}>
                {current.i !== undefined ? current.i : 'N/A'}
              </span>
            </div>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Sorted: </span>
              <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                {current.sorted ? current.sorted.length : 0}/{current.array ? current.array.length : 0}
              </span>
            </div>
          </div>
        </div>
      )}

      <div ref={containerRef} style={{
        background: 'rgba(10,13,22,0.3)',
        borderRadius: 12,
        padding: '1.5rem',
        border: '1px solid rgba(33,150,243,0.2)'
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
          minHeight: '140px',
          alignItems: 'center'
        }}>
          {renderArray()}
        </div>

        {renderSwapAnimation()}

        {current && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 12,
              padding: '1rem 1.5rem',
              minWidth: '140px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#2196f3'
              }}>
                Current Index (i)
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {current.i !== undefined ? current.i : 'N/A'}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#ccc'
              }}>
                {current.i !== undefined && current.array ? 
                  `Value: ${current.array[current.i]}` : ''}
              </div>
            </div>

            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 12,
              padding: '1rem 1.5rem',
              minWidth: '140px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#ff9800'
              }}>
                Correct Position
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {current.correctIdx !== undefined && current.correctIdx !== null ? 
                  current.correctIdx : 'N/A'}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#ccc'
              }}>
                {current.i !== undefined && current.array ? 
                  `For value: ${current.array[current.i]}` : ''}
              </div>
            </div>

            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 12,
              padding: '1rem 1.5rem',
              minWidth: '140px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#4caf50'
              }}>
                Operation
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {current.operation === 'swap' ? 'SWAP' :
                 current.operation === 'move' ? 'MOVE' :
                 current.operation === 'complete' ? 'DONE' :
                 'CHECK'}
              </div>
            </div>
          </div>
        )}

        {current && (
          <div style={{
            background: 'rgba(35,36,58,0.6)',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#2196f3'
            }}>
              Algorithm Logic
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              {current.operation === 'complete' ? 
                'All elements are in positions [1...n]' :
                current.i !== undefined && current.array ?
                `nums[${current.i}] = ${current.array[current.i]}, correct_idx = ${current.array[current.i]} - 1 = ${current.correctIdx}` :
                'Calculating correct position'
              }
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 500,
              color: current.operation === 'complete' ? '#4caf50' :
                     current.operation === 'swap' ? '#e91e63' :
                     current.operation === 'move' ? '#ff9800' :
                     '#2196f3'
            }}>
              {current.operation === 'complete' ? 
                'Cyclic sort completed successfully' :
                current.operation === 'swap' ? 
                'Swapping to place element in correct position' :
                current.operation === 'move' ?
                'Element is in correct position, moving forward' :
                'Checking if element is in correct position'
              }
            </div>
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => {
              const prev = Math.max(0, step - 1);
              setStep(prev);
              if (onStepChange) onStepChange(prev + 1);
            }}
            disabled={step === 0}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: step === 0 ? 'rgba(255,255,255,0.1)' : '#6c757d',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              opacity: step === 0 ? 0.5 : 1
            }}
          >
            ← Previous
          </button>

          <button
            onClick={() => {
              if (step < maxSteps - 1) {
                const next = step + 1;
                setStep(next);
                if (onStepChange) onStepChange(next + 1);
              } else {
                setStep(0);
                if (onReset) onReset();
                if (onStepChange) onStepChange(1);
              }
            }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: step >= maxSteps - 1 ? '#dc3545' : '#2196f3',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(33,150,243,0.3)'
            }}
          >
            {step >= maxSteps - 1 ? 'Reset' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

  if (patternName === "1-Dimension DP") {
    const maxSteps = steps.length;
    const info = currentStepInfo || current || {};

    const renderHouse = (value, index, isHighlighted = false, isCurrent = false, isRobbed = false, isSkipped = false) => {
      const houseColor = isCurrent ? '#a120ff' : 
                         isRobbed ? '#4caf50' :
                         isSkipped ? '#dc3545' :
                         isHighlighted ? '#ff9800' :
                         '#666';
      const houseBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                              isRobbed ? 'rgba(76,175,80,0.2)' : 
                              isSkipped ? 'rgba(220,53,69,0.2)' :
                              isHighlighted ? 'rgba(255,152,0,0.2)' :
                              'rgba(255,255,255,0.1)';
      
      return (
        <div
          key={`house-${index}`}
          style={{
            width: '80px',
            height: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: `3px solid ${houseColor}`,
            borderRadius: '12px 12px 8px 8px',
            fontSize: '18px',
            fontWeight: isCurrent ? '700' : '600',
            background: houseBackground,
            color: '#fff',
            position: 'relative',
            filter: isCurrent ? 'drop-shadow(0 0 15px rgba(161,32,255,0.6))' : 'none',
            transition: 'all 0.4s ease'
          }}>
          
       
          <div style={{
            position: 'absolute',
            top: '-15px',
            width: '0',
            height: '0',
            borderLeft: '40px solid transparent',
            borderRight: '40px solid transparent',
            borderBottom: `20px solid ${houseColor}`,
          }}></div>
          
   
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#FFD700'
          }}>
            ${value}
          </div>
          
       
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            fontSize: '12px',
            color: '#ccc',
            fontWeight: '600'
          }}>
            House {index}
          </div>
          
       
          {isCurrent && (
            <div style={{
              position: 'absolute',
              top: '-45px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#a120ff',
              whiteSpace: 'nowrap'
            }}>
              CURRENT
            </div>
          )}
          
       
          {(isRobbed || isSkipped) && (
            <div style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              fontSize: '16px'
            }}>
              {isRobbed ? '✓' : '✗'}
            </div>
          )}
        </div>
      );
    };

    const renderDPCell = (value, index, isCurrent = false) => {
      const cellColor = isCurrent ? '#a120ff' : '#4caf50';
      const cellBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 'rgba(76,175,80,0.2)';
      
      return (
        <div
          key={`dp-${index}`}
          style={{
            width: '80px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `3px solid ${cellColor}`,
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: isCurrent ? '700' : '600',
            background: cellBackground,
            color: '#fff',
            position: 'relative',
            filter: isCurrent ? 'drop-shadow(0 0 10px rgba(161,32,255,0.5))' : 'none',
            transition: 'all 0.3s ease'
          }}>
          ${value || 0}
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            fontSize: '12px',
            color: '#ccc',
            fontWeight: '600'
          }}>
            dp[{index}]
          </div>
        </div>
      );
    };

    const renderDecisionBox = () => {
      if (!current.comparison) return null;
      
      return (
        <div style={{
          background: 'rgba(35,36,58,0.6)',
          borderRadius: 12,
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '2px solid rgba(161,32,255,0.3)'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#a120ff',
            textAlign: 'center'
          }}>
            Decision: dp[{current.currentIndex}] = max(dp[{current.currentIndex-1}], dp[{current.currentIndex-2}] + houses[{current.currentIndex}])
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              background: 'rgba(220,53,69,0.2)',
              border: '2px solid #dc3545',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#dc3545', fontWeight: '700', fontSize: '14px' }}>
                DON'T ROB
              </div>
              <div style={{ color: '#fff', fontSize: '20px', fontWeight: '700' }}>
                ${current.comparison.dontRob}
              </div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>
                (keep previous max)
              </div>
            </div>
            
            <div style={{
              fontSize: '24px',
              color: '#ff9800',
              fontWeight: '700'
            }}>
              VS
            </div>
            
            <div style={{
              padding: '1rem 1.5rem',
              background: 'rgba(76,175,80,0.2)',
              border: '2px solid #4caf50',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#4caf50', fontWeight: '700', fontSize: '14px' }}>
                ROB THIS HOUSE
              </div>
              <div style={{ color: '#fff', fontSize: '20px', fontWeight: '700' }}>
                ${current.comparison.robCurrentTotal}
              </div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>
                (${current.comparison.robCurrent - current.currentHouse} + ${current.currentHouse})
              </div>
            </div>
            
            {current.comparison.robCurrentTotal !== undefined && (
              <>
                <div style={{
                  fontSize: '24px',
                  color: '#a120ff',
                  fontWeight: '700'
                }}>
                  →
                </div>
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(161,32,255,0.2)',
                  border: '2px solid #a120ff',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#a120ff', fontWeight: '700', fontSize: '14px' }}>
                    CHOOSE
                  </div>
                  <div style={{ color: '#fff', fontSize: '24px', fontWeight: '700' }}>
                    ${Math.max(current.comparison.dontRob, current.comparison.robCurrentTotal)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    };

    const isHouseRobbed = (index) => {
      return current.robbedHouses && current.robbedHouses.includes(index);
    };

    const isHouseSkipped = (index) => {
      if (current.phase === 'complete') {
        return current.robbedHouses && !current.robbedHouses.includes(index);
      }
      return current.decision === 'skip' && current.currentIndex === index;
    };

    return (
      <div style={{color: '#fff'}}>
        {info && (
          <div style={{
            background: 'rgba(161,32,255,0.1)',
            border: '1px solid #a120ff',
            borderRadius: 12,
            padding: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: '#a120ff'
            }}>
              Step {step+1}: {info.title || `House Robber Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '0.5rem'
            }}>
              {current.note || ''}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ff9800',
              fontStyle: 'italic'
            }}>
              Rule: Cannot rob adjacent houses - dp[i] = max(dp[i-1], dp[i-2] + houses[i])
            </div>
          </div>
        )}

        <div style={{
          background: 'rgba(10,13,22,0.3)',
          borderRadius: 12,
          padding: '1.5rem',
          border: '1px solid rgba(161,32,255,0.2)'
        }}>
          
          
          <div style={{
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#FFD700',
              textAlign: 'center'
            }}>
              Houses with Money
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              {current.houses && current.houses.map((value, index) => 
                renderHouse(
                  value, 
                  index, 
                  current.currentIndex === index,
                  current.currentIndex === index,
                  isHouseRobbed(index),
                  isHouseSkipped(index)
                )
              )}
            </div>
          </div>

         
          {(current.phase === 'comparing' || current.phase === 'updating') && renderDecisionBox()}

         
          {current.dp && current.dp.length > 0 && (
            <div style={{
              marginBottom: '2rem'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#4caf50',
                textAlign: 'center'
              }}>
                DP Array (Maximum Money Up To Each House)
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                {current.dp.map((value, index) => 
                  renderDPCell(
                    value, 
                    index, 
                    current.currentIndex === index
                  )
                )}
              </div>
            </div>
          )}

       
          {current && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'rgba(35,36,58,0.6)',
                borderRadius: 12,
                padding: '1rem 1.5rem',
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4caf50'
                }}>
                  Maximum Money So Far
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#FFD700',
                  fontFamily: 'monospace'
                }}>
                  ${current.maxMoney}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  {current.result !== undefined ? `Final Result: $${current.result}` : 'In progress...'}
                </div>
              </div>

              <div style={{
                background: 'rgba(35,36,58,0.6)',
                borderRadius: 12,
                padding: '1rem 1.5rem',
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#a120ff'
                }}>
                  Current Decision
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff'
                }}>
                  {current.phase === 'initialize' ? 'Planning Strategy' :
                   current.phase === 'setup' ? 'Preparing DP Array' :
                   current.phase === 'base_case' ? 'Setting Base Cases' :
                   current.phase === 'comparing' ? 'Evaluating Options' :
                   current.phase === 'updating' ? (current.decision === 'rob' ? '✓ Rob This House' : '✗ Skip This House') :
                   current.phase === 'complete' ? 'Heist Complete!' :
                   'Processing...'}
                </div>
              </div>
            </div>
          )}

      
          {current.phase === 'complete' && current.robbedHouses && (
            <div style={{
              background: 'rgba(76,175,80,0.1)',
              border: '2px solid #4caf50',
              borderRadius: 12,
              padding: '1.5rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#4caf50'
              }}>
                Optimal Strategy Found!
              </div>
              <div style={{
                fontSize: '16px',
                color: '#fff',
                marginBottom: '0.5rem'
              }}>
                Rob houses: {current.robbedHouses.join(', ')} for maximum ${current.result}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#ccc'
              }}>
                No adjacent houses robbed - police not alerted!
              </div>
            </div>
          )}

  
          <div style={{
            background: 'rgba(35,36,58,0.6)',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#a120ff'
            }}>
              How House Robber DP Works
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              lineHeight: 1.5
            }}>
              {current.phase === 'initialize' ? 'We want to rob houses for maximum money, but cannot rob adjacent houses (police will be alerted).' :
               current.phase === 'setup' ? 'Create DP array where dp[i] represents maximum money we can rob from houses 0 to i.' :
               current.phase === 'base_case' ? 'Base cases: dp[0] = first house value, dp[1] = max of first two houses.' :
               current.phase === 'comparing' ? 'For each house, we choose: either rob it (dp[i-2] + house[i]) or skip it (dp[i-1]).' :
               current.phase === 'updating' ? 'We always pick the option that gives us more money - this is the optimal substructure!' :
               current.phase === 'complete' ? 'The final answer is dp[n-1] - maximum money from optimally robbing the street!' :
               'At each house, we face a decision: rob this house (and skip the previous) or skip this house (and keep previous maximum).'}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,193,7,0.1)',
            border: '1px solid #ffc107',
            borderRadius: 12,
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#ffc107'
            }}>
              DP Core Principle
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              <strong>Optimal Substructure:</strong> The optimal solution for robbing houses 0→i depends on optimal solutions for smaller subproblems (0→i-1 and 0→i-2).
            </div>
          </div>

       
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={() => {
                const prev = Math.max(0, step-1);
                setStep(prev);
                if (onStepChange) onStepChange(prev+1);
              }}
              disabled={step === 0}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 8,
                border: 'none',
                background: step === 0 ? 'rgba(255,255,255,0.1)' : '#6c757d',
                color: '#fff',
                fontWeight: 600,
                fontSize: '14px',
                cursor: step === 0 ? 'not-allowed' : 'pointer',
                opacity: step === 0 ? 0.5 : 1
              }}>
              ← Previous
            </button>

            <button
              onClick={() => {
                if (step < maxSteps-1) {
                  const next = step+1;
                  setStep(next);
                  if (onStepChange) onStepChange(next+1);
                } else {
                  setStep(0);
                  if (onReset) onReset();
                  if (onStepChange) onStepChange(1);
                }
              }}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 8,
                border: 'none',
                background: step >= maxSteps - 1 ? '#dc3545' : '#a120ff',
                color: '#fff',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(161,32,255,0.3)'
              }}>
              {step >= maxSteps - 1 ? 'Reset' : 'Next →'}
            </button>
          </div>

          
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(35,36,58,0.4)',
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'rgba(161,32,255,0.2)',
                border: '2px solid #a120ff',
                borderRadius: '4px'
              }}></div>
              <span style={{ fontSize: '12px', color: '#ccc' }}>Current House</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'rgba(76,175,80,0.2)',
                border: '2px solid #4caf50',
                borderRadius: '4px'
              }}></div>
              <span style={{ fontSize: '12px', color: '#ccc' }}>Robbed House</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'rgba(220,53,69,0.2)',
                border: '2px solid #dc3545',
                borderRadius: '4px'
              }}></div>
              <span style={{ fontSize: '12px', color: '#ccc' }}>Skipped House</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'rgba(76,175,80,0.2)',
                border: '2px solid #4caf50',
                borderRadius: '4px'
              }}></div>
              <span style={{ fontSize: '12px', color: '#ccc' }}>DP Array</span>
            </div>
          </div>
        </div>
      </div>
    );
}

  if (patternName === "2-Dimension DP") {
  const maxSteps = steps.length;
  const info = currentStepInfo || current || {};

  return (
    <div style={{ color: '#fff' }}>
      {info && (
        <div style={{
          background: 'rgba(161,32,255,0.1)',
          border: '1px solid #a120ff',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: info.phase === 'initialize' ? '#2196f3' :
                   info.phase === 'setup' ? '#2196f3' :
                   info.phase === 'base_case_rows' ? '#ff9800' :
                   info.phase === 'base_case_cols' ? '#ff9800' :
                   info.phase === 'calculating' ? '#4caf50' :
                   info.phase === 'updating' ? '#4caf50' :
                   info.phase === 'complete' ? '#9c27b0' :
                   '#a120ff'
          }}>
            Step {step + 1}: {
              info.phase === 'initialize' ? 'Initialize Problem' :
              info.phase === 'setup' ? 'Setup DP Grid' :
              info.phase === 'base_case_rows' ? 'Fill Base Case (First Column)' :
              info.phase === 'base_case_cols' ? 'Fill Base Case (First Row)' :
              info.phase === 'calculating' ? 'Calculate Cell Value' :
              info.phase === 'updating' ? 'Update DP Grid' :
              info.phase === 'complete' ? 'Solution Complete!' :
              `Step ${step + 1}`
            }
          </div>
          <div style={{
            fontSize: '14px',
            color: '#ccc',
            marginBottom: '1rem'
          }}>
            {info.note || ''}
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Grid Size: </span>
              <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                {info.m}×{info.n}
              </span>
            </div>
            {info.currentRow >= 0 && info.currentCol >= 0 && (
              <div style={{
                background: 'rgba(35,36,58,0.6)',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                display: 'inline-block'
              }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Current Cell: </span>
                <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                  ({info.currentRow}, {info.currentCol})
                </span>
              </div>
            )}
            {info.totalPaths > 0 && (
              <div style={{
                background: 'rgba(35,36,58,0.6)',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                display: 'inline-block'
              }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Total Paths: </span>
                <span style={{ color: '#9c27b0', fontSize: '16px', fontWeight: 700 }}>
                  {info.totalPaths}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div ref={containerRef} style={{
        background: 'rgba(10,13,22,0.3)',
        borderRadius: 12,
        padding: '1.5rem',
        border: '1px solid rgba(161,32,255,0.2)'
      }}>


        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          {current && current.dp && Array.isArray(current.dp) ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#a120ff',
                marginBottom: '0.5rem'
              }}>
                Dynamic Programming Grid
              </div>
              {current.dp.map((row, rowIdx) => (
                <div key={rowIdx} style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  {row.map((cell, colIdx) => {
                    const isCurrentCell = current.currentRow === rowIdx && current.currentCol === colIdx;
                    const isBaseCase = (rowIdx === 0 || colIdx === 0) && cell > 0;
                    const isDestination = rowIdx === current.m - 1 && colIdx === current.n - 1 && current.phase === 'complete';
                    
                    return (
                      <div key={colIdx} style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                 
                        <div style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: 8,
                          border: `3px solid ${
                            isDestination ? '#9c27b0' :
                            isCurrentCell ? '#4caf50' :
                            isBaseCase ? '#ff9800' :
                            cell > 0 ? '#a120ff' :
                            'rgba(255,255,255,0.3)'
                          }`,
                          background: 
                            isDestination ? 'rgba(156,39,176,0.3)' :
                            isCurrentCell ? 'rgba(76,175,80,0.2)' :
                            isBaseCase ? 'rgba(255,152,0,0.2)' :
                            cell > 0 ? 'rgba(161,32,255,0.2)' :
                            'rgba(255,255,255,0.05)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: cell > 0 ? 700 : 400,
                          fontSize: '18px',
                          boxShadow: 
                            isDestination ? '0 4px 16px rgba(156,39,176,0.4)' :
                            isCurrentCell ? '0 4px 12px rgba(76,175,80,0.3)' :
                            isBaseCase ? '0 4px 12px rgba(255,152,0,0.3)' :
                            cell > 0 ? '0 2px 8px rgba(161,32,255,0.2)' : 'none',
                          transition: 'all 0.3s ease'
                        }}>
                          {cell}
                        </div>
                        
                     
                        <div style={{
                          fontSize: '10px',
                          color: isCurrentCell ? '#4caf50' : '#666',
                          marginTop: '4px',
                          fontWeight: 600
                        }}>
                          ({rowIdx},{colIdx})
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#bfb3ff' }}>Loading grid...</div>
          )}
        </div>

  
        {current && (current.fromTop !== undefined || current.fromLeft !== undefined) && (
          <div style={{
            background: 'rgba(35,36,58,0.6)',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#4caf50'
            }}>
              Calculation for Cell ({current.currentRow}, {current.currentCol})
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              <div style={{
                background: 'rgba(76,175,80,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: '2px solid #4caf50'
              }}>
                From Top: <span style={{ color: '#4caf50' }}>{current.fromTop}</span>
              </div>
              <div style={{ color: '#fff', fontSize: '20px' }}>+</div>
              <div style={{
                background: 'rgba(33,150,243,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: '2px solid #2196f3'
              }}>
                From Left: <span style={{ color: '#2196f3' }}>{current.fromLeft}</span>
              </div>
              <div style={{ color: '#fff', fontSize: '20px' }}>=</div>
              <div style={{
                background: 'rgba(161,32,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: '2px solid #a120ff'
              }}>
                Result: <span style={{ color: '#a120ff' }}>{current.fromTop + current.fromLeft}</span>
              </div>
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              Each cell stores the number of unique paths to reach that position
            </div>
          </div>
        )}

    
        <div style={{
          background: 'rgba(35,36,58,0.6)',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#a120ff',
            textAlign: 'center'
          }}>
            Legend
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 4,
                border: '2px solid #ff9800',
                background: 'rgba(255,152,0,0.2)'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Base Case</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 4,
                border: '2px solid #4caf50',
                background: 'rgba(76,175,80,0.2)'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Current Cell</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 4,
                border: '2px solid #a120ff',
                background: 'rgba(161,32,255,0.2)'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Calculated</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 4,
                border: '2px solid #9c27b0',
                background: 'rgba(156,39,176,0.3)'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Destination</span>
            </div>
          </div>
        </div>

        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => {
              const prev = Math.max(0, step - 1);
              setStep(prev);
              if (onStepChange) onStepChange(prev + 1);
            }}
            disabled={step === 0}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: step === 0 ? 'rgba(255,255,255,0.1)' : '#6c757d',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              opacity: step === 0 ? 0.5 : 1
            }}
          >
            ← Previous
          </button>

          <button
            onClick={() => {
              if (step < maxSteps - 1) {
                const next = step + 1;
                setStep(next);
                if (onStepChange) onStepChange(next + 1);
              } else {
                setStep(0);
                if (onReset) onReset();
                if (onStepChange) onStepChange(1);
              }
            }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: step >= maxSteps - 1 ? '#dc3545' : '#a120ff',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(161,32,255,0.3)'
            }}
          >
            {step >= maxSteps - 1 ? 'Reset' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}


  if (patternName === "Sliding Window") {
  const maxSteps = steps.length;
  const info = currentStepInfo || current || {};

  return (
    <div style={{ color: '#fff' }}>
      {info && (
        <div style={{
          background: 'rgba(161,32,255,0.1)',
          border: '1px solid #a120ff',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: info.operation === 'expand' ? '#4caf50' : 
                   info.operation === 'shrink' ? '#ff9800' :
                   info.operation === 'duplicate_found' ? '#f44336' :
                   info.operation === 'initialize' ? '#2196f3' :
                   '#a120ff'
          }}>
            Step {step + 1}: {info.title || (info.step ? `Step ${info.step}` : `Step ${step + 1}`)}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#ccc'
          }}>
            {info.description || ''}
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Window Size (k): </span>
              <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                {info.k || current.k}
              </span>
            </div>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Current Size: </span>
              <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                {current.RIGHT !== undefined && current.LEFT !== undefined ? 
                  Math.max(0, current.RIGHT - current.LEFT + 1) : 0}
              </span>
            </div>
          </div>
        </div>
      )}

      <div ref={containerRef} style={{
        background: 'rgba(10,13,22,0.3)',
        borderRadius: 12,
        padding: '1.5rem',
        border: '1px solid rgba(161,32,255,0.2)'
      }}>

        {/* Array Visualization */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          {current && Array.isArray(current.arr) ? (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {current.arr.map((num, idx) => {
                const isLeft = current.LEFT === idx;
                const isRight = current.RIGHT === idx;
                const inWindow = idx >= current.LEFT && idx <= current.RIGHT;
                const isDuplicate = current.window && current.window.filter(x => x === num).length > 1;
                
                return (
                  <div key={idx} style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    {/* Top Labels */}
                    {(isLeft || isRight) && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        {isLeft && (
                          <div style={{
                            background: '#2196f3',
                            color: '#fff',
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontSize: '11px',
                            fontWeight: 700,
                            marginBottom: '2px'
                          }}>
                            LEFT
                          </div>
                        )}
                        {isRight && (
                          <div style={{
                            background: '#4caf50',
                            color: '#fff',
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontSize: '11px',
                            fontWeight: 700,
                            marginBottom: '2px'
                          }}>
                            RIGHT
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Array Element */}
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: 12,
                      border: `3px solid ${
                        isDuplicate && inWindow ? '#f44336' :
                        inWindow ? '#a120ff' :
                        'rgba(255,255,255,0.3)'
                      }`,
                      background: 
                        isDuplicate && inWindow ? 'rgba(244,67,54,0.2)' :
                        inWindow ? 'rgba(161,32,255,0.2)' :
                        'rgba(255,255,255,0.05)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: inWindow ? 700 : 400,
                      fontSize: '18px',
                      boxShadow: 
                        isDuplicate && inWindow ? '0 4px 12px rgba(244,67,54,0.4)' :
                        inWindow ? '0 4px 12px rgba(161,32,255,0.3)' : 'none',
                      opacity: 1,
                      transition: 'all 0.3s ease'
                    }}>
                      {num}
                    </div>
                    
                    {/* Index Label */}
                    <div style={{
                      fontSize: '12px',
                      color: inWindow ? '#a120ff' : '#666',
                      marginTop: '4px',
                      fontWeight: 600
                    }}>
                      [{idx}]
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ color: '#bfb3ff' }}>No array data available</div>
          )}
        </div>

        {/* Pointer Status Panels */}
        {current && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 12,
              padding: '1rem 1.5rem',
              minWidth: '160px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#2196f3'
              }}>
                LEFT Pointer
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#fff'
              }}>
                Index: {current.LEFT !== undefined ? current.LEFT : '-'}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#ccc'
              }}>
                Value: {current.arr && current.LEFT !== undefined ? current.arr[current.LEFT] : '-'}
              </div>
            </div>

            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 12,
              padding: '1rem 1.5rem',
              minWidth: '160px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#4caf50'
              }}>
                RIGHT Pointer
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#fff'
              }}>
                Index: {current.RIGHT !== undefined ? current.RIGHT : '-'}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#ccc'
              }}>
                Value: {current.arr && current.RIGHT !== undefined ? current.arr[current.RIGHT] : '-'}
              </div>
            </div>
          </div>
        )}

        {/* Window Contents Display */}
        {current && current.window && (
          <div style={{
            background: 'rgba(35,36,58,0.6)',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#a120ff'
            }}>
              Current Window Contents
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              [{current.window.join(', ')}]
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '1rem'
            }}>
              Window Size: {current.window.length} / k = {current.k}
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: current.operation === 'duplicate_found' ? '#f44336' :
                     current.window.length > current.k ? '#ff9800' :
                     current.window.length === current.k ? '#4caf50' :
                     '#2196f3'
            }}>
              {current.operation === 'duplicate_found' ? 'Duplicate Found!' :
               current.window.length > current.k ? 'Window too large - need to shrink' :
               current.window.length === current.k ? 'Window at optimal size' :
               '➕ Building window...'}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => {
              const prev = Math.max(0, step - 1);
              setStep(prev);
              if (onStepChange) onStepChange(prev + 1);
            }}
            disabled={step === 0}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: step === 0 ? 'rgba(255,255,255,0.1)' : '#6c757d',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              opacity: step === 0 ? 0.5 : 1
            }}
          >
            ← Previous
          </button>

          <button
            onClick={() => {
              if (step < maxSteps - 1) {
                const next = step + 1;
                setStep(next);
                if (onStepChange) onStepChange(next + 1);
              } else {
                setStep(0);
                if (onReset) onReset();
                if (onStepChange) onStepChange(1);
              }
            }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: step >= maxSteps - 1 ? '#dc3545' : '#a120ff',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(161,32,255,0.3)'
            }}
          >
            {step >= maxSteps - 1 ? 'Reset' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
}
export default VisualizationPanel;