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
  const containerRef= useRef(null);
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
      
      
      if (node.i === nums.length) {
        return;
      }
      
      
      if (node.children[0]) {
        dfsTraversal(node.children[0]);
      }
      
      
      if (node.children[1]) {
        dfsTraversal(node.children[1]);
      }
    }
    
    dfsTraversal(tree);
    return order;
  };

  const getTotalSteps = () => {
    if (patternName === 'Subsets (Backtracking)') {
      const traversalOrder = generateTraversalOrder(subsetsTree);
      return traversalOrder.length;
    }
    return steps.length;
  };

  const getMaxRevealCount = (tree) => {
    let count = 0;
    function dfs(node) {
      if (!node) return;
      count++;
      node.children.forEach(child => dfs(child));
    }
    dfs(tree);
    return count;
  };
 
 
  function getRevealedNodeIds(tree, count) {
    const traversalOrder = generateTraversalOrder(tree);
    return traversalOrder.slice(0, count);
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
      if (parent) {
        addPathToRoot(parent.id);
      }
    }
    
    
    currentlyRevealed.forEach(nodeId => {
      addPathToRoot(nodeId);
    });
    
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

          let label = '';
          let labelColor = '#a120ff';
          let labelX, labelY;

          if (idx === 0) {
            label = `Include ${nums[node.i]}`;
            labelColor = "#00e676";
            labelX = x1 * 0.7 + x2 * 0.3;
            labelY = y1 * 0.7 + y2 * 0.3 - 12;
          } else {
            label = `Exclude ${nums[node.i]}`;
            labelColor = "#ff5722";
            labelX = x1 * 0.3 + x2 * 0.7;
            labelY = y1 * 0.3 + y2 * 0.7 + 14;
          }

          lines.push({ x1, y1, x2, y2, key: node.id + '-' + child.id, label, labelColor, labelX,labelY });
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
            strokeWidth={2}
          />
          <text
            x={line.labelX}
            y={line.labelY}
            fill={line.labelColor}
            fontSize='12'
            fontWeight='bold'
            textAnchor='middle'
            alignmentBaseline='middle'
            style={{
              paintOrder: 'stroke',
              stroke: '#23243a',
              strokeWidth: 3,
              strokeLinejoin: 'round',
              filter: 'drop-shadow(0 1px 2px #000)'
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
          padding: 12,
          margin: 6,
          border: node.id === currentId ? '2px solid #a120ff' : '1px solid #555',
          background: node.id === currentId ? '#a120ff22' : 'rgba(35, 36, 58, 0.8)',
          borderRadius: 8,
          color: '#fff',
          fontWeight: node.id === currentId ? 700 : 400,
          minWidth: 50,
          zIndex: 1,
          position: 'relative',
          fontSize: '14px',
          boxShadow: node.id === currentId ? '0 0 12px rgba(161, 32, 255, 0.4)' : '0 2px 4px rgba(0,0,0,0.3)'
        }}>
        [{node.curSet.join(', ')}]
      </div>
      {hasVisibleChildren && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position: 'relative', height: 40 }}>
          {visibleChildren.map((child, idx) => {
            const originalIdx = node.children.findIndex(c => c.id === child.id);
            return (
              <div key={child.id} style={{ position: 'relative', margin: '0 32px', textAlign: 'center' }}>
                <div style={{height:20}}/>
                <div style={{
                  width: 2,
                  height: 32,
                  background: originalIdx === 0 ? '#00e676' : '#ff5722',
                  margin: '0 auto'
                }} />
              </div>
            );
          })}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
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
    <div style={{ color: '#fff' }}>
      <div style={{
        background: 'rgba(161, 32, 255, 0.1)',
        border: '1px solid #a120ff',
        borderRadius: 12,
        padding: '1rem',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem', color: '#a120ff' }}>
          Subsets (Backtracking) Tree
        </h3>
        {currentStepInfo && (
          <div style={{
            background: 'rgba(35, 36, 58, 0.6)',
            borderRadius: 8,
            padding: '0.75rem',
            marginTop: '1rem'
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
            <div style={{ fontSize: '14px', color: '#ccc' }}>
              {currentStepInfo.description}
            </div>
          </div>
        )}
      </div>

      <div ref={containerRef} style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem 0',
        minHeight: 300,
        background: 'rgba(10, 13, 22, 0.3)',
        borderRadius: 12,
        padding: '1.5rem'
      }}>
        {treeReady && renderBranches(subsetsTree, visibleIds)}
        {renderTree(subsetsTree, visibleIds, currentId)}
      </div>

      <div style={{
        background: 'rgba(35, 36, 58, 0.4)',
        borderRadius: 12,
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ 
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '0.75rem',
          color: '#a120ff'
        }}>
          Generated Subsets:
        </div>
        <div style={{ 
          color: '#fff',
          fontSize: '16px',
          fontFamily: 'monospace',
          background: 'rgba(10, 13, 22, 0.5)',
          padding: '0.75rem',
          borderRadius: 8
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
            background: revealCount === 1 ? '#333' : '#555',
            color: revealCount === 1 ? '#666' : '#fff',
            fontWeight: 600,
            fontSize: '14px',
            cursor: revealCount === 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
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
            background: revealCount >= maxSteps ? '#ff5722' : '#a120ff',
            color: '#fff',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(161, 32, 255, 0.3)'
          }}>
          {revealCount >= maxSteps ? '🔄 Reset' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

if(!steps.length || steps.length === 0 || !current) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', marginTop: '3rem'}}>
        No visualization available
      </div>
    );
}


  if (patternName === "Binary Search") {
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
            color: info.found ? '#4caf50' : 
                   info.MID !== undefined ? '#2196f3' :
                   '#a120ff'
          }}>
            Step {step + 1}: {info.found ? `Target Found!` : 
                             info.MID !== undefined ? `Checking MID = ${info.MID}` :
                             `Step ${step + 1}`}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#ccc'
          }}>
            {info.note || ''}
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
              <span style={{ color: '#ccc', fontSize: '14px' }}>Target: </span>
              <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                {info.target}
              </span>
            </div>
            {info.highlightLine && (
              <div style={{
                background: 'rgba(76,175,80,0.2)',
                border: '1px solid #4caf50',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                display: 'inline-block'
              }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Code Line: </span>
                <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                  {info.highlightLine}
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
                const isMid = current.MID === idx;
                const isInRange = idx >= current.LEFT && idx <= current.RIGHT;
                
                return (
                  <div key={idx} style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    
                    {(isLeft || isRight || isMid) && (
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
                            padding: '2px 6px',
                            borderRadius: 4,
                            fontSize: '10px',
                            fontWeight: 700,
                            marginBottom: '2px'
                          }}>
                            LEFT
                          </div>
                        )}
                        {isMid && (
                          <div style={{
                            background: '#a120ff',
                            color: '#fff',
                            padding: '2px 6px',
                            borderRadius: 4,
                            fontSize: '10px',
                            fontWeight: 700,
                            marginBottom: '2px'
                          }}>
                            MID
                          </div>
                        )}
                        {isRight && (
                          <div style={{
                            background: '#f44336',
                            color: '#fff',
                            padding: '2px 6px',
                            borderRadius: 4,
                            fontSize: '10px',
                            fontWeight: 700,
                            marginBottom: '2px'
                          }}>
                            RIGHT
                          </div>
                        )}
                      </div>
                    )}
                    
                 
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: 12,
                      border: `3px solid ${
                        isMid ? '#a120ff' :
                        isLeft ? '#2196f3' :
                        isRight ? '#f44336' :
                        isInRange ? 'rgba(161,32,255,0.5)' :
                        'rgba(255,255,255,0.3)'
                      }`,
                      background: 
                        isMid ? 'rgba(161,32,255,0.2)' :
                        isLeft ? 'rgba(33,150,243,0.2)' :
                        isRight ? 'rgba(244,67,54,0.2)' :
                        isInRange ? 'rgba(161,32,255,0.1)' :
                        'rgba(255,255,255,0.05)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: isMid ? 700 : isInRange ? 600 : 400,
                      fontSize: '18px',
                      boxShadow: isMid ? '0 4px 12px rgba(161,32,255,0.4)' : 
                                isLeft || isRight ? '0 2px 8px rgba(161,32,255,0.2)' : 'none',
                      opacity: isInRange ? 1 : 0.4,
                      transition: 'all 0.3s ease'
                    }}>
                      {num}
                    </div>
                    
           
                    <div style={{
                      fontSize: '12px',
                      color: isInRange ? '#a120ff' : '#666',
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
                LEFT Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                Index: {current.LEFT}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#ccc'
              }}>
                Value: {current.arr ? current.arr[current.LEFT] : '-'}
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
                color: '#a120ff'
              }}>
                MID Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                Index: {current.MID}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#ccc'
              }}>
                Value: {current.arr ? current.arr[current.MID] : '-'}
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
                color: '#f44336'
              }}>
                RIGHT Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                Index: {current.RIGHT}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#ccc'
              }}>
                Value: {current.arr ? current.arr[current.RIGHT] : '-'}
              </div>
            </div>
          </div>
        )}


        {current && current.arr && current.MID !== undefined && (
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
              Target vs MID Comparison
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              target ({current.target}) vs arr[{current.MID}] ({current.arr[current.MID]})
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: current.found ? '#4caf50' :
                     current.target > current.arr[current.MID] ? '#ff9800' :
                     current.target < current.arr[current.MID] ? '#2196f3' :
                     '#4caf50'
            }}>
              {current.found ? '✓ Target Found at index ' + current.MID :
               current.target > current.arr[current.MID] ? '→ Target > MID, search right half' :
               current.target < current.arr[current.MID] ? '← Target < MID, search left half' :
               'Target equals MID'}
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
              background: step >= maxSteps - 1 ? '#dc3545' : '#a120ff',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(161,32,255,0.3)'
            }}
          >
            {step >= maxSteps - 1 ? ' Reset' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

  if (patternName === "Breadth-First Search (BFS)") {
    const maxSteps = steps.length;
    const info = currentStepInfo || current || {};

    const renderTreeNode = (nodeValue, x,y, isQueue=false,isCurrent=false,isPrinted=false) => {
      const nodeRadius=25;
      const nodeColor = isCurrent ? '#a120ff' : 
                        isPrinted ? '#4caf50' :
                        isQueue ? '#ff9800':
                        '#666';
      const nodeBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                             isPrinted ? 'rgba(76,175,80,0.2)' : 
                             isQueue ? 'rgba(255,152,0,0.2)' :
                             'rgba(255,255,255,0.1)';
      
      return (
        <g key={`node-${nodeValue}`}>
          <circle 
          cx={x}
          cy={y}
          r={nodeRadius}
          fill={nodeBackground}
          stroke={nodeColor}
          strokeWidth='3'
          style={{
            filter: isCurrent ? 'dropshadow( 0 0 10px rgba(161,32,255,0.5))' : 'none'

          }}/>
            <text
            x={x}
            y={y+5}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isCurrent ? '700' : '500'}>
              {nodeValue}
            </text>
            {isCurrent && (
              <text
                x={x}
                y={y-40}
                textAnchor='middle'
                fill='#a120ff'
                fontSize='12'
                fontWeight='700'>
                  CURRENT
                </text>
            )}
            </g> 
      );
    };

    const renderTreeEdge = (x1,y1,x2,y2) => {
      return (
        <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke='rgba(161,32,255,0.4)'
        strokeWidth='2'/>
      );
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
              color: info.curr ? '#4caf50' : 
                     info.level !== undefined ? '#2196f3' :
                     '#a120ff'
                     
            }}>
              Step{step+1}: {info.curr ? `Processing Node ${info.curr}` : 
                             info.level !== undefined ? `Level ${info.level} Traversal` :
                             `Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              {info.note || ''}
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
                <span style={{ color: '#ccc', fontSize: '14px' }}>Current Level: </span>
                <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                  {info.level !== undefined ? info.level : '-'}
                </span>
              </div>
              {info.highlightLine && (
                <div style={{
                  background: 'rgba(76,175,80,0.2)',
                  border: '1px solid #4caf50',
                  borderRadius: 8,
                  padding: '0.5rem 1rem',
                  display: 'inline-block'
                }}>
                  <span style={{ color: '#ccc', fontSize: '14px' }}>Code Line: </span>
                  <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                    {info.highlightLine}
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
            <svg width="500" height="300" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
              {renderTreeEdge(250, 50, 180, 120)} 
              {renderTreeEdge(250, 50, 320, 120)}  
              {renderTreeEdge(180, 120, 130, 190)} 
              {renderTreeEdge(180, 120, 230, 190)}
              {renderTreeEdge(320, 120, 370, 190)} 

              {renderTreeNode(1, 250, 50, 
              current.queue && current.queue.includes(1), 
              current.curr === 1, 
              current.printed && current.printed.includes(1))}
              {renderTreeNode(2, 180, 120, 
                current.queue && current.queue.includes(2), 
                current.curr === 2, 
                current.printed && current.printed.includes(2))}
              {renderTreeNode(3, 320, 120, 
                current.queue && current.queue.includes(3), 
                current.curr === 3, 
                current.printed && current.printed.includes(3))}
              {renderTreeNode(4, 130, 190, 
                current.queue && current.queue.includes(4), 
                current.curr === 4, 
                current.printed && current.printed.includes(4))}
              {renderTreeNode(5, 230, 190, 
                current.queue && current.queue.includes(5), 
                current.curr === 5, 
                current.printed && current.printed.includes(5))}
              {renderTreeNode(6, 370, 190, 
                current.queue && current.queue.includes(6), 
                current.curr === 6, 
                current.printed && current.printed.includes(6))}

                <g>
                  <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                  <circle cx="30" cy="40" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                  <text x="45" y="45" fill="#ccc" fontSize="10">Current</text>
                  
                  <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                  <text x="45" y="65" fill="#ccc" fontSize="10">In Queue</text>
                  
                  <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                  <text x="45" y="85" fill="#ccc" fontSize="10">Printed</text>
                </g>
            </svg>
          </div>

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
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#ff9800'
                }}>
                  Queue
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.queue || []).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Length: {current.queue ? current.queue.length : 0}
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
                  color: '#4caf50'
                }}>
                  Printed Nodes
                </div>

                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.printed || []).join(', ')}]
                </div>

                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Count: {current.printed ? current.printed.length : 0}
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
                color: '#a120ff'
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
                {current.curr !== null && current.curr !== undefined ? 
                `Processing node ${current.curr} at level ${current.level}` :
                current.queue && current.queue.length > 0 ?
                `Queue ready for level ${current.level} processing` :
                'BFS traversal complete'}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: current.queue && current.queue.length === 0 ? '#4caf50' :
                       current.curr !== null ? '#2196f3' :
                       '#ff9800'
              }}>
                {current.queue && current.queue.length === 0 ? 'All nodes visited' :
               current.curr !== null ? '→ Node being processed' :
               'Ready to process queue'}

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
                const prev = Math.max(0,step-1);
                setStep(prev);
                if (onStepChange) onStepChange(prev+1);
              }}
              disabled={step===0}
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
                  if (step<maxSteps-1) {
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
        </div>
      </div>
    );  
}

  if (patternName === "Inorder Traversal") {
    const maxSteps = steps.length;
    const info = currentStepInfo || current || {};

    const renderTreeNode = (nodeValue, x, y, isHighlighted = false, isVisited = false, isCurrent = false) => {
      const nodeRadius = 25;
      const nodeColor = isCurrent ? '#a120ff' : 
                        isVisited ? '#4caf50' :
                        isHighlighted ? '#ff9800' :
                        '#666';
      const nodeBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                             isVisited ? 'rgba(76,175,80,0.2)' : 
                             isHighlighted ? 'rgba(255,152,0,0.2)' :
                             'rgba(255,255,255,0.1)';
      
      return (
        <g key={`node-${nodeValue}`}>
          <circle 
            cx={x}
            cy={y}
            r={nodeRadius}
            fill={nodeBackground}
            stroke={nodeColor}
            strokeWidth='3'
            style={{
              filter: isCurrent ? 'dropshadow(0 0 10px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+5}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isCurrent ? '700' : '500'}>
            {nodeValue}
          </text>
          {isCurrent && (
            <text
              x={x}
              y={y-40}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='12'
              fontWeight='700'>
              CURRENT
            </text>
          )}
        </g> 
      );
    };

    const renderTreeEdge = (x1, y1, x2, y2, isTraversed = false) => {
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isTraversed ? 'rgba(76,175,80,0.6)' : 'rgba(161,32,255,0.4)'}
          strokeWidth={isTraversed ? '3' : '2'}/>
      );
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
              Step {step+1}: {info.title || `Inorder Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '0.5rem'
            }}>
              {info.description || ''}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ff9800',
              fontStyle: 'italic'
            }}>
              Pattern: Left → Root → Right
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
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <svg width="500" height="300" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
              {/* Tree Edges */}
              {renderTreeEdge(250, 50, 180, 120)}
              {renderTreeEdge(250, 50, 320, 120)}
              {renderTreeEdge(180, 120, 130, 190)}
              {renderTreeEdge(180, 120, 230, 190)}
              {renderTreeEdge(320, 120, 370, 190)}

              {/* Tree Nodes - Sample Binary Tree */}
              {renderTreeNode(4, 250, 50, 
                current.highlightNodes && current.highlightNodes.includes('root'),
                current.visitedNodes && current.visitedNodes.includes('root'),
                current.currentNode === 'root')}
              {renderTreeNode(2, 180, 120, 
                current.highlightNodes && current.highlightNodes.includes('left'),
                current.visitedNodes && current.visitedNodes.includes('left'),
                current.currentNode === 'left')}
              {renderTreeNode(6, 320, 120, 
                current.highlightNodes && current.highlightNodes.includes('right'),
                current.visitedNodes && current.visitedNodes.includes('right'),
                current.currentNode === 'right')}
              {renderTreeNode(1, 130, 190, 
                current.highlightNodes && current.highlightNodes.includes('leftmost'),
                current.visitedNodes && current.visitedNodes.includes('leftmost'),
                current.currentNode === 'leftmost')}
              {renderTreeNode(3, 230, 190, 
                current.highlightNodes && current.highlightNodes.includes('left_right'),
                current.visitedNodes && current.visitedNodes.includes('left_right'),
                current.currentNode === 'left_right')}
              {renderTreeNode(7, 370, 190, 
                current.highlightNodes && current.highlightNodes.includes('right_right'),
                current.visitedNodes && current.visitedNodes.includes('right_right'),
                current.currentNode === 'right_right')}

              {/* Legend */}
              <g>
                <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                <circle cx="30" cy="40" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                <text x="45" y="45" fill="#ccc" fontSize="10">Current</text>
                
                <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                <text x="45" y="65" fill="#ccc" fontSize="10">Exploring</text>
                
                <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                <text x="45" y="85" fill="#ccc" fontSize="10">Visited</text>
              </g>
            </svg>
          </div>

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
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4caf50'
                }}>
                  Visited Order
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [1, 2, 3, 4, 6, 7]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Inorder Result (Sorted for BST)
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
                  Current Action
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff'
                }}>
                  {current.action === 'start' ? 'Starting traversal' :
                   current.action === 'traverse_left' ? 'Going left' :
                   current.action === 'visit' ? 'Visiting node' :
                   current.action === 'traverse_right' ? 'Going right' :
                   current.action === 'backtrack' ? 'Backtracking' :
                   current.action === 'complete' ? 'Complete!' :
                   'Processing...'}
                </div>
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
              Explanation
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              lineHeight: 1.5
            }}>
              {current.explanation || 'Inorder traversal visits nodes in Left → Root → Right pattern, producing sorted order for Binary Search Trees.'}
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
        </div>
      </div>
    );
}

  if (patternName === "Preorder Traversal") {
    const maxSteps = steps.length;
    const info = currentStepInfo || current || {};

    const renderTreeNode = (nodeValue, x, y, isHighlighted = false, isVisited = false, isCurrent = false) => {
      const nodeRadius = 25;
      const nodeColor = isCurrent ? '#a120ff' : 
                        isVisited ? '#4caf50' :
                        isHighlighted ? '#ff9800' :
                        '#666';
      const nodeBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                             isVisited ? 'rgba(76,175,80,0.2)' : 
                             isHighlighted ? 'rgba(255,152,0,0.2)' :
                             'rgba(255,255,255,0.1)';
      
      return (
        <g key={`node-${nodeValue}`}>
          <circle 
            cx={x}
            cy={y}
            r={nodeRadius}
            fill={nodeBackground}
            stroke={nodeColor}
            strokeWidth='3'
            style={{
              filter: isCurrent ? 'dropshadow(0 0 10px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+5}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isCurrent ? '700' : '500'}>
            {nodeValue}
          </text>
          {isCurrent && (
            <text
              x={x}
              y={y-40}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='12'
              fontWeight='700'>
              CURRENT
            </text>
          )}
        </g> 
      );
    };

    const renderTreeEdge = (x1, y1, x2, y2, isTraversed = false) => {
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isTraversed ? 'rgba(76,175,80,0.6)' : 'rgba(161,32,255,0.4)'}
          strokeWidth={isTraversed ? '3' : '2'}/>
      );
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
              Step {step+1}: {info.title || `Preorder Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '0.5rem'
            }}>
              {info.description || ''}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ff9800',
              fontStyle: 'italic'
            }}>
              Pattern: Root → Left → Right
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
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <svg width="500" height="300" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
              {/* Tree Edges */}
              {renderTreeEdge(250, 50, 180, 120)}
              {renderTreeEdge(250, 50, 320, 120)}
              {renderTreeEdge(180, 120, 130, 190)}
              {renderTreeEdge(180, 120, 230, 190)}
              {renderTreeEdge(320, 120, 370, 190)}

              {/* Tree Nodes - Sample Binary Tree */}
              {renderTreeNode(4, 250, 50, 
                current.highlightNodes && current.highlightNodes.includes('root'),
                current.visitedNodes && current.visitedNodes.includes('root'),
                current.currentNode === 'root')}
              {renderTreeNode(2, 180, 120, 
                current.highlightNodes && current.highlightNodes.includes('left_child'),
                current.visitedNodes && current.visitedNodes.includes('left_child'),
                current.currentNode === 'left_child')}
              {renderTreeNode(6, 320, 120, 
                current.highlightNodes && current.highlightNodes.includes('right_child'),
                current.visitedNodes && current.visitedNodes.includes('right_child'),
                current.currentNode === 'right_child')}
              {renderTreeNode(1, 130, 190, 
                current.highlightNodes && current.highlightNodes.includes('left_grandchild'),
                current.visitedNodes && current.visitedNodes.includes('left_grandchild'),
                current.currentNode === 'left_grandchild')}
              {renderTreeNode(3, 230, 190, 
                current.highlightNodes && current.highlightNodes.includes('right_grandchild'),
                current.visitedNodes && current.visitedNodes.includes('right_grandchild'),
                current.currentNode === 'right_grandchild')}
              {renderTreeNode(7, 370, 190, 
                current.highlightNodes && current.highlightNodes.includes('right_leaf'),
                current.visitedNodes && current.visitedNodes.includes('right_leaf'),
                current.currentNode === 'right_leaf')}

              {/* Legend */}
              <g>
                <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                <circle cx="30" cy="40" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                <text x="45" y="45" fill="#ccc" fontSize="10">Current</text>
                
                <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                <text x="45" y="65" fill="#ccc" fontSize="10">Exploring</text>
                
                <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                <text x="45" y="85" fill="#ccc" fontSize="10">Visited</text>
              </g>
            </svg>
          </div>

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
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4caf50'
                }}>
                  Visited Order
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [4, 2, 1, 3, 6, 7]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Preorder Result (Root First)
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
                  Current Action
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff'
                }}>
                  {current.action === 'start' ? 'Starting traversal' :
                   current.action === 'visit' ? 'Visiting node first!' :
                   current.action === 'traverse_left' ? 'Going left' :
                   current.action === 'traverse_right' ? 'Going right' :
                   current.action === 'backtrack' ? 'Backtracking' :
                   current.action === 'complete' ? 'Complete!' :
                   'Processing...'}
                </div>
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
              Explanation
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              lineHeight: 1.5
            }}>
              {current.explanation || 'Preorder traversal visits nodes in Root → Left → Right pattern. Each node is processed immediately when first encountered, making it perfect for copying trees.'}
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
        </div>
      </div>
    );
}

if (patternName === "Inorder Traversal (DFS)") {
    const maxSteps = steps.length;
    const info = currentStepInfo || current || {};

    const renderTreeNode = (nodeValue, x, y, isHighlighted = false, isVisited = false, isCurrent = false, visitOrder = null) => {
      const nodeRadius = 25;
      const nodeColor = isCurrent ? '#a120ff' : 
                        isVisited ? '#4caf50' :
                        isHighlighted ? '#ff9800' :
                        '#666';
      const nodeBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                             isVisited ? 'rgba(76,175,80,0.2)' : 
                             isHighlighted ? 'rgba(255,152,0,0.2)' :
                             'rgba(255,255,255,0.1)';
      
      return (
        <g key={`node-${nodeValue}`}>
          <circle 
            cx={x}
            cy={y}
            r={nodeRadius}
            fill={nodeBackground}
            stroke={nodeColor}
            strokeWidth='3'
            style={{
              filter: isCurrent ? 'dropshadow(0 0 10px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+5}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isCurrent ? '700' : '500'}>
            {nodeValue}
          </text>
          {visitOrder && (
            <text
              x={x}
              y={y+45}
              textAnchor='middle'
              fill='#4caf50'
              fontSize='12'
              fontWeight='700'>
              #{visitOrder}
            </text>
          )}
          {isCurrent && (
            <text
              x={x}
              y={y-40}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='12'
              fontWeight='700'>
              CURRENT
            </text>
          )}
        </g> 
      );
    };

    const renderTreeEdge = (x1, y1, x2, y2, isTraversed = false) => {
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isTraversed ? 'rgba(76,175,80,0.6)' : 'rgba(161,32,255,0.4)'}
          strokeWidth={isTraversed ? '3' : '2'}/>
      );
    };

    const renderBacktrackArrow = (x1, y1, x2, y2) => {
      return (
        <g>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke='#dc3545'
            strokeWidth='3'
            strokeDasharray='8,4'
            markerEnd='url(#backtrack-arrow-in)'/>
          <defs>
            <marker
              id='backtrack-arrow-in'
              viewBox='0 0 10 10'
              refX='8'
              refY='3'
              markerWidth='6'
              markerHeight='6'
              orient='auto'>
              <path d='M0,0 L0,6 L9,3 z' fill='#dc3545'/>
            </marker>
          </defs>
        </g>
      );
    };

    const getVisitedNodes = () => {
      if (!current || !current.visitedNodes) return [];
      if (typeof current.visitedNodes === 'string') {
        if (current.visitedNodes === 'all_nodes') return ['1', '2', '3', '4', '6', '7'];
        return [current.visitedNodes];
      }
      return current.visitedNodes;
    };

    const visitedNodes = getVisitedNodes();
    const getVisitOrder = (nodeValue) => {
      const orderMap = {'1': 1, '2': 2, '3': 3, '4': 4, '6': 5, '7': 6};
      const index = visitedNodes.indexOf(nodeValue.toString());
      return index !== -1 ? index + 1 : null;
    };


    const isNodeHighlighted = (nodeId) => {
      return current.highlightNodes && current.highlightNodes.includes(nodeId);
    };

    const isNodeCurrent = (nodeId) => {
      return current.currentNode === nodeId;
    };

    const isNodeVisited = (nodeValue) => {
      return visitedNodes.includes(nodeValue.toString());
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
              Step {step+1}: {info.title || `Inorder Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '0.5rem'
            }}>
              {info.description || ''}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ff9800',
              fontStyle: 'italic'
            }}>
              Pattern: Left → Root → Right (Sorted order for BST)
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
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <svg width="500" height="350" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
   
              {renderTreeEdge(250, 70, 180, 140)}
              {renderTreeEdge(250, 70, 320, 140)}
              {renderTreeEdge(180, 140, 130, 210)}
              {renderTreeEdge(180, 140, 230, 210)}
              {renderTreeEdge(320, 140, 370, 210)}

      
              {current.action === 'backtrack' && current.currentNode === 'parent' && 
                renderBacktrackArrow(130, 210, 180, 140)}
              {current.action === 'backtrack' && current.currentNode === 'root' && 
                renderBacktrackArrow(180, 140, 250, 70)}

           
              {renderTreeNode(4, 250, 70, 
                isNodeHighlighted('root'),
                isNodeVisited(4),
                isNodeCurrent('root'),
                getVisitOrder(4))}
              {renderTreeNode(2, 180, 140, 
                isNodeHighlighted('left') || isNodeHighlighted('parent'),
                isNodeVisited(2),
                isNodeCurrent('left') || isNodeCurrent('parent'),
                getVisitOrder(2))}
              {renderTreeNode(6, 320, 140, 
                isNodeHighlighted('right'),
                isNodeVisited(6),
                isNodeCurrent('right'),
                getVisitOrder(6))}
              {renderTreeNode(1, 130, 210, 
                isNodeHighlighted('leftmost'),
                isNodeVisited(1),
                isNodeCurrent('leftmost'),
                getVisitOrder(1))}
              {renderTreeNode(3, 230, 210, 
                isNodeHighlighted('leftmost_right') || isNodeHighlighted('parent_right'),
                isNodeVisited(3),
                isNodeCurrent('leftmost_right') || isNodeCurrent('parent_right'),
                getVisitOrder(3))}
              {renderTreeNode(7, 370, 210, 
                isNodeHighlighted('right_right'),
                isNodeVisited(7),
                isNodeCurrent('right_right'),
                getVisitOrder(7))}


              <g>
                <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                <circle cx="30" cy="40" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                <text x="45" y="45" fill="#ccc" fontSize="10">Current</text>
                
                <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                <text x="45" y="65" fill="#ccc" fontSize="10">Exploring</text>
                
                <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                <text x="45" y="85" fill="#ccc" fontSize="10">Visited</text>

                <line x1="30" y1="100" x2="50" y2="100" stroke="#dc3545" strokeWidth="3" strokeDasharray="4,2"/>
                <text x="55" y="105" fill="#ccc" fontSize="10">Backtrack</text>
              </g>
            </svg>
          </div>

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
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4caf50'
                }}>
                  Visited Order
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{visitedNodes.join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Final Result: [1, 2, 3, 4, 6, 7]
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
                  Current Action
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff'
                }}>
                  {current.action === 'start' ? 'Starting at root' :
                   current.action === 'traverse_left' ? 'Going left first' :
                   current.action === 'found_leftmost' ? 'Found leftmost node' :
                   current.action === 'visit' ? 'Visiting node' :
                   current.action === 'check_right' ? 'Checking right child' :
                   current.action === 'traverse_right' ? 'Going right' :
                   current.action === 'backtrack' ? 'Backtracking to parent' :
                   current.action === 'continue' ? 'Continuing pattern' :
                   current.action === 'complete' ? 'Traversal complete!' :
                   'Processing...'}
                </div>
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
              Explanation
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              lineHeight: 1.5
            }}>
              {current.explanation || 'Inorder traversal visits nodes in Left → Root → Right pattern. For Binary Search Trees, this produces values in sorted order.'}
            </div>
          </div>

          <div style={{
            background: 'rgba(46,125,50,0.1)',
            border: '1px solid #2e7d32',
            borderRadius: 12,
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#2e7d32'
            }}>
              Key Rule: Left Before Root
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              Always visit the entire left subtree before processing the root, then visit the right subtree. For BSTs, this gives sorted output!
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
        </div>
      </div>
    );
}

  if (patternName === "Preorder Traversal (DFS)") {
    const maxSteps = steps.length;
    const info = currentStepInfo || current || {};

    const renderTreeNode = (nodeValue, x, y, isHighlighted = false, isVisited = false, isCurrent = false, visitOrder = null) => {
      const nodeRadius = 25;
      const nodeColor = isCurrent ? '#a120ff' : 
                        isVisited ? '#4caf50' :
                        isHighlighted ? '#ff9800' :
                        '#666';
      const nodeBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                             isVisited ? 'rgba(76,175,80,0.2)' : 
                             isHighlighted ? 'rgba(255,152,0,0.2)' :
                             'rgba(255,255,255,0.1)';
      
      return (
        <g key={`node-${nodeValue}`}>
          <circle 
            cx={x}
            cy={y}
            r={nodeRadius}
            fill={nodeBackground}
            stroke={nodeColor}
            strokeWidth='3'
            style={{
              filter: isCurrent ? 'drop-shadow(0 0 10px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+5}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isCurrent ? '700' : '500'}>
            {nodeValue}
          </text>
          {visitOrder && (
            <text
              x={x}
              y={y+45}
              textAnchor='middle'
              fill='#4caf50'
              fontSize='12'
              fontWeight='700'>
              #{visitOrder}
            </text>
          )}
          {isCurrent && (
            <text
              x={x}
              y={y-40}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='12'
              fontWeight='700'>
              CURRENT
            </text>
          )}
        </g> 
      );
    };

    const renderTreeEdge = (x1, y1, x2, y2, isTraversed = false) => {
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isTraversed ? 'rgba(76,175,80,0.6)' : 'rgba(161,32,255,0.4)'}
          strokeWidth={isTraversed ? '3' : '2'}/>
      );
    };

    const renderBacktrackArrow = (x1, y1, x2, y2) => {
      return (
        <g>
          <defs>
            <marker
              id='backtrack-arrow-pre'
              viewBox='0 0 10 10'
              refX='8'
              refY='3'
              markerWidth='6'
              markerHeight='6'
              orient='auto'>
              <path d='M0,0 L0,6 L9,3 z' fill='#dc3545'/>
            </marker>
          </defs>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke='#dc3545'
            strokeWidth='3'
            strokeDasharray='8,4'
            markerEnd='url(#backtrack-arrow-pre)'/>
        </g>
      );
    };


    const getVisitOrder = (nodeValue) => {
      const order = {4: 1, 2: 2, 1: 3, 3: 4, 6: 5, 7: 6};
      return current.visitedNodes && current.visitedNodes.includes(nodeValue.toString()) ? order[nodeValue] : null;
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
              Step {step+1}: {info.title || `Preorder Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '0.5rem'
            }}>
              {info.description || ''}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ff9800',
              fontStyle: 'italic'
            }}>
              Pattern: Root → Left → Right (Visit immediately)
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
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <svg width="500" height="350" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
              <defs>
                <marker
                  id='backtrack-arrow-pre'
                  viewBox='0 0 10 10'
                  refX='8'
                  refY='3'
                  markerWidth='6'
                  markerHeight='6'
                  orient='auto'>
                  <path d='M0,0 L0,6 L9,3 z' fill='#dc3545'/>
                </marker>
              </defs>

           
              {renderTreeEdge(250, 70, 180, 140)}
              {renderTreeEdge(250, 70, 320, 140)}
              {renderTreeEdge(180, 140, 130, 210)}
              {renderTreeEdge(180, 140, 230, 210)}
              {renderTreeEdge(320, 140, 370, 210)}

         
              {current.action === 'backtrack' && current.currentNode === 'left_grandchild' &&
                renderBacktrackArrow(130, 210, 180, 140)}
              {current.action === 'backtrack' && current.currentNode === 'parent_right' &&
                renderBacktrackArrow(180, 140, 250, 70)}

      
              {renderTreeNode(4, 250, 70, 
                current.highlightNodes && current.highlightNodes.includes('root'),
                current.visitedNodes && current.visitedNodes.includes('4'),
                current.currentNode === 'root',
                getVisitOrder(4))}
              {renderTreeNode(2, 180, 140, 
                current.highlightNodes && current.highlightNodes.includes('left_child'),
                current.visitedNodes && current.visitedNodes.includes('2'),
                current.currentNode === 'left_child',
                getVisitOrder(2))}
              {renderTreeNode(6, 320, 140, 
                (current.highlightNodes && current.highlightNodes.includes('parent_right')) || (current.highlightNodes && current.highlightNodes.includes('right_subtree_root')),
                current.visitedNodes && current.visitedNodes.includes('6'),
                current.currentNode === 'parent_right' || current.currentNode === 'right_subtree_root',
                getVisitOrder(6))}
              {renderTreeNode(1, 130, 210, 
                current.highlightNodes && current.highlightNodes.includes('left_grandchild'),
                current.visitedNodes && current.visitedNodes.includes('1'),
                current.currentNode === 'left_grandchild',
                getVisitOrder(1))}
              {renderTreeNode(3, 230, 210, 
                (current.highlightNodes && current.highlightNodes.includes('right_of_grandchild')) || (current.highlightNodes && current.highlightNodes.includes('right_nodes')),
                current.visitedNodes && current.visitedNodes.includes('3'),
                current.currentNode === 'right_of_grandchild' || current.currentNode === 'right_nodes',
                getVisitOrder(3))}
              {renderTreeNode(7, 370, 210, 
                current.highlightNodes && current.highlightNodes.includes('right_nodes'),
                current.visitedNodes && current.visitedNodes.includes('7'),
                current.currentNode === 'right_nodes',
                getVisitOrder(7))}

         
              <g>
                <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                <circle cx="30" cy="40" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                <text x="45" y="45" fill="#ccc" fontSize="10">Current</text>
                
                <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                <text x="45" y="65" fill="#ccc" fontSize="10">Exploring</text>
                
                <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                <text x="45" y="85" fill="#ccc" fontSize="10">Visited</text>

                <line x1="30" y1="100" x2="50" y2="100" stroke="#dc3545" strokeWidth="3" strokeDasharray="4,2"/>
                <text x="55" y="105" fill="#ccc" fontSize="10">Backtrack</text>
              </g>
            </svg>
          </div>

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
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4caf50'
                }}>
                  Visited Order
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.visitedNodes || []).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Final: [4, 2, 1, 3, 6, 7]
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
                  Current Action
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff'
                }}>
                  {current.action === 'start' ? 'Starting traversal' :
                   current.action === 'visit' ? 'Visit node NOW' :
                   current.action === 'traverse_left' ? 'Going left' :
                   current.action === 'traverse_right' ? 'Going right' :
                   current.action === 'check_right' ? 'Checking right' :
                   current.action === 'backtrack' ? 'Backtracking' :
                   current.action === 'continue' ? 'Continuing pattern' :
                   current.action === 'complete' ? 'Complete!' :
                   'Processing...'}
                </div>
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
              Explanation
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              lineHeight: 1.5
            }}>
              {current.explanation || 'Preorder traversal visits nodes in Root → Left → Right pattern. Each node is processed immediately when first encountered, making it perfect for copying trees.'}
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
        </div>
      </div>
    );
}

  if (patternName === "Postorder Traversal (DFS)") {
    const maxSteps = steps.length;
    const info = currentStepInfo || current || {};

    const renderTreeNode = (nodeValue, x, y, isHighlighted = false, isVisited = false, isCurrent = false, visitOrder = null) => {
      const nodeRadius = 25;
      const nodeColor = isCurrent ? '#a120ff' : 
                        isVisited ? '#4caf50' :
                        isHighlighted ? '#ff9800' :
                        '#666';
      const nodeBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                             isVisited ? 'rgba(76,175,80,0.2)' : 
                             isHighlighted ? 'rgba(255,152,0,0.2)' :
                             'rgba(255,255,255,0.1)';
      
      return (
        <g key={`node-${nodeValue}`}>
          <circle 
            cx={x}
            cy={y}
            r={nodeRadius}
            fill={nodeBackground}
            stroke={nodeColor}
            strokeWidth='3'
            style={{
              filter: isCurrent ? 'drop-shadow(0 0 10px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+5}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isCurrent ? '700' : '500'}>
            {nodeValue}
          </text>
          {visitOrder && (
            <text
              x={x}
              y={y+45}
              textAnchor='middle'
              fill='#4caf50'
              fontSize='12'
              fontWeight='700'>
              #{visitOrder}
            </text>
          )}
          {isCurrent && (
            <text
              x={x}
              y={y-40}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='12'
              fontWeight='700'>
              CURRENT
            </text>
          )}
        </g> 
      );
    };

    const renderTreeEdge = (x1, y1, x2, y2, isTraversed = false) => {
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isTraversed ? 'rgba(76,175,80,0.6)' : 'rgba(161,32,255,0.4)'}
          strokeWidth={isTraversed ? '3' : '2'}/>
      );
    };

    const renderBacktrackArrow = (x1, y1, x2, y2) => {
      return (
        <g>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke='#dc3545'
            strokeWidth='3'
            strokeDasharray='8,4'
            markerEnd='url(#backtrack-arrow-post)'/>
        </g>
      );
    };


    const getVisitOrder = (nodeValue) => {
      const order = {1: 1, 3: 2, 2: 3, 7: 4, 6: 5, 4: 6};
      return current.visitedNodes && current.visitedNodes.includes(nodeValue.toString()) ? order[nodeValue] : null;
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
              Step {step+1}: {info.title || `Postorder Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '0.5rem'
            }}>
              {info.description || ''}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ff9800',
              fontStyle: 'italic'
            }}>
              Pattern: Left → Right → Root (Visit AFTER children)
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
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <svg width="500" height="350" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
              <defs>
                <marker
                  id='backtrack-arrow-post'
                  viewBox='0 0 10 10'
                  refX='8'
                  refY='3'
                  markerWidth='6'
                  markerHeight='6'
                  orient='auto'>
                  <path d='M0,0 L0,6 L9,3 z' fill='#dc3545'/>
                </marker>
              </defs>

         
              {renderTreeEdge(250, 70, 180, 140)}
              {renderTreeEdge(250, 70, 320, 140)}
              {renderTreeEdge(180, 140, 130, 210)}
              {renderTreeEdge(180, 140, 230, 210)}
              {renderTreeEdge(320, 140, 370, 210)}

    
              {current.action === 'backtrack' && current.currentNode === 'parent' && 
                renderBacktrackArrow(130, 210, 180, 140)}
              {current.action === 'backtrack' && current.currentNode === 'root' && 
                renderBacktrackArrow(180, 140, 250, 70)}
              {current.action === 'backtrack' && current.currentNode === 'right_child' && 
                renderBacktrackArrow(230, 210, 320, 140)}

     
              {renderTreeNode(4, 250, 70, 
                current.highlightNodes && current.highlightNodes.includes('root'),
                current.visitedNodes && current.visitedNodes.includes('4'),
                current.currentNode === 'root',
                getVisitOrder(4))}
              {renderTreeNode(2, 180, 140, 
                (current.highlightNodes && current.highlightNodes.includes('left_child')) || (current.highlightNodes && current.highlightNodes.includes('parent')),
                current.visitedNodes && current.visitedNodes.includes('2'),
                current.currentNode === 'left_child' || current.currentNode === 'parent',
                getVisitOrder(2))}
              {renderTreeNode(6, 320, 140, 
                current.highlightNodes && current.highlightNodes.includes('right_child'),
                current.visitedNodes && current.visitedNodes.includes('6'),
                current.currentNode === 'right_child',
                getVisitOrder(6))}
              {renderTreeNode(1, 130, 210, 
                current.highlightNodes && current.highlightNodes.includes('leftmost'),
                current.visitedNodes && current.visitedNodes.includes('1'),
                current.currentNode === 'leftmost',
                getVisitOrder(1))}
              {renderTreeNode(3, 230, 210, 
                (current.highlightNodes && current.highlightNodes.includes('right_subtree')) || (current.highlightNodes && current.highlightNodes.includes('right_subtree_nodes')),
                current.visitedNodes && current.visitedNodes.includes('3'),
                current.currentNode === 'right_subtree' || current.currentNode === 'right_subtree_nodes',
                getVisitOrder(3))}
              {renderTreeNode(7, 370, 210, 
                (current.highlightNodes && current.highlightNodes.includes('right_leaf')) || (current.highlightNodes && current.highlightNodes.includes('right_subtree_nodes')),
                current.visitedNodes && current.visitedNodes.includes('7'),
                current.currentNode === 'right_leaf' || current.currentNode === 'right_subtree_nodes',
                getVisitOrder(7))}

        
              <g>
                <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                <circle cx="30" cy="40" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                <text x="45" y="45" fill="#ccc" fontSize="10">Current</text>
                
                <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                <text x="45" y="65" fill="#ccc" fontSize="10">Exploring</text>
                
                <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                <text x="45" y="85" fill="#ccc" fontSize="10">Visited</text>

                <line x1="30" y1="100" x2="50" y2="100" stroke="#dc3545" strokeWidth="3" strokeDasharray="4,2"/>
                <text x="55" y="105" fill="#ccc" fontSize="10">Backtrack</text>
              </g>
            </svg>
          </div>

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
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#4caf50'
                }}>
                  Visited Order
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.visitedNodes || []).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Final: [1, 3, 2, 7, 6, 4]
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
                  Current Action
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff'
                }}>
                  {current.action === 'start' ? 'Starting (DON\'T visit root!)' :
                   current.action === 'traverse_left' ? 'Going left first' :
                   current.action === 'traverse_right' ? 'Going right' :
                   current.action === 'found_leaf' ? 'Found leaf node' :
                   current.action === 'visit' ? 'Visit AFTER children' :
                   current.action === 'backtrack' ? 'Backtracking' :
                   current.action === 'process_subtree' ? 'Processing subtree' :
                   current.action === 'continue' ? 'Continuing up tree' :
                   current.action === 'complete' ? 'Complete!' :
                   'Processing...'}
                </div>
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
              Explanation
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              lineHeight: 1.5
            }}>
              {current.explanation || 'Postorder traversal visits nodes in Left → Right → Root pattern. Each node is visited only AFTER all its children are processed, making it perfect for tree deletion operations.'}
            </div>
          </div>

          <div style={{
            background: 'rgba(220,53,69,0.1)',
            border: '1px solid #dc3545',
            borderRadius: 12,
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#dc3545'
            }}>
              Critical Rule: Children Before Parent
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              A node is NEVER visited until ALL its descendants are processed. Root is always visited last!
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
        </div>
      </div>
    );
  }

  if (patternName === "In-place Reversal of a Linked List") {
  const maxSteps = steps.length;
  const info = currentStepInfo || current || {};

  const renderLinkedList = () => {
    if (!current || !current.nodes) return null;

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {current.nodes.map((node, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              {(current.prev === idx || current.curr === idx || current.next === idx) && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '8px',
                  gap: '2px'
                }}>
                  {current.prev === idx && (
                    <div style={{
                      background: '#ff9800',
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontSize: '10px',
                      fontWeight: 700
                    }}>
                      PREV
                    </div>
                  )}
                  {current.curr === idx && (
                    <div style={{
                      background: '#a120ff',
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontSize: '10px',
                      fontWeight: 700
                    }}>
                      CURR
                    </div>
                  )}
                  {current.next === idx && (
                    <div style={{
                      background: '#4caf50',
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontSize: '10px',
                      fontWeight: 700
                    }}>
                      NEXT
                    </div>
                  )}
                </div>
              )}
              
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: `3px solid ${
                  current.curr === idx ? '#a120ff' :
                  current.prev === idx ? '#ff9800' :
                  current.next === idx ? '#4caf50' :
                  '#666'
                }`,
                background: 
                  current.curr === idx ? 'rgba(161,32,255,0.2)' :
                  current.prev === idx ? 'rgba(255,152,0,0.2)' :
                  current.next === idx ? 'rgba(76,175,80,0.2)' :
                  (current.reversed && current.reversed.includes(node)) ? 'rgba(76,175,80,0.1)' :
                  'rgba(255,255,255,0.1)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '16px',
                boxShadow: 
                  current.curr === idx ? '0 4px 12px rgba(161,32,255,0.4)' :
                  current.prev === idx ? '0 4px 12px rgba(255,152,0,0.4)' :
                  current.next === idx ? '0 4px 12px rgba(76,175,80,0.4)' :
                  (current.reversed && current.reversed.includes(node)) ? '0 2px 8px rgba(76,175,80,0.2)' :
                  'none',
                transition: 'all 0.3s ease'
              }}>
                {node}
              </div>
            </div>

            {idx < current.nodes.length - 1 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 0.25rem',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '24px',
                  color: current.reversed && current.reversed.includes(current.nodes[idx + 1]) && current.reversed.includes(current.nodes[idx]) ? '#f44336' : '#4caf50',
                  fontWeight: 700,
                  transition: 'color 0.3s ease',
                  transform: current.reversed && current.reversed.includes(current.nodes[idx + 1]) && current.reversed.includes(current.nodes[idx]) ? 'scaleX(-1)' : 'none'
                }}>
                  →
                </div>
                {current.reversed && current.reversed.includes(current.nodes[idx + 1]) && current.reversed.includes(current.nodes[idx]) && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    fontSize: '12px',
                    color: '#f44336',
                    fontWeight: 600
                  }}>
                    ↶
                  </div>
                )}
              </div>
            )}

            {idx === current.nodes.length - 1 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 0.25rem'
              }}>
                <div style={{
                  fontSize: '24px',
                  color: '#666',
                  fontWeight: 700
                }}>
                  →
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666',
                  fontWeight: 600,
                  marginTop: '2px'
                }}>
                  null
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderReversedList = () => {
    if (!current || !current.reversed) return null;

    return (
      <div style={{
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '1rem',
          color: '#4caf50'
        }}>
          Reversed Portion: {current.reversed.join(' → ')} → ...
        </div>
      </div>
    );
  };

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
            color: current.curr === null ? '#4caf50' : '#a120ff'
          }}>
            Step {step + 1}: {current.curr === null ? 'Reversal Complete' : `Processing Node ${current.nodes[current.curr]}`}
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
              <span style={{ color: '#ccc', fontSize: '14px' }}>Nodes Reversed: </span>
              <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                {current.reversed ? current.reversed.length : 0}
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

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
          minHeight: '120px',
          alignItems: 'center'
        }}>
          {renderLinkedList()}
        </div>

        {renderReversedList()}

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
                PREV Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {current.prev !== undefined && current.prev !== null ? 
                  `${current.nodes[current.prev]}` : 'null'}
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
                color: '#a120ff'
              }}>
                CURR Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {current.curr !== undefined && current.curr !== null ? 
                  `${current.nodes[current.curr]}` : 'null'}
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
                NEXT Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {current.next !== undefined && current.next !== null ? 
                  `${current.nodes[current.next]}` : 'null'}
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
              color: '#a120ff'
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
              {current.curr !== null && current.curr !== undefined ? 
                `curr.next = prev; prev = curr; curr = next` :
                'return prev (new head of reversed list)'}
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 500,
              color: current.curr === null ? '#4caf50' : '#ff9800'
            }}>
              {current.curr === null ? 'All nodes reversed successfully' : 'Reversing pointer direction'}
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

              
  if (patternName === "Two Pointers") {
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
            color: info.operation === 'check_sum' ? '#2196f3' :
                   info.operation === 'found' ? '#4caf50' :
                   '#a120ff'
          }}>
            Step {step + 1}: {info.title ?? `Step ${step + 1}`}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#ccc'
          }}>
            {info.description ?? info.note ?? ''}
          </div>
          
          <div style={{
            background: 'rgba(35,36,58,0.6)',
            borderRadius: 8,
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            display: 'inline-block'
          }}>
            <span style={{ color: '#ccc', fontSize: '14px' }}>Target: </span>
            <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>9</span>
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
          {current && Array.isArray(current.array) ? (
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {current.array.map((v, i) => {
                const isLeft = current.left === i;
                const isRight = current.right === i;
                return (
                  <div key={i} style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    {isLeft && (
                      <div style={{
                        background: '#4caf50',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: 6,
                        fontSize: '12px',
                        fontWeight: 700,
                        marginBottom: '8px'
                      }}>
                        LEFT
                      </div>
                    )}
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: 12,
                      border: `3px solid ${isLeft ? '#4caf50' : isRight ? '#f44336' : 'rgba(161,32,255,0.5)'}`,
                      background: isLeft ? 'rgba(76,175,80,0.2)' : 
                                 isRight ? 'rgba(244,67,54,0.2)' : 
                                 'rgba(161,32,255,0.1)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '20px',
                      boxShadow: (isLeft || isRight) ? '0 4px 12px rgba(161,32,255,0.3)' : 'none'
                    }}>
                      {v}
                    </div>
                    {isRight && (
                      <div style={{
                        background: '#f44336',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: 6,
                        fontSize: '12px',
                        fontWeight: 700,
                        marginTop: '8px'
                      }}>
                        RIGHT
                      </div>
                    )}
                    <div style={{
                      fontSize: '12px',
                      color: '#999',
                      marginTop: '4px'
                    }}>
                      [{i}]
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ color: '#bfb3ff' }}>No array data available</div>
          )}
        </div>

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
              minWidth: '200px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#4caf50'
              }}>
                LEFT Pointer
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#fff'
              }}>
                Index: {current.left ?? '-'}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#ccc'
              }}>
                Value: {current.array ? current.array[current.left] : '-'}
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
                color: '#f44336'
              }}>
                RIGHT Pointer
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#fff'
              }}>
                Index: {current.right ?? '-'}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#ccc'
              }}>
                Value: {current.array ? current.array[current.right] : '-'}
              </div>
            </div>
          </div>
        )}

        {current && current.array && (
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
              Sum Calculation
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              nums[{current.left}] + nums[{current.right}] = {current.array[current.left]} + {current.array[current.right]} = {current.sum}
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: current.sum === current.target ? '#4caf50' :
                     current.sum > current.target ? '#f44336' :
                     '#ff9800'
            }}>
              {current.sum === current.target ? '✓ Target Found!' :
               current.sum > current.target ? '↑ Sum > Target' :
               '↓ Sum < Target'}
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
              background: step >= maxSteps - 1 ? '#dc3545' : '#a120ff',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(161,32,255,0.3)'
            }}
          >
            {step >= maxSteps - 1 ? '🔄 Reset' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

  if (patternName === "Bit Manipulation") {
    const maxSteps = steps.length;
    const current = steps[step] || {};
    const info = current;

    const renderArrayElement = (value, index, x, y, isCurrent=false, isProcessed=false) => {
      const elementWidth = 50;
      const elementHeight = 40;
      const elementColor = isCurrent ? '#a120ff' : 
                          isProcessed ? '#4caf50' :
                          '#666';
      const elementBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                               isProcessed ? 'rgba(76,175,80,0.2)' : 
                               'rgba(255,255,255,0.1)';
      
      return (
        <g key={`array-${index}`}>
          <rect 
            x={x - elementWidth/2}
            y={y - elementHeight/2}
            width={elementWidth}
            height={elementHeight}
            fill={elementBackground}
            stroke={elementColor}
            strokeWidth={isCurrent ? '3' : '2'}
            rx='6'
            style={{
              filter: isCurrent ? 'dropshadow(0 0 8px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+2}
            textAnchor='middle'
            fill='#fff'
            fontSize='18'
            fontWeight={isCurrent ? '700' : '500'}>
            {value}
          </text>
          <text
            x={x}
            y={y+20}
            textAnchor='middle'
            fill='#888'
            fontSize='10'>
            [{index}]
          </text>
          {isCurrent && (
            <text
              x={x}
              y={y-30}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='12'
              fontWeight='700'>
              CURRENT
            </text>
          )}
        </g> 
      );
    };

    const renderBinaryVisualization = (binary, x, y, label, isHighlight=false) => {
      const bitWidth = 20;
      const bitHeight = 25;
      const labelColor = isHighlight ? '#a120ff' : '#fff';
      const bitColor = isHighlight ? '#a120ff' : '#ff9800';
      
      return (
        <g>
          <text
            x={x - 50}
            y={y + 5}
            fill={labelColor}
            fontSize='14'
            fontWeight='600'>
            {label}:
          </text>
          {binary.split('').map((bit, index) => (
            <g key={`bit-${index}`}>
              <rect
                x={x + index * (bitWidth + 2)}
                y={y - bitHeight/2}
                width={bitWidth}
                height={bitHeight}
                fill={bit === '1' ? `rgba(${isHighlight ? '161,32,255' : '255,152,0'},0.3)` : 'rgba(35,36,58,0.8)'}
                stroke={bitColor}
                strokeWidth='1'
                rx='3'/>
              <text
                x={x + index * (bitWidth + 2) + bitWidth/2}
                y={y + 4}
                textAnchor='middle'
                fill='#fff'
                fontSize='12'
                fontWeight='600'>
                {bit}
              </text>
            </g>
          ))}
        </g>
      );
    };

    const renderXOROperation = (binary1, binary2, result, x, y) => {
      if (!binary1 || !binary2 || !result) return null;
      
      const bitWidth = 18;
      const spacing = 35;
      
      return (
        <g>
          <text x={x} y={y} fill='#ccc' fontSize='14' fontWeight='600'>XOR Operation:</text>
          
          {renderBinaryVisualization(binary1, x + 20, y + spacing, binary1.split('').reduce((acc, bit, i) => acc + parseInt(bit) * Math.pow(2, 7-i), 0).toString(), false)}
          
          <text x={x + 20} y={y + spacing * 2} fill='#a120ff' fontSize='16' fontWeight='700'>⊕</text>
          
          {renderBinaryVisualization(binary2, x + 20, y + spacing * 2 + 20, binary2.split('').reduce((acc, bit, i) => acc + parseInt(bit) * Math.pow(2, 7-i), 0).toString(), false)}
          
          <line x1={x + 20} y1={y + spacing * 2 + 40} x2={x + 20 + 8 * (bitWidth + 2)} y2={y + spacing * 2 + 40} stroke='#666' strokeWidth='2'/>
          
          {renderBinaryVisualization(result, x + 20, y + spacing * 2 + 60, result.split('').reduce((acc, bit, i) => acc + parseInt(bit) * Math.pow(2, 7-i), 0).toString(), true)}
        </g>
      );
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
              color: info.phase === 'complete' ? '#4caf50' : 
                     info.phase === 'processing' ? '#2196f3' :
                     '#a120ff'
            }}>
              Step {step+1}: {info.phase === 'initialize' ? 'Initialize XOR Result' :
                             info.phase === 'processing' ? 'Processing Array Element' :
                             info.phase === 'complete' ? 'Algorithm Complete' :
                             `Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              {info.note || ''}
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
                <span style={{ color: '#ccc', fontSize: '14px' }}>Array Length: </span>
                <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                  {info.array ? info.array.length : 0}
                </span>
              </div>
              {info.highlightLine && (
                <div style={{
                  background: 'rgba(76,175,80,0.2)',
                  border: '1px solid #4caf50',
                  borderRadius: 8,
                  padding: '0.5rem 1rem',
                  display: 'inline-block'
                }}>
                  <span style={{ color: '#ccc', fontSize: '14px' }}>Code Line: </span>
                  <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                    {info.highlightLine}
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
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#ccc',
                textAlign: 'center'
              }}>
                Input Array
              </div>
              <svg width="700" height="100" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.array && current.array.map((value, index) => (
                  renderArrayElement(
                    value, 
                    index, 
                    100 + index * 80, 
                    50,
                    current.currentIndex === index,
                    current.currentIndex !== -1 && index < current.currentIndex
                  )
                ))}
                {current.currentIndex >= 0 && (
                  <polygon
                    points={`${100 + current.currentIndex * 80 - 12},${20} ${100 + current.currentIndex * 80},${10} ${100 + current.currentIndex * 80 + 12},${20}`}
                    fill="#a120ff"
                  />
                )}
              </svg>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#ff9800',
                textAlign: 'center'
              }}>
                Binary Representation
              </div>
              <svg width="600" height="120" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.binaryArray && current.currentIndex >= 0 && (
                  <>
                    <text x="50" y="25" fill="#ccc" fontSize="14" fontWeight="600">Array:</text>
                    {current.binaryArray.map((binary, index) => {
                      const isHighlight = index === current.currentIndex;
                      const isProcessed = current.currentIndex !== -1 && index < current.currentIndex;
                      return (
                        <g key={`binary-${index}`}>
                          <text
                            x="80"
                            y={45 + index * 18}
                            fill={isHighlight ? '#a120ff' : isProcessed ? '#4caf50' : '#ccc'}
                            fontSize="12"
                            fontWeight={isHighlight ? '700' : '500'}>
                            [{index}] {current.array[index]}:
                          </text>
                          {renderBinaryVisualization(binary, 180, 40 + index * 18, '', isHighlight)}
                        </g>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>
          </div>

          {current && current.binaryOperation && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#a120ff',
                  textAlign: 'center'
                }}>
                  XOR Operation Visualization
                </div>
                <svg width="600" height="200" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                  {renderXOROperation(
                    current.binaryOperation.split(' ^ ')[0],
                    current.binaryOperation.split(' ^ ')[1],
                    current.operationResult,
                    50,
                    30
                  )}
                </svg>
              </div>
            </div>
          )}

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
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#ff9800'
                }}>
                  Current Result
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  {current.result}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#ccc',
                  marginTop: '0.5rem',
                  fontFamily: 'monospace'
                }}>
                  Binary: {current.binaryResult}
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
                  color: '#4caf50'
                }}>
                  {current.phase === 'complete' ? 'Single Number' : 'Current Element'}
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  {current.phase === 'complete' ? current.result : (current.currentNum || '-')}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  {current.phase === 'complete' ? 'Final Answer' : 'Processing...'}
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
                color: '#a120ff'
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
                {current.phase === 'initialize' ? 'Initialize result = 0' :
                 current.phase === 'processing' ? `result ^= ${current.currentNum} → ${current.result}` :
                 current.phase === 'complete' ? `Single number found: ${current.result}` :
                 'Processing...'}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: current.phase === 'complete' ? '#4caf50' :
                       current.phase === 'processing' ? '#2196f3' :
                       '#a120ff'
              }}>
                {current.phase === 'complete' ? 'All duplicates cancelled out via XOR property' :
                 current.phase === 'processing' ? '→ XOR current element with running result' :
                 'XOR property: a ⊕ a = 0, a ⊕ 0 = a'}
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
                const prev = Math.max(0,step-1);
                setStep(prev);
                if (onStepChange) onStepChange(prev+1);
              }}
              disabled={step===0}
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
                if (step<maxSteps-1) {
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
        </div>
      </div>
    );  
}

  if (patternName === "K-way Merge") {
    const maxSteps = steps.length;
    const current = steps[step] || {};
    const info = current;

    const listColors = ['#2196f3', '#4caf50', '#ff9800'];

    const renderListElement = (value, listIndex, elementIndex, x, y, isPointer=false, isProcessed=false, isInHeap=false) => {
      const elementWidth = 35;
      const elementHeight = 30;
      const elementColor = isPointer ? '#a120ff' : 
                          isProcessed ? '#666' :
                          isInHeap ? listColors[listIndex] :
                          listColors[listIndex];
      const elementBackground = isPointer ? 'rgba(161,32,255,0.2)' : 
                               isProcessed ? 'rgba(102,102,102,0.2)' :
                               isInHeap ? `rgba(${listIndex === 0 ? '33,150,243' : listIndex === 1 ? '76,175,80' : '255,152,0'},0.2)` :
                               'rgba(255,255,255,0.1)';
      
      return (
        <g key={`list-${listIndex}-${elementIndex}`}>
          <rect 
            x={x - elementWidth/2}
            y={y - elementHeight/2}
            width={elementWidth}
            height={elementHeight}
            fill={elementBackground}
            stroke={elementColor}
            strokeWidth={isPointer ? '3' : '2'}
            rx='4'
            style={{
              filter: isPointer ? 'dropshadow(0 0 8px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+4}
            textAnchor='middle'
            fill='#fff'
            fontSize='14'
            fontWeight={isPointer ? '700' : '500'}>
            {value}
          </text>
          <text
            x={x}
            y={y+18}
            textAnchor='middle'
            fill='#888'
            fontSize='9'>
            {elementIndex}
          </text>
          {isPointer && (
            <text
              x={x}
              y={y-22}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='11'
              fontWeight='700'>
              CURRENT
            </text>
          )}
        </g> 
      );
    };

    const renderHeapElement = (heapItem, index, x, y, isRoot=false, isNew=false) => {
      const nodeRadius = 25;
      const listColor = listColors[heapItem.listIndex];
      const nodeColor = isRoot ? '#4caf50' :
                       isNew ? '#a120ff' :
                       listColor;
      const nodeBackground = isRoot ? 'rgba(76,175,80,0.2)' :
                            isNew ? 'rgba(161,32,255,0.2)' :
                            `rgba(${heapItem.listIndex === 0 ? '33,150,243' : heapItem.listIndex === 1 ? '76,175,80' : '255,152,0'},0.2)`;
      
      return (
        <g key={`heap-${index}`}>
          <circle 
            cx={x}
            cy={y}
            r={nodeRadius}
            fill={nodeBackground}
            stroke={nodeColor}
            strokeWidth='3'
            style={{
              filter: isRoot ? 'dropshadow(0 0 10px rgba(76,175,80,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+2}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isRoot ? '700' : '500'}>
            {heapItem.value}
          </text>
          <text
            x={x}
            y={y+12}
            textAnchor='middle'
            fill='#ccc'
            fontSize='9'>
            L{heapItem.listIndex}
          </text>
          {isRoot && (
            <text
              x={x}
              y={y-35}
              textAnchor='middle'
              fill='#4caf50'
              fontSize='12'
              fontWeight='700'>
              MIN
            </text>
          )}
          {isNew && (
            <text
              x={x}
              y={y-35}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='12'
              fontWeight='700'>
              NEW
            </text>
          )}
        </g> 
      );
    };

    const renderHeapConnection = (x1, y1, x2, y2) => {
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke='rgba(255,152,0,0.4)'
          strokeWidth='2'/>
      );
    };

    const renderResultElement = (value, index, x, y, isNew=false) => {
      const elementWidth = 35;
      const elementHeight = 30;
      const elementColor = isNew ? '#4caf50' : '#fff';
      const elementBackground = isNew ? 'rgba(76,175,80,0.2)' : 'rgba(255,255,255,0.1)';
      
      return (
        <g key={`result-${index}`}>
          <rect 
            x={x - elementWidth/2}
            y={y - elementHeight/2}
            width={elementWidth}
            height={elementHeight}
            fill={elementBackground}
            stroke={elementColor}
            strokeWidth={isNew ? '3' : '2'}
            rx='4'
            style={{
              filter: isNew ? 'dropshadow(0 0 8px rgba(76,175,80,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+4}
            textAnchor='middle'
            fill='#fff'
            fontSize='14'
            fontWeight={isNew ? '700' : '500'}>
            {value}
          </text>
          <text
            x={x}
            y={y+18}
            textAnchor='middle'
            fill='#888'
            fontSize='9'>
            {index}
          </text>
        </g> 
      );
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
              color: info.phase === 'complete' ? '#4caf50' : 
                     info.phase === 'merging' ? '#2196f3' :
                     '#a120ff'
            }}>
              Step {step+1}: {info.phase === 'initialize' ? 'Initialize Algorithm' :
                             info.phase === 'building' ? 'Building Min-Heap' :
                             info.phase === 'merging' ? 'Merging Lists' :
                             info.phase === 'complete' ? 'Algorithm Complete' :
                             `Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              {info.note || ''}
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
                <span style={{ color: '#ccc', fontSize: '14px' }}>Lists Count: </span>
                <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                  {info.lists ? info.lists.length : 3}
                </span>
              </div>
              {info.highlightLine && (
                <div style={{
                  background: 'rgba(76,175,80,0.2)',
                  border: '1px solid #4caf50',
                  borderRadius: 8,
                  padding: '0.5rem 1rem',
                  display: 'inline-block'
                }}>
                  <span style={{ color: '#ccc', fontSize: '14px' }}>Code Line: </span>
                  <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                    {info.highlightLine}
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
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#ccc',
                textAlign: 'center'
              }}>
                Input Sorted Lists
              </div>
              <svg width="700" height="200" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.lists && current.lists.map((list, listIndex) => (
                  <g key={`list-${listIndex}`}>
                    <text
                      x="50"
                      y={30 + listIndex * 60}
                      fill={listColors[listIndex]}
                      fontSize="14"
                      fontWeight="600">
                      List {listIndex}:
                    </text>
                    {list.map((value, elementIndex) => {
                      const isCurrentPointer = current.pointers[listIndex] === elementIndex;
                      const isProcessed = current.pointers[listIndex] > elementIndex;
                      const isInHeap = current.heap && current.heap.some(h => 
                        h.listIndex === listIndex && h.elementIndex === elementIndex
                      );
                      
                      return renderListElement(
                        value,
                        listIndex,
                        elementIndex,
                        120 + elementIndex * 45,
                        40 + listIndex * 60,
                        isCurrentPointer,
                        isProcessed,
                        isInHeap
                      );
                    })}
                    {current.pointers[listIndex] < list.length && (
                      <polygon
                        points={`${120 + current.pointers[listIndex] * 45 - 8},${25 + listIndex * 60} ${120 + current.pointers[listIndex] * 45},${15 + listIndex * 60} ${120 + current.pointers[listIndex] * 45 + 8},${25 + listIndex * 60}`}
                        fill="#a120ff"
                      />
                    )}
                    {current.pointers[listIndex] >= list.length && (
                      <text
                        x={120 + list.length * 45}
                        y={45 + listIndex * 60}
                        fill="#666"
                        fontSize="12"
                        fontWeight="600">
                        EXHAUSTED
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#ff9800',
                textAlign: 'center'
              }}>
                Min-Heap (Size = {current && current.heap ? current.heap.length : 0})
              </div>
              <svg width="400" height="220" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.heap && current.heap.length > 0 && (
                  <>
                    {current.heap.length > 1 && renderHeapConnection(200, 50, 150, 110)}
                    {current.heap.length > 2 && renderHeapConnection(200, 50, 250, 110)}
                    {current.heap.length > 3 && renderHeapConnection(150, 110, 100, 170)}
                    {current.heap.length > 4 && renderHeapConnection(150, 110, 200, 170)}
                    
                    {current.heap.map((heapItem, index) => {
                      let x, y;
                      if (index === 0) { x = 200; y = 50; }
                      else if (index === 1) { x = 150; y = 110; }
                      else if (index === 2) { x = 250; y = 110; }
                      else if (index === 3) { x = 100; y = 170; }
                      else { x = 200; y = 170; }
                      
                      return renderHeapElement(
                        heapItem,
                        index,
                        x,
                        y,
                        index === 0,
                        current.phase === 'building' && current.currentList === heapItem.listIndex
                      );
                    })}
                  </>
                )}
                
                {(!current || !current.heap || current.heap.length === 0) && (
                  <text x="200" y="110" textAnchor="middle" fill="#666" fontSize="16">
                    Empty Heap
                  </text>
                )}

                <g>
                  <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                  <circle cx="30" cy="40" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                  <text x="45" y="45" fill="#ccc" fontSize="10">Min Element</text>
                  
                  <circle cx="30" cy="60" r="8" fill="rgba(33,150,243,0.2)" stroke="#2196f3" strokeWidth="2" />
                  <text x="45" y="65" fill="#ccc" fontSize="10">From List 0</text>
                  
                  <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                  <text x="45" y="85" fill="#ccc" fontSize="10">From List 1</text>

                  <circle cx="30" cy="100" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                  <text x="45" y="105" fill="#ccc" fontSize="10">From List 2</text>
                </g>
              </svg>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#4caf50',
                textAlign: 'center'
              }}>
                Merged Result Array
              </div>
              <svg width="600" height="80" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.result && current.result.map((value, index) => (
                  renderResultElement(
                    value,
                    index,
                    40 + index * 45,
                    40,
                    current.poppedValue === value && index === current.result.length - 1
                  )
                ))}
                {(!current || !current.result || current.result.length === 0) && (
                  <text x="300" y="45" textAnchor="middle" fill="#666" fontSize="16">
                    Empty Result
                  </text>
                )}
              </svg>
            </div>
          </div>

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
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#ff9800'
                }}>
                  Min-Heap
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.heap || []).map(h => `${h.value}(L${h.listIndex})`).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Size: {current.heap ? current.heap.length : 0}
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
                  color: '#4caf50'
                }}>
                  Merged Result
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.result || []).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Length: {current.result ? current.result.length : 0}
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
                color: '#a120ff'
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
                {current.phase === 'initialize' ? 'Initialize pointers and empty heap for merging' :
                 current.phase === 'building' ? `Add first element ${current.heap && current.heap.length > 0 ? current.heap[current.heap.length - 1].value : ''} from List ${current.currentList}` :
                 current.phase === 'merging' ? `Pop min value ${current.poppedValue} from List ${current.poppedFrom}, add to result` :
                 current.phase === 'complete' ? `Merge complete: [${current.result.join(', ')}]` :
                 'Processing...'}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: current.phase === 'complete' ? '#4caf50' :
                       current.phase === 'merging' ? '#2196f3' :
                       current.phase === 'building' ? '#ff9800' :
                       '#a120ff'
              }}>
                {current.phase === 'complete' ? 'All lists successfully merged into sorted array' :
                 current.phase === 'merging' ? '→ Extract minimum from heap and process next element' :
                 current.phase === 'building' ? '→ Building initial heap with first elements from each list' :
                 'Ready to start K-way merge process'}
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
                const prev = Math.max(0,step-1);
                setStep(prev);
                if (onStepChange) onStepChange(prev+1);
              }}
              disabled={step===0}
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
                if (step<maxSteps-1) {
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
        </div>
      </div>
    );  
}
  
  if (patternName === "Top K Elements (Heap)") {
   const maxSteps = steps.length;
    const info = currentStepInfo || current || {};

    const renderArrayElement = (value, index, x, y, isCurrent=false, isProcessed=false, isInHeap=false) => {
      const elementWidth = 35;
      const elementHeight = 30;
      const elementColor = isCurrent ? '#a120ff' : 
                          isProcessed ? '#4caf50' :
                          isInHeap ? '#ff9800':
                          '#666';
      const elementBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                               isProcessed ? 'rgba(76,175,80,0.2)' : 
                               isInHeap ? 'rgba(255,152,0,0.2)' :
                               'rgba(255,255,255,0.1)';
      
      return (
        <g key={`array-${index}`}>
          <rect 
            x={x - elementWidth/2}
            y={y - elementHeight/2}
            width={elementWidth}
            height={elementHeight}
            fill={elementBackground}
            stroke={elementColor}
            strokeWidth='2'
            rx='4'
            style={{
              filter: isCurrent ? 'dropshadow(0 0 8px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+4}
            textAnchor='middle'
            fill='#fff'
            fontSize='14'
            fontWeight={isCurrent ? '700' : '500'}>
            {value}
          </text>
          <text
            x={x}
            y={y+18}
            textAnchor='middle'
            fill='#888'
            fontSize='9'>
            {index}
          </text>
          {isCurrent && (
            <text
              x={x}
              y={y-22}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='11'
              fontWeight='700'>
              CURRENT
            </text>
          )}
        </g> 
      );
    };

    const renderHeapElement = (value, index, x, y, isRoot=false, isNew=false) => {
      const nodeRadius = 25;
      const nodeColor = isRoot ? '#4caf50' :
                       isNew ? '#a120ff' :
                       '#ff9800';
      const nodeBackground = isRoot ? 'rgba(76,175,80,0.2)' :
                            isNew ? 'rgba(161,32,255,0.2)' :
                            'rgba(255,152,0,0.2)';
      
      return (
        <g key={`heap-${index}`}>
          <circle 
            cx={x}
            cy={y}
            r={nodeRadius}
            fill={nodeBackground}
            stroke={nodeColor}
            strokeWidth='3'
            style={{
              filter: isRoot ? 'dropshadow(0 0 10px rgba(76,175,80,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+5}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isRoot ? '700' : '500'}>
            {value}
          </text>
          {isRoot && (
            <text
              x={x}
              y={y-35}
              textAnchor='middle'
              fill='#4caf50'
              fontSize='12'
              fontWeight='700'>
              ROOT
            </text>
          )}
          {isNew && (
            <text
              x={x}
              y={y-35}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='12'
              fontWeight='700'>
              NEW
            </text>
          )}
        </g> 
      );
    };

    const renderHeapConnection = (x1, y1, x2, y2) => {
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke='rgba(255,152,0,0.4)'
          strokeWidth='2'/>
      );
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
              color: info.phase === 'complete' ? '#4caf50' : 
                     info.phase === 'comparing' ? '#2196f3' :
                     '#a120ff'
            }}>
              Step {step+1}: {info.phase === 'initialize' ? 'Initialize Algorithm' :
                             info.phase === 'building' ? 'Building Min-Heap' :
                             info.phase === 'comparing' ? 'Comparing Elements' :
                             info.phase === 'replacing' ? 'Updating Heap' :
                             info.phase === 'complete' ? 'Algorithm Complete' :
                             `Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              {info.note || ''}
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
                <span style={{ color: '#ccc', fontSize: '14px' }}>K Value: </span>
                <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                  {info.k || '-'}
                </span>
              </div>
              {info.highlightLine && (
                <div style={{
                  background: 'rgba(76,175,80,0.2)',
                  border: '1px solid #4caf50',
                  borderRadius: 8,
                  padding: '0.5rem 1rem',
                  display: 'inline-block'
                }}>
                  <span style={{ color: '#ccc', fontSize: '14px' }}>Code Line: </span>
                  <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                    {info.highlightLine}
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
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#ccc',
                textAlign: 'center'
              }}>
                Input Array
              </div>
              <svg width="600" height="80" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.array && current.array.map((value, index) => (
                  renderArrayElement(
                    value, 
                    index, 
                    40 + index * 52, 
                    40,
                    current.currentIndex === index,
                    current.currentIndex !== -1 && index < current.currentIndex,
                    current.heap && current.heap.includes(value)
                  )
                ))}
              </svg>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#ff9800',
                textAlign: 'center'
              }}>
                Min-Heap (Size = {current && current.k ? current.k : 0})
              </div>
              <svg width="400" height="220" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.heap && current.heap.length > 0 && (
                  <>
                    {current.heap.length > 1 && renderHeapConnection(200, 50, 150, 110)}
                    {current.heap.length > 2 && renderHeapConnection(200, 50, 250, 110)}
                    {current.heap.length > 3 && renderHeapConnection(150, 110, 100, 170)}
                    {current.heap.length > 4 && renderHeapConnection(150, 110, 200, 170)}
                    
                    {current.heap.map((value, index) => {
                      let x, y;
                      if (index === 0) { x = 200; y = 50; }
                      else if (index === 1) { x = 150; y = 110; }
                      else if (index === 2) { x = 250; y = 110; }
                      else if (index === 3) { x = 100; y = 170; }
                      else { x = 200; y = 170; }
                      
                      return renderHeapElement(
                        value,
                        index,
                        x,
                        y,
                        index === 0,
                        current.phase === 'replacing' && current.currentElement === value
                      );
                    })}
                  </>
                )}
                
                {(!current || !current.heap || current.heap.length === 0) && (
                  <text x="200" y="110" textAnchor="middle" fill="#666" fontSize="16">
                    Empty Heap
                  </text>
                )}

                <g>
                  <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                  <circle cx="30" cy="40" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                  <text x="45" y="45" fill="#ccc" fontSize="10">Root (Kth Largest)</text>
                  
                  <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                  <text x="45" y="65" fill="#ccc" fontSize="10">In Heap</text>
                  
                  <circle cx="30" cy="80" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                  <text x="45" y="85" fill="#ccc" fontSize="10">Current/New</text>
                </g>
              </svg>
            </div>
          </div>

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
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#ff9800'
                }}>
                  Min-Heap
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.heap || []).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Size: {current.heap ? current.heap.length : 0}/{current.k || 0}
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
                  color: '#4caf50'
                }}>
                  Current {current.k}th Largest
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  {current.heap && current.heap.length > 0 ? current.heap[0] : '-'}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  {current.result ? 'Final Result' : 'Heap Root'}
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
                color: '#a120ff'
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
                {current.phase === 'initialize' ? 'Initializing algorithm parameters' :
                 current.phase === 'building' ? `Adding element ${current.currentElement} to heap` :
                 current.phase === 'comparing' ? `Comparing ${current.currentElement} with heap root ${current.heap[0]}` :
                 current.phase === 'replacing' ? `Replacing heap minimum with ${current.currentElement}` :
                 current.phase === 'complete' ? `Result: ${current.result}` :
                 'Processing...'}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: current.phase === 'complete' ? '#4caf50' :
                       current.phase === 'comparing' ? '#2196f3' :
                       current.phase === 'replacing' ? '#ff9800' :
                       '#a120ff'
              }}>
                {current.phase === 'complete' ? 'Algorithm finished successfully' :
                 current.phase === 'comparing' ? '→ Checking if heap update needed' :
                 current.phase === 'replacing' ? '→ Heap being updated' :
                 current.phase === 'building' ? '→ Building initial heap' :
                 'Ready to process'}
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
                const prev = Math.max(0,step-1);
                setStep(prev);
                if (onStepChange) onStepChange(prev+1);
              }}
              disabled={step===0}
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
                if (step<maxSteps-1) {
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
        </div>
      </div>
    );  
} 

  if (patternName === "Fast & Slow Pointers") {
  const maxSteps = steps ? steps.length : 0;
  const info = currentStepInfo || current || {};

  const renderLinkedList = () => {
    if (!current || !current.nodes || !Array.isArray(current.nodes)) return null;

    const nodeSize = 60;
    const nodeSpacing = 120;
    const svgWidth = 800;
    const svgHeight = 400;
    
    const cycleNodes = current.nodes.length - current.cycleStart;
    const cycleRadius = Math.max(80, cycleNodes * 30);
    const linearWidth = current.cycleStart * nodeSpacing;
    const totalWidth = linearWidth + cycleRadius * 2 + 40;
    const startX = Math.max(50, (svgWidth - totalWidth) / 2);
    const startY = svgHeight / 2;

    const getNodePosition = (index) => {
      if (index < current.cycleStart) {
        return {
          x: startX + index * nodeSpacing,
          y: startY
        };
      } else {
        const angleStep = (2 * Math.PI) / cycleNodes;
        const cycleIndex = index - current.cycleStart;
        const angle = cycleIndex * angleStep - Math.PI / 2;
        const centerX = startX + current.cycleStart * nodeSpacing + cycleRadius;
        const centerY = startY;
        
        return {
          x: centerX + cycleRadius * Math.cos(angle),
          y: centerY + cycleRadius * Math.sin(angle)
        };
      }
    };

    const renderArrow = (fromIndex, toIndex, color = '#666', strokeWidth = 2) => {
      const from = getNodePosition(fromIndex);
      const to = getNodePosition(toIndex);
      
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const unitX = dx / length;
      const unitY = dy / length;
      
      const startX = from.x + unitX * (nodeSize / 2);
      const startY = from.y + unitY * (nodeSize / 2);
      const endX = to.x - unitX * (nodeSize / 2);
      const endY = to.y - unitY * (nodeSize / 2);
      
      const arrowSize = 8;
      const arrowX1 = endX - arrowSize * unitX - arrowSize * unitY * 0.5;
      const arrowY1 = endY - arrowSize * unitY + arrowSize * unitX * 0.5;
      const arrowX2 = endX - arrowSize * unitX + arrowSize * unitY * 0.5;
      const arrowY2 = endY - arrowSize * unitY - arrowSize * unitX * 0.5;
      
      return (
        <g key={`arrow-${fromIndex}-${toIndex}`}>
          <line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke={color}
            strokeWidth={strokeWidth}
            style={{
              transition: 'all 0.5s ease'
            }}
          />
          <polygon
            points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
            fill={color}
          />
        </g>
      );
    };

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <svg
          width="800"
          height="400"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
          viewBox="0 0 800 400"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#666"
              />
            </marker>
          </defs>
          
          {current.nodes.map((value, index) => {
            const nextIndex = index < current.nodes.length - 1 ? index + 1 :
              (index >= current.cycleStart ? current.cycleStart : null);
            
            return (
              <g key={index}>
                {nextIndex !== null && renderArrow(index, nextIndex)}
              </g>
            );
          })}
          
          {current.nodes.map((value, index) => {
            const pos = getNodePosition(index);
            const isSlowPointer = current.slowPointer === index;
            const isFastPointer = current.fastPointer === index;
            const isBothPointers = isSlowPointer && isFastPointer;
            const isInCycle = index >= current.cycleStart;
            
            return (
              <g key={`node-${index}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeSize / 2}
                  fill={isBothPointers ? '#e91e63' : 
                        isSlowPointer ? '#2196f3' :
                        isFastPointer ? '#ff9800' :
                        isInCycle ? 'rgba(76,175,80,0.3)' : 'rgba(255,255,255,0.1)'}
                  stroke={isBothPointers ? '#e91e63' :
                          isSlowPointer ? '#2196f3' :
                          isFastPointer ? '#ff9800' :
                          isInCycle ? '#4caf50' : '#666'}
                  strokeWidth={isBothPointers || isSlowPointer || isFastPointer ? 3 : 2}
                  style={{
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: (isBothPointers || isSlowPointer || isFastPointer) ? 
                      'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'none'
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="16"
                  fontWeight="700"
                  style={{
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {value}
                </text>
                
                {isSlowPointer && !isBothPointers && (
                  <text
                    x={pos.x}
                    y={pos.y - 45}
                    textAnchor="middle"
                    fill="#2196f3"
                    fontSize="12"
                    fontWeight="700"
                    style={{
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'drop-shadow(0 0 4px rgba(33,150,243,0.5))'
                    }}
                  >
                    SLOW
                  </text>
                )}
                
                {isFastPointer && !isBothPointers && (
                  <text
                    x={pos.x}
                    y={pos.y - 45}
                    textAnchor="middle"
                    fill="#ff9800"
                    fontSize="12"
                    fontWeight="700"
                    style={{
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'drop-shadow(0 0 4px rgba(255,152,0,0.5))'
                    }}
                  >
                    FAST
                  </text>
                )}
                
                {isBothPointers && (
                  <text
                    x={pos.x}
                    y={pos.y - 45}
                    textAnchor="middle"
                    fill="#e91e63"
                    fontSize="12"
                    fontWeight="700"
                    style={{
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'drop-shadow(0 0 4px rgba(233,30,99,0.5))',
                      animation: 'pulse 1.5s infinite'
                    }}
                  >
                    COLLISION!
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}</style>

        {current.cycleDetected && (
          <div style={{
            background: 'rgba(233,30,99,0.1)',
            border: '2px solid #e91e63',
            borderRadius: 12,
            padding: '1rem',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#e91e63',
              marginBottom: '0.5rem'
            }}>
              Cycle Detected!
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff'
            }}>
              The slow and fast pointers have met, confirming a cycle exists in the linked list
            </div>
          </div>
        )}

        {current.checking && (
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
              Pointer Comparison
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              slow == fast → {current.nodes[current.slowPointer]} == {current.nodes[current.fastPointer]} = {current.slowPointer === current.fastPointer ? 'TRUE' : 'FALSE'}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ccc',
              marginTop: '0.5rem'
            }}>
              {current.slowPointer === current.fastPointer ? 
                'Pointers meet - cycle detected!' : 
                'Pointers at different positions - continue'}
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
            color: (current && current.operation === 'complete') ? '#e91e63' :
                   (current && current.operation === 'move') ? '#ff9800' :
                   (current && current.operation === 'check') ? '#ffeb3b' :
                   '#2196f3'
          }}>
            Step {(step || 0) + 1}: {
              (current && current.operation === 'complete') ? 'Cycle Detection Complete' :
              (current && current.operation === 'move') ? 'Moving Pointers' :
              (current && current.operation === 'check') ? 'Checking for Meeting Point' :
              (current && current.operation === 'initialize') ? 'Initialize Pointers' :
              'Fast & Slow Pointer Algorithm'
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
              <span style={{ color: '#ccc', fontSize: '14px' }}>Iteration: </span>
              <span style={{ color: '#2196f3', fontSize: '16px', fontWeight: 700 }}>
                {(current && typeof current.iteration === 'number') ? current.iteration : 0}
              </span>
            </div>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Status: </span>
              <span style={{ 
                color: current.cycleDetected ? '#e91e63' : '#4caf50', 
                fontSize: '16px', 
                fontWeight: 700 
              }}>
                {current.cycleDetected ? 'CYCLE FOUND' : 'SEARCHING'}
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
          minHeight: '400px',
          alignItems: 'center'
        }}>
          {renderLinkedList()}
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
                color: '#2196f3'
              }}>
                Slow Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.nodes && current.slowPointer >= 0) ? 
                  `Node ${current.nodes[current.slowPointer]}` : 
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
                color: '#ff9800'
              }}>
                Fast Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.nodes && current.fastPointer >= 0) ? 
                  `Node ${current.nodes[current.fastPointer]}` : 
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
                Action
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.operation === 'move') ? 'MOVE' :
                 (current && current.operation === 'check') ? 'CHECK' :
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
                'return true  // cycle detected' :
                (current && current.operation === 'move') ?
                'slow = slow.next; fast = fast.next.next' :
                (current && current.operation === 'check') ?
                'if (slow == fast) return true' :
                (current && current.operation === 'initialize') ?
                'slow = head; fast = head' :
                'while (fast && fast.next)'
              }
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 500,
              color: (current && current.operation === 'complete') ? '#e91e63' :
                     (current && current.operation === 'move') ? '#ff9800' :
                     (current && current.operation === 'check') ? '#ffeb3b' :
                     '#2196f3'
            }}>
              {(current && current.operation === 'complete') ? 
                'Cycle found - pointers have met' :
                (current && current.operation === 'move') ? 
                'Moving pointers at different speeds' :
                (current && current.operation === 'check') ?
                'Comparing pointer positions' :
                (current && current.operation === 'initialize') ?
                'Setting up initial pointer positions' :
                'Starting cycle detection algorithm'
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
              const prev = Math.max(0, (step || 0) - 1);
              setStep && setStep(prev);
              onStepChange && onStepChange(prev + 1);
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
  if (patternName === "Greedy Algorithms") {
    const maxSteps = steps ? steps.length : 0;
    const info = currentStepInfo || current || {};

    const renderPriceChart = () => {
      if (!current || !current.array || !Array.isArray(current.array)) return null;

      const prices = current.array;
      const maxPrice = Math.max(...prices);
      const minPriceVal = Math.min(...prices);
      const range = maxPrice - minPriceVal;
      const padding = range * 0.2;
      const chartHeight = 200;
      const chartWidth = 600;
      const stepWidth = chartWidth / (prices.length - 1);

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center'
        }}>
          
          <div style={{
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#9c27b0'
            }}>
              Stock Prices Over Time
            </div>
            <div style={{
              position: 'relative',
              width: `${chartWidth}px`,
              height: `${chartHeight}px`,
              margin: '0 auto',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
        
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${(i * chartHeight) / 4}px`,
                  height: '1px',
                  background: 'rgba(255,255,255,0.1)',
                  zIndex: 1
                }} />
              ))}
              
       
              <svg style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2
              }}>
                <polyline
                  fill="none"
                  stroke="#9c27b0"
                  strokeWidth="3"
                  points={prices.map((price, idx) => {
                    const x = idx * stepWidth;
                    const y = chartHeight - ((price - minPriceVal + padding) / (range + 2 * padding)) * chartHeight;
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>

          
              {prices.map((price, idx) => {
                const x = idx * stepWidth;
                const y = chartHeight - ((price - minPriceVal + padding) / (range + 2 * padding)) * chartHeight;
                const isCurrent = current.currentIndex === idx;
                const isMinPrice = price === current.minPrice && idx <= current.currentIndex;
                const isProfitableDay = current.currentPrice && price === current.currentPrice && current.profitCalculation && current.profitCalculation !== "null";
                
                return (
                  <div key={idx} style={{
                    position: 'absolute',
                    left: `${x - 15}px`,
                    top: `${y - 15}px`,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: isCurrent ? 
                      (current.phase === 'complete' ? '#4caf50' : '#ff9800') :
                      isMinPrice ? '#e91e63' :
                      '#9c27b0',
                    border: `3px solid ${isCurrent ? '#fff' : 'transparent'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    zIndex: 10,
                    boxShadow: isCurrent ? '0 4px 12px rgba(255,152,0,0.4)' : 
                               isMinPrice ? '0 4px 12px rgba(233,30,99,0.4)' :
                               '0 2px 6px rgba(156,39,176,0.3)',
                    transition: 'all 0.3s ease',
                    transform: isCurrent ? 'scale(1.2)' : 'scale(1)'
                  }}>
                    {price}
                    {isCurrent && (
                      <div style={{
                        position: 'absolute',
                        top: '-35px',
                        background: current.phase === 'complete' ? '#4caf50' : '#ff9800',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: '10px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap'
                      }}>
                        CURRENT
                      </div>
                    )}
                    {isMinPrice && !isCurrent && (
                      <div style={{
                        position: 'absolute',
                        top: '-35px',
                        background: '#e91e63',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: '10px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap'
                      }}>
                        MIN
                      </div>
                    )}
                  </div>
                );
              })}

              {prices.map((_, idx) => (
                <div key={idx} style={{
                  position: 'absolute',
                  left: `${idx * stepWidth - 15}px`,
                  top: `${chartHeight + 10}px`,
                  width: '30px',
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#888',
                  fontWeight: 600
                }}>
                  Day {idx}
                </div>
              ))}
            </div>
          </div>

      
          {current && current.profitCalculation && current.currentIndex >= 0 && (
            <div style={{
              background: 'rgba(76,175,80,0.1)',
              border: '1px solid #4caf50',
              borderRadius: 12,
              padding: '1rem',
              textAlign: 'center',
              maxWidth: '600px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#4caf50',
                marginBottom: '0.5rem'
              }}>
                Profit Calculation
              </div>
              <div style={{
                fontSize: '14px',
                color: '#fff',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>
                current_price - min_price
              </div>
              <div style={{
                fontSize: '18px',
                color: '#fff',
                fontFamily: 'monospace',
                fontWeight: 700
              }}>
                {current.profitCalculation}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#ccc',
                marginTop: '0.5rem'
              }}>
                {current.decision}
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
              color: (current && current.phase === 'complete') ? '#4caf50' :
                     (current && current.decision === 'Found better buying opportunity') ? '#e91e63' :
                     (current && current.decision && current.decision.includes('Update max_profit')) ? '#ff9800' :
                     '#9c27b0'
            }}>
              Step {(step || 0) + 1}: {
                (current && current.phase === 'complete') ? 'Algorithm Complete' :
                (current && current.decision === 'Found better buying opportunity') ? 'New Minimum Price Found' :
                (current && current.decision && current.decision.includes('Update max_profit')) ? 'Better Profit Found' :
                (current && current.phase === 'initialize') ? 'Initialize Variables' :
                'Processing Current Price'
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
                <span style={{ color: '#9c27b0', fontSize: '16px', fontWeight: 700 }}>
                  {Math.max(0, (current && typeof current.currentIndex === 'number' ? Math.min(current.currentIndex + 1, current.array ? current.array.length : 0) : 0))}/{(current && current.array) ? current.array.length : 0}
                </span>
              </div>
              <div style={{
                background: 'rgba(35,36,58,0.6)',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                display: 'inline-block'
              }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Max Profit: </span>
                <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                  {current ? current.maxProfit : 0}
                </span>
              </div>
            </div>
          </div>
        )}

        <div style={{
          background: 'rgba(10,13,22,0.3)',
          borderRadius: 12,
          padding: '1.5rem',
          border: '1px solid rgba(156,39,176,0.2)'
        }}>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
            minHeight: '300px',
            alignItems: 'center'
          }}>
            {renderPriceChart()}
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
                  Current Price
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  {(current && current.currentPrice !== null) ? 
                    `$${current.currentPrice}` : 
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
                  color: '#e91e63'
                }}>
                  Min Price
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  {current ? `$${current.minPrice}` : '$0'}
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
                  Max Profit
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  ${current ? current.maxProfit : 0}
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
                color: '#9c27b0'
              }}>
                Greedy Decision
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#fff',
                fontFamily: 'monospace'
              }}>
                {(current && current.phase === 'complete') ? 
                  'return max_profit' :
                  (current && current.phase === 'initialize') ?
                  'min_price = prices[0], max_profit = 0' :
                  'min_price = min(min_price, price); max_profit = max(max_profit, price - min_price)'
                }
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: (current && current.phase === 'complete') ? '#4caf50' :
                       (current && current.decision && current.decision.includes('better')) ? '#4caf50' :
                       (current && current.decision === 'Found better buying opportunity') ? '#e91e63' :
                       '#9c27b0'
              }}>
                {current.greedyChoice}
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
                background: (step || 0) >= maxSteps - 1 ? '#dc3545' : '#9c27b0',
                color: '#fff',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(156,39,176,0.3)'
              }}
            >
              {(step || 0) >= maxSteps - 1 ? 'Reset' : 'Next →'}
            </button>
          </div>
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