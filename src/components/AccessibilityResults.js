import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  padding: 0.75rem;
  background: ${({ theme }) => theme === 'dark' ? '#2d3748' : '#f8f9fa'};
  color: ${({ theme }) => theme === 'dark' ? '#f8f9fa' : '#2d3748'};
  border-bottom: 1px solid ${({ theme }) => theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const ResultsList = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding: 1rem;
  background: ${({ theme }) => theme === 'dark' ? '#1a202c' : '#fff'};
`;

const Issue = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  background: ${({ theme, severity }) => {
    const colors = {
      critical: theme === 'dark' ? '#742a2a' : '#fff5f5',
      serious: theme === 'dark' ? '#744210' : '#fffff0',
      moderate: theme === 'dark' ? '#2a4365' : '#ebf8ff',
      minor: theme === 'dark' ? '#234e52' : '#f0fff4'
    };
    return colors[severity] || colors.moderate;
  }};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(4px);
  }
`;

const Score = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  color: ${({ score }) => {
    if (score >= 90) return '#48bb78';
    if (score >= 70) return '#ecc94b';
    return '#f56565';
  }};
`;

const AccessibilityResults = ({ results, theme, onIssueClick }) => {
  const score = results?.score || 0;
  const issues = results?.issues || [];

  return (
    <Container>
      <Header theme={theme}>
        Accessibility Analysis
        <Score score={score}>{score}/100</Score>
      </Header>
      <ResultsList theme={theme}>
        {issues.map((issue, index) => (
          <Issue
            key={index}
            theme={theme}
            severity={issue.severity}
            onClick={() => onIssueClick?.(issue.selector)}
          >
            <h3>{issue.severity.toUpperCase()}: {issue.description}</h3>
            <p>{issue.help}</p>
            {issue.wcag && (
              <small>WCAG: {issue.wcag.join(', ')}</small>
            )}
          </Issue>
        ))}
        {issues.length === 0 && (
          <p>No accessibility issues found! 🎉</p>
        )}
      </ResultsList>
    </Container>
  );
};

export default AccessibilityResults;