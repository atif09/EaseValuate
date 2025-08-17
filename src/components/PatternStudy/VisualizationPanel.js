import React, {useState} from 'react';
import slidingWindowSteps from './animations/slidingWindowSteps';

function VisualizationPanel({patternName}) {
  const steps = patternName === "Sliding Window" ? slidingWindowSteps : [];
  const [step, setStep] = useState(0);

  if(!steps.length) {
    return(
      <div style={{color: "#fff", textAlign: "center", marginTop: "3rem"}}>
        hihi
      </div>
    )
    
  }

  const current = steps[step];

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
              }}>L</span>
            )}
            {current.R === idx && (
              <span style={{
                position: 'absolute',
                top: -28,
                right: 0,
                color: '#a120ff', 
                fontWeight: 700,
                fontSize: 16
              }}></span>
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