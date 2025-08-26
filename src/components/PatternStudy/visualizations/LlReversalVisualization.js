import React, { useState, useRef } from 'react';
import inPlaceReversalSteps from '../animations/inPlaceReversalSteps';

function LlReversalVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = inPlaceReversalSteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

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

export default LlReversalVisualization;