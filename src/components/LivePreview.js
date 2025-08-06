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



const Preview = ({ html, highlightedElement, onLoad }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      doc.open();
      doc.write(html);
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
  }, [html, highlightedElement, onLoad]);

  return (
    <iframe
      ref={iframeRef}
      title="Live Preview"
      sandbox="allow-same-origin"
      style={{ width: '100%', height: '500px', border: 'none', background: 'white' }}
    />
  );
};


const LivePreview = ({ html, theme, highlightedElement, onLoad }) => (
  <Container>
    <Header theme={theme}>Live Preview</Header>
    <Preview 
      html={html} 
      highlightedElement={highlightedElement}
      onLoad={onLoad}
    />
  </Container>
);

export default LivePreview;