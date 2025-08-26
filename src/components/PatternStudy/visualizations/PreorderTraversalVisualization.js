import React, { useState, useRef } from 'react';
import { preorderSteps } from '../animations/preorderSteps';

function PreorderTraversalVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = preorderSteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

  const renderTreeNode = (nodeValue, x, y, isHighlighted = false, isVisited = false, isCurrent = false, visitOrder = null) => {
      const nodeRadius = 25;
      const nodeColor = isCurrent ? '#a120ff' : 
                        isVisited ? '#4caf50' :
                        isHighlighted ? '#ff9800' :
                        '#666';
      const nodeBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                             isVisited ? 'rgba(76,175,80,0.2)' : 
                             isHighlighted ? 'rgba(255,152,0,0.2)' :
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
              filter: isCurrent ? 'drop-shadow(0 0 10px rgba(161,32,255,0.5))' : 'none'
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
          {visitOrder && (
            <text
              x={x}
              y={y+45}
              textAnchor='middle'
              fill='#4caf50'
              fontSize='12'
              fontWeight='700'>
              #{visitOrder}
            </text>
          )}
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

    const renderTreeEdge = (x1, y1, x2, y2, isTraversed = false) => {
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isTraversed ? 'rgba(76,175,80,0.6)' : 'rgba(161,32,255,0.4)'}
          strokeWidth={isTraversed ? '3' : '2'}/>
      );
    };

    const renderBacktrackArrow = (x1, y1, x2, y2) => {
      return (
        <g>
          <defs>
            <marker
              id='backtrack-arrow-pre'
              viewBox='0 0 10 10'
              refX='8'
              refY='3'
              markerWidth='6'
              markerHeight='6'
              orient='auto'>
              <path d='M0,0 L0,6 L9,3 z' fill='#dc3545'/>
            </marker>
          </defs>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke='#dc3545'
            strokeWidth='3'
            strokeDasharray='8,4'
            markerEnd='url(#backtrack-arrow-pre)'/>
        </g>
      );
    };


    const getVisitOrder = (nodeValue) => {
      const order = {4: 1, 2: 2, 1: 3, 3: 4, 6: 5, 7: 6};
      return current.visitedNodes && current.visitedNodes.includes(nodeValue.toString()) ? order[nodeValue] : null;
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
              color: '#a120ff'
            }}>
              Step {step+1}: {info.title || `Preorder Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '0.5rem'
            }}>
              {info.description || ''}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ff9800',
              fontStyle: 'italic'
            }}>
              Pattern: Root → Left → Right (Visit immediately)
            </div>
          </div>
        )}

        <div style={{
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
            <svg width="500" height="350" style={{ background: 'rgba(35,36,58,0.2)', borderRadius: 8 }}>
              <defs>
                <marker
                  id='backtrack-arrow-pre'
                  viewBox='0 0 10 10'
                  refX='8'
                  refY='3'
                  markerWidth='6'
                  markerHeight='6'
                  orient='auto'>
                  <path d='M0,0 L0,6 L9,3 z' fill='#dc3545'/>
                </marker>
              </defs>

           
              {renderTreeEdge(250, 70, 180, 140)}
              {renderTreeEdge(250, 70, 320, 140)}
              {renderTreeEdge(180, 140, 130, 210)}
              {renderTreeEdge(180, 140, 230, 210)}
              {renderTreeEdge(320, 140, 370, 210)}

         
              {current.action === 'backtrack' && current.currentNode === 'left_grandchild' &&
                renderBacktrackArrow(130, 210, 180, 140)}
              {current.action === 'backtrack' && current.currentNode === 'parent_right' &&
                renderBacktrackArrow(180, 140, 250, 70)}

      
              {renderTreeNode(4, 250, 70, 
                current.highlightNodes && current.highlightNodes.includes('root'),
                current.visitedNodes && current.visitedNodes.includes('4'),
                current.currentNode === 'root',
                getVisitOrder(4))}
              {renderTreeNode(2, 180, 140, 
                current.highlightNodes && current.highlightNodes.includes('left_child'),
                current.visitedNodes && current.visitedNodes.includes('2'),
                current.currentNode === 'left_child',
                getVisitOrder(2))}
              {renderTreeNode(6, 320, 140, 
                (current.highlightNodes && current.highlightNodes.includes('parent_right')) || (current.highlightNodes && current.highlightNodes.includes('right_subtree_root')),
                current.visitedNodes && current.visitedNodes.includes('6'),
                current.currentNode === 'parent_right' || current.currentNode === 'right_subtree_root',
                getVisitOrder(6))}
              {renderTreeNode(1, 130, 210, 
                current.highlightNodes && current.highlightNodes.includes('left_grandchild'),
                current.visitedNodes && current.visitedNodes.includes('1'),
                current.currentNode === 'left_grandchild',
                getVisitOrder(1))}
              {renderTreeNode(3, 230, 210, 
                (current.highlightNodes && current.highlightNodes.includes('right_of_grandchild')) || (current.highlightNodes && current.highlightNodes.includes('right_nodes')),
                current.visitedNodes && current.visitedNodes.includes('3'),
                current.currentNode === 'right_of_grandchild' || current.currentNode === 'right_nodes',
                getVisitOrder(3))}
              {renderTreeNode(7, 370, 210, 
                current.highlightNodes && current.highlightNodes.includes('right_nodes'),
                current.visitedNodes && current.visitedNodes.includes('7'),
                current.currentNode === 'right_nodes',
                getVisitOrder(7))}

         
              <g>
                <text x="20" y="25" fill="#ccc" fontSize="12" fontWeight="600">Legend:</text>
                <circle cx="30" cy="40" r="8" fill="rgba(161,32,255,0.2)" stroke="#a120ff" strokeWidth="2" />
                <text x="45" y="45" fill="#ccc" fontSize="10">Current</text>
                
                <circle cx="30" cy="60" r="8" fill="rgba(255,152,0,0.2)" stroke="#ff9800" strokeWidth="2" />
                <text x="45" y="65" fill="#ccc" fontSize="10">Exploring</text>
                
                <circle cx="30" cy="80" r="8" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="2" />
                <text x="45" y="85" fill="#ccc" fontSize="10">Visited</text>

                <line x1="30" y1="100" x2="50" y2="100" stroke="#dc3545" strokeWidth="3" strokeDasharray="4,2"/>
                <text x="55" y="105" fill="#ccc" fontSize="10">Backtrack</text>
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
                  color: '#4caf50'
                }}>
                  Visited Order
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  [{(current.visitedNodes || []).join(', ')}]
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  Final: [4, 2, 1, 3, 6, 7]
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
                  color: '#a120ff'
                }}>
                  Current Action
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff'
                }}>
                  {current.action === 'start' ? 'Starting traversal' :
                   current.action === 'visit' ? 'Visit node NOW' :
                   current.action === 'traverse_left' ? 'Going left' :
                   current.action === 'traverse_right' ? 'Going right' :
                   current.action === 'check_right' ? 'Checking right' :
                   current.action === 'backtrack' ? 'Backtracking' :
                   current.action === 'continue' ? 'Continuing pattern' :
                   current.action === 'complete' ? 'Complete!' :
                   'Processing...'}
                </div>
              </div>
            </div>
          )}

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
              Explanation
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              lineHeight: 1.5
            }}>
              {current.explanation || 'Preorder traversal visits nodes in Root → Left → Right pattern. Each node is processed immediately when first encountered, making it perfect for copying trees.'}
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={() => {
                const prev = Math.max(0, step-1);
                setStep(prev);
                if (onStepChange) onStepChange(prev+1);
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
              }}>
              ← Previous
            </button>

            <button
              onClick={() => {
                if (step < maxSteps-1) {
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

export default PreorderTraversalVisualization;