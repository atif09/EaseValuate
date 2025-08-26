import React, { useState, useRef } from 'react';
import fastAndSlowPointersSteps from '../animations/fastAndSlowPointers';

function FastSlowPointersVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = fastAndSlowPointersSteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

  const renderLinkedList = () => {
    if (!current || !current.nodes || !Array.isArray(current.nodes)) return null;

    const nodeSize = 60;
    const nodeSpacing = 120;
    const svgWidth = 800;
    const svgHeight = 400;
    
    const cycleNodes = current.nodes.length - current.cycleStart;
    const cycleRadius = Math.max(80, cycleNodes * 30);
    const linearWidth = current.cycleStart * nodeSpacing;
    const totalWidth = linearWidth + cycleRadius * 2 + 40;
    const startX = Math.max(50, (svgWidth - totalWidth) / 2);
    const startY = svgHeight / 2;

    const getNodePosition = (index) => {
      if (index < current.cycleStart) {
        return {
          x: startX + index * nodeSpacing,
          y: startY
        };
      } else {
        const angleStep = (2 * Math.PI) / cycleNodes;
        const cycleIndex = index - current.cycleStart;
        const angle = cycleIndex * angleStep - Math.PI / 2;
        const centerX = startX + current.cycleStart * nodeSpacing + cycleRadius;
        const centerY = startY;
        
        return {
          x: centerX + cycleRadius * Math.cos(angle),
          y: centerY + cycleRadius * Math.sin(angle)
        };
      }
    };

    const renderArrow = (fromIndex, toIndex, color = '#666', strokeWidth = 2) => {
      const from = getNodePosition(fromIndex);
      const to = getNodePosition(toIndex);
      
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const unitX = dx / length;
      const unitY = dy / length;
      
      const startX = from.x + unitX * (nodeSize / 2);
      const startY = from.y + unitY * (nodeSize / 2);
      const endX = to.x - unitX * (nodeSize / 2);
      const endY = to.y - unitY * (nodeSize / 2);
      
      const arrowSize = 8;
      const arrowX1 = endX - arrowSize * unitX - arrowSize * unitY * 0.5;
      const arrowY1 = endY - arrowSize * unitY + arrowSize * unitX * 0.5;
      const arrowX2 = endX - arrowSize * unitX + arrowSize * unitY * 0.5;
      const arrowY2 = endY - arrowSize * unitY - arrowSize * unitX * 0.5;
      
      return (
        <g key={`arrow-${fromIndex}-${toIndex}`}>
          <line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke={color}
            strokeWidth={strokeWidth}
            style={{
              transition: 'all 0.5s ease'
            }}
          />
          <polygon
            points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
            fill={color}
          />
        </g>
      );
    };

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <svg
          width="800"
          height="400"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
          viewBox="0 0 800 400"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#666"
              />
            </marker>
          </defs>
          
          {current.nodes.map((value, index) => {
            const nextIndex = index < current.nodes.length - 1 ? index + 1 :
              (index >= current.cycleStart ? current.cycleStart : null);
            
            return (
              <g key={index}>
                {nextIndex !== null && renderArrow(index, nextIndex)}
              </g>
            );
          })}
          
          {current.nodes.map((value, index) => {
            const pos = getNodePosition(index);
            const isSlowPointer = current.slowPointer === index;
            const isFastPointer = current.fastPointer === index;
            const isBothPointers = isSlowPointer && isFastPointer;
            const isInCycle = index >= current.cycleStart;
            
            return (
              <g key={`node-${index}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeSize / 2}
                  fill={isBothPointers ? '#e91e63' : 
                        isSlowPointer ? '#2196f3' :
                        isFastPointer ? '#ff9800' :
                        isInCycle ? 'rgba(76,175,80,0.3)' : 'rgba(255,255,255,0.1)'}
                  stroke={isBothPointers ? '#e91e63' :
                          isSlowPointer ? '#2196f3' :
                          isFastPointer ? '#ff9800' :
                          isInCycle ? '#4caf50' : '#666'}
                  strokeWidth={isBothPointers || isSlowPointer || isFastPointer ? 3 : 2}
                  style={{
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: (isBothPointers || isSlowPointer || isFastPointer) ? 
                      'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'none'
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="16"
                  fontWeight="700"
                  style={{
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {value}
                </text>
                
                {isSlowPointer && !isBothPointers && (
                  <text
                    x={pos.x}
                    y={pos.y - 45}
                    textAnchor="middle"
                    fill="#2196f3"
                    fontSize="12"
                    fontWeight="700"
                    style={{
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'drop-shadow(0 0 4px rgba(33,150,243,0.5))'
                    }}
                  >
                    SLOW
                  </text>
                )}
                
                {isFastPointer && !isBothPointers && (
                  <text
                    x={pos.x}
                    y={pos.y - 45}
                    textAnchor="middle"
                    fill="#ff9800"
                    fontSize="12"
                    fontWeight="700"
                    style={{
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'drop-shadow(0 0 4px rgba(255,152,0,0.5))'
                    }}
                  >
                    FAST
                  </text>
                )}
                
                {isBothPointers && (
                  <text
                    x={pos.x}
                    y={pos.y - 45}
                    textAnchor="middle"
                    fill="#e91e63"
                    fontSize="12"
                    fontWeight="700"
                    style={{
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'drop-shadow(0 0 4px rgba(233,30,99,0.5))',
                      animation: 'pulse 1.5s infinite'
                    }}
                  >
                    COLLISION!
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}</style>

        {current.cycleDetected && (
          <div style={{
            background: 'rgba(233,30,99,0.1)',
            border: '2px solid #e91e63',
            borderRadius: 12,
            padding: '1rem',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#e91e63',
              marginBottom: '0.5rem'
            }}>
              Cycle Detected!
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff'
            }}>
              The slow and fast pointers have met, confirming a cycle exists in the linked list
            </div>
          </div>
        )}

        {current.checking && (
          <div style={{
            background: 'rgba(255,152,0,0.1)',
            border: '1px solid #ff9800',
            borderRadius: 12,
            padding: '1rem',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#ff9800',
              marginBottom: '0.5rem'
            }}>
              Pointer Comparison
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              slow == fast → {current.nodes[current.slowPointer]} == {current.nodes[current.fastPointer]} = {current.slowPointer === current.fastPointer ? 'TRUE' : 'FALSE'}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ccc',
              marginTop: '0.5rem'
            }}>
              {current.slowPointer === current.fastPointer ? 
                'Pointers meet - cycle detected!' : 
                'Pointers at different positions - continue'}
            </div>
          </div>
        )}
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
            color: (current && current.operation === 'complete') ? '#e91e63' :
                   (current && current.operation === 'move') ? '#ff9800' :
                   (current && current.operation === 'check') ? '#ffeb3b' :
                   '#2196f3'
          }}>
            Step {(step || 0) + 1}: {
              (current && current.operation === 'complete') ? 'Cycle Detection Complete' :
              (current && current.operation === 'move') ? 'Moving Pointers' :
              (current && current.operation === 'check') ? 'Checking for Meeting Point' :
              (current && current.operation === 'initialize') ? 'Initialize Pointers' :
              'Fast & Slow Pointer Algorithm'
            }
          </div>
          <div style={{
            fontSize: '14px',
            color: '#ccc'
          }}>
            {(current && current.note) || ''}
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
              <span style={{ color: '#ccc', fontSize: '14px' }}>Iteration: </span>
              <span style={{ color: '#2196f3', fontSize: '16px', fontWeight: 700 }}>
                {(current && typeof current.iteration === 'number') ? current.iteration : 0}
              </span>
            </div>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Status: </span>
              <span style={{ 
                color: current.cycleDetected ? '#e91e63' : '#4caf50', 
                fontSize: '16px', 
                fontWeight: 700 
              }}>
                {current.cycleDetected ? 'CYCLE FOUND' : 'SEARCHING'}
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={{
        background: 'rgba(10,13,22,0.3)',
        borderRadius: 12,
        padding: '1.5rem',
        border: '1px solid rgba(33,150,243,0.2)'
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
          minHeight: '400px',
          alignItems: 'center'
        }}>
          {renderLinkedList()}
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
                Slow Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.nodes && current.slowPointer >= 0) ? 
                  `Node ${current.nodes[current.slowPointer]}` : 
                  'N/A'}
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
                Fast Pointer
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.nodes && current.fastPointer >= 0) ? 
                  `Node ${current.nodes[current.fastPointer]}` : 
                  'N/A'}
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
                Action
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.operation === 'move') ? 'MOVE' :
                 (current && current.operation === 'check') ? 'CHECK' :
                 (current && current.operation === 'complete') ? 'DONE' :
                 (current && current.operation === 'initialize') ? 'INIT' :
                 'START'}
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
              Current Operation
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              {(current && current.operation === 'complete') ? 
                'return true  // cycle detected' :
                (current && current.operation === 'move') ?
                'slow = slow.next; fast = fast.next.next' :
                (current && current.operation === 'check') ?
                'if (slow == fast) return true' :
                (current && current.operation === 'initialize') ?
                'slow = head; fast = head' :
                'while (fast && fast.next)'
              }
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 500,
              color: (current && current.operation === 'complete') ? '#e91e63' :
                     (current && current.operation === 'move') ? '#ff9800' :
                     (current && current.operation === 'check') ? '#ffeb3b' :
                     '#2196f3'
            }}>
              {(current && current.operation === 'complete') ? 
                'Cycle found - pointers have met' :
                (current && current.operation === 'move') ? 
                'Moving pointers at different speeds' :
                (current && current.operation === 'check') ?
                'Comparing pointer positions' :
                (current && current.operation === 'initialize') ?
                'Setting up initial pointer positions' :
                'Starting cycle detection algorithm'
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
              const prev = Math.max(0, (step || 0) - 1);
              setStep && setStep(prev);
              onStepChange && onStepChange(prev + 1);
            }}
            disabled={!step || step === 0}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: (!step || step === 0) ? 'rgba(255,255,255,0.1)' : '#6c757d',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: (!step || step === 0) ? 'not-allowed' : 'pointer',
              opacity: (!step || step === 0) ? 0.5 : 1
            }}
          >
            ← Previous
          </button>

          <button
            onClick={() => {
              if ((step || 0) < maxSteps - 1) {
                const next = (step || 0) + 1;
                setStep && setStep(next);
                onStepChange && onStepChange(next + 1);
              } else {
                setStep && setStep(0);
                onReset && onReset();
                onStepChange && onStepChange(1);
              }
            }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: (step || 0) >= maxSteps - 1 ? '#dc3545' : '#2196f3',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(33,150,243,0.3)'
            }}
          >
            {(step || 0) >= maxSteps - 1 ? 'Reset' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
export default FastSlowPointersVisualization;