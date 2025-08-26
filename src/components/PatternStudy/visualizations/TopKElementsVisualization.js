import React, { useState, useRef } from 'react';
import topKSteps from '../animations/topKSteps';

function TopKElementsVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = topKSteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

  const renderArrayElement = (value, index, x, y, isCurrent=false, isProcessed=false, isInHeap=false) => {
      const elementWidth = 35;
      const elementHeight = 30;
      const elementColor = isCurrent ? '#a120ff' : 
                          isProcessed ? '#4caf50' :
                          isInHeap ? '#ff9800':
                          '#666';
      const elementBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                               isProcessed ? 'rgba(76,175,80,0.2)' : 
                               isInHeap ? 'rgba(255,152,0,0.2)' :
                               'rgba(255,255,255,0.1)';
      
      return (
        <g key={`array-${index}`}>
          <rect 
            x={x - elementWidth/2}
            y={y - elementHeight/2}
            width={elementWidth}
            height={elementHeight}
            fill={elementBackground}
            stroke={elementColor}
            strokeWidth='2'
            rx='4'
            style={{
              filter: isCurrent ? 'dropshadow(0 0 8px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+4}
            textAnchor='middle'
            fill='#fff'
            fontSize='14'
            fontWeight={isCurrent ? '700' : '500'}>
            {value}
          </text>
          <text
            x={x}
            y={y+18}
            textAnchor='middle'
            fill='#888'
            fontSize='9'>
            {index}
          </text>
          {isCurrent && (
            <text
              x={x}
              y={y-22}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='11'
              fontWeight='700'>
              CURRENT
            </text>
          )}
        </g> 
      );
    };

    const renderHeapElement = (value, index, x, y, isRoot=false, isNew=false) => {
      const nodeRadius = 25;
      const nodeColor = isRoot ? '#4caf50' :
                       isNew ? '#a120ff' :
                       '#ff9800';
      const nodeBackground = isRoot ? 'rgba(76,175,80,0.2)' :
                            isNew ? 'rgba(161,32,255,0.2)' :
                            'rgba(255,152,0,0.2)';
      
      return (
        <g key={`heap-${index}`}>
          <circle 
            cx={x}
            cy={y}
            r={nodeRadius}
            fill={nodeBackground}
            stroke={nodeColor}
            strokeWidth='3'
            style={{
              filter: isRoot ? 'dropshadow(0 0 10px rgba(76,175,80,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+5}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isRoot ? '700' : '500'}>
            {value}
          </text>
          {isRoot && (
            <text
              x={x}
              y={y-35}
              textAnchor='middle'
              fill='#4caf50'
              fontSize='12'
              fontWeight='700'>
              ROOT
            </text>
          )}
          {isNew && (
            <text
              x={x}
              y={y-35}
              textAnchor='middle'
              fill='#a120ff'
              fontSize='12'
              fontWeight='700'>
              NEW
            </text>
          )}
        </g> 
      );
    };

    const renderHeapConnection = (x1, y1, x2, y2) => {
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke='rgba(255,152,0,0.4)'
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
              color: info.phase === 'complete' ? '#4caf50' : 
                     info.phase === 'comparing' ? '#2196f3' :
                     '#a120ff'
            }}>
              Step {step+1}: {info.phase === 'initialize' ? 'Initialize Algorithm' :
                             info.phase === 'building' ? 'Building Min-Heap' :
                             info.phase === 'comparing' ? 'Comparing Elements' :
                             info.phase === 'replacing' ? 'Updating Heap' :
                             info.phase === 'complete' ? 'Algorithm Complete' :
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
                <span style={{ color: '#ccc', fontSize: '14px' }}>K Value: </span>
                <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                  {info.k || '-'}
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
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#ccc',
                textAlign: 'center'
              }}>
                Input Array
              </div>
              <svg width="600" height="80" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.array && current.array.map((value, index) => (
                  renderArrayElement(
                    value, 
                    index, 
                    40 + index * 52, 
                    40,
                    current.currentIndex === index,
                    current.currentIndex !== -1 && index < current.currentIndex,
                    current.heap && current.heap.includes(value)
                  )
                ))}
              </svg>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#ff9800',
                textAlign: 'center'
              }}>
                Min-Heap (Size = {current && current.k ? current.k : 0})
              </div>
              <svg width="400" height="220" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.heap && current.heap.length > 0 && (
                  <>
                    {current.heap.length > 1 && renderHeapConnection(200, 50, 150, 110)}
                    {current.heap.length > 2 && renderHeapConnection(200, 50, 250, 110)}
                    {current.heap.length > 3 && renderHeapConnection(150, 110, 100, 170)}
                    {current.heap.length > 4 && renderHeapConnection(150, 110, 200, 170)}
                    
                    {current.heap.map((value, index) => {
                      let x, y;
                      if (index === 0) { x = 200; y = 50; }
                      else if (index === 1) { x = 150; y = 110; }
                      else if (index === 2) { x = 250; y = 110; }
                      else if (index === 3) { x = 100; y = 170; }
                      else { x = 200; y = 170; }
                      
                      return renderHeapElement(
                        value,
                        index,
                        x,
                        y,
                        index === 0,
                        current.phase === 'replacing' && current.currentElement === value
                      );
                    })}
                  </>
                )}
                
                {(!current || !current.heap || current.heap.length === 0) && (
                  <text x="200" y="110" textAnchor="middle" fill="#666" fontSize="16">
                    Empty Heap
                  </text>
                )}

                <g>
                  <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                  <circle cx="30" cy="40" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                  <text x="45" y="45" fill="#ccc" fontSize="10">Root (Kth Largest)</text>
                  
                  <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                  <text x="45" y="65" fill="#ccc" fontSize="10">In Heap</text>
                  
                  <circle cx="30" cy="80" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                  <text x="45" y="85" fill="#ccc" fontSize="10">Current/New</text>
                </g>
              </svg>
            </div>
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
                  Min-Heap
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.heap || []).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Size: {current.heap ? current.heap.length : 0}/{current.k || 0}
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
                  Current {current.k}th Largest
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  {current.heap && current.heap.length > 0 ? current.heap[0] : '-'}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  {current.result ? 'Final Result' : 'Heap Root'}
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
                {current.phase === 'initialize' ? 'Initializing algorithm parameters' :
                 current.phase === 'building' ? `Adding element ${current.currentElement} to heap` :
                 current.phase === 'comparing' ? `Comparing ${current.currentElement} with heap root ${current.heap[0]}` :
                 current.phase === 'replacing' ? `Replacing heap minimum with ${current.currentElement}` :
                 current.phase === 'complete' ? `Result: ${current.result}` :
                 'Processing...'}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: current.phase === 'complete' ? '#4caf50' :
                       current.phase === 'comparing' ? '#2196f3' :
                       current.phase === 'replacing' ? '#ff9800' :
                       '#a120ff'
              }}>
                {current.phase === 'complete' ? 'Algorithm finished successfully' :
                 current.phase === 'comparing' ? '→ Checking if heap update needed' :
                 current.phase === 'replacing' ? '→ Heap being updated' :
                 current.phase === 'building' ? '→ Building initial heap' :
                 'Ready to process'}
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
export default TopKElementsVisualization;