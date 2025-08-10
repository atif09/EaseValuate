import React from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import { motion,useAnimation} from 'framer-motion';
// Required imports for Ace
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';


 window.ace = ace;

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
  background: transparent;
  border-bottom: 1px solid rgba(162, 32, 255, 0.25);
  display:flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(162,32,255,0.15);
  

`;

const AnimatedCode = () => {
  const controls = useAnimation();
  return (
    <div
      style={{
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: 'transparent',
        backdropFilter: 'blur(2px)',
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.polyline
          variants={{
            normal: { translateX: "0%" },
            animate: { translateX: -2 }
          }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          animate={controls}
          initial="normal"
          points="8 6 2 12 8 18"
        />
        <motion.polyline
          variants={{
            normal: { translateX: "0%" },
            animate: { translateX: "2px" },
          }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          animate={controls}
          initial="normal"
          points="16 18 22 12 16 6"
        />
      </svg>
    </div>
  );
};

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
     html,body {
     background:transparent !important;
      
       
      font-family: Arial, sans-serif;
      color: rgba(255,255,255,0.9);
      text-align: center;
      padding: 2rem;
      text-shadow: 0 1px 1px rgba( 0, 0 , 0, 0.3);
    }
      * {
    background: transparent !important}
    h1{
    color: rgba(255,255,255,0,95)
    margin-bottom: 1rem;}
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
      <Header>
        <AnimatedCode />
        <AnalyzeButton onClick={onAnalyze}>
          Analyze
        </AnalyzeButton>
      </Header>
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
        </div>
      </EditorWrapper>
    </Container>
  );
};

export default CodeEditor;