import React, { useState, useRef, useMemo, useCallback } from 'react';
import twoPointersSteps from '../animations/twoPointersSteps';

const THEME = {
  colors: {
    primary: '#a120ff',
    success: '#4caf50', 
    danger: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    light: '#fff',
    muted: '#ccc',
    dark: '#999',
    secondary: '#6c757d',
    reset: '#dc3545'
  },
  backgrounds: {
    primary: 'rgba(161,32,255,0.1)',
    card: 'rgba(35,36,58,0.6)',
    container: 'rgba(10,13,22,0.3)',
    success: 'rgba(76,175,80,0.2)',
    danger: 'rgba(244,67,54,0.2)',
    disabled: 'rgba(255,255,255,0.1)'
  },
  effects: {
    border: 'rgba(161,32,255,0.5)',
    borderActive: 'rgba(161,32,255,0.2)',
    shadow: 'rgba(161,32,255,0.3)',
    highlight: '#bfb3ff'
  }
};

const StepLogic = {
  getOperationColor: (operation) => {
    const colorMap = {
      check_sum: THEME.colors.info,
      found: THEME.colors.success
    };
    return colorMap[operation] || THEME.colors.primary;
  },

  getSumStatus: (sum, target) => {
    if (sum === target) return { text: '✓ Target Found!', color: THEME.colors.success };
    if (sum > target) return { text: '↑ Sum > Target', color: THEME.colors.danger };
    return { text: '↓ Sum < Target', color: THEME.colors.warning };
  },

  getArrayItemStyles: (isLeft, isRight) => ({
    border: isLeft ? THEME.colors.success : isRight ? THEME.colors.danger : THEME.effects.border,
    background: isLeft ? THEME.backgrounds.success : isRight ? THEME.backgrounds.danger : THEME.backgrounds.primary,
    boxShadow: (isLeft || isRight) ? `0 4px 12px ${THEME.effects.shadow}` : 'none'
  })
};

const ArrayItem = React.memo(({ value, index, isLeft, isRight }) => {
  const styles = StepLogic.getArrayItemStyles(isLeft, isRight);
  
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {isLeft && (
        <div style={{
          background: THEME.colors.success,
          color: THEME.colors.light,
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          LEFT
        </div>
      )}
      
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: 12,
        border: `3px solid ${styles.border}`,
        background: styles.background,
        color: THEME.colors.light,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '20px',
        boxShadow: styles.boxShadow
      }}>
        {value}
      </div>
      
      {isRight && (
        <div style={{
          background: THEME.colors.danger,
          color: THEME.colors.light,
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: '12px',
          fontWeight: 700,
          marginTop: '8px'
        }}>
          RIGHT
        </div>
      )}
      
      <div style={{
        fontSize: '12px',
        color: THEME.colors.dark,
        marginTop: '4px'
      }}>
        [{index}]
      </div>
    </div>
  );
});

const PointerCard = React.memo(({ type, pointer, value }) => (
  <div style={{
    background: THEME.backgrounds.card,
    borderRadius: 12,
    padding: '1rem 1.5rem',
    minWidth: '200px',
    textAlign: 'center'
  }}>
    <div style={{
      fontSize: '16px',
      fontWeight: 600,
      marginBottom: '0.5rem',
      color: type === 'LEFT' ? THEME.colors.success : THEME.colors.danger
    }}>
      {type} Pointer
    </div>
    <div style={{
      fontSize: '24px',
      fontWeight: 700,
      color: THEME.colors.light
    }}>
      Index: {pointer ?? '-'}
    </div>
    <div style={{
      fontSize: '16px',
      color: THEME.colors.muted
    }}>
      Value: {value ?? '-'}
    </div>
  </div>
));

const TwoPointersVisualization = ({ onStepChange, onReset, currentStepInfo }) => {
  const [step, setStep] = useState(0);
  const containerRef = useRef(null);
  
  const steps = useMemo(() => twoPointersSteps || [], []);
  const maxSteps = steps.length;
  
  const current = useMemo(() => 
    (steps.length > 0 && step >= 0 && step < steps.length) ? steps[step] : null,
    [steps, step]
  );
  
  const info = useMemo(() => 
    currentStepInfo || current || {},
    [currentStepInfo, current]
  );

  const sumStatus = useMemo(() => 
    current?.sum !== undefined && current?.target !== undefined 
      ? StepLogic.getSumStatus(current.sum, current.target) 
      : null,
    [current?.sum, current?.target]
  );

  const handlePrevious = useCallback(() => {
    if (step === 0) return;
    
    const prevStep = Math.max(0, step - 1);
    setStep(prevStep);
    onStepChange?.(prevStep + 1);
  }, [step, onStepChange]);

  const handleNext = useCallback(() => {
    if (step < maxSteps - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      onStepChange?.(nextStep + 1);
    } else {
      setStep(0);
      onReset?.();
      onStepChange?.(1);
    }
  }, [step, maxSteps, onStepChange, onReset]);

  const isLastStep = step >= maxSteps - 1;
  const isPreviousDisabled = step === 0;

  if (!current?.array || !Array.isArray(current.array)) {
    return (
      <div style={{ color: THEME.colors.light }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ color: THEME.effects.highlight }}>
            No array data available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ color: THEME.colors.light }}>
      <div style={{
        background: THEME.backgrounds.primary,
        border: `1px solid ${THEME.colors.primary}`,
        borderRadius: 12,
        padding: '1rem',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: StepLogic.getOperationColor(info.operation)
        }}>
          Step {step + 1}: {info.title ?? `Step ${step + 1}`}
        </div>
        <div style={{
          fontSize: '14px',
          color: THEME.colors.muted
        }}>
          {info.description ?? info.note ?? ''}
        </div>
        
        <div style={{
          background: THEME.backgrounds.card,
          borderRadius: 8,
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          display: 'inline-block'
        }}>
          <span style={{ color: THEME.colors.muted, fontSize: '14px' }}>Target: </span>
          <span style={{ color: THEME.colors.primary, fontSize: '16px', fontWeight: 700 }}>9</span>
        </div>
      </div>

      <div ref={containerRef} style={{
        background: THEME.backgrounds.container,
        borderRadius: 12,
        padding: '1.5rem',
        border: `1px solid ${THEME.effects.borderActive}`
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {current.array.map((value, index) => (
              <ArrayItem
                key={index}
                value={value}
                index={index}
                isLeft={current.left === index}
                isRight={current.right === index}
              />
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <PointerCard
            type="LEFT"
            pointer={current.left}
            value={current.array?.[current.left]}
          />
          <PointerCard
            type="RIGHT"
            pointer={current.right}
            value={current.array?.[current.right]}
          />
        </div>

        {current.array && (
          <div style={{
            background: THEME.backgrounds.card,
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '1rem',
              color: THEME.colors.primary
            }}>
              Sum Calculation
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: THEME.colors.light,
              fontFamily: 'monospace'
            }}>
              nums[{current.left}] + nums[{current.right}] = {current.array[current.left]} + {current.array[current.right]} = {current.sum}
            </div>
            {sumStatus && (
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: sumStatus.color
              }}>
                {sumStatus.text}
              </div>
            )}
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={handlePrevious}
            disabled={isPreviousDisabled}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: isPreviousDisabled ? THEME.backgrounds.disabled : THEME.colors.secondary,
              color: THEME.colors.light,
              fontWeight: 600,
              fontSize: '14px',
              cursor: isPreviousDisabled ? 'not-allowed' : 'pointer',
              opacity: isPreviousDisabled ? 0.5 : 1
            }}
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: 'none',
              background: isLastStep ? THEME.colors.reset : THEME.colors.primary,
              color: THEME.colors.light,
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: `0 2px 8px ${THEME.effects.shadow}`
            }}
          >
            {isLastStep ? 'Reset' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoPointersVisualization;