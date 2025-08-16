import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, {useState} from 'react';

const boilerplate = {
  python: `# Python boilerplate for this pattern \nprint("Hi")`,
  cpp: `// C++ boilerplate for this pattern\n#include <iostream>\nint main() {\n std::cout << "Hi 2" << std::endl;\n  return 0;\n}`,
  java: `// Java boilerplate for this pattern\npublic class Main {\n public static void main(String[] args) {\n  System.out.println("Hi 3");\n }\n}`,

};

const tabNames =[
  {key: 'python', label: 'Python' },
  {key: 'cpp', label: 'C++' },
  {key: 'java', label: 'Java'},
];

function BoilerplateTabs({patternName}){
  const [activeTab, setActiveTab] = useState('python');

  return (
    <div>
      <h3 style={{color: '#a120ff'}}>{patternName}'s Template</h3>
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '0.5rem',
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
            color: activeTab === tab.key ?  '#fff' : '#a0a0b2',
            fontWeight: activeTab === tab.key ? 700 : 500,
            cursor: 'pointer',
            fontSize: '1.08rem',
            outline: 'none',
            transition: 'background 0.25s, color 0.25s',
            boxShadow: activeTab === tab.key ? '0 2px 8px 0 rgba(162,32,255,0.10)' : 'none',
            letterSpacing: '0.5px',
            borderBottom: 'none',
            textShadow: activeTab === tab.key ? '0 1px 8px #a120ff44' : 'none',
            marginBottom: '-1px',
            zIndex: 2,
            position:'relative',
          }}>
            {tab.label}
            
          </button>
        ))}
      </div>
      <SyntaxHighlighter
        language={activeTab === 'cpp' ? 'cpp' : activeTab}
        style={oneDark}
        customStyle={{
          background: 'rgba(10,13,22,0.18)',
          borderRadius: '0 0 8px 8px',
          padding: '1.2rem',
          minHeight: '200px',
          fontSize: '1rem',
          overflowX: 'auto',
          margin: 0,
        }}
      >
        {boilerplate[activeTab]}
      </SyntaxHighlighter>
      
    </div>
  );
}

export default BoilerplateTabs;