import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme === 'dark' ? '#2d3748' : '#f8f9fa'};
  color: ${props => props.theme === 'dark' ? '#f8f9fa' : '#2d3748'};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    color: #4299e1;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#f8f9fa' : '#2d3748'};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#4a5568' : '#edf2f7'};
  }
  
  &:focus {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }
`;

const Header = ({ theme, toggleTheme }) => {
  return (
    <HeaderContainer theme={theme}>
      <Logo>
        <span></span>
        EaseValuate
      </Logo>
      <ThemeToggle 
        onClick={toggleTheme} 
        theme={theme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </ThemeToggle>
    </HeaderContainer>
  );
};

export default Header;