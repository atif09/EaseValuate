import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Container, Header, PreviewContainer } from '../styles/livePreviewStyles';
import PreviewIcon from '../icons/PreviewIcon';
import Bug from '../icons/AnimatedBugIcon';
import BadgeAlert from '../icons/AnimatedExclamationBadge';
import ErrorTooltip from './Preview/ErrorTooltip';
import { htmlErrorHandler } from '../utils/errorHandlers';


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
        // Use Function constructor instead of eval for better security
        const func = new Function(code);
        func();
      } catch (err) {
        error = err && err.message ? err.message : String(err);
      }
      self.console.log = originalLog;
      self.postMessage({ result: result.trim(), error });
    };
  `;
  const blob = new Blob([code], { type: 'application/javascript' });
  const blobUrl = URL.createObjectURL(blob);
  const worker = new Worker(blobUrl);
  // Clean up the blob URL to prevent memory leaks
  worker.addEventListener('error', () => URL.revokeObjectURL(blobUrl));
  return worker;
}

function createPythonWorker() {
  const workerCodeUrl = `${process.env.PUBLIC_URL}/pythonWorker.js`;
  return fetch(workerCodeUrl)
    .then(response => response.text())
    .then(code => {
      const blob = new Blob([code], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      const worker = new Worker(blobUrl);
      // Clean up the blob URL to prevent memory leaks
      worker.addEventListener('error', () => URL.revokeObjectURL(blobUrl));
      return worker;
    });
}



const LivePreview = ({ content, language }) => {
  const [error, setError] = useState(null);
  const [output, setOutput] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showExclamation, setShowExclamation] = useState(false);
  const jsWorkerRef = useRef(null);
  const pythonWorkerRef = useRef(null);
  const timeoutRef = useRef(null);
  const bugRef = useRef(null);

  useEffect(() => {
    let timer;
    if(error){
      timer= setTimeout(() => setShowExclamation(true) ,2000);
    } else{
      setShowExclamation(false);
    }
    return () => clearTimeout(timer);
  },[error]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      if (jsWorkerRef.current) {
        jsWorkerRef.current.terminate();
        jsWorkerRef.current = null;
      }
      if (pythonWorkerRef.current) {
        pythonWorkerRef.current.terminate();
        pythonWorkerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    setError(null);
    setOutput('');

    if (language === 'javascript') {
      if (pythonWorkerRef.current) {
        pythonWorkerRef.current.terminate();
        pythonWorkerRef.current = null;
      }
      if (jsWorkerRef.current) {
        jsWorkerRef.current.terminate();
      }
      jsWorkerRef.current = createJsWorker();

      jsWorkerRef.current.onmessage = (e) => {
        clearTimeout(timeoutRef.current);
        setError(e.data.error ? `JavaScript Error: ${e.data.error}` : null);
        setOutput(e.data.result || '');
      };

      timeoutRef.current = setTimeout(() => {
        setError('JavaScript Error: Execution timed out (possible infinite loop).');
        setOutput('');
        if (jsWorkerRef.current) {
          jsWorkerRef.current.terminate();
          jsWorkerRef.current = null;
        }
      }, 1500);

      jsWorkerRef.current.postMessage(content);

      return () => {
        clearTimeout(timeoutRef.current);
        if (jsWorkerRef.current) {
          jsWorkerRef.current.terminate();
          jsWorkerRef.current = null;
        }
      };
    } else if (language === 'python') {
      if (jsWorkerRef.current) {
        jsWorkerRef.current.terminate();
        jsWorkerRef.current = null;
      }
      if (!pythonWorkerRef.current) {
        createPythonWorker().then(worker => {
          pythonWorkerRef.current = worker;
          setupAndSend();
        });
      } else {
        setupAndSend();
      }

      function setupAndSend() {
        pythonWorkerRef.current.onmessage = (e) => {
          clearTimeout(timeoutRef.current);
          setError(e.data.error ? `Python Error: ${e.data.error}` : null);
          setOutput(e.data.result || '');
        };

        timeoutRef.current = setTimeout(() => {
          setError('Python Error: Execution timed out (possible infinite loop / heavy computation / Pyodide is still loading).');
          setOutput('');
          // Properly terminate the Python worker on timeout to prevent memory leaks
          if (pythonWorkerRef.current) {
            pythonWorkerRef.current.terminate();
            pythonWorkerRef.current = null;
          }
        }, 15000);

        pythonWorkerRef.current.postMessage(content);
      }

      return () => {
        clearTimeout(timeoutRef.current);
      };
    } else if (language === 'html') {
      if (jsWorkerRef.current) {
        jsWorkerRef.current.terminate();
        jsWorkerRef.current = null;
      }
      if (pythonWorkerRef.current) {
        pythonWorkerRef.current.terminate();
        pythonWorkerRef.current = null;
      }
      const validationError = htmlErrorHandler(content);
      setError(validationError ? `HTML Error: ${validationError}` : null);
      setOutput(validationError ? '' : content);
    }
  }, [content, language]);

  return (
    <Container>
      <Header style ={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style ={{display: 'flex', alignItems: 'center', gap: 8}}>
          <PreviewIcon />
          <span style={{ color: '#aaa', fontSize: 14 }}>{language.toUpperCase()}</span>
        </div>
        <div
        ref={bugRef} 
        style ={{position: 'relative', display: 'inline-block'}}
        onMouseEnter={() => {
          setShowTooltip(true);
          setShowExclamation(false);
        }}
        onMouseLeave={() => setShowTooltip(false)}
        >
        <Bug width={22} height={22} />
        {showExclamation && (
          <span
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            zIndex: 3,
            pointerEvents: 'none',
          }}>
            <BadgeAlert width={16} height ={16} />
          </span>
        )}
        </div>
        <ErrorTooltip show={showTooltip} anchorRef={bugRef} error={error}/>
      </Header>
      <PreviewContainer>
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
      </PreviewContainer>
    </Container>
  );
};

export default LivePreview; 