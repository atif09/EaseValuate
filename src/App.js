import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import LivePreview from './components/LivePreview';
import AccessibilityResults from './components/AccessibilityResults';
import LoadingSpinner from './components/LoadingSpinner';
import AuditHistory from './components/AuditHistory';
import GlobalStyles from './styles/globalStyles';
import BackgroundEffect from './components/BackgroundEffect';

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
  }`;

const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    p {
      text-align: center;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  <p>See the changes here</p>
</body>
</html>`;

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('html');
  const [code, setCode] = useState(defaultHtml);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResults, setAuditResults] = useState(null);
  const [theme, setTheme] = useState('dark');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };


  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setAuditResults({
        violations: [],
        passes: [],
        incomplete: []
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <>
    
    <GlobalStyles />
    <BackgroundEffect />
    <AppContainer className="app-container">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <MainContent>
        <EditorSection>
          <CodeEditor
            theme={theme}
            value={code}
            onChange={handleCodeChange}
            onAnalyze={handleAnalyze}
          />
          <AuditHistory />
        </EditorSection>
        <PreviewSection>
          <LivePreview content={code} language ={currentLanguage} theme={theme} />
          {isAnalyzing ? (
            <LoadingSpinner theme={theme} />
          ) : (
            auditResults && <AccessibilityResults results={auditResults} theme={theme} />
          )}
        </PreviewSection>
      </MainContent>
    </AppContainer>
    </>
  );
}

export default App;