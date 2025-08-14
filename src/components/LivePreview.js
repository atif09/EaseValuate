import React, { useState, useEffect } from 'react';
import { Container, Header, PreviewContainer } from '../styles/livePreviewStyles';
import PreviewIcon from '../icons/PreviewIcon';
import ErrorDisplayComponent from './Preview/ErrorDisplayComponent';
import { htmlErrorHandler, javascriptErrorHandler, pythonErrorHandler } from '../utils/errorHandlers';

const LivePreview = ({ content, language }) => {
  const [error, setError] = useState(null);
  const [output, setOutput] = useState('');

  useEffect(() => {
    let validationError = null;
    switch (language) {
      case 'html':
        validationError = htmlErrorHandler(content);
        break;
      case 'javascript':
        validationError = javascriptErrorHandler(content);
        break;
      case 'python':
        validationError = pythonErrorHandler(content);
        break;
      default:
        validationError = null;
    }
    setError(validationError);

    if (!validationError) {
      renderPreview(content, language);
    } else {
      setOutput('');
    }

  }, [content, language]);


  const renderPreview = (content, language) => {
    switch (language) {
      case 'html':
        setOutput(content);
        break;
      case 'javascript':
        try {
          const results = [];
          const originalLog = console.log;
          console.log = (...args) => {
            results.push(args.join(' '));
            originalLog.apply(console, args);
          };


          new Function(content)();
          console.log = originalLog;
          setOutput(results.join('\n'));
        } catch (err) {
          setError(`Runtime Error: ${err.message}`);
        }
        break;
      case 'python':
        setOutput(content);
        break;
      default:
        setOutput('');
    }
  };

  return (
    
    <Container>
      <Header>
        <PreviewIcon />
        <span style={{ color: '#aaa', fontSize: 14 }}>{language.toUpperCase()}</span>
      </Header>
      <PreviewContainer>
        {error ? (
          <ErrorDisplayComponent error={error} language={language} />
        ) : (
          <div className={`preview-${language}`}>
            {language === 'html' ? (
              <iframe
                srcDoc={output}
                title="preview"
                width="100%"
                height="100%"
                sandbox="allow-scripts"
                style={{ border: 'none', minHeight: 300 }}
              />
            ) : (
              <pre style={{ margin: 0 }}>{output}</pre>
            )}
          </div>
        )}
      </PreviewContainer>
    </Container>
  );
};

export default LivePreview;