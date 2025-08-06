import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const flash = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const Overlay = styled.div`
  position: absolute;
  pointer-events: none;
  background: ${({ theme }) => theme === 'dark' ? 
    'rgba(144, 205, 244, 0.2)' : 
    'rgba(49, 130, 206, 0.2)'
  };
  border: 2px solid ${({ theme }) => theme === 'dark' ? '#90cdf4' : '#3182ce'};
  border-radius: 4px;
  z-index: 1000;
  animation: ${flash} 1s ease-in-out;
  transition: all 0.3s ease;
`;

const Label = styled.div`
  position: absolute;
  top: -24px;
  left: 0;
  background: ${({ theme }) => theme === 'dark' ? '#2d3748' : '#fff'};
  color: ${({ theme }) => theme === 'dark' ? '#90cdf4' : '#3182ce'};
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ElementHighlighter = ({ selector, label, theme, targetRef }) => {
  useEffect(() => {
    if (!targetRef?.current || !selector) return;

    const highlight = (element) => {
      if (!element) return null;
      
      const { x, y, width, height } = element.getBoundingClientRect();
      const overlay = document.createElement('div');
      
      Object.assign(overlay.style, {
        position: 'absolute',
        left: `${x + window.scrollX}px`,
        top: `${y + window.scrollY}px`,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: 'none',
        zIndex: 1000
      });

      return overlay;
    };

    try {
      const element = targetRef.current.querySelector(selector);
      const overlay = highlight(element);
      
      if (overlay) {
        document.body.appendChild(overlay);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        return () => overlay.remove();
      }
    } catch (error) {
      console.warn('Element highlighting failed:', error);
    }
  }, [selector, targetRef]);

  return targetRef?.current?.querySelector(selector) ? (
    <Overlay theme={theme}>
      {label && <Label theme={theme}>{label}</Label>}
    </Overlay>
  ) : null;
};

export default ElementHighlighter;