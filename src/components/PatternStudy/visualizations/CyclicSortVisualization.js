import React, { useState, useRef } from 'react';
import cyclicSortSteps from '../animations/cyclicSortSteps';

function CyclicSortVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = cyclicSortSteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

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
export default CyclicSortVisualization;