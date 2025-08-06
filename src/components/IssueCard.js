import React from 'react';
import styled from 'styled-components';

// Severity colors that match common accessibility standards
const severityConfig = {
  critical: {
    dark: '#742a2a',
    light: '#fff5f5',
    icon: '🔴'
  },
  serious: {
    dark: '#744210',
    light: '#fffff0',
    icon: '🟠'
  },
  moderate: {
    dark: '#2a4365',
    light: '#ebf8ff',
    icon: '🟡'
  },
  minor: {
    dark: '#234e52',
    light: '#f0fff4',
    icon: '🟢'
  }
};

const Card = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  background: ${({ theme, severity }) => 
    theme === 'dark' 
      ? severityConfig[severity]?.dark 
      : severityConfig[severity]?.light
  };
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.5rem 0;
`;

const Help = styled.p`
  margin: 0.5rem 0;
  line-height: 1.5;
`;

const WcagBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  margin-right: 0.5rem;
`;

const IssueCard = ({ issue, theme, onClick }) => {
  const { severity, description, help, wcag, selector } = issue;

  return (
    <Card
      theme={theme}
      severity={severity}
      onClick={() => onClick?.(selector)}
    >
      <Title>
        {severityConfig[severity]?.icon}
        {description}
      </Title>
      <Help>{help}</Help>
      {wcag?.length > 0 && (
        <div>
          {wcag.map(level => (
            <WcagBadge key={level}>
              WCAG {level}
            </WcagBadge>
          ))}
        </div>
      )}
    </Card>
  );
};

export default IssueCard;