
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
      <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
        {tabNames.map(tab => (
          <button 
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          style={{
            padding: '0.5rem 1.2rem',
            borderRadius: '6px',
            border: 'none',
            background: activeTab === tab.key ? '#23243a' : 'transparent',
            color: activeTab === tab.key ? '#a120ff' : 'fff',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
            outline: 'none',
            transition: 'background 0.2s'
          }}>
            {tab.label}
            
          </button>
        ))}
      </div>
      <pre style={{
        background: '#181a24',
        color: '#fff',
        borderRadius: '8px',
        padding: '1rem',
        minHeight: '200px',
        fontSize: '1rem',
        overflowX: 'auto'
      }}>
        {boilerplate[activeTab]}
      </pre>
    </div>
  );
}

export default BoilerplateTabs;