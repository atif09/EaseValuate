import React, {useState} from 'react';
import styled from 'styled-components';
import { motion, useAnimation} from 'framer-motion';
import { supportedLanguages} from '../config/languages';

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;`;

const LanguageDropdown = styled.div`
  position: absolute;
  top:100%;
  left:0%;
  background: rgba(86, 32, 155,0.25);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(162,32,255,0.15);
  border-radius: 4px;
  min-width: 120px;
  display: ${props => props.isVisible ? 'block' : 'none'};
  z-index:1000;`;

const LanguageOption = styled.div`
  padding: 8px 12px;
  color: white;
  font-family: Arial, sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
  background: rgba(162,32,255,0.2);
  }`;

const AnimatedCodeIcon = ({ErrorMessage,onLanguageChange}) => {
  const controls = useAnimation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);

  const handleLanguageSelect = (language) => {
    try {
      onLanguageChange(language);
      setShowDropdown(false);
      setError(null);
    }catch (err) {
      setError(err.message);
      console.error('Language switch failed:',err)
    }
  };

  return (
    <IconWrapper 
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}>
    <div
      style={{
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: 'transparent',
        backdropFilter: 'blur(2px)',
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.polyline
          variants={{
            normal: { translateX: "0%" },
            animate: { translateX: -2 }
          }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          animate={controls}
          initial="normal"
          points="8 6 2 12 8 18"
        />
        <motion.polyline
          variants={{
            normal: { translateX: "0%" },
            animate: { translateX: "2px" },
          }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          animate={controls}
          initial="normal"
          points="16 18 22 12 16 6"
        />
      </svg>
    </div>
    <LanguageDropdown isVisible = {showDropdown}>
      {Object.entries(supportedLanguages).map(([key,lang]) => (
        <LanguageOption
        key={key}
        onClick={() => handleLanguageSelect(key)}>
          {lang.name}
        </LanguageOption>
      ))}
    </LanguageDropdown>
    {error && <ErrorMessage>{error}</ErrorMessage>}
    </IconWrapper>
  );
};

export default AnimatedCodeIcon;