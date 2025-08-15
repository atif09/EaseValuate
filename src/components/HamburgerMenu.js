import React, { useState } from 'react';
import {
  hamburgerMenu,
  hamburgerIcon,
  hamburgerIconBar,
} from '../styles/hamburgerStyles';
import SidebarMenu from './SidebarMenu';

const patterns = [
  "Sliding Window",
  "Two Pointers",
  "Fast & Slow Pointers",
  "Merge Intervals",
  "Cyclic Sort",
  "In-place Reversal of a Linked List",
  "Breadth-First Search (BFS)",
  "Depth-First Search (DFS)",
  "Top K Elements (Heap)",
  "K-way Merge",
  "Subsets (Backtracking)",
  "Bit Manipulation",
  "Dynamic Programming (Tabulation)",
  "Greedy Algorithms",
  "Binary Search"
];



function HamburgerMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patternHover, setPatternHover] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);


  const fontFamily = `'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif`;
  const hoverBg ='#23243a';

  const menuTitleStyle={
    fontFamily,
    fontWeight: 700,
    marginBottom: '0.5rem',
    letterSpacing: '0.4rem',
    color: '#fff',
    textShadow: '0 1px 8px rgba(162,32,255,0.12)',
  }

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

  const dropdownStyle={
    maxHeight: '220px',
    overflowY: 'auto',
    background: '#181a24',
    borderRadius: '6px',
    boxShadow: '0 2px 8px 0 rgba(162,32,255,0.10)',
    marginLeft: '0.5rem',
    marginTop: '0.2rem',
    marginBottom: '0.5rem',
    padding: '0.25rem 0',
    zIndex: 100001,
    position: 'relative'
    
  };

  const patternItemStyle={

    padding: '0.45rem 1rem',
    cursor: 'pointer',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'background 0.18s',

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
          <div style={dropdownStyle}>
            <style>
              {`
              .pattern-dropdown-scroll::-webkit-scrollbar {
              width: 8px;
              }
              .pattern-dropdown-scroll::-webkit-scrollbar-thumb {
                background: rgba(162, 32, 255, 0.5);
                border-radius: 6px;
              }
              .pattern-dropdown-scroll::-webkit-scrollbar-track {
                background: transparent;
                }
              `}
            </style>
            <div className="pattern-dropdown-scroll" style={{maxHeight: '220px', overflowY: 'auto'}}>
            {patterns.map((pattern,idx) => (
              <div 
                key={pattern}
                style={{
                  ...patternItemStyle,
                  background: hoveredIndex === idx ? hoverBg : 'transparent',
                  color: hoveredIndex === idx ? '#a120ff' : '#fff'
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(-1)}
                >
                  {pattern}
                </div>
            ))}
          </div>
        </div>
        )}
      </SidebarMenu>
    </div>
  );
}

export default HamburgerMenu;
