import React, { useState } from 'react';
import patterns from './patternList';
import { useNavigate } from 'react-router-dom';
import DFSSubmenu from './DFSSubmenu';

const hoverBg = '#23243a';
const purple = '#a120ff';

const dropdownStyle = {
  maxHeight: '220px',
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

const patternListStyle = {
  maxHeight: '220px',
  overflowY: 'auto',
};

const patternItemStyle = (hovered) => ({
  padding: '0.45rem 1rem',
  cursor: 'pointer',
  color: hovered ? purple : '#fff',
  borderRadius: '4px',
  fontSize: '1rem',
  transition: 'background 0.18s',
  background: hovered ? hoverBg : 'transparent',
  fontFamily: `'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif`,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const arrowStyle = {
  fontSize: '12px',
  color: '#a120ff',
  transition: 'transform 0.2s ease'
};

function PatternDropdown({ hoveredIndex, setHoveredIndex, onPatternSelect }) {
  const navigate = useNavigate();
  const [showDFSSubmenu, setShowDFSSubmenu] = useState(false);
  const [hoveredSubmenuIndex, setHoveredSubmenuIndex] = useState(-1);

  const handlePatternClick = (pattern, idx) => {
    if (pattern === "Depth-First Search (DFS)") {
      setShowDFSSubmenu(!showDFSSubmenu);
      return;
    }
    
    navigate(`/pattern/${encodeURIComponent(pattern)}`);
    if (onPatternSelect) onPatternSelect();
  };

  const handleMouseEnter = (idx) => {
    setHoveredIndex(idx);
    if (patterns[idx] === "Depth-First Search (DFS)") {
      setShowDFSSubmenu(true);
    } else {
      setShowDFSSubmenu(false);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
    
  };

  const handleSubmenuClose = () => {
    setShowDFSSubmenu(false);
    setHoveredSubmenuIndex(-1);
    if (onPatternSelect) onPatternSelect();
  };

  return (
    <div style={dropdownStyle}>
      <style>
        {`
          .pattern-dropdown-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .pattern-dropdown-scroll::-webkit-scrollbar-thumb {
            background: #a120ff;
            border-radius: 6px;
          }
          .pattern-dropdown-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
      <div className="pattern-dropdown-scroll" style={patternListStyle}>
        {patterns.map((pattern, idx) => (
          <div
            key={pattern}
            style={patternItemStyle(hoveredIndex === idx)}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handlePatternClick(pattern, idx)}
          >
            <span>{pattern}</span>
            {pattern === "Depth-First Search (DFS)" && (
              <span style={arrowStyle}>▶</span>
            )}
            
            
            {pattern === "Depth-First Search (DFS)" && showDFSSubmenu && (
              <DFSSubmenu
                hoveredSubmenuIndex={hoveredSubmenuIndex}
                setHoveredSubmenuIndex={setHoveredSubmenuIndex}
                onOptionSelect={handleSubmenuClose}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatternDropdown;