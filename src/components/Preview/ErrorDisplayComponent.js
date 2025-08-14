import React from 'react';
import { ErrorDisplay } from '../../styles/livePreviewStyles';

const ErrorDisplayComponent = ({ error, language }) => (
  <ErrorDisplay>
    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
      {error}
    </div>
    {language === 'javascript' && (
      <div style={{ fontSize: '12px', opacity: 0.8 }}>
        Check your browser console for more clarity on the error.
      </div>
    )}
  </ErrorDisplay>
);

export default ErrorDisplayComponent;