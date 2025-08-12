import React, {useState} from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import { supportedLanguages } from '../config/languages';
import AnimatedCodeIcon from '../icons/AnimatedCodeIcon';
// Required imports for Ace
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';

const languageSettings = {
  html: {tabSize: 2, useSoftTabs: true, showInvisibles: true},
  javascript: {tabSize: 4, useSoftTabs: true, showInvisibles: true},
  python: { tabSize:4,useSoftTabs: true, showInvisibles: true}
};

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

const CodeEditor = ({ value, onChange, onAnalyze,currentLanguage,onLanguageChange }) => {
  const [editorError, setEditorError] = useState(null);

  const handleLanguageChange=(language) => {
    try{
      if(!supportedLanguages[language]){
        throw new Error(`Unsupported language: ${language}`);
      
      }
      onLanguageChange(language);
    } catch (error) {
      console.error('Language switch failed: ',error);
    }
  };
  return (
    <Container>
      <Header>
        <AnimatedCodeIcon onLanguageChange={handleLanguageChange} />
        <AnalyzeButton onClick={onAnalyze}>
          Analyze
        </AnalyzeButton>
      </Header>
      <EditorWrapper>
        <div style={{ position: 'relative' }}>
          <AceEditor


            mode={supportedLanguages[currentLanguage]?.mode || 'html' }
            theme="monokai" 
            value={value || supportedLanguages[currentLanguage]?.defaultTemplate}
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
              ...languageSettings[currentLanguage],
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