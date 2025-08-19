import React, {useState, useEffect} from 'react';
import slidingWindowSteps from './animations/slidingWindowSteps';
import twoPointersSteps from './animations/twoPointersSteps';
import inPlaceReversalSteps from './animations/inPlaceReversalSteps';
import bfsSteps from './animations/bfsSteps';


function VisualizationPanel({patternName, onHighlightLineChange}) {
  let steps = [];
  if(patternName === "Sliding Window") steps = slidingWindowSteps;
  else if(patternName === "Two Pointers") steps = twoPointersSteps;
  else if(patternName === "In-place Reversal of a Linked List") steps = inPlaceReversalSteps;
  else if(patternName === "Breadth-First Search (BFS)") steps = bfsSteps;

  
  const [step, setStep] = useState(0);
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;

  useEffect(() => {
    if(steps.length && onHighlightLineChange) {
      onHighlightLineChange(current.highlightLine);
    }
  }, [step,steps,onHighlightLineChange,current])

  if(!steps.length || steps.length === 0 || !current) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', marginTop: '3rem'}}>
        No
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