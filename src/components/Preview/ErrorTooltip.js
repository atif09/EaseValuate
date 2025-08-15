import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

function ErrorTooltip({show, anchorRef, error}){
  const [coords,setCoords] = useState({top: 0, left: 0});

  useEffect(() => {
    if(show && anchorRef.current){
      const rect = anchorRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        left: rect.right -260
      })
    }
  }, [show, anchorRef]);

  if(!show || !error ) return null;

  return ReactDOM.createPortal(
    <div
    style={{
      position:'fixed',
      top: coords.top,
      left:coords.left,
      background: '#2a0000',
      color: '#fff',
      padding: '18px 24px',
      borderRadius: 10,
      boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      zIndex: 9999,
      minWidth: 260,
      maxWidth: 340,
      fontSize: 15,
      border: '2px solid #ff3b3b',
      fontFamily: 'monospace',
      pointerEvents: 'auto',
      transition: 'opacity 0.2s',
    }}>
      <div style ={{fontWeight: 700, color: '#ff3b3b', marginBottom: 8}}>
        &#9888; Error &mdash; <span style={{color: 'fff', fontWeight: 500}}>
          Feel stuck?
        </span>
        </div>
        <div style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
          {error}
      </div>
    </div>,
    document.body
  );
}
