import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useState, useEffect } from 'react';
import exampleProblems from './exampleProblems';
import patternBoilerplates from './patternBoilerplates';

const tabNames = [
  { key: 'python', label: 'Python' },
  { key: 'cpp', label: 'C++' },
  { key: 'java', label: 'Java' },
  { key: 'examples', label: 'Example Problems' }
];

function BoilerplateTabs({ patternName, highlightedLines = [], selectedLanguage, currentStepInfo }) {
  const [activeTab, setActiveTab] = useState('python');

  useEffect(() => {
    setActiveTab(selectedLanguage);
  }, [selectedLanguage]);

  const getOperationColor = (operation) => {
    switch(operation) {
      case 'include': return '#00e676';
      case 'backtrack': return '#ff5722'; 
      case 'save': return '#ffeb3b';
      case 'base_check': return '#2196f3';
      case 'exclude': return '#ff9800';
      case 'initialize': return '#9c27b0';
      case 'expand': return '#4caf50';
      case 'shrink': return '#ff5722';
      case 'duplicate_found': return '#f44336';
      case 'return_result': return '#ffeb3b';
      case 'check_sum': return '#2196f3';
      case 'found': return '#4caf50';
      default: return '#a120ff';
      
    }
  };

  return (
    <div>
      <style>
        {`
        .pattern-link {
            color: #a120ff;
            text-decoration: underline;
            font-weight: 500;
            font-size: 1.07rem;
            letter-spacing: 0.2px;
            transition: color 0.18s, font-weight 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .pattern-link:hover, .pattern-link:focus {
            color: #fff;
            font-size: 1.18rem;
        }
        `}
      </style>
      
      <div style={{
        background: 'rgba(161, 32, 255, 0.1)',
        border: '1px solid #a120ff',
        borderRadius: 12,
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem', color: '#a120ff' }}>
          {patternName} Template
        </h3>
      </div>

      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: 0,
        borderBottom: '2px solid #a120ff',
        background: 'rgba(35, 36, 58, 0.4)',
        borderRadius: '12px 12px 0 0',
        boxShadow: '0 2px 8px rgba(161, 32, 255, 0.15)',
        padding: '0.75rem 1rem 0.5rem',
      }}>
        {tabNames.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: '8px 8px 0 0',
              background: 'transparent',
              border: 'none',
              borderTop: activeTab === tab.key ? '2px solid #a120ff' : '2px solid transparent',
              borderLeft: activeTab === tab.key ? '1px solid #a120ff' : '1px solid transparent',
              borderRight: activeTab === tab.key ? '1px solid #a120ff' : '1px solid transparent',
              color: activeTab === tab.key ? '#fff' : '#999',
              fontWeight: activeTab === tab.key ? 700 : 500,
              cursor: 'pointer',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s ease',
              letterSpacing: '0.5px',
              borderBottom: 'none',
              textShadow: activeTab === tab.key ? '0 1px 8px #a120ff44' : 'none',
              marginBottom: '-2px',
              zIndex: 2,
              position: 'relative',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'examples' ? (
        <div style={{
          padding: '1.5rem',
          color: '#fff',
          fontSize: '15px',
          background: 'rgba(10, 13, 22, 0.3)',
          borderRadius: '0 0 12px 12px',
          border: '1px solid rgba(161, 32, 255, 0.2)',
          borderTop: 'none'
        }}>
          <div style={{
            marginBottom: '1rem',
            fontSize: '16px',
            fontWeight: 600,
            color: '#a120ff'
          }}>
          </div>
          <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none' }}>
            {(exampleProblems[patternName] || []).map((link, idx) => (
              <li key={idx} style={{ 
                marginBottom: '1rem',
                padding: '0.5rem',
                background: 'rgba(35, 36, 58, 0.3)',
                borderRadius: 8,
                border: '1px solid rgba(161, 32, 255, 0.2)'
              }}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pattern-link">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <SyntaxHighlighter
            language={activeTab === 'cpp' ? 'cpp' : activeTab}
            style={oneDark}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={lineNumber => {
              const isHighlighted = highlightedLines.includes(lineNumber);
              return isHighlighted
                ? { 
                    className: 'code-line highlighted',
                    style: {
                      backgroundColor: `${getOperationColor(currentStepInfo?.operation || 'default')}22`,
                      borderLeft: `4px solid ${getOperationColor(currentStepInfo?.operation || 'default')}`,
                      display: 'block'
                    }
                  }
                : { className: 'code-line' };
            }}
            customStyle={{
              background: 'rgba(10, 13, 22, 0.3)',
              borderRadius: '0 0 12px 12px',
              padding: '1.5rem',
              minHeight: '300px',
              fontSize: '14px',
              overflowX: 'auto',
              margin: 0,
              border: '1px solid rgba(161, 32, 255, 0.2)',
              borderTop: 'none'
            }}
            codeTagProps={{
              style: { background: 'transparent', fontSize: '14px', lineHeight: '1.6' }
            }}
            className='purple-scrollbar'
          >
            {(patternBoilerplates[patternName] && patternBoilerplates[patternName][activeTab]) || ''}
          </SyntaxHighlighter>
          
          {highlightedLines.length > 0 && currentStepInfo && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: `${getOperationColor(currentStepInfo.operation)}22`,
              border: `1px solid ${getOperationColor(currentStepInfo.operation)}`,
              borderRadius: 8,
              padding: '0.5rem 0.75rem',
              fontSize: '12px',
              color: getOperationColor(currentStepInfo.operation),
              fontWeight: 600,
              zIndex: 10
            }}>
              {currentStepInfo.operation.replace('_', ' ').toUpperCase()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BoilerplateTabs;