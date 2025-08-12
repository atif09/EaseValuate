import React from 'react';
import { ErrorMessage } from '../../styles/livePreviewStyles';

const ErrorDisplay = ({ error, language }) => (
  <ErrorMessage>
    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
      {error}
    </div>
    {language === 'javascript' && (
      <div style={{ fontSize: '12px', opacity: 0.8 }}>
        Check your browser console for more clarity on the error.
      </div>
    )}
  </ErrorMessage>
);

export default ErrorDisplay;