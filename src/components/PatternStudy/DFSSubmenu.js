import React from 'react';
import { useNavigate } from 'react-router-dom';

const dfsOptions = [
  "Inorder Traversal",
  "Preorder Traversal", 
  "Postorder Traversal"
];

const submenuStyle = {
  position: 'absolute',
  left: '100%',
  top: '0',
  background: '#181a24',
  borderRadius: '6px',
  boxShadow: '0 2px 8px 0 rgba(162,32,255,0.15)',
  padding: '0.25rem 0',
  minWidth: '180px',
  zIndex: 100002,
  border: '1px solid rgba(161,32,255,0.2)'
};

const submenuItemStyle = (hovered) => ({
  padding: '0.45rem 1rem',
  cursor: 'pointer',
  color: hovered ? '#a120ff' : '#fff',
  borderRadius: '4px',
  fontSize: '0.95rem',
  transition: 'all 0.18s ease',
  background: hovered ? '#23243a' : 'transparent',
  fontFamily: `'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif`,
  whiteSpace: 'nowrap'
});

function DFSSubmenu({ hoveredSubmenuIndex, setHoveredSubmenuIndex, onOptionSelect }) {
  const navigate = useNavigate();

  return (
    <div style={submenuStyle}>
      {dfsOptions.map((option, idx) => (
        <div
          key={option}
          style={submenuItemStyle(hoveredSubmenuIndex === idx)}
          onMouseEnter={() => setHoveredSubmenuIndex(idx)}
          onMouseLeave={() => setHoveredSubmenuIndex(-1)}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/pattern/${encodeURIComponent(option)}`);
            if (onOptionSelect) onOptionSelect();
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export default DFSSubmenu;