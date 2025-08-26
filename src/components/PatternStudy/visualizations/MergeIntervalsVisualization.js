import React, { useState, useRef } from 'react';
import mergeIntervalsSteps from '../animations/mergeIntervalsSteps';

function MergeIntervalsVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = mergeIntervalsSteps;
  const maxSteps = steps ? steps.length : 0;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

  const renderIntervals = () => {
    if (!current || !current.intervals || !Array.isArray(current.intervals)) return null;

    const allValues = [...current.intervals.flat()];
    if (current.merged && current.merged.length > 0 && Array.isArray(current.merged)) {
      allValues.push(...current.merged.flat());
    }
    if (allValues.length === 0) return null;
    const maxVal = Math.max(...allValues) + 2;
    const scale = 500 / maxVal;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center'
      }}>
        
        <div style={{
          width: '600px',
          height: '30px',
          position: 'relative',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {Array.from({length: maxVal + 1}, (_, i) => i).filter(i => i % 2 === 0).map(tick => (
            <div key={tick} style={{
              position: 'absolute',
              left: `${(tick * scale)}px`,
              top: '100%',
              fontSize: '12px',
              color: '#888',
              transform: 'translateX(-50%)',
              marginTop: '5px'
            }}>
              {tick}
            </div>
          ))}
        </div>

        <div style={{
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#2196f3'
          }}>
            Input Intervals
          </div>
          <div style={{
            position: 'relative',
            width: '600px',
            height: '50px',
            margin: '0 auto'
          }}>
            {current.intervals && Array.isArray(current.intervals) ? current.intervals.map((interval, idx) => {
              const isCurrent = current.currentIndex === idx;
              const isChecking = current.checking && 
                current.checking[0] === interval[0] && 
                current.checking[1] === interval[1];
              
              return (
                <div key={idx} style={{
                  position: 'absolute',
                  left: `${interval[0] * scale}px`,
                  width: `${(interval[1] - interval[0]) * scale}px`,
                  height: '35px',
                  top: '7px',
                  background: (isCurrent || isChecking) ? 
                    (current.operation === 'merge' ? 'rgba(233,30,99,0.8)' : 'rgba(255,152,0,0.8)') :
                    'rgba(33,150,243,0.6)',
                  border: `2px solid ${(isCurrent || isChecking) ? 
                    (current.operation === 'merge' ? '#e91e63' : '#ff9800') : 
                    '#2196f3'}`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 700,
                  boxShadow: (isCurrent || isChecking) ? 
                    '0 4px 12px rgba(255,152,0,0.4)' : 
                    '0 2px 6px rgba(33,150,243,0.3)',
                  transition: 'all 0.3s ease',
                  transform: (isCurrent || isChecking) ? 'scale(1.05)' : 'scale(1)',
                  zIndex: (isCurrent || isChecking) ? 10 : 1
                }}>
                  [{interval[0]},{interval[1]}]
                  {(isCurrent || isChecking) && (
                    <div style={{
                      position: 'absolute',
                      top: '-25px',
                      background: current.operation === 'merge' ? '#e91e63' : '#ff9800',
                      color: '#fff',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: '10px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>
                      {current.operation === 'merge' ? 'MERGING' : 'CURRENT'}
                    </div>
                  )}
                </div>
              );
            }) : null}
          </div>
        </div>

        {current && current.merged && Array.isArray(current.merged) && current.merged.length > 0 && (
          <div style={{
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#4caf50'
            }}>
              Merged Result
            </div>
            <div style={{
              position: 'relative',
              width: '600px',
              height: '50px',
              margin: '0 auto'
            }}>
              {current.merged && Array.isArray(current.merged) ? current.merged.map((interval, idx) => {
                const isLastMerged = current.lastMerged && 
                  current.lastMerged[0] === interval[0] && 
                  current.lastMerged[1] === interval[1];
                
                return (
                  <div key={idx} style={{
                    position: 'absolute',
                    left: `${interval[0] * scale}px`,
                    width: `${(interval[1] - interval[0]) * scale}px`,
                    height: '35px',
                    top: '7px',
                    background: isLastMerged ? 'rgba(76,175,80,0.9)' : 'rgba(76,175,80,0.6)',
                    border: `2px solid ${isLastMerged ? '#4caf50' : '#66bb6a'}`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    boxShadow: isLastMerged ? 
                      '0 4px 12px rgba(76,175,80,0.4)' : 
                      '0 2px 6px rgba(76,175,80,0.3)',
                    transition: 'all 0.3s ease',
                    transform: isLastMerged ? 'scale(1.05)' : 'scale(1)',
                    zIndex: isLastMerged ? 10 : 1
                  }}>
                    [{interval[0]},{interval[1]}]
                    {isLastMerged && (
                      <div style={{
                        position: 'absolute',
                        top: '-25px',
                        background: '#4caf50',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: '10px',
                        fontWeight: 700
                      }}>
                        LAST MERGED
                      </div>
                    )}
                  </div>
                );
              }) : null}
            </div>
          </div>
        )}

        {current && current.checking && current.lastMerged && current.operation === 'check_overlap' && (
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
              Overlap Check
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff',
              marginBottom: '0.5rem',
              fontFamily: 'monospace'
            }}>
              current.start ≤ last_merged.end
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff',
              fontFamily: 'monospace'
            }}>
              {current && current.checking && current.lastMerged &&
                `${current.checking[0]} ≤ ${current.lastMerged[1]} = ${current.checking[0] <= current.lastMerged[1] ? 'TRUE' : 'FALSE'}`}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ccc',
              marginTop: '0.5rem'
            }}>
              {current && current.checking && current.lastMerged && 
                (current.checking[0] <= current.lastMerged[1] ? 
                'Intervals overlap - they will be merged' : 
                'No overlap - add as separate interval')}
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
            color: (current && current.operation === 'complete') ? '#4caf50' :
                   (current && current.operation === 'merge') ? '#e91e63' :
                   (current && current.operation === 'add_new') ? '#ff9800' :
                   '#2196f3'
          }}>
            Step {(step || 0) + 1}: {
              (current && current.operation === 'complete') ? 'Merging Complete' :
              (current && current.operation === 'merge') ? 'Merging Overlapping Intervals' :
              (current && current.operation === 'add_new') ? 'Adding Non-overlapping Interval' :
              (current && current.operation === 'check_overlap') ? 'Checking for Overlap' :
              (current && current.operation === 'initialize') ? 'Initialize with First Interval' :
              'Starting Process'
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
              <span style={{ color: '#ccc', fontSize: '14px' }}>Processed: </span>
              <span style={{ color: '#2196f3', fontSize: '16px', fontWeight: 700 }}>
                {Math.max(0, (current && typeof current.currentIndex === 'number' ? Math.min(current.currentIndex + 1, current.intervals ? current.intervals.length : 0) : 0))}/{(current && current.intervals) ? current.intervals.length : 0}
              </span>
            </div>
            <div style={{
              background: 'rgba(35,36,58,0.6)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              display: 'inline-block'
            }}>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Merged: </span>
              <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                {(current && current.merged) ? current.merged.length : 0}
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
          minHeight: '200px',
          alignItems: 'center'
        }}>
          {renderIntervals()}
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
                color: '#ff9800'
              }}>
                Current Interval
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.checking) ? 
                  `[${current.checking[0]},${current.checking[1]}]` : 
                  (current && current.currentIndex >= 0 && current.intervals && current.currentIndex < current.intervals.length) ?
                  `[${current.intervals[current.currentIndex][0]},${current.intervals[current.currentIndex][1]}]` :
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
                Last Merged
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.lastMerged) ? 
                  `[${current.lastMerged[0]},${current.lastMerged[1]}]` : 
                  'None'}
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
                color: '#2196f3'
              }}>
                Action
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {(current && current.operation === 'merge') ? 'MERGE' :
                 (current && current.operation === 'add_new') ? 'ADD' :
                 (current && current.operation === 'check_overlap') ? 'CHECK' :
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
                'return merged[]' :
                (current && current.operation === 'merge') ?
                'merged[-1] = [start, max(end1, end2)]' :
                (current && current.operation === 'add_new') ?
                'merged.append(current)' :
                (current && current.operation === 'check_overlap') ?
                'if current.start <= merged[-1].end' :
                (current && current.operation === 'initialize') ?
                'merged = [intervals[0]]' :
                'sort(intervals, key=lambda x: x[0])'
              }
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 500,
              color: (current && current.operation === 'complete') ? '#4caf50' :
                     (current && current.operation === 'merge') ? '#e91e63' :
                     (current && current.operation === 'add_new') ? '#ff9800' :
                     '#2196f3'
            }}>
              {(current && current.operation === 'complete') ? 
                'All intervals successfully merged' :
                (current && current.operation === 'merge') ? 
                'Combining overlapping intervals into one' :
                (current && current.operation === 'add_new') ?
                '➕ Adding non-overlapping interval to result' :
                (current && current.operation === 'check_overlap') ?
                'Determining if intervals can be merged' :
                (current && current.operation === 'initialize') ?
                'Starting with first interval as base' :
                'Sorting intervals by start time'
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
export default MergeIntervalsVisualization;