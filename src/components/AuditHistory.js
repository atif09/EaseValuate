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

const HistoryList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  background: ${({ theme }) => theme === 'dark' ? '#1a202c' : '#fff'};
`;

const Entry = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background: ${({ theme }) => theme === 'dark' ? '#2d3748' : '#f8f9fa'};
  }
`;
const ScoreChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ improved }) => improved ? '#48bb78' : '#f56565'};
`;



const TimeStamp = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme === 'dark' ? '#a0aec0' : '#718096'};
`;

const AuditHistory = ({ history = [], theme, onEntryClick }) => {
  
  const recentHistory = history.slice(-5);
  
  const getTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    return minutes === 0 ? 'Just now' : `${minutes}m ago`;
  };

  const getScoreChange = (current, previous) => {
    const change = current - previous;
    const icon = change > 0 ? '↑' : change < 0 ? '↓' : '−';
    return { change: Math.abs(change), icon, improved: change > 0 };
  };

  return (
    <Container>
      <Header theme={theme}>Audit History</Header>
      <HistoryList theme={theme}>
        {recentHistory.map((entry, index) => {
          const previous = recentHistory[index - 1]?.score ?? entry.score;
          const { change, icon, improved } = getScoreChange(entry.score, previous);
          
          return (
            <Entry 
              key={entry.timestamp}
              theme={theme}
              onClick={() => onEntryClick?.(entry)}
            >
              <div>
                <ScoreChange improved={improved}>
                  {icon} {change > 0 ? `${change} points` : 'No change'}
                </ScoreChange>
                <TimeStamp theme={theme}>{getTimeAgo(entry.timestamp)}</TimeStamp>
              </div>
              <div>Score: {entry.score}</div>
            </Entry>
          );
        })}
        {recentHistory.length === 0 && (
          <Entry theme={theme}>No audit history yet</Entry>
        )}
      </HistoryList>
    </Container>
  );
};

export default AuditHistory;