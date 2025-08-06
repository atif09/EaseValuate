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

function App() {
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResults, setAuditResults] = useState(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
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
      <Header />
      <MainContent>
        <EditorSection>
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            onAnalyze={handleAnalyze}
          />
          <AuditHistory />
        </EditorSection>
        <PreviewSection>
          <LivePreview htmlContent={code} />
          {isAnalyzing ? (
            <LoadingSpinner />
          ) : (
            auditResults && <AccessibilityResults results={auditResults} />
          )}
        </PreviewSection>
      </MainContent>
    </AppContainer>
  );
}

export default App;