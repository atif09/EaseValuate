import React, { useState, useRef } from 'react';
import dp2DSteps from '../animations/dp2DSteps';

function TwoDDpVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = dp2DSteps;
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
            color: info.phase === 'initialize' ? '#2196f3' :
                   info.phase === 'setup' ? '#2196f3' :
                   info.phase === 'base_case_rows' ? '#ff9800' :
                   info.phase === 'base_case_cols' ? '#ff9800' :
                   info.phase === 'calculating' ? '#4caf50' :
                   info.phase === 'updating' ? '#4caf50' :
                   info.phase === 'complete' ? '#9c27b0' :
                   '#a120ff'
          }}>
            Step {step + 1}: {
              info.phase === 'initialize' ? 'Initialize Problem' :
              info.phase === 'setup' ? 'Setup DP Grid' :
              info.phase === 'base_case_rows' ? 'Fill Base Case (First Column)' :
              info.phase === 'base_case_cols' ? 'Fill Base Case (First Row)' :
              info.phase === 'calculating' ? 'Calculate Cell Value' :
              info.phase === 'updating' ? 'Update DP Grid' :
              info.phase === 'complete' ? 'Solution Complete!' :
              `Step ${step + 1}`
            }
          </div>
          <div style={{
            fontSize: '14px',
            color: '#ccc',
            marginBottom: '1rem'
          }}>
            {info.note || ''}
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Grid Size: </span>
              <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                {info.m}×{info.n}
              </span>
            </div>
            {info.currentRow >= 0 && info.currentCol >= 0 && (
              <div style={{
                background: 'rgba(35,36,58,0.6)',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                display: 'inline-block'
              }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Current Cell: </span>
                <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                  ({info.currentRow}, {info.currentCol})
                </span>
              </div>
            )}
            {info.totalPaths > 0 && (
              <div style={{
                background: 'rgba(35,36,58,0.6)',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                display: 'inline-block'
              }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Total Paths: </span>
                <span style={{ color: '#9c27b0', fontSize: '16px', fontWeight: 700 }}>
                  {info.totalPaths}
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
          {current && current.dp && Array.isArray(current.dp) ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#a120ff',
                marginBottom: '0.5rem'
              }}>
                Dynamic Programming Grid
              </div>
              {current.dp.map((row, rowIdx) => (
                <div key={rowIdx} style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  {row.map((cell, colIdx) => {
                    const isCurrentCell = current.currentRow === rowIdx && current.currentCol === colIdx;
                    const isBaseCase = (rowIdx === 0 || colIdx === 0) && cell > 0;
                    const isDestination = rowIdx === current.m - 1 && colIdx === current.n - 1 && current.phase === 'complete';
                    
                    return (
                      <div key={colIdx} style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                 
                        <div style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: 8,
                          border: `3px solid ${
                            isDestination ? '#9c27b0' :
                            isCurrentCell ? '#4caf50' :
                            isBaseCase ? '#ff9800' :
                            cell > 0 ? '#a120ff' :
                            'rgba(255,255,255,0.3)'
                          }`,
                          background: 
                            isDestination ? 'rgba(156,39,176,0.3)' :
                            isCurrentCell ? 'rgba(76,175,80,0.2)' :
                            isBaseCase ? 'rgba(255,152,0,0.2)' :
                            cell > 0 ? 'rgba(161,32,255,0.2)' :
                            'rgba(255,255,255,0.05)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: cell > 0 ? 700 : 400,
                          fontSize: '18px',
                          boxShadow: 
                            isDestination ? '0 4px 16px rgba(156,39,176,0.4)' :
                            isCurrentCell ? '0 4px 12px rgba(76,175,80,0.3)' :
                            isBaseCase ? '0 4px 12px rgba(255,152,0,0.3)' :
                            cell > 0 ? '0 2px 8px rgba(161,32,255,0.2)' : 'none',
                          transition: 'all 0.3s ease'
                        }}>
                          {cell}
                        </div>
                        
                     
                        <div style={{
                          fontSize: '10px',
                          color: isCurrentCell ? '#4caf50' : '#666',
                          marginTop: '4px',
                          fontWeight: 600
                        }}>
                          ({rowIdx},{colIdx})
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#bfb3ff' }}>Loading grid...</div>
          )}
        </div>

  
        {current && (current.fromTop !== undefined || current.fromLeft !== undefined) && (
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
              color: '#4caf50'
            }}>
              Calculation for Cell ({current.currentRow}, {current.currentCol})
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              <div style={{
                background: 'rgba(76,175,80,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: '2px solid #4caf50'
              }}>
                From Top: <span style={{ color: '#4caf50' }}>{current.fromTop}</span>
              </div>
              <div style={{ color: '#fff', fontSize: '20px' }}>+</div>
              <div style={{
                background: 'rgba(33,150,243,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: '2px solid #2196f3'
              }}>
                From Left: <span style={{ color: '#2196f3' }}>{current.fromLeft}</span>
              </div>
              <div style={{ color: '#fff', fontSize: '20px' }}>=</div>
              <div style={{
                background: 'rgba(161,32,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: '2px solid #a120ff'
              }}>
                Result: <span style={{ color: '#a120ff' }}>{current.fromTop + current.fromLeft}</span>
              </div>
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              Each cell stores the number of unique paths to reach that position
            </div>
          </div>
        )}

    
        <div style={{
          background: 'rgba(35,36,58,0.6)',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '2rem'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 4,
                border: '2px solid #ff9800',
                background: 'rgba(255,152,0,0.2)'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Base Case</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 4,
                border: '2px solid #4caf50',
                background: 'rgba(76,175,80,0.2)'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Current Cell</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 4,
                border: '2px solid #a120ff',
                background: 'rgba(161,32,255,0.2)'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Calculated</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: 4,
                border: '2px solid #9c27b0',
                background: 'rgba(156,39,176,0.3)'
              }}></div>
              <span style={{ fontSize: '14px', color: '#ccc' }}>Destination</span>
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
export default TwoDDpVisualization;