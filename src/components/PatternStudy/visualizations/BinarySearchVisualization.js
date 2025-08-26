import React, { useState, useRef } from 'react';
import { binarySearchSteps } from '../animations/binarySearchSteps';

function BinarySearchVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = binarySearchSteps;
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

export default BinarySearchVisualization;