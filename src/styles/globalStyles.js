import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #121212;
  }
  
  .vanta-canvas {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  
  /* Make content visible on top of background */
  #root {
    position: relative;
    z-index: 1;
  }
`;

export default GlobalStyles;