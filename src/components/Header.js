import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HamburgerMenu from './HamburgerMenu';
import{HeaderContainer,
  Logo,
  Cursor,
  LogoRow,
  LogoTyping
} from '../styles/headerStyles';



const Header = () => {
  const [displayText, setDisplayText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const fullText = 'Live';

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
    }, 120); 
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <HeaderContainer>
        <LogoRow>
          <HamburgerMenu />
          <LogoTyping>
            <Logo>
          {displayText}
        </Logo>
        {!typingComplete && <Cursor>|</Cursor>}
          </LogoTyping>
          
        </LogoRow>
    </HeaderContainer>
  );
};

export default Header;
