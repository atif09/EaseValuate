import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import LivePreview from './components/LivePreview';
import AccessibilityResults from './components/AccessibilityResults';
import LoadingSpinner from './components/LoadingSpinner';
import AuditHistory from './components/AuditHistory';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1e1e1e;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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
    <AppContainer>
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
          <LivePreview html={code} theme={theme} />
          {isAnalyzing ? (
            <LoadingSpinner theme={theme} />
          ) : (
            auditResults && <AccessibilityResults results={auditResults} theme={theme} />
          )}
        </PreviewSection>
      </MainContent>
    </AppContainer>
  );
}

export default App;