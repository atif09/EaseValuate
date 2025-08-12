import React from 'react';
import { ConsoleOutput } from '../../styles/livePreviewStyles';

export const renderIframe = (iframeRef, props) => (
  <iframe
    ref={iframeRef}
    title="Live Preview"
    sandbox="allow-same-origin allow-scripts"
    style={{ 
      width: '100%', 
      height: '500px', 
      border: 'none', 
      background: 'transparent',
      borderRadius: '4px'
    }}
  />
);

export const renderConsoleOutput = (output) => (
  <ConsoleOutput>{output || 'No output yet...'}</ConsoleOutput>
);