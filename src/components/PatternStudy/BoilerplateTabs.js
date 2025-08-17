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

function BoilerplateTabs({ patternName, highlightLine }) {
  const [activeTab, setActiveTab] = useState('python');

  useEffect(() => {
    setActiveTab('python');
  }, [patternName]);

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
      <h3 style={{ color: '#a120ff' }}>{patternName} Template</h3>
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: 0,
        borderBottom: '2px solid #a120ff',
        background: 'rgba(30,32,48,0.35)',
        borderRadius: '8px 8px 0 0',
        boxShadow: '0 2px 8px 0 rgba(162,32,255,0.10)',
        padding: '0.5rem 0.5rem 0.5rem 1rem',
      }}>
        {tabNames.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '6px 6px 0 0',
              background: 'transparent',
              border: 'none',
              borderTop: activeTab === tab.key ? '1px solid #a120ff' : '1px solid transparent',
              borderLeft: activeTab === tab.key ? '1px solid #a120ff' : '1px solid transparent',
              borderRight: activeTab === tab.key ? '1px solid #a120ff' : '1px solid transparent',
              color: activeTab === tab.key ? '#fff' : '#a0a0b2',
              fontWeight: activeTab === tab.key ? 700 : 500,
              cursor: 'pointer',
              fontSize: '1.08rem',
              outline: 'none',
              transition: 'background 0.25s, color 0.25s, border 0.25s',
              boxShadow: 'none',
              letterSpacing: '0.5px',
              borderBottom: 'none',
              textShadow: activeTab === tab.key ? '0 1px 8px #a120ff44' : 'none',
              marginBottom: '-1px',
              zIndex: 2,
              position: 'relative',
            }}>
            {tab.label}
          </button>
        ))}
      </div>
      <div
        style={{
          height: '2px',
          width: '100%',
          background: '#a120ff',
          marginBottom: '0.5rem',
          marginTop: 0,
          zIndex: 1,
          position: 'relative',
        }}
      />
      {activeTab === 'examples' ? (
        <div style={{
          padding: '1.2rem',
          color: '#fff',
          fontSize: '1rem',
          margin: 0,
          marginTop: 0,
          background: 'rgba(10,13,22,0.18)',
          borderRadius: '0 0 8px 8px',
        }}>
          
          <ul style={{ paddingLeft: '1.2rem', margin: 0, listStyle: 'none' }}>
            {(exampleProblems[patternName] || []).map((link, idx) => (
              <li key={idx} style={{ marginBottom: '1.1rem' }}>
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
        <SyntaxHighlighter
          language={activeTab === 'cpp' ? 'cpp' : activeTab}
          style={oneDark}
          wrapLines={true}
          lineProps={lineNumber => 
            highlightLine === lineNumber 
            ? { style: { background: '#a120ff22', transition: 'background 0.2s'} }
            :{}
          }
          customStyle={{
            background: 'rgba(10,13,22,0.18)',
            borderRadius: '0 0 8px 8px',
            padding: '1.2rem',
            minHeight: '200px',
            fontSize: '1rem',
            overflowX: 'auto',
            margin: 0,
          }}
          codeTagProps={{
            style: { background: 'transparent' }
          }}
          className='purple-scrollbar'
        >
          {(patternBoilerplates[patternName] && patternBoilerplates[patternName][activeTab]) || ''}
        </SyntaxHighlighter>
      )}
    </div>
  );
}

export default BoilerplateTabs;