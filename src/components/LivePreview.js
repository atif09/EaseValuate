import React, { useState,useRef, useEffect } from 'react';
import PreviewIcon from '../icons/PreviewIcon';
import {Container, Header,ConsoleOutput,PreviewContainer,ErrorMessage} from '../styles/livePreviewStyles';
import {htmlErrorHandler, javascriptErrorHandler, pythonErrorHandler} from '../utils/errorHandlers';
import { getHTMLTemplate } from '../templates/htmlTemplate';
import {renderIframe, renderConsoleOutput} from '../components/Preview/PreviewRenderer';
import ErrorDisplay from '../components/Preview/ErrorDisplay'






const Preview = ({highlightedElement, content, language, onLoad}) => {
  const iframeRef = useRef();
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!content){
      setOutput('');
      setError('Please enter some code to preview')
      return;
    }

    setError(null);

    switch(language) {
      case 'html':
        const htmlError = htmlErrorHandler(content);
        if(htmlError){
          setError(htmlError);
          return;
        }

        const iframe = iframeRef.current;
        if (!iframe) return;

        try {
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          doc.open();
          doc.write(getHTMLTemplate(content));
          doc.close();
      
        if (highlightedElement) {
        const element = doc.querySelector(highlightedElement);
        if (element) {
          element.style.outline = '2px solid #4299e1';
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        setError(null);
        onLoad?.();
      }catch (error){
        setError(`HTML Error: ${error.message}`);
        console.error('Preview failed:',error);
      }
      break;
    case 'javascript':
      const jsError = javascriptErrorHandler(content);
      if(jsError){
        setError(jsError);
        return;
      }
    
      try{

        const results =[];
        const originalLog = console.log;
        console.log = (...args) => {
          results.push(args.join(' '));
          originalLog.apply(console,args);
        };

        eval(`try{${content}} catch(e){throw e;}`);;
        console.log=originalLog;

        setOutput(results.join('\n') || 'Code executed successfully, but no output');
      } catch(error){
        setError(`JavaScript Error: ${error.message}`);
        setOutput('');
      }
      break;
    case 'python':
      const pythonError = pythonErrorHandler(content);
      if (pythonError) {
        setError(pythonError);
        return;
      }

      setOutput('Python output is loading...');
      break;

    default:
      setError('Unsupported Language');
  }
    
}, [content,language, onLoad, highlightedElement]);

const renderPreview = () => {
    if (error) {
      return <ErrorDisplay error={error} language={language} />;
    }

    switch(language) {
      case 'html':
        return renderIframe(iframeRef);
      case 'javascript': 
      case 'python':
        return renderConsoleOutput(output);
      default:
        return <div>Preview not available for this language</div>
    }
  };

  return (
    <PreviewContainer>
      {renderPreview()}
    </PreviewContainer>
  );
};

const LivePreview = ({ content,language='html', theme, highlightedElement, onLoad }) => (
  <Container>
    <Header>
      <PreviewIcon />
    </Header>
    <Preview 
      content={content}
      language={language}
      highlightedElement={highlightedElement}
      onLoad={onLoad}
    />
  </Container>
);

export default LivePreview;