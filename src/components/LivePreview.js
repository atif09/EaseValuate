import React, { useState, useEffect, useRef } from 'react';
import { Container, Header, PreviewContainer } from '../styles/livePreviewStyles';
import PreviewIcon from '../icons/PreviewIcon';
import ErrorDisplayComponent from './Preview/ErrorDisplayComponent';
import { htmlErrorHandler, pythonErrorHandler } from '../utils/errorHandlers';

//helper cuz importing it directly was causing errors ---
function createJsWorker() {
  const code = `
    self.onmessage = function (e) {
      const code = e.data;
      let result = '';
      let error = null;
      const originalLog = self.console.log;
      self.console.log = (...args) => {
        result += args.join(' ') + '\\n';
      };
      try {
        eval(code);
      } catch (err) {
        error = err.message;
      }
      self.console.log = originalLog;
      self.postMessage({ result: result.trim(), error });
    };
  `;
  const blob = new Blob([code], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
}
// --- END: Helper ---

const LivePreview = ({ content, language }) => {

  const [error, setError] = useState(null);

  const [output, setOutput] = useState('');

  const workerRef = useRef(null);

  useEffect(() => {

    if(language === 'javascript'){

      if(workerRef.current){
        workerRef.current.terminate();
      }
      workerRef.current =  createJsWorker();

      workerRef.current.onmessage = (e) => {
        clearTimeout(timeoutId);
        setError(e.data.error ? `JavaScript Error: ${e.data.error}`: null);
        setOutput(e.data.result || '');
      };

      const timeoutId = setTimeout(() => {
        setError('JavaScript Error: Execution timed out (possible infinite loop).');
        setOutput('');
        if(workerRef.current){
          workerRef.current.terminate();
          workerRef.current = null;
        }
      },1500);

      workerRef.current.postMessage(content);

      return () => {
        clearTimeout(timeoutId);
        if(workerRef.current){
          workerRef.current.terminate();
          workerRef.current = null;
        }
      };
    }else if(language === 'html'){
      const validationError = htmlErrorHandler(content);
      setError(validationError);
      setOutput(validationError ? '' : content);
    } else if(language==='python') {


      const validationError = pythonErrorHandler(content);
      setError(validationError);
      setOutput(validationError ? '' : content);
    }else{
      setError(null);
      setOutput('');
    }
  },[content,language])

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