import React from 'react';
import patterns from './patternList';
import { useNavigate } from 'react-router-dom';
import {
  hoverBg,
  purple,
  dropdownStyle,
  patternListStyle,
  patternItemStyle
} from '../../styles/patternDropdownStyles';

function PatternDropdown({ hoveredIndex, setHoveredIndex, onPatternSelect }) {
  const navigate = useNavigate();

  const handlePatternClick = (pattern) => {
    navigate(`/pattern/${encodeURIComponent(pattern)}`);
    if (onPatternSelect) onPatternSelect();
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleMouseEnter = (idx) => {
    setHoveredIndex(idx);
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
            onClick={() => handlePatternClick(pattern)}
          >
            <span>{pattern}</span>
          </div>
        ))}
      </div>
      </div>
  );
}
export default PatternDropdown;