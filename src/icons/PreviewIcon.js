import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PreviewIcon = () => (
  <IconContainer>
    <motion.svg
      
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.5 }}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </motion.svg>
    <span></span>
  </IconContainer>
);

export default PreviewIcon;