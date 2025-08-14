import React, { useState, useEffect, useRef } from 'react';
import { Container, Header, PreviewContainer } from '../styles/livePreviewStyles';
import PreviewIcon from '../icons/PreviewIcon';
import ErrorDisplayComponent from './Preview/ErrorDisplayComponent';
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

function createPythonWorker() {
  const workerCodeUrl = `${process.env.PUBLIC_URL}/pythonWorker.js`;
  return fetch(workerCodeUrl)
    .then(response => response.text())
    .then(code => {
      const blob = new Blob([code], { type: 'application/javascript' });
      return new Worker(URL.createObjectURL(blob));
    });
}

const LivePreview = ({ content, language }) => {
  const [error, setError] = useState(null);
  const [output, setOutput] = useState('');
  const jsWorkerRef = useRef(null);
  const pythonWorkerRef = useRef(null);
  const timeoutRef = useRef(null);

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