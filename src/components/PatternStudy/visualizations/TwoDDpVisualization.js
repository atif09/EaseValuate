import React, { useState, useRef, useMemo, useCallback } from 'react';
import dp2DSteps from '../animations/dp2DSteps';

const THEME = {
  colors: {
    primary: '#a120ff',
    secondary: '#6c757d',
    success: '#4caf50',
    danger: '#dc3545',
    warning: '#ff9800',
    info: '#2196f3',
    purple: '#9c27b0',
    light: '#fff',
    muted: '#ccc',
    dark: '#666',
    highlight: '#bfb3ff'
  },
  backgrounds: {
    primary: 'rgba(161,32,255,0.1)',
    card: 'rgba(35,36,58,0.6)',
    container: 'rgba(10,13,22,0.3)',
    success: 'rgba(76,175,80,0.2)',
    info: 'rgba(33,150,243,0.2)',
    warning: 'rgba(255,152,0,0.2)',
    purple: 'rgba(156,39,176,0.3)',
    disabled: 'rgba(255,255,255,0.1)',
    empty: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.3)'
  },
  effects: {
    border: 'rgba(161,32,255,0.2)',
    shadow: 'rgba(161,32,255,0.3)',
    successShadow: 'rgba(76,175,80,0.3)',
    warningShadow: 'rgba(255,152,0,0.3)',
    purpleShadow: 'rgba(156,39,176,0.4)',
    primaryShadow: 'rgba(161,32,255,0.2)'
  }
};

const DPLogic = {
  getPhaseColor: (phase) => {
    const phaseColorMap = {
      initialize: THEME.colors.info,
      setup: THEME.colors.info,
      base_case_rows: THEME.colors.warning,
      base_case_cols: THEME.colors.warning,
      calculating: THEME.colors.success,
      updating: THEME.colors.success,
      complete: THEME.colors.purple
    };
    return phaseColorMap[phase] || THEME.colors.primary;
  },

  getPhaseTitle: (phase, stepNumber) => {
    const phaseTitleMap = {
      initialize: 'Initialize Problem',
      setup: 'Setup DP Grid',
      base_case_rows: 'Fill Base Case (First Column)',
      base_case_cols: 'Fill Base Case (First Row)',
      calculating: 'Calculate Cell Value',
      updating: 'Update DP Grid',
      complete: 'Solution Complete!'
    };
    return phaseTitleMap[phase] || `Step ${stepNumber}`;
  },

  getCellStyles: (cell, isCurrentCell, isBaseCase, isDestination) => {
    const getBorderColor = () => {
      if (isDestination) return THEME.colors.purple;
      if (isCurrentCell) return THEME.colors.success;
      if (isBaseCase) return THEME.colors.warning;
      if (cell > 0) return THEME.colors.primary;
      return THEME.backgrounds.border;
    };

    const getBackground = () => {
      if (isDestination) return THEME.backgrounds.purple;
      if (isCurrentCell) return THEME.backgrounds.success;
      if (isBaseCase) return THEME.backgrounds.warning;
      if (cell > 0) return THEME.backgrounds.primary;
      return THEME.backgrounds.empty;
    };

    const getBoxShadow = () => {
      if (isDestination) return `0 4px 16px ${THEME.effects.purpleShadow}`;
      if (isCurrentCell) return `0 4px 12px ${THEME.effects.successShadow}`;
      if (isBaseCase) return `0 4px 12px ${THEME.effects.warningShadow}`;
      if (cell > 0) return `0 2px 8px ${THEME.effects.primaryShadow}`;
      return 'none';
    };

    return {
      border: `3px solid ${getBorderColor()}`,
      background: getBackground(),
      boxShadow: getBoxShadow(),
      fontWeight: cell > 0 ? 700 : 400
    };
  }
};

const GridCell = React.memo(({ 
  cell, 
  rowIdx, 
  colIdx, 
  isCurrentCell, 
  isBaseCase, 
  isDestination 
}) => {
  const cellStyles = DPLogic.getCellStyles(cell, isCurrentCell, isBaseCase, isDestination);

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        width: '70px',
        height: '70px',
        borderRadius: 8,
        ...cellStyles,
        color: THEME.colors.light,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        transition: 'all 0.3s ease'
      }}>
        {cell}
      </div>
      <div style={{
        fontSize: '10px',
        color: isCurrentCell ? THEME.colors.success : THEME.colors.dark,
        marginTop: '4px',
        fontWeight: 600
      }}>
        ({rowIdx},{colIdx})
      </div>
    </div>
  );
});

const InfoCard = React.memo(({ label, value, color = THEME.colors.primary }) => (
  <div style={{
    background: THEME.backgrounds.card,
    borderRadius: 8,
    padding: '0.5rem 1rem',
    display: 'inline-block'
  }}>
    <span style={{ color: THEME.colors.muted, fontSize: '14px' }}>{label}: </span>
    <span style={{ color, fontSize: '16px', fontWeight: 700 }}>{value}</span>
  </div>
));

const CalculationBox = React.memo(({ label, value, color, backgroundColor }) => (
  <div style={{
    background: backgroundColor,
    padding: '0.5rem 1rem',
    borderRadius: 8,
    border: `2px solid ${color}`
  }}>
    {label}: <span style={{ color }}>{value}</span>
  </div>
));

const LegendItem = React.memo(({ color, backgroundColor, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <div style={{
      width: '20px',
      height: '20px',
      borderRadius: 4,
      border: `2px solid ${color}`,
      background: backgroundColor
    }} />
    <span style={{ fontSize: '14px', color: THEME.colors.muted }}>{label}</span>
  </div>
));

const TwoDDpVisualization = ({ onStepChange, onReset, currentStepInfo }) => {
  const [step, setStep] = useState(0);
  const containerRef = useRef(null);
  
  const steps = useMemo(() => dp2DSteps || [], []);
  const maxSteps = steps.length;
  
  const current = useMemo(() => 
    (steps.length > 0 && step >= 0 && step < steps.length) ? steps[step] : null,
    [steps, step]
  );
  
  const info = useMemo(() => 
    currentStepInfo || current || {},
    [currentStepInfo, current]
  );

  const hasCalculationData = useMemo(() =>
    current && (current.fromTop !== undefined || current.fromLeft !== undefined),
    [current]
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

  if (!current?.dp || !Array.isArray(current.dp)) {
    return (
      <div style={{ 
        color: THEME.colors.light,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{ color: THEME.colors.highlight }}>
          Loading grid...
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
          color: DPLogic.getPhaseColor(info.phase)
        }}>
          Step {step + 1}: {DPLogic.getPhaseTitle(info.phase, step + 1)}
        </div>
        <div style={{
          fontSize: '14px',
          color: THEME.colors.muted,
          marginBottom: '1rem'
        }}>
          {info.note || ''}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {info.m && info.n && (
            <InfoCard 
              label="Grid Size" 
              value={`${info.m}×${info.n}`}
              color={THEME.colors.primary}
            />
          )}
          {info.currentRow >= 0 && info.currentCol >= 0 && (
            <InfoCard 
              label="Current Cell" 
              value={`(${info.currentRow}, ${info.currentCol})`}
              color={THEME.colors.success}
            />
          )}
          {info.totalPaths > 0 && (
            <InfoCard 
              label="Total Paths" 
              value={info.totalPaths}
              color={THEME.colors.purple}
            />
          )}
        </div>
      </div>

      <div ref={containerRef} style={{
        background: THEME.backgrounds.container,
        borderRadius: 12,
        padding: '1.5rem',
        border: `1px solid ${THEME.effects.border}`
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: THEME.colors.primary,
              marginBottom: '0.5rem'
            }}>
              Dynamic Programming Grid
            </div>
            {current.dp.map((row, rowIdx) => (
              <div key={rowIdx} style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                {row.map((cell, colIdx) => {
                  const isCurrentCell = current.currentRow === rowIdx && current.currentCol === colIdx;
                  const isBaseCase = (rowIdx === 0 || colIdx === 0) && cell > 0;
                  const isDestination = rowIdx === current.m - 1 && colIdx === current.n - 1 && current.phase === 'complete';
                  
                  return (
                    <GridCell
                      key={colIdx}
                      cell={cell}
                      rowIdx={rowIdx}
                      colIdx={colIdx}
                      isCurrentCell={isCurrentCell}
                      isBaseCase={isBaseCase}
                      isDestination={isDestination}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {hasCalculationData && (
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
              color: THEME.colors.success
            }}>
              Calculation for Cell ({current.currentRow}, {current.currentCol})
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              <CalculationBox
                label="From Top"
                value={current.fromTop}
                color={THEME.colors.success}
                backgroundColor={THEME.backgrounds.success}
              />
              <div style={{ color: THEME.colors.light, fontSize: '20px' }}>+</div>
              <CalculationBox
                label="From Left"
                value={current.fromLeft}
                color={THEME.colors.info}
                backgroundColor={THEME.backgrounds.info}
              />
              <div style={{ color: THEME.colors.light, fontSize: '20px' }}>=</div>
              <CalculationBox
                label="Result"
                value={current.fromTop + current.fromLeft}
                color={THEME.colors.primary}
                backgroundColor={THEME.backgrounds.primary}
              />
            </div>
            <div style={{
              fontSize: '14px',
              color: THEME.colors.muted
            }}>
              Each cell stores the number of unique paths to reach that position
            </div>
          </div>
        )}

        <div style={{
          background: THEME.backgrounds.card,
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '1rem',
            color: THEME.colors.primary,
            textAlign: 'center'
          }}>
            Legend
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <LegendItem
              color={THEME.colors.warning}
              backgroundColor={THEME.backgrounds.warning}
              label="Base Case"
            />
            <LegendItem
              color={THEME.colors.success}
              backgroundColor={THEME.backgrounds.success}
              label="Current Cell"
            />
            <LegendItem
              color={THEME.colors.primary}
              backgroundColor={THEME.backgrounds.primary}
              label="Calculated"
            />
            <LegendItem
              color={THEME.colors.purple}
              backgroundColor={THEME.backgrounds.purple}
              label="Destination"
            />
          </div>
        </div>

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
              background: isLastStep ? THEME.colors.danger : THEME.colors.primary,
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

export default TwoDDpVisualization;