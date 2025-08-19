import React, {useState, useEffect} from 'react';
import slidingWindowSteps from './animations/slidingWindowSteps';
import twoPointersSteps from './animations/twoPointersSteps';
import inPlaceReversalSteps from './animations/inPlaceReversalSteps';
import bfsSteps from './animations/bfsSteps';
import binarySearchSteps from './animations/binarySearchSteps';
import subsetsTree from './animations/subsetsTree';


function VisualizationPanel({patternName, onHighlightLineChange}) {
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
    if(steps.length && onHighlightLineChange) {
      onHighlightLineChange(current.highlightLine);
    }
  }, [step,steps,onHighlightLineChange,current])

  useEffect(() => {
    if(patternName === 'Subsets (Backtracking)') setRevealCount(1);
  }, [patternName]);




 
  function getRevealedNodeIds(tree,count) {
    const ids = [];
    function dfs(node) {
      if(!node || ids.length >= count) return;
      ids.push(node.id);
      node.children.forEach(child => dfs(child));
    }
    dfs(tree);
    return ids;
  }

  function renderTree(node, revealedIds, currentId) {
    if (!revealedIds.includes(node.id)) return null;
    const hasChildren = node.children && node.children.length > 0 && node.children.some(child => revealedIds.includes(child.id));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <div style={{
        padding: 8,
        margin: 4,
        border: node.id === currentId ? '2px solid #a120ff' : '1px solid #fff',
        background: node.id === currentId ? '#a120ff22' : 'transparent',
        borderRadius: 6,
        color: '#fff',
        fontWeight: node.id === currentId ? 700 : 400,
        minWidth: 40,
        zIndex: 1
      }}>
        [{node.curSet.join(', ')}]
      </div>
      {hasChildren && (
        <div style={{
          position:'relative',
          height: 24,
          width: 64,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          margin: '0 auto'
        }}>
          {node.children.map((child,idx) =>
            revealedIds.includes(child.id) ? (
              <div 
                key={child.id}
                style={{
                  position:'absolute',
                  left: idx === 0 ? 8 : 56,
                  width: 2,
                  height: 24,
                  background: '#fff',
                  transform: idx === 0 ? 'rotate(30deg)' : 'rotate(-30deg)',
                  zIndex: 0,
                  transformOrigin: 'top'
                }}
              />
            ) : null 
          )}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {node.children.map(child => (
          <div key={child.id} style={{ margin: '0 12px' }}>
            {renderTree(child, revealedIds, currentId)}
          </div>
        ))}
      </div>
    </div>
  );
}

if (patternName === "Subsets (Backtracking)") {
  const revealedIds = getRevealedNodeIds(subsetsTree, revealCount);
  const currentId = revealedIds[revealedIds.length - 1];

  
  function collectSubsets(tree, revealedIds, arr = []) {
    if (!tree || !revealedIds.includes(tree.id)) return arr;
    if (tree.children.length === 0) arr.push(tree.curSet);
    tree.children.forEach(child => collectSubsets(child, revealedIds, arr));
    return arr;
  }
  const revealedSubsets = collectSubsets(subsetsTree, revealedIds, []);

  return (
    <div style={{ color: '#fff', textAlign: 'center' }}>
      <h3>Subsets (Backtracking) Tree</h3>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 24 }}>
        {renderTree(subsetsTree, revealedIds, currentId)}
      </div>
      <div style={{ color: '#fff', marginBottom: 12 }}>
        Revealed Subsets: [
          {revealedSubsets.map((s, i) => (
            <span key={i}>[{s.join(', ')}]{i < revealedSubsets.length - 1 ? ', ' : ''}</span>
          ))}
        ]
      </div>
      <div>
        <button
          onClick={() => setRevealCount(c => Math.max(1, c - 1))}
          disabled={revealCount === 1}
          style={{
            marginRight: 16,
            padding: '0.5rem 1.2rem',
            borderRadius: 6,
            border: 'none',
            background: '#23243a',
            color: '#fff',
            fontWeight: 600,
            cursor: revealCount === 1 ? 'not-allowed' : 'pointer',
            opacity: revealCount === 1 ? 0.5 : 1
          }}>
          Previous
        </button>
        <button
          onClick={() => setRevealCount(c => c + 1)}
          disabled={getRevealedNodeIds(subsetsTree, revealCount + 1).length === revealCount}
          style={{
            padding: '0.5rem 1.2rem',
            borderRadius: 6,
            border: 'none',
            background: '#a120ff',
            color: '#fff',
            fontWeight: 600,
            cursor: getRevealedNodeIds(subsetsTree, revealCount + 1).length === revealCount ? 'not-allowed' : 'pointer',
            opacity: getRevealedNodeIds(subsetsTree, revealCount + 1).length === revealCount ? 0.5 : 1
          }}>
          Next
        </button>
      </div>
    </div>
  );
}

if(!steps.length || steps.length === 0 || !current) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', marginTop: '3rem'}}>
        No
      </div>
    );
}

  if (patternName === "Binary Search") {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px'
    }}>
      <h3 style={{ color: '#fff', marginBottom: 24 }}>Visualization for: {patternName}</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {current.arr.map((num, idx) => (
          <div
            key={idx}
            style={{
              width: 48,
              height: 48,
              border: '2px solid #fff',
              background:
                idx === current.MID ? '#a120ff' :
                (idx === current.LEFT || idx === current.RIGHT ? '#23243a' : 'transparent'),
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: idx === current.MID ? 700 : 400,
              fontSize: 22,
              position: 'relative',
              borderRadius: 8,
              boxShadow: idx === current.MID ? '0 0 12px #a120ff88' : 'none',
              transition: 'background 0.2s, box-shadow 0.2s'
            }}>
            {num}
            {idx === current.LEFT && (
              <span style={{
                position: 'absolute',
                top: -28,
                left: 0,
                color: '#a120ff',
                fontWeight: 700,
                fontSize: 16
              }}>LEFT</span>
            )}
            {idx === current.RIGHT && (
              <span style={{
                position: 'absolute',
                top: -28,
                right: 0,
                color: '#a120ff',
                fontWeight: 700,
                fontSize: 16
              }}>RIGHT</span>
            )}
            {idx === current.MID && (
              <span style={{
                position: 'absolute',
                top: -28,
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#fff',
                background: '#a120ff',
                borderRadius: 4,
                padding: '0 4px',
                fontWeight: 700,
                fontSize: 16
              }}>MID</span>
            )}
          </div>
        ))}
      </div>
      <div style={{ color: '#fff', marginBottom: 12 }}>
        Target: {current.target} &nbsp; | &nbsp; LEFT: {current.LEFT} &nbsp; | &nbsp; RIGHT: {current.RIGHT} &nbsp; | &nbsp; MID: {current.MID}
      </div>
      {current.note && (
        <div style={{ color: '#a120ff', fontWeight: 700, marginBottom: 12 }}>
          {current.note}
        </div>
      )}
      <div>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{
            marginRight: 16,
            padding: '0.5rem 1.2rem',
            borderRadius: 6,
            border: 'none',
            background: '#23243a',
            color: '#fff',
            fontWeight: 600,
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            opacity: step === 0 ? 0.5 : 1
          }}>
          Previous
        </button>
        <button
          onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          style={{
            padding: '0.5rem 1.2rem',
            borderRadius: 6,
            border: 'none',
            background: '#a120ff',
            color: '#fff',
            fontWeight: 600,
            cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
            opacity: step === steps.length - 1 ? 0.5 : 1
          }}>
          Next
        </button>
      </div>
    </div>
  );
}

  if (patternName === "Breadth-First Search (BFS)") {
    return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px'
    }}>
      <h3 style={{ color: '#fff', marginBottom: 24 }}>Visualization for: {patternName}</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {Object.keys(current.graph).map(node => (
          <div
            key={node}
            style={{
              width: 48,
              height: 48,
              border: '2px solid #fff',
              background: (current.visited && current.visited.includes(Number(node))) 
              ? '#a120ff'
              : (current.queue && current.queue.includes(Number(node)) ? '#23243a' : 'transparent'),
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: current.current === Number(node) ? 700 : 400,
              fontSize: 22,
              position: 'relative',
              borderRadius: 8,
              boxShadow: current.current === Number(node) ? '0 0 12px #a120ff88' : 'none',
              transition: 'background 0.2s, box-shadow 0.2s'
            }}>
            {node}
            {current.current === Number(node) && (
              <span style={{
                position: 'absolute',
                top: -28,
                left: 0,
                color: '#a120ff',
                fontWeight: 700,
                fontSize: 16
              }}>CURR</span>
            )}
          </div>
        ))}
      </div>
      <div style={{ color: '#fff', marginBottom: 12 }}>
        Queue: [{(current.queue || []).join(', ')}] &nbsp; | &nbsp; Visited: {'{'}{(current.visited || []).join(', ')}{'}'}
        
      </div>
      {current.note && (
        <div style={{ color: '#a120ff', fontWeight: 700, marginBottom: 12 }}>
          {current.note}
        </div>
      )}
      <div>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{
            marginRight: 16,
            padding: '0.5rem 1.2rem',
            borderRadius: 6,
            border: 'none',
            background: '#23243a',
            color: '#fff',
            fontWeight: 600,
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            opacity: step === 0 ? 0.5 : 1
          }}>
          Previous
        </button>
        <button
          onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          style={{
            padding: '0.5rem 1.2rem',
            borderRadius: 6,
            border: 'none',
            background: '#a120ff',
            color: '#fff',
            fontWeight: 600,
            cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
            opacity: step === steps.length - 1 ? 0.5 : 1
          }}>
          Next
        </button>
      </div>
    </div>
  );
}

  if (patternName === "In-place Reversal of a Linked List") {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px'
    }}>
      <h3 style={{ color: '#fff', marginBottom: 24 }}>Visualiation for: {patternName}</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {current.nodes.map((num, idx) => (
          <div
            key={idx}
            style={{
              width: 48,
              height: 48,
              border: '2px solid #fff',
              background: current.reversed && current.reversed.includes(num) ? '#a120ff' : 'transparent',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: current.curr === idx ? 700 : 400,
              fontSize: 22,
              position: 'relative',
              borderRadius: 8,
              boxShadow: current.curr === idx ? '0 0 12px #a120ff88' : 'none',
              transition: 'background 0.2s, box-shadow 0.2s'
            }}>
            {num}
            {current.curr === idx && (
              <span style={{
                position: 'absolute',
                top: -28,
                left: 0,
                color: '#a120ff',
                fontWeight: 700,
                fontSize: 16
              }}>CURR</span>
            )}
            {current.prev === idx && (
              <span style={{
                position: 'absolute',
                top: -28,
                right: 0,
                color: '#0ff',
                fontWeight: 700,
                fontSize: 16
              }}>PREV</span>
            )}
          </div>
        ))}
      </div>
      {current.note && (
        <div style={{ color: '#a120ff', fontWeight: 700, marginBottom: 12 }}>
          {current.note}
        </div>
      )}
      <div>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{
            marginRight: 16,
            padding: '0.5rem 1.2rem',
            borderRadius: 6,
            border: 'none',
            background: '#23243a',
            color: '#fff',
            fontWeight: 600,
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            opacity: step === 0 ? 0.5 : 1
          }}>
          Previous
        </button>
        <button
          onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          style={{
            padding: '0.5rem 1.2rem',
            borderRadius: 6,
            border: 'none',
            background: '#a120ff',
            color: '#fff',
            fontWeight: 600,
            cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
            opacity: step === steps.length - 1 ? 0.5 : 1
          }}>
          Next
        </button>
      </div>
    </div>
  );
}

  if (patternName === "Two Pointers") {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '400px'
      }}>
        <h3 style={{ color: '#fff', marginBottom: 24 }}>Visualiation for: {patternName}</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {current.array.map((num, idx) => (
            <div
              key={idx}
              style={{
                width: 48,
                height: 48,
                border: '2px solid #fff',
                background: idx === current.left || idx === current.right ? '#a120ff' : 'transparent',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: idx === current.left || idx === current.right ? 700 : 400,
                fontSize: 22,
                position: 'relative',
                borderRadius: 8,
                boxShadow: idx === current.left || idx === current.right ? '0 0 12px #a120ff88' : 'none',
                transition: 'background 0.2s, box-shadow 0.2s'
              }}>
              {num}
              {idx === current.left && (
                <span style={{
                  position: 'absolute',
                  top: -28,
                  left: 0,
                  color: '#a120ff',
                  fontWeight: 700,
                  fontSize: 16
                }}>LEFT</span>
              )}
              {idx === current.right && (
                <span style={{
                  position: 'absolute',
                  top: -28,
                  right: 0,
                  color: '#a120ff',
                  fontWeight: 700,
                  fontSize: 16
                }}>RIGHT</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ color: '#fff', marginBottom: 12 }}>
          Target: {current.target} &nbsp; | &nbsp; Sum: {current.sum}
        </div>
        {current.note && (
          <div style={{ color: '#a120ff', fontWeight: 700, marginBottom: 12 }}>
            {current.note}
          </div>
        )}
        <div>
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              marginRight: 16,
              padding: '0.5rem 1.2rem',
              borderRadius: 6,
              border: 'none',
              background: '#23243a',
              color: '#fff',
              fontWeight: 600,
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              opacity: step === 0 ? 0.5 : 1
            }}>
            Previous
          </button>
          <button
            onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: 6,
              border: 'none',
              background: '#a120ff',
              color: '#fff',
              fontWeight: 600,
              cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
              opacity: step === steps.length - 1 ? 0.5 : 1
            }}>
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px'}}>
      <h3 style={{color: '#fff', marginBottom: 24}}>Visualiation for: {patternName}</h3>
      <div style={{display: 'flex', gap: 8,marginBottom: 24}}>
        {current.array.map((num,idx) => (
          <div
          key={idx}
          style={{
            width:48,
            height:48,
            border: '2px solid #fff',
            background: current.window.includes(idx) ? '#a120ff' : 'transparent',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: current.L === idx || current.R === idx ? 700 : 400,
            fontSize: 22,
            position: 'relative',
            borderRadius: 8,
            boxShadow: current.window.includes(idx) ? '0 0 12px #a120ff88' : 'none',
            transition: 'background 0.2s, box-shadow 0.2s'
          }}>
            {num}
            {current.L === idx && (
              <span style={{
                position: 'absolute',
                top: -28,
                left: 0,
                color: '#a120ff',
                fontWeight: 700,
                fontSize: 16
              }}>LEFT</span>
            )}
            {current.R === idx && (
              <span style={{
                position: 'absolute',
                top: -28,
                right: 0,
                color: '#a120ff', 
                fontWeight: 700,
                fontSize: 16
              }}>RIGHT</span>
            )}
            </div>
        ))}
      </div>
      <div style={{color: '#fff', marginBottom: 12}}>
        Hashset: {'{'}{current.hashset.join(', ')}{'}'}
      </div>
      {current.note && (
        <div style={{color: '#a120ff', fontWeight: 700, marginBottom: 12}}>
          {current.note}
        </div>
      )}
      <div>
        <button
        onClick={() => setStep( s => Math.max(0, s-1))}
        disabled={step===0}
        style={{
          marginRight: 16,
          padding: '0.5rem 1.2rem',
          borderRadius: 6,
          border:'none',
          background: '#23243a',
          color: '#fff',
          fontWeight: 600,
          cursor: step === 0 ? 'not-allowed' : 'pointer',
          opacity: step === 0 ? 0.5 : 1
        }}>
          Previous
        </button>
        <button
        onClick={() => setStep(s => Math.min(steps.length - 1, s+1))}
        disabled={step === steps.length - 1}
        style={{
          padding: '0.5rem 1.2rem',
          borderRadius: 6,
          border: 'none',
          background: '#a120ff',
          color: '#fff',
          fontWeight: 600,
          cursor: step === steps.length -1 ? 'not-allowed' : 'pointer',
          opacity: step === steps.length -1 ? 0.5 : 1
        }}>
          Next
        </button>
      </div>
    </div>
  );
}

export default VisualizationPanel;