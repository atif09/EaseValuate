import React from 'react';
import styled, { keyframes } from 'styled-components';


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;



const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
`;
const Spinner = styled.div`
  width: ${({ size }) => size || '2rem'};
  height: ${({ size }) => size || '2rem'};
  border: 3px solid ${({ theme }) => theme === 'dark' ? '#2d3748' : '#f0f0f0'};
  border-top-color: ${({ theme, color }) => color || (theme === 'dark' ? '#90cdf4' : '#3182ce')};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    border: 2px solid transparent;
    animation: ${pulse} 1.5s ease-in-out infinite;
    border-color: ${({ theme }) => theme === 'dark' ? '#90cdf422' : '#3182ce22'};
  }
`;


const Text = styled.span`
  margin-left: 0.75rem;
  color: ${({ theme }) => theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  font-size: 0.875rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const Progress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: ${({ theme }) => theme === 'dark' ? '#90cdf4' : '#3182ce'};
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.3s ease;
`;

const LoadingSpinner = ({ 
  text = 'Analyzing accessibility...', 
  theme,
  size,
  color,
  progress,
  pulseEffect = true,
  showProgress = false
}) => (
  <SpinnerWrapper 
    role="status" 
    aria-label={text}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={progress}
  >
    <Spinner 
      theme={theme} 
      size={size} 
      color={color}
      className={pulseEffect ? 'pulse' : ''}
    />
    {text && <Text theme={theme}>{text}</Text>}
    {showProgress && <Progress theme={theme} progress={progress} />}
  </SpinnerWrapper>
);

export default LoadingSpinner;