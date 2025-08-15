import React, { useState } from 'react';
import {
  hamburgerMenu,
  hamburgerIcon,
  hamburgerIconBar,
} from '../styles/hamburgerStyles';
import SidebarMenu from './SidebarMenu';
import PatternDropdown from './PatternStudy/PatternDropdown';

const fontFamily = `'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif`;
const hoverBg = '#23243a';
const purple = '#a120ff';

function HamburgerMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patternHover, setPatternHover] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const patternStudyStyle={
    fontWeight: 500,
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    transition: 'background 0.2s',
    background: patternHover || dropdownOpen ? hoverBg : 'transparent',
    color: patternHover || dropdownOpen ? '#a120ff' : '#fff',
    letterSpacing: '0.1rem',
    outline: 'none',
    border: 'none',
    marginBottom: '0.5rem'
  }


  return (
    <div className="hamburger-menu" style={hamburgerMenu}>
      <button
        style={hamburgerIcon}
        className="hamburger-icon"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <div style={hamburgerIconBar} />
        <div style={hamburgerIconBar} />
        <div style={hamburgerIconBar} />
      </button>
      <SidebarMenu open={sidebarOpen} onClose={() => {setSidebarOpen(false); setDropdownOpen(false);}}>

        <div style={patternStudyStyle}
        onMouseEnter={() => setPatternHover(true)}
        onMouseLeave={() => setPatternHover(false)}
        onClick={() => setDropdownOpen((open) => !open)}
          >
          Pattern Study
        </div>
        {dropdownOpen && (
          <PatternDropdown
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}/>
        )}
        
        
      </SidebarMenu>
    </div>
  );
}

export default HamburgerMenu;
