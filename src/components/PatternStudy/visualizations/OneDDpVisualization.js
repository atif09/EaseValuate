import React, { useState, useRef } from 'react';
import dp1DSteps from '../animations/dp1DSteps';

function OneDDpVisualization({ onStepChange, onReset, currentStepInfo }) {
  const [step, setStep] = useState(0);
  const steps = dp1DSteps;
  const maxSteps = steps.length;
  const current = (steps && steps.length > 0 && step < steps.length) ? steps[step] : null;
  const info = currentStepInfo || current || {};
  const containerRef = useRef(null);

  const renderHouse = (value, index, isHighlighted = false, isCurrent = false, isRobbed = false, isSkipped = false) => {
      const houseColor = isCurrent ? '#a120ff' : 
                         isRobbed ? '#4caf50' :
                         isSkipped ? '#dc3545' :
                         isHighlighted ? '#ff9800' :
                         '#666';
      const houseBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 
                              isRobbed ? 'rgba(76,175,80,0.2)' : 
                              isSkipped ? 'rgba(220,53,69,0.2)' :
                              isHighlighted ? 'rgba(255,152,0,0.2)' :
                              'rgba(255,255,255,0.1)';
      
      return (
        <div
          key={`house-${index}`}
          style={{
            width: '80px',
            height: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: `3px solid ${houseColor}`,
            borderRadius: '12px 12px 8px 8px',
            fontSize: '18px',
            fontWeight: isCurrent ? '700' : '600',
            background: houseBackground,
            color: '#fff',
            position: 'relative',
            filter: isCurrent ? 'drop-shadow(0 0 15px rgba(161,32,255,0.6))' : 'none',
            transition: 'all 0.4s ease'
          }}>
          
       
          <div style={{
            position: 'absolute',
            top: '-15px',
            width: '0',
            height: '0',
            borderLeft: '40px solid transparent',
            borderRight: '40px solid transparent',
            borderBottom: `20px solid ${houseColor}`,
          }}></div>
          
   
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#FFD700'
          }}>
            ${value}
          </div>
          
       
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            fontSize: '12px',
            color: '#ccc',
            fontWeight: '600'
          }}>
            House {index}
          </div>
          
       
          {isCurrent && (
            <div style={{
              position: 'absolute',
              top: '-45px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#a120ff',
              whiteSpace: 'nowrap'
            }}>
              CURRENT
            </div>
          )}
          
       
          {(isRobbed || isSkipped) && (
            <div style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              fontSize: '16px'
            }}>
              {isRobbed ? '✓' : '✗'}
            </div>
          )}
        </div>
      );
    };

    const renderDPCell = (value, index, isCurrent = false) => {
      const cellColor = isCurrent ? '#a120ff' : '#4caf50';
      const cellBackground = isCurrent ? 'rgba(161,32,255,0.2)' : 'rgba(76,175,80,0.2)';
      
      return (
        <div
          key={`dp-${index}`}
          style={{
            width: '80px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `3px solid ${cellColor}`,
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: isCurrent ? '700' : '600',
            background: cellBackground,
            color: '#fff',
            position: 'relative',
            filter: isCurrent ? 'drop-shadow(0 0 10px rgba(161,32,255,0.5))' : 'none',
            transition: 'all 0.3s ease'
          }}>
          ${value || 0}
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            fontSize: '12px',
            color: '#ccc',
            fontWeight: '600'
          }}>
            dp[{index}]
          </div>
        </div>
      );
    };

    const renderDecisionBox = () => {
      if (!current.comparison) return null;
      
      return (
        <div style={{
          background: 'rgba(35,36,58,0.6)',
          borderRadius: 12,
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '2px solid rgba(161,32,255,0.3)'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#a120ff',
            textAlign: 'center'
          }}>
            Decision: dp[{current.currentIndex}] = max(dp[{current.currentIndex-1}], dp[{current.currentIndex-2}] + houses[{current.currentIndex}])
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              background: 'rgba(220,53,69,0.2)',
              border: '2px solid #dc3545',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#dc3545', fontWeight: '700', fontSize: '14px' }}>
                DON'T ROB
              </div>
              <div style={{ color: '#fff', fontSize: '20px', fontWeight: '700' }}>
                ${current.comparison.dontRob}
              </div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>
                (keep previous max)
              </div>
            </div>
            
            <div style={{
              fontSize: '24px',
              color: '#ff9800',
              fontWeight: '700'
            }}>
              VS
            </div>
            
            <div style={{
              padding: '1rem 1.5rem',
              background: 'rgba(76,175,80,0.2)',
              border: '2px solid #4caf50',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#4caf50', fontWeight: '700', fontSize: '14px' }}>
                ROB THIS HOUSE
              </div>
              <div style={{ color: '#fff', fontSize: '20px', fontWeight: '700' }}>
                ${current.comparison.robCurrentTotal}
              </div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>
                (${current.comparison.robCurrent - current.currentHouse} + ${current.currentHouse})
              </div>
            </div>
            
            {current.comparison.robCurrentTotal !== undefined && (
              <>
                <div style={{
                  fontSize: '24px',
                  color: '#a120ff',
                  fontWeight: '700'
                }}>
                  →
                </div>
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(161,32,255,0.2)',
                  border: '2px solid #a120ff',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#a120ff', fontWeight: '700', fontSize: '14px' }}>
                    CHOOSE
                  </div>
                  <div style={{ color: '#fff', fontSize: '24px', fontWeight: '700' }}>
                    ${Math.max(current.comparison.dontRob, current.comparison.robCurrentTotal)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    };

    const isHouseRobbed = (index) => {
      return current.robbedHouses && current.robbedHouses.includes(index);
    };

    const isHouseSkipped = (index) => {
      if (current.phase === 'complete') {
        return current.robbedHouses && !current.robbedHouses.includes(index);
      }
      return current.decision === 'skip' && current.currentIndex === index;
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
              Step {step+1}: {info.title || `House Robber Step ${step + 1}`}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '0.5rem'
            }}>
              {current.note || ''}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ff9800',
              fontStyle: 'italic'
            }}>
              Rule: Cannot rob adjacent houses - dp[i] = max(dp[i-1], dp[i-2] + houses[i])
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
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#FFD700',
              textAlign: 'center'
            }}>
              Houses with Money
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              {current.houses && current.houses.map((value, index) => 
                renderHouse(
                  value, 
                  index, 
                  current.currentIndex === index,
                  current.currentIndex === index,
                  isHouseRobbed(index),
                  isHouseSkipped(index)
                )
              )}
            </div>
          </div>

         
          {(current.phase === 'comparing' || current.phase === 'updating') && renderDecisionBox()}

         
          {current.dp && current.dp.length > 0 && (
            <div style={{
              marginBottom: '2rem'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#4caf50',
                textAlign: 'center'
              }}>
                DP Array (Maximum Money Up To Each House)
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                {current.dp.map((value, index) => 
                  renderDPCell(
                    value, 
                    index, 
                    current.currentIndex === index
                  )
                )}
              </div>
            </div>
          )}

       
          {current && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
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
                  Maximum Money So Far
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#FFD700',
                  fontFamily: 'monospace'
                }}>
                  ${current.maxMoney}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#ccc',
                  marginTop: '0.5rem'
                }}>
                  {current.result !== undefined ? `Final Result: $${current.result}` : 'In progress...'}
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
                  Current Decision
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff'
                }}>
                  {current.phase === 'initialize' ? 'Planning Strategy' :
                   current.phase === 'setup' ? 'Preparing DP Array' :
                   current.phase === 'base_case' ? 'Setting Base Cases' :
                   current.phase === 'comparing' ? 'Evaluating Options' :
                   current.phase === 'updating' ? (current.decision === 'rob' ? '✓ Rob This House' : '✗ Skip This House') :
                   current.phase === 'complete' ? 'Heist Complete!' :
                   'Processing...'}
                </div>
              </div>
            </div>
          )}

      
          {current.phase === 'complete' && current.robbedHouses && (
            <div style={{
              background: 'rgba(76,175,80,0.1)',
              border: '2px solid #4caf50',
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
                Optimal Strategy Found!
              </div>
              <div style={{
                fontSize: '16px',
                color: '#fff',
                marginBottom: '0.5rem'
              }}>
                Rob houses: {current.robbedHouses.join(', ')} for maximum ${current.result}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#ccc'
              }}>
                No adjacent houses robbed - police not alerted!
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
              How House Robber DP Works
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc',
              lineHeight: 1.5
            }}>
              {current.phase === 'initialize' ? 'We want to rob houses for maximum money, but cannot rob adjacent houses (police will be alerted).' :
               current.phase === 'setup' ? 'Create DP array where dp[i] represents maximum money we can rob from houses 0 to i.' :
               current.phase === 'base_case' ? 'Base cases: dp[0] = first house value, dp[1] = max of first two houses.' :
               current.phase === 'comparing' ? 'For each house, we choose: either rob it (dp[i-2] + house[i]) or skip it (dp[i-1]).' :
               current.phase === 'updating' ? 'We always pick the option that gives us more money - this is the optimal substructure!' :
               current.phase === 'complete' ? 'The final answer is dp[n-1] - maximum money from optimally robbing the street!' :
               'At each house, we face a decision: rob this house (and skip the previous) or skip this house (and keep previous maximum).'}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,193,7,0.1)',
            border: '1px solid #ffc107',
            borderRadius: 12,
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#ffc107'
            }}>
              DP Core Principle
            </div>
            <div style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              <strong>Optimal Substructure:</strong> The optimal solution for robbing houses 0→i depends on optimal solutions for smaller subproblems (0→i-1 and 0→i-2).
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

          
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(35,36,58,0.4)',
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'rgba(161,32,255,0.2)',
                border: '2px solid #a120ff',
                borderRadius: '4px'
              }}></div>
              <span style={{ fontSize: '12px', color: '#ccc' }}>Current House</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'rgba(76,175,80,0.2)',
                border: '2px solid #4caf50',
                borderRadius: '4px'
              }}></div>
              <span style={{ fontSize: '12px', color: '#ccc' }}>Robbed House</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'rgba(220,53,69,0.2)',
                border: '2px solid #dc3545',
                borderRadius: '4px'
              }}></div>
              <span style={{ fontSize: '12px', color: '#ccc' }}>Skipped House</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: 'rgba(76,175,80,0.2)',
                border: '2px solid #4caf50',
                borderRadius: '4px'
              }}></div>
              <span style={{ fontSize: '12px', color: '#ccc' }}>DP Array</span>
            </div>
          </div>
        </div>
      </div>
    );
}
export default OneDDpVisualization;