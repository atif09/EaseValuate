import React, { useState, useRef } from 'react';
import slidingWindowSteps from '../animations/slidingWindowSteps';

function SlidingWindowVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = slidingWindowSteps;
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
export default SlidingWindowVisualization;