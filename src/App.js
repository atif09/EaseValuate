import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import LivePreview from './components/LivePreview';
import GlobalStyles from './styles/globalStyles';
import BackgroundEffect from './components/BackgroundEffect';
import { supportedLanguages } from './config/languages';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PatternPanel from './components/PatternStudy/PatternPanel';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #ffffff;
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  flex: 1;
`;

const EditorSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PreviewSection = styled.section`
  flex: 1;
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(162, 32, 255, 0.12);
  background: rgba(17, 25, 40, 0.15);

  .preview-header {
    padding: 0.75rem;
    background: transparent;
    border-bottom: 1px solid rgba(162, 32, 255, 0.25);
  }

  .preview-content {
    background: transparent !important;
    height: calc(100% - 40px);
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent !important;
  }
`;

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('html');
  const [code, setCode] = useState(supportedLanguages['html'].defaultTemplate);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    setCode(supportedLanguages[newLanguage]?.defaultTemplate || '');
  };

  return (
    <Router>
      <GlobalStyles />
      <BackgroundEffect />
      <AppContainer className="app-container">
        <Header />
        <Routes>
        <Route path="/" element={
        <MainContent>
          <EditorSection>
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </EditorSection>
          <PreviewSection>
            <LivePreview content={code} language={currentLanguage} />
          </PreviewSection>
        </MainContent>
      } />
      <Route path="/pattern/:patternName" element={<PatternPanel />}/>
    </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;