import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  border-radius: 6px;
  background: ${({ theme }) => theme === 'dark' ? '#2d3748' : '#f8f9fa'};
  margin-top: 0.5rem;
`;

const Title = styled.h4`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme === 'dark' ? '#90cdf4' : '#3182ce'};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: '💡';
  }
`;

const CodeBlock = styled.pre`
  background: ${({ theme }) => theme === 'dark' ? '#1a202c' : '#edf2f7'};
  padding: 0.75rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  margin: 0.5rem 0;
`;

const StepsList = styled.ul`
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  
  li {
    margin: 0.25rem 0;
  }
`;

const ResourceLink = styled.a`
  color: ${({ theme }) => theme === 'dark' ? '#90cdf4' : '#3182ce'};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    text-decoration: underline;
  }

  &:after {
    content: '↗';
    font-size: 0.875rem;
  }
`;

const FixSuggestion = ({ issue, theme }) => {
  if (!issue) return null;

  const { fix, code, steps, resources } = issue;

  return (
    <Container theme={theme}>
      <Title theme={theme}>How to Fix This</Title>
      
      {fix && <p>{fix}</p>}

      {code && (
        <CodeBlock theme={theme}>
          <code>{code}</code>
        </CodeBlock>
      )}

      {steps?.length > 0 && (
        <StepsList>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </StepsList>
      )}

      {resources?.length > 0 && (
        <div>
          <p>Learn more:</p>
          {resources.map((resource, index) => (
            <ResourceLink 
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              theme={theme}
            >
              {resource.title}
            </ResourceLink>
          ))}
        </div>
      )}
    </Container>
  );
};

export default FixSuggestion;