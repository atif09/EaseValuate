import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import slidingWindowSteps from './animations/slidingWindowSteps';
import twoPointersSteps from './animations/twoPointersSteps';
import inPlaceReversalSteps from './animations/inPlaceReversalSteps';
import bfsSteps from './animations/bfsSteps';
import binarySearchSteps from './animations/binarySearchSteps';
import subsetsTree, {nums, getStepInfo} from './animations/subsetsTree';

function VisualizationPanel({patternName, onStepChange, onReset, selectedLanguage, currentStepInfo}) {
  let steps = [];
  if(patternName === "Sliding Window") steps = slidingWindowSteps;
  else if(patternName === "Two Pointers") steps = twoPointersSteps;
  else if(patternName === "In-place Reversal of a Linked List") steps = inPlaceReversalSteps;
  else if(patternName === "Breadth-First Search (BFS)") steps = bfsSteps;
  else if(patternName === "Binary Search") steps = binarySearchSteps;
  
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
            {step >= maxSteps - 1 ? '🔄 Reset' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
}
export default VisualizationPanel;