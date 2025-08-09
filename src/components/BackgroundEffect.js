import React, { useEffect, useRef } from 'react';

function BackgroundEffect() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.VANTA) {
        const vantaEffect = window.VANTA.DOTS({
          el: backgroundRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xa120ff,
          color2: 0x202eff,
          backgroundColor: 0x0a0a0a,
          size: 4.00,
          spacing: 33.00,
          showLines: false
        });
        
        return () => {
          if (vantaEffect) vantaEffect.destroy();
        };
      } else {
        console.error('VANTA not loaded properly');
      }
    }
  }, []);

  return <div ref={backgroundRef} style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  }} />;
}

export default BackgroundEffect;