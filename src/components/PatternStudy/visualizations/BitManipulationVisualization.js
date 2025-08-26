import React, { useState, useRef } from 'react';
import { bitManipulationSteps } from '../animations/bitManipulationSteps';

function BitManipulationVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = bitManipulationSteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

  const renderArrayElement = (value, index, x, y, isCurrent=false, isProcessed=false) => {
      const elementWidth = 50;
      const elementHeight = 40;
      const elementColor = isCurrent ? '#a120ff' : 
                          isProcessed ? '#4caf50' :
                          '#666';
      const elementBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                               isProcessed ? 'rgba(76,175,80,0.2)' : 
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
            strokeWidth={isCurrent ? '3' : '2'}
            rx='6'
            style={{
              filter: isCurrent ? 'dropshadow(0 0 8px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+2}
            textAnchor='middle'
            fill='#fff'
            fontSize='18'
            fontWeight={isCurrent ? '700' : '500'}>
            {value}
          </text>
          <text
            x={x}
            y={y+20}
            textAnchor='middle'
            fill='#888'
            fontSize='10'>
            [{index}]
          </text>
          {isCurrent && (
            <text
              x={x}
              y={y-30}
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

    const renderBinaryVisualization = (binary, x, y, label, isHighlight=false) => {
      const bitWidth = 20;
      const bitHeight = 25;
      const labelColor = isHighlight ? '#a120ff' : '#fff';
      const bitColor = isHighlight ? '#a120ff' : '#ff9800';
      
      return (
        <g>
          <text
            x={x - 50}
            y={y + 5}
            fill={labelColor}
            fontSize='14'
            fontWeight='600'>
            {label}:
          </text>
          {binary.split('').map((bit, index) => (
            <g key={`bit-${index}`}>
              <rect
                x={x + index * (bitWidth + 2)}
                y={y - bitHeight/2}
                width={bitWidth}
                height={bitHeight}
                fill={bit === '1' ? `rgba(${isHighlight ? '161,32,255' : '255,152,0'},0.3)` : 'rgba(35,36,58,0.8)'}
                stroke={bitColor}
                strokeWidth='1'
                rx='3'/>
              <text
                x={x + index * (bitWidth + 2) + bitWidth/2}
                y={y + 4}
                textAnchor='middle'
                fill='#fff'
                fontSize='12'
                fontWeight='600'>
                {bit}
              </text>
            </g>
          ))}
        </g>
      );
    };

    const renderXOROperation = (binary1, binary2, result, x, y) => {
      if (!binary1 || !binary2 || !result) return null;
      
      const bitWidth = 18;
      const spacing = 35;
      
      return (
        <g>
          <text x={x} y={y} fill='#ccc' fontSize='14' fontWeight='600'>XOR Operation:</text>
          
          {renderBinaryVisualization(binary1, x + 20, y + spacing, binary1.split('').reduce((acc, bit, i) => acc + parseInt(bit) * Math.pow(2, 7-i), 0).toString(), false)}
          
          <text x={x + 20} y={y + spacing * 2} fill='#a120ff' fontSize='16' fontWeight='700'>⊕</text>
          
          {renderBinaryVisualization(binary2, x + 20, y + spacing * 2 + 20, binary2.split('').reduce((acc, bit, i) => acc + parseInt(bit) * Math.pow(2, 7-i), 0).toString(), false)}
          
          <line x1={x + 20} y1={y + spacing * 2 + 40} x2={x + 20 + 8 * (bitWidth + 2)} y2={y + spacing * 2 + 40} stroke='#666' strokeWidth='2'/>
          
          {renderBinaryVisualization(result, x + 20, y + spacing * 2 + 60, result.split('').reduce((acc, bit, i) => acc + parseInt(bit) * Math.pow(2, 7-i), 0).toString(), true)}
        </g>
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
                     info.phase === 'processing' ? '#2196f3' :
                     '#a120ff'
            }}>
              Step {step+1}: {info.phase === 'initialize' ? 'Initialize XOR Result' :
                             info.phase === 'processing' ? 'Processing Array Element' :
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
                <span style={{ color: '#ccc', fontSize: '14px' }}>Array Length: </span>
                <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                  {info.array ? info.array.length : 0}
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
              <svg width="700" height="100" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.array && current.array.map((value, index) => (
                  renderArrayElement(
                    value, 
                    index, 
                    100 + index * 80, 
                    50,
                    current.currentIndex === index,
                    current.currentIndex !== -1 && index < current.currentIndex
                  )
                ))}
                {current.currentIndex >= 0 && (
                  <polygon
                    points={`${100 + current.currentIndex * 80 - 12},${20} ${100 + current.currentIndex * 80},${10} ${100 + current.currentIndex * 80 + 12},${20}`}
                    fill="#a120ff"
                  />
                )}
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
                Binary Representation
              </div>
              <svg width="600" height="120" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.binaryArray && current.currentIndex >= 0 && (
                  <>
                    <text x="50" y="25" fill="#ccc" fontSize="14" fontWeight="600">Array:</text>
                    {current.binaryArray.map((binary, index) => {
                      const isHighlight = index === current.currentIndex;
                      const isProcessed = current.currentIndex !== -1 && index < current.currentIndex;
                      return (
                        <g key={`binary-${index}`}>
                          <text
                            x="80"
                            y={45 + index * 18}
                            fill={isHighlight ? '#a120ff' : isProcessed ? '#4caf50' : '#ccc'}
                            fontSize="12"
                            fontWeight={isHighlight ? '700' : '500'}>
                            [{index}] {current.array[index]}:
                          </text>
                          {renderBinaryVisualization(binary, 180, 40 + index * 18, '', isHighlight)}
                        </g>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>
          </div>

          {current && current.binaryOperation && (
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
                  color: '#a120ff',
                  textAlign: 'center'
                }}>
                  XOR Operation Visualization
                </div>
                <svg width="600" height="200" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                  {renderXOROperation(
                    current.binaryOperation.split(' ^ ')[0],
                    current.binaryOperation.split(' ^ ')[1],
                    current.operationResult,
                    50,
                    30
                  )}
                </svg>
              </div>
            </div>
          )}

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
                  Current Result
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  {current.result}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#ccc',
                  marginTop: '0.5rem',
                  fontFamily: 'monospace'
                }}>
                  Binary: {current.binaryResult}
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
                  {current.phase === 'complete' ? 'Single Number' : 'Current Element'}
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  {current.phase === 'complete' ? current.result : (current.currentNum || '-')}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  {current.phase === 'complete' ? 'Final Answer' : 'Processing...'}
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
                {current.phase === 'initialize' ? 'Initialize result = 0' :
                 current.phase === 'processing' ? `result ^= ${current.currentNum} → ${current.result}` :
                 current.phase === 'complete' ? `Single number found: ${current.result}` :
                 'Processing...'}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: current.phase === 'complete' ? '#4caf50' :
                       current.phase === 'processing' ? '#2196f3' :
                       '#a120ff'
              }}>
                {current.phase === 'complete' ? 'All duplicates cancelled out via XOR property' :
                 current.phase === 'processing' ? '→ XOR current element with running result' :
                 'XOR property: a ⊕ a = 0, a ⊕ 0 = a'}
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
export default BitManipulationVisualization;