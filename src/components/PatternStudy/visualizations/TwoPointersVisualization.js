import React, { useState, useRef } from 'react';
import twoPointersSteps from '../animations/twoPointersSteps';

function TwoPointersVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = twoPointersSteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

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

export default TwoPointersVisualization;