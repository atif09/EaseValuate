import React, { useState } from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';



import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

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


const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Accessible Page</title>
</head>
<body>
  <h1>Welcome!</h1>
  <!-- Start coding here -->
</body>
</html>`;

const CodeEditor = ({ theme = 'dark', value, onChange, onAnalyze }) => {
  return (
    <Container>
      <Header theme={theme}>HTML Editor</Header>
      <div style={{ position: 'relative' }}>
        <AceEditor
          mode="html"
          theme={theme === 'dark' ? 'monokai' : 'github'}
          value={value || defaultHtml}
          onChange={onChange}
          width="100%"
          height="500px"
          fontSize={14}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            useSoftTabs: true,
            showPrintMargin: false,
            useWorker: false
          }}
          editorProps={{ $blockScrolling: true }}
          aria-label="HTML code editor"
        />
        <button 
          onClick={onAnalyze}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Analyze
        </button>
      </div>
    </Container>
  );
};

export default CodeEditor;