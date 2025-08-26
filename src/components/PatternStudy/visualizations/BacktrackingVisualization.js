import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import subsetsTree, {nums, getStepInfo} from '../animations/subsetsTree';

function BacktrackingVisualization({ onStepChange, onReset, currentStepInfo: _currentStepInfo }) {
  const [revealCount, setRevealCount] = useState(1);
  const nodeRefs = useRef({});
  const containerRef = useRef(null);
  const [treeReady, setTreeReady] = useState(false);

  useEffect(() => {
    setRevealCount(1);
  }, []);

  useEffect(() => {
    if (onStepChange) {
      const revealedIds = getRevealedNodeIds(subsetsTree, revealCount);
      const stepInfo = getStepInfo(revealCount, revealedIds, subsetsTree);
      onStepChange(revealCount, stepInfo);
    }
  }, [revealCount, onStepChange]);

  useLayoutEffect(() => {
    setTreeReady(false);
    requestAnimationFrame(() => setTreeReady(true));
  }, [revealCount]);

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
    return generateTraversalOrder(subsetsTree).length;
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

  const traversalOrder = generateTraversalOrder(subsetsTree);
  const currentId = traversalOrder[revealCount - 1];
  const visibleIds = getVisibleNodeIds(subsetsTree, revealCount);
  const maxSteps = getTotalSteps();
  const localStepInfo = getStepInfo(revealCount, getRevealedNodeIds(subsetsTree, revealCount), subsetsTree);

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
        {localStepInfo && (
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
              color: localStepInfo.operation === 'include' ? '#00e676' : 
                     localStepInfo.operation === 'backtrack_exclude' ? '#ff5722' :
                     localStepInfo.operation === 'save' ? '#ffeb3b' :
                     localStepInfo.operation === 'start' ? '#a120ff' : '#a120ff'
            }}>
              Step {localStepInfo.step}: {localStepInfo.title}
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#ccc',
              lineHeight: '1.4'
            }}>
              {localStepInfo.description}
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

export default BacktrackingVisualization;