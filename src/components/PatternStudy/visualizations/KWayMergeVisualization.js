import React, { useState, useRef } from 'react';
import { kWayMergeSteps } from '../animations/kWayMergeSteps';

function KWayMergeVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = kWayMergeSteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

  const listColors = ['#2196f3', '#4caf50', '#ff9800'];

    const renderListElement = (value, listIndex, elementIndex, x, y, isPointer=false, isProcessed=false, isInHeap=false) => {
      const elementWidth = 35;
      const elementHeight = 30;
      const elementColor = isPointer ? '#a120ff' : 
                          isProcessed ? '#666' :
                          isInHeap ? listColors[listIndex] :
                          listColors[listIndex];
      const elementBackground = isPointer ? 'rgba(161,32,255,0.2)' : 
                               isProcessed ? 'rgba(102,102,102,0.2)' :
                               isInHeap ? `rgba(${listIndex === 0 ? '33,150,243' : listIndex === 1 ? '76,175,80' : '255,152,0'},0.2)` :
                               'rgba(255,255,255,0.1)';
      
      return (
        <g key={`list-${listIndex}-${elementIndex}`}>
          <rect 
            x={x - elementWidth/2}
            y={y - elementHeight/2}
            width={elementWidth}
            height={elementHeight}
            fill={elementBackground}
            stroke={elementColor}
            strokeWidth={isPointer ? '3' : '2'}
            rx='4'
            style={{
              filter: isPointer ? 'dropshadow(0 0 8px rgba(161,32,255,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+4}
            textAnchor='middle'
            fill='#fff'
            fontSize='14'
            fontWeight={isPointer ? '700' : '500'}>
            {value}
          </text>
          <text
            x={x}
            y={y+18}
            textAnchor='middle'
            fill='#888'
            fontSize='9'>
            {elementIndex}
          </text>
          {isPointer && (
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

    const renderHeapElement = (heapItem, index, x, y, isRoot=false, isNew=false) => {
      const nodeRadius = 25;
      const listColor = listColors[heapItem.listIndex];
      const nodeColor = isRoot ? '#4caf50' :
                       isNew ? '#a120ff' :
                       listColor;
      const nodeBackground = isRoot ? 'rgba(76,175,80,0.2)' :
                            isNew ? 'rgba(161,32,255,0.2)' :
                            `rgba(${heapItem.listIndex === 0 ? '33,150,243' : heapItem.listIndex === 1 ? '76,175,80' : '255,152,0'},0.2)`;
      
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
            y={y+2}
            textAnchor='middle'
            fill='#fff'
            fontSize='16'
            fontWeight={isRoot ? '700' : '500'}>
            {heapItem.value}
          </text>
          <text
            x={x}
            y={y+12}
            textAnchor='middle'
            fill='#ccc'
            fontSize='9'>
            L{heapItem.listIndex}
          </text>
          {isRoot && (
            <text
              x={x}
              y={y-35}
              textAnchor='middle'
              fill='#4caf50'
              fontSize='12'
              fontWeight='700'>
              MIN
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

    const renderResultElement = (value, index, x, y, isNew=false) => {
      const elementWidth = 35;
      const elementHeight = 30;
      const elementColor = isNew ? '#4caf50' : '#fff';
      const elementBackground = isNew ? 'rgba(76,175,80,0.2)' : 'rgba(255,255,255,0.1)';
      
      return (
        <g key={`result-${index}`}>
          <rect 
            x={x - elementWidth/2}
            y={y - elementHeight/2}
            width={elementWidth}
            height={elementHeight}
            fill={elementBackground}
            stroke={elementColor}
            strokeWidth={isNew ? '3' : '2'}
            rx='4'
            style={{
              filter: isNew ? 'dropshadow(0 0 8px rgba(76,175,80,0.5))' : 'none'
            }}/>
          <text
            x={x}
            y={y+4}
            textAnchor='middle'
            fill='#fff'
            fontSize='14'
            fontWeight={isNew ? '700' : '500'}>
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
                     info.phase === 'merging' ? '#2196f3' :
                     '#a120ff'
            }}>
              Step {step+1}: {info.phase === 'initialize' ? 'Initialize Algorithm' :
                             info.phase === 'building' ? 'Building Min-Heap' :
                             info.phase === 'merging' ? 'Merging Lists' :
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
                <span style={{ color: '#ccc', fontSize: '14px' }}>Lists Count: </span>
                <span style={{ color: '#a120ff', fontSize: '16px', fontWeight: 700 }}>
                  {info.lists ? info.lists.length : 3}
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
                Input Sorted Lists
              </div>
              <svg width="700" height="200" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.lists && current.lists.map((list, listIndex) => (
                  <g key={`list-${listIndex}`}>
                    <text
                      x="50"
                      y={30 + listIndex * 60}
                      fill={listColors[listIndex]}
                      fontSize="14"
                      fontWeight="600">
                      List {listIndex}:
                    </text>
                    {list.map((value, elementIndex) => {
                      const isCurrentPointer = current.pointers[listIndex] === elementIndex;
                      const isProcessed = current.pointers[listIndex] > elementIndex;
                      const isInHeap = current.heap && current.heap.some(h => 
                        h.listIndex === listIndex && h.elementIndex === elementIndex
                      );
                      
                      return renderListElement(
                        value,
                        listIndex,
                        elementIndex,
                        120 + elementIndex * 45,
                        40 + listIndex * 60,
                        isCurrentPointer,
                        isProcessed,
                        isInHeap
                      );
                    })}
                    {current.pointers[listIndex] < list.length && (
                      <polygon
                        points={`${120 + current.pointers[listIndex] * 45 - 8},${25 + listIndex * 60} ${120 + current.pointers[listIndex] * 45},${15 + listIndex * 60} ${120 + current.pointers[listIndex] * 45 + 8},${25 + listIndex * 60}`}
                        fill="#a120ff"
                      />
                    )}
                    {current.pointers[listIndex] >= list.length && (
                      <text
                        x={120 + list.length * 45}
                        y={45 + listIndex * 60}
                        fill="#666"
                        fontSize="12"
                        fontWeight="600">
                        EXHAUSTED
                      </text>
                    )}
                  </g>
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
                Min-Heap (Size = {current && current.heap ? current.heap.length : 0})
              </div>
              <svg width="400" height="220" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.heap && current.heap.length > 0 && (
                  <>
                    {current.heap.length > 1 && renderHeapConnection(200, 50, 150, 110)}
                    {current.heap.length > 2 && renderHeapConnection(200, 50, 250, 110)}
                    {current.heap.length > 3 && renderHeapConnection(150, 110, 100, 170)}
                    {current.heap.length > 4 && renderHeapConnection(150, 110, 200, 170)}
                    
                    {current.heap.map((heapItem, index) => {
                      let x, y;
                      if (index === 0) { x = 200; y = 50; }
                      else if (index === 1) { x = 150; y = 110; }
                      else if (index === 2) { x = 250; y = 110; }
                      else if (index === 3) { x = 100; y = 170; }
                      else { x = 200; y = 170; }
                      
                      return renderHeapElement(
                        heapItem,
                        index,
                        x,
                        y,
                        index === 0,
                        current.phase === 'building' && current.currentList === heapItem.listIndex
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
                  <text x="45" y="45" fill="#ccc" fontSize="10">Min Element</text>
                  
                  <circle cx="30" cy="60" r="8" fill="rgba(33,150,243,0.2)" stroke="#2196f3" strokeWidth="2" />
                  <text x="45" y="65" fill="#ccc" fontSize="10">From List 0</text>
                  
                  <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                  <text x="45" y="85" fill="#ccc" fontSize="10">From List 1</text>

                  <circle cx="30" cy="100" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                  <text x="45" y="105" fill="#ccc" fontSize="10">From List 2</text>
                </g>
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
                color: '#4caf50',
                textAlign: 'center'
              }}>
                Merged Result Array
              </div>
              <svg width="600" height="80" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
                {current && current.result && current.result.map((value, index) => (
                  renderResultElement(
                    value,
                    index,
                    40 + index * 45,
                    40,
                    current.poppedValue === value && index === current.result.length - 1
                  )
                ))}
                {(!current || !current.result || current.result.length === 0) && (
                  <text x="300" y="45" textAnchor="middle" fill="#666" fontSize="16">
                    Empty Result
                  </text>
                )}
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
                  [{(current.heap || []).map(h => `${h.value}(L${h.listIndex})`).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Size: {current.heap ? current.heap.length : 0}
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
                  Merged Result
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.result || []).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Length: {current.result ? current.result.length : 0}
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
                {current.phase === 'initialize' ? 'Initialize pointers and empty heap for merging' :
                 current.phase === 'building' ? `Add first element ${current.heap && current.heap.length > 0 ? current.heap[current.heap.length - 1].value : ''} from List ${current.currentList}` :
                 current.phase === 'merging' ? `Pop min value ${current.poppedValue} from List ${current.poppedFrom}, add to result` :
                 current.phase === 'complete' ? `Merge complete: [${current.result.join(', ')}]` :
                 'Processing...'}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: current.phase === 'complete' ? '#4caf50' :
                       current.phase === 'merging' ? '#2196f3' :
                       current.phase === 'building' ? '#ff9800' :
                       '#a120ff'
              }}>
                {current.phase === 'complete' ? 'All lists successfully merged into sorted array' :
                 current.phase === 'merging' ? '→ Extract minimum from heap and process next element' :
                 current.phase === 'building' ? '→ Building initial heap with first elements from each list' :
                 'Ready to start K-way merge process'}
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
export default KWayMergeVisualization;