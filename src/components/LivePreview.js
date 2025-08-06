import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  padding: 0.75rem;
  background: ${({ theme }) => theme === 'dark' ? '#2d3748' : '#f8f9fa'};
  color: ${({ theme }) => theme === 'dark' ? '#f8f9fa' : '#2d3748'};
  border-bottom: 1px solid ${({ theme }) => theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;



const Preview = ({ html, highlightedElement, onLoad, theme }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      doc.open();
      
      // If the HTML includes a full document structure, use it directly
      if (html.includes('<!DOCTYPE html>')) {
        // Insert theme styles right after the first <style> tag or create one if it doesn't exist
        const themedHtml = theme === 'dark'
          ? html.replace('</style>', 'body { background: #1a202c; color: #f7fafc; }</style>')
          : html;
        doc.write(themedHtml);
      } else {
        // If it's just a fragment, wrap it in a proper document
        const themeStyles = theme === 'dark' 
          ? '<style>body { background: #1a202c; color: #f7fafc; }</style>' 
          : '';
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              ${themeStyles}
            </head>
            <body>
              ${html}
            </body>
          </html>
        `);
      }
      doc.close();
      
      if (highlightedElement) {
        const element = doc.querySelector(highlightedElement);
        if (element) {
          element.style.outline = '2px solid #4299e1';
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      onLoad?.();
    } catch (error) {
      console.warn('Preview update failed:', error);
    }
  }, [html, highlightedElement, onLoad, theme]);

  return (
    <iframe
      ref={iframeRef}
      title="Live Preview"
      sandbox="allow-same-origin allow-scripts"
      style={{ 
        width: '100%', 
        height: '500px', 
        border: 'none', 
        background: theme === 'dark' ? '#1a202c' : 'white',
        borderRadius: '4px'
      }}
    />
  );
};


const LivePreview = ({ html, theme, highlightedElement, onLoad }) => (
  <Container>
    <Header theme={theme}>Live Preview</Header>
    <Preview 
      html={html} 
      theme={theme}
      highlightedElement={highlightedElement}
      onLoad={onLoad}
    />
  </Container>
);

export default LivePreview;