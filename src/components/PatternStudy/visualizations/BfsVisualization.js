import React, { useState, useRef } from 'react';
import bfsSteps from '../animations/bfsSteps';

function BfsVisualization({ onStepChange, onReset, currentStepInfo }) {
    const [step, setStep] = useState(0);
    const steps = bfsSteps;
    const maxSteps = steps.length;
    const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
    const info = currentStepInfo || current || {};
    const containerRef = useRef(null);

    const renderTreeNode = (nodeValue, x,y, isQueue=false,isCurrent=false,isPrinted=false) => {
      const nodeRadius=25;
      const nodeColor = isCurrent ? '#a120ff' : 
                        isPrinted ? '#4caf50' :
                        isQueue ? '#ff9800':
                        '#666';
      const nodeBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                             isPrinted ? 'rgba(76,175,80,0.2)' : 
                             isQueue ? 'rgba(255,152,0,0.2)' :
                             'rgba(255,255,255,0.1)';
      
      return (
        <g key={`node-${nodeValue}`}>
          <circle 
          cx={x}
          cy={y}
          r={nodeRadius}
          fill={nodeBackground}
          stroke={nodeColor}
          strokeWidth='3'
          style={{
            filter: isCurrent ? 'dropshadow( 0 0 10px rgba(161,32,255,0.5))' : 'none'

          }}/>
            <text
            x={x}
            y={y+5}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isCurrent ? '700' : '500'}>
              {nodeValue}
            </text>
            {isCurrent && (
              <text
                x={x}
                y={y-40}
                textAnchor='middle'
                fill='#a120ff'
                fontSize='12'
                fontWeight='700'>
                  CURRENT
                </text>
            )}
            </g> 
      );
    };

    const renderTreeEdge = (x1,y1,x2,y2) => {
      return (
        <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke='rgba(161,32,255,0.4)'
        strokeWidth='2'/>
      );
    };

    return (
      <div style={{color: '#fff'}}>
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
              color: info.curr ? '#4caf50' : 
                     info.level !== undefined ? '#2196f3' :
                     '#a120ff'
                     
            }}>
              Step{step+1}: {info.curr ? `Processing Node ${info.curr}` : 
                             info.level !== undefined ? `Level ${info.level} Traversal` :
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
                <span style={{ color: '#ccc', fontSize: '14px' }}>Current Level: </span>
                <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                  {info.level !== undefined ? info.level : '-'}
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
            <svg width="500" height="300" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
              {renderTreeEdge(250, 50, 180, 120)} 
              {renderTreeEdge(250, 50, 320, 120)}  
              {renderTreeEdge(180, 120, 130, 190)} 
              {renderTreeEdge(180, 120, 230, 190)}
              {renderTreeEdge(320, 120, 370, 190)} 

              {renderTreeNode(1, 250, 50, 
              current.queue && current.queue.includes(1), 
              current.curr === 1, 
              current.printed && current.printed.includes(1))}
              {renderTreeNode(2, 180, 120, 
                current.queue && current.queue.includes(2), 
                current.curr === 2, 
                current.printed && current.printed.includes(2))}
              {renderTreeNode(3, 320, 120, 
                current.queue && current.queue.includes(3), 
                current.curr === 3, 
                current.printed && current.printed.includes(3))}
              {renderTreeNode(4, 130, 190, 
                current.queue && current.queue.includes(4), 
                current.curr === 4, 
                current.printed && current.printed.includes(4))}
              {renderTreeNode(5, 230, 190, 
                current.queue && current.queue.includes(5), 
                current.curr === 5, 
                current.printed && current.printed.includes(5))}
              {renderTreeNode(6, 370, 190, 
                current.queue && current.queue.includes(6), 
                current.curr === 6, 
                current.printed && current.printed.includes(6))}

                <g>
                  <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                  <circle cx="30" cy="40" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                  <text x="45" y="45" fill="#ccc" fontSize="10">Current</text>
                  
                  <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                  <text x="45" y="65" fill="#ccc" fontSize="10">In Queue</text>
                  
                  <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                  <text x="45" y="85" fill="#ccc" fontSize="10">Printed</text>
                </g>
            </svg>
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
                  color: '#ff9800'
                }}>
                  Queue
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.queue || []).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Length: {current.queue ? current.queue.length : 0}
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
                  color: '#4caf50'
                }}>
                  Printed Nodes
                </div>

                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.printed || []).join(', ')}]
                </div>

                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Count: {current.printed ? current.printed.length : 0}
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
                `Processing node ${current.curr} at level ${current.level}` :
                current.queue && current.queue.length > 0 ?
                `Queue ready for level ${current.level} processing` :
                'BFS traversal complete'}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: current.queue && current.queue.length === 0 ? '#4caf50' :
                       current.curr !== null ? '#2196f3' :
                       '#ff9800'
              }}>
                {current.queue && current.queue.length === 0 ? 'All nodes visited' :
               current.curr !== null ? '→ Node being processed' :
               'Ready to process queue'}

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
                const prev = Math.max(0,step-1);
                setStep(prev);
                if (onStepChange) onStepChange(prev+1);
              }}
              disabled={step===0}
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
              }}>
                ← Previous
              </button>

              <button
                onClick={() => {
                  if (step<maxSteps-1) {
                    const next = step+1;
                    setStep(next);
                    if (onStepChange) onStepChange(next+1);
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
                }}>
                  {step >= maxSteps - 1 ? 'Reset' : 'Next →'}
              </button>
          </div>
        </div>
      </div>
    );  
}

export default BfsVisualization;