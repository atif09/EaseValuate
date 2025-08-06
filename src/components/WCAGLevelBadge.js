import React from 'react';
import styled from 'styled-components';

const levelConfig = {
  A: {
    color: '#4299e1',
    description: 'Basic accessibility requirements'
  },
  AA: {
    color: '#48bb78',
    description: 'Standard accessibility requirements'
  },
  AAA: {
    color: '#805ad5',
    description: 'Enhanced accessibility requirements'
  }
};

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: help;
  background: ${({ level, theme }) => 
    theme === 'dark' 
      ? `${levelConfig[level].color}22` 
      : `${levelConfig[level].color}11`
  };
  color: ${({ level }) => levelConfig[level].color};
  border: 1px solid ${({ level }) => `${levelConfig[level].color}44`};

  &:hover {
    background: ${({ level, theme }) => 
      theme === 'dark' 
        ? `${levelConfig[level].color}33` 
        : `${levelConfig[level].color}22`
    };
  }
`;

const Level = styled.span`
  font-weight: bold;
`;

const Info = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
`;

const WCAGLevelBadge = ({ level, theme }) => {
  if (!levelConfig[level]) return null;

  return (
    <Badge 
      level={level} 
      theme={theme}
      title={levelConfig[level].description}
      role="tooltip"
      aria-label={`WCAG ${level} - ${levelConfig[level].description}`}
    >
      <Level>WCAG {level}</Level>
      <Info>{levelConfig[level].description}</Info>
    </Badge>
  );
};

export default WCAGLevelBadge;