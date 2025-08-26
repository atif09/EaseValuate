import React, { useState, useRef } from 'react';
import greedySteps from '../animations/greedySteps';

function GreedyVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = greedySteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

  const renderPriceChart = () => {
      if (!current || !current.array || !Array.isArray(current.array)) return null;

      const prices = current.array;
      const maxPrice = Math.max(...prices);
      const minPriceVal = Math.min(...prices);
      const range = maxPrice - minPriceVal;
      const padding = range * 0.2;
      const chartHeight = 200;
      const chartWidth = 600;
      const stepWidth = chartWidth / (prices.length - 1);

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center'
        }}>
          
          <div style={{
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#9c27b0'
            }}>
              Stock Prices Over Time
            </div>
            <div style={{
              position: 'relative',
              width: `${chartWidth}px`,
              height: `${chartHeight}px`,
              margin: '0 auto',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
        
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${(i * chartHeight) / 4}px`,
                  height: '1px',
                  background: 'rgba(255,255,255,0.1)',
                  zIndex: 1
                }} />
              ))}
              
       
              <svg style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2
              }}>
                <polyline
                  fill="none"
                  stroke="#9c27b0"
                  strokeWidth="3"
                  points={prices.map((price, idx) => {
                    const x = idx * stepWidth;
                    const y = chartHeight - ((price - minPriceVal + padding) / (range + 2 * padding)) * chartHeight;
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>

          
              {prices.map((price, idx) => {
                const x = idx * stepWidth;
                const y = chartHeight - ((price - minPriceVal + padding) / (range + 2 * padding)) * chartHeight;
                const isCurrent = current.currentIndex === idx;
                const isMinPrice = price === current.minPrice && idx <= current.currentIndex;
                const isProfitableDay = current.currentPrice && price === current.currentPrice && current.profitCalculation && current.profitCalculation !== "null";
                
                return (
                  <div key={idx} style={{
                    position: 'absolute',
                    left: `${x - 15}px`,
                    top: `${y - 15}px`,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: isCurrent ? 
                      (current.phase === 'complete' ? '#4caf50' : '#ff9800') :
                      isMinPrice ? '#e91e63' :
                      '#9c27b0',
                    border: `3px solid ${isCurrent ? '#fff' : 'transparent'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    zIndex: 10,
                    boxShadow: isCurrent ? '0 4px 12px rgba(255,152,0,0.4)' : 
                               isMinPrice ? '0 4px 12px rgba(233,30,99,0.4)' :
                               '0 2px 6px rgba(156,39,176,0.3)',
                    transition: 'all 0.3s ease',
                    transform: isCurrent ? 'scale(1.2)' : 'scale(1)'
                  }}>
                    {price}
                    {isCurrent && (
                      <div style={{
                        position: 'absolute',
                        top: '-35px',
                        background: current.phase === 'complete' ? '#4caf50' : '#ff9800',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: '10px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap'
                      }}>
                        CURRENT
                      </div>
                    )}
                    {isMinPrice && !isCurrent && (
                      <div style={{
                        position: 'absolute',
                        top: '-35px',
                        background: '#e91e63',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: '10px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap'
                      }}>
                        MIN
                      </div>
                    )}
                  </div>
                );
              })}

              {prices.map((_, idx) => (
                <div key={idx} style={{
                  position: 'absolute',
                  left: `${idx * stepWidth - 15}px`,
                  top: `${chartHeight + 10}px`,
                  width: '30px',
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#888',
                  fontWeight: 600
                }}>
                  Day {idx}
                </div>
              ))}
            </div>
          </div>

      
          {current && current.profitCalculation && current.currentIndex >= 0 && (
            <div style={{
              background: 'rgba(76,175,80,0.1)',
              border: '1px solid #4caf50',
              borderRadius: 12,
              padding: '1rem',
              textAlign: 'center',
              maxWidth: '600px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#4caf50',
                marginBottom: '0.5rem'
              }}>
                Profit Calculation
              </div>
              <div style={{
                fontSize: '14px',
                color: '#fff',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>
                current_price - min_price
              </div>
              <div style={{
                fontSize: '18px',
                color: '#fff',
                fontFamily: 'monospace',
                fontWeight: 700
              }}>
                {current.profitCalculation}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#ccc',
                marginTop: '0.5rem'
              }}>
                {current.decision}
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
              color: (current && current.phase === 'complete') ? '#4caf50' :
                     (current && current.decision === 'Found better buying opportunity') ? '#e91e63' :
                     (current && current.decision && current.decision.includes('Update max_profit')) ? '#ff9800' :
                     '#9c27b0'
            }}>
              Step {(step || 0) + 1}: {
                (current && current.phase === 'complete') ? 'Algorithm Complete' :
                (current && current.decision === 'Found better buying opportunity') ? 'New Minimum Price Found' :
                (current && current.decision && current.decision.includes('Update max_profit')) ? 'Better Profit Found' :
                (current && current.phase === 'initialize') ? 'Initialize Variables' :
                'Processing Current Price'
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
                <span style={{ color: '#9c27b0', fontSize: '16px', fontWeight: 700 }}>
                  {Math.max(0, (current && typeof current.currentIndex === 'number' ? Math.min(current.currentIndex + 1, current.array ? current.array.length : 0) : 0))}/{(current && current.array) ? current.array.length : 0}
                </span>
              </div>
              <div style={{
                background: 'rgba(35,36,58,0.6)',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                display: 'inline-block'
              }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Max Profit: </span>
                <span style={{ color: '#4caf50', fontSize: '16px', fontWeight: 700 }}>
                  {current ? current.maxProfit : 0}
                </span>
              </div>
            </div>
          </div>
        )}

        <div style={{
          background: 'rgba(10,13,22,0.3)',
          borderRadius: 12,
          padding: '1.5rem',
          border: '1px solid rgba(156,39,176,0.2)'
        }}>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
            minHeight: '300px',
            alignItems: 'center'
          }}>
            {renderPriceChart()}
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
                  Current Price
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  {(current && current.currentPrice !== null) ? 
                    `$${current.currentPrice}` : 
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
                  color: '#e91e63'
                }}>
                  Min Price
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  {current ? `$${current.minPrice}` : '$0'}
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
                  Max Profit
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  ${current ? current.maxProfit : 0}
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
                color: '#9c27b0'
              }}>
                Greedy Decision
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#fff',
                fontFamily: 'monospace'
              }}>
                {(current && current.phase === 'complete') ? 
                  'return max_profit' :
                  (current && current.phase === 'initialize') ?
                  'min_price = prices[0], max_profit = 0' :
                  'min_price = min(min_price, price); max_profit = max(max_profit, price - min_price)'
                }
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: (current && current.phase === 'complete') ? '#4caf50' :
                       (current && current.decision && current.decision.includes('better')) ? '#4caf50' :
                       (current && current.decision === 'Found better buying opportunity') ? '#e91e63' :
                       '#9c27b0'
              }}>
                {current.greedyChoice}
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
                background: (step || 0) >= maxSteps - 1 ? '#dc3545' : '#9c27b0',
                color: '#fff',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(156,39,176,0.3)'
              }}
            >
              {(step || 0) >= maxSteps - 1 ? 'Reset' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    );
}
export default GreedyVisualization;