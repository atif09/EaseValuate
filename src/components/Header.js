import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from "motion/react";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: transparent;
  backdrop-filter: blur(4px);
  color: ${props => props.theme === 'dark' ? '#f8f9fa' : '#2d3748'};
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
  white-space: nowrap; /* Prevent line breaks */
  
  
  /* Blinking cursor effect */
  &::after {
    content: '|';
    position: absolute;
    right: -8px;
    color: #a120ff;
    background: linear-gradient(45deg, #a120ff, #202eff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: blink-cursor 0.8s step-end infinite;
  }

  @keyframes blink-cursor {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.5);
  }

  &:focus {
    outline: none;
  }
`;

const ToggleSwitch = ({ theme }) => {
  const circlePosition = theme === 'dark' ? 16 : 8;
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke={theme === 'dark' ? '#a120ff' : '#202eff'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect 
        width="20" 
        height="12" 
        x="2" 
        y="6" 
        rx="6" 
        ry="6" 
        fill={theme === 'dark' ? 'rgba(162, 32, 255, 0.2)' : 'rgba(32, 46, 255, 0.2)'} 
      />
      <motion.circle
        cy="12"
        r="2"
        cx={8}
        animate={{ cx: circlePosition }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 1.5
        }}
        fill={theme === 'dark' ? '#a120ff' : '#202eff'}
      />
    </svg>
  );
};

const Header = ({ theme, toggleTheme }) => {
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
    <HeaderContainer theme={theme}>
      <Logo style={{ 
        // Only show cursor when typing is not complete
        '&::after': typingComplete ? { display: 'none' } : {} 
      }}>
        {displayText}
      </Logo>
      <ThemeToggle 
        onClick={toggleTheme} 
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <ToggleSwitch theme={theme} />
      </ThemeToggle>
    </HeaderContainer>
  );
};

export default Header;
