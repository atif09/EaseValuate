import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding: 1rem;
  background: rgba(17,25,40,0.25);
  backdrop-filter: blur(2px);
  border-bottom: 1px solid rgba(162,32,255,0.12);
`;

// Logo with a typing effect
const Logo = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  background: linear-gradient(45deg, #a120ff, #202eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
  white-space: nowrap; /* Prevent line breaks */
`;

const Cursor = styled.span`
  color: #a120ff;
  background: linear-gradient(45deg,#a120ff, #202eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: blink-cursor 0.8s step-end infinite;
  display: inline-block;
  font-size:2rem;
  font-weight:300;
  margin-left:2px;
  position:relative;
  top: -2px;

  @keyframes blink-cursor{
  from,to{opacity: 1;}
  50%{opacity:0;}}
`;



const Header = () => {
  const [displayText, setDisplayText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const fullText = 'EaseValuate';

  useEffect(() => {
    
    setDisplayText('');
    setTypingComplete(false);
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 200); 
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <HeaderContainer>
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Logo>
          {displayText}
        </Logo>
        {!typingComplete && <Cursor>|</Cursor>}
      </div>
    </HeaderContainer>
  );
};

export default Header;
