import React from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';

// Required imports for Ace
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

// Reset any existing ace config
delete window.ace;

const Container = styled.div`
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(2px);
  border: 1px solid rgba(162, 32, 255, 0.12);
  background: rgba(17, 25, 40, 0.15);
`;

const Header = styled.div`
  padding: 0.75rem;
  background: linear-gradient(90deg, rgba(86, 32, 155, 0.6), rgba(45, 55, 72, 0.5));
  color: #f8f9fa;
  border-bottom: 1px solid rgba(162, 32, 255, 0.25);
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const EditorWrapper = styled.div`
  .ace_editor, 
  .ace_scroller,
  .ace_content,
  .ace_layer {
    background: transparent !important;
    backdrop-filter: none !important;
  }

  .ace_gutter {
    background: rgba(90, 20, 160, 0.08) !important;
    border-right: 1px solid rgba(162, 32, 255, 0.15);
  }

  .ace_gutter-active-line {
    background: rgba(162, 32, 255, 0.1) !important;
  }

  .ace_marker-layer .ace_active-line {
    background: rgba(162, 32, 255, 0.05) !important;
  }

  .ace_marker-layer .ace_selection {
    background: rgba(162, 32, 255, 0.2) !important;
  }

  .ace_cursor {
    color: rgba(255,255,255,0.9) !important;
  }
  .ace_text,
  .ace_xml,
  .ace_html,
  .ace_html-tag {
    opacity: 0.85;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  }

`;

const AnalyzeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(45deg, #a120ff, #202eff);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(162, 32, 255, 0.4);
  }
`;

const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Accessible Page</title>
  <style>
    body { 
      font-family: Arial, sans-serif;
      color: #fff;
      text-align: center;
      padding: 2rem;
    }
  </style>
</head>
<body>
  <h1>Welcome!</h1>
  <!-- Start coding here -->
</body>
</html>`;

const CodeEditor = ({ value, onChange, onAnalyze }) => {
  return (
    <Container>
      <Header>HTML Editor</Header>
      <EditorWrapper>
        <div style={{ position: 'relative' }}>
          <AceEditor
            mode="html"
            theme="monokai"
            value={value || defaultHtml}
            onChange={onChange}
            width="100%"
            height="500px"
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            style={{
              backgroundColor: 'transparent',
              background: 'transparent'
            }}
            setOptions={{
              useWorker: false,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
              useSoftTabs: true,
              displayIndentGuides: true,
              highlightSelectedWord: true
            }}
            editorProps={{ $blockScrolling: true }}
          />
          <AnalyzeButton onClick={onAnalyze}>
            Analyze
          </AnalyzeButton>
        </div>
      </EditorWrapper>
    </Container>
  );
};

export default CodeEditor;