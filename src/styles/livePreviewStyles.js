import styled from 'styled-components';

export const Container = styled.div`
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  padding: 0.75rem;
  background: rgba(45,55,72,0.3);
  color: rgba(255,255,0.9);
  border-bottom: 1px solid rgba(255,255,255,0.0.25);
  display:flex;
  align-items:center;
`;

export const ConsoleOutput = styled.pre`
  color: rgba(255,255,255,0.9);
  padding: 1rem;
  margin: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size:14px;
  line-height: 1.5;
  background: transparent;
`;

export const PreviewContainer = styled.div`
  background: rgba(17, 25, 40, 0.15);
  min-height: 200px;
  position: relative;
  backdrop-filter: blur(2px);
  border-radius: 4px;

  iframe {
    background: transparent !important;
  }

`;

export const ErrorMessage = styled.div`
  color: #ff4444;
  padding: 1rem;
  background: rgba(255, 68, 68, 0.1);
  border-left: 3px solid #ff4444;
  margin: 1rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  white-space: pre-wrap;
  border-raius: 4px;
  box-shadow: 0 2px 4px rgba( 255,0,0,0.1);
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
`;