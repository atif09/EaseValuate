import React, { useState,useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PreviewIcon from '../icons/PreviewIcon';

const Container = styled.div`
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  padding: 0.75rem;
  background: rgba(45,55,72,0.3);
  color: rgba(255,255,0.9);
  border-bottom: 1px solid rgba(255,255,255,0.0.25);
  display:flex;
  align-items:center;
`;

const ConsoleOutput = styled.pre`
  color: rgba(255,255,255,0.9);
  padding: 1rem;
  margin: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size:14px;
  line-height: 1.5;
  background: transparent;
`;

const PreviewContainer = styled.div`
  background: rgba(17, 25, 40, 0.15);
  min-height: 200px;
  position: relative;
  backdrop-filter: blur(2px);
  border-radius: 4px;

  iframe {
    background: transparent !important;
  }

`;

const ErrorMessage = styled.div`
  color: #ff4444;
  padding: 1rem;
  background: rgba(255, 68, 68, 0.1);
  border-left: 3px solid #ff4444;
  margin: 1rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  white-space: pre-wrap;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
`;



const Preview = ({highlightedElement, content, language, onLoad}) => {
  const iframeRef = useRef();
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!content){
      setOutput('');
      return;
    }

    if(language==='html'){
      const iframe = iframeRef.current;
      if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();

      const htmlContent =`

      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body{
              background: transparent !important;
              color: white !important;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
              *{color: rgba(255, 255, 255, 0.9) !important;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1;}
            h1,h2,h3,h4,h5,h6, p{
            margin-bottom: 1rem;}
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
      doc.write(htmlContent);
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
      setError(`${language.toUpperCase()} Error: ${error.message}`);
      console.error('Preview failed:',error);
    }
    }else if(language === 'javascript'){
      try{
        const results =[];
        const originalLog = console.log;
        console.log = (...args) => {
          results.push(args.join(' '));
          originalLog.apply(console,args);
        };

        eval(content);
        console.log=originalLog;

        setOutput(results.join('\n') || 'No output');
        setError(null);
      } catch(error){
        setError(error.message);
        setOutput('');
      }
    } else if(language === 'python'){
      setOutput('Python output is loading...');
      setError(null);
    }
  }, [content,language, onLoad]);
    


  const renderPreview=() => {
    if (error){
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    switch(language){
      case'html':
        return (
        <iframe
          ref={iframeRef}
          title="Live Preview"
          sandbox="allow-same-origin allow-scripts"
          style={{ 
            width: '100%', 
            height: '500px', 
            border: 'none', 
            borderRadius: '4px'
      }}
    />
  );

  case 'javascript': 
  case 'python':
    return <ConsoleOutput>{output}</ConsoleOutput>;
  default:
    return<div>Preview not available for this language</div>  
}
};
return(
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