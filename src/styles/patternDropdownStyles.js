export const hoverBg = '#23243a';
export const purple = '#a120ff';

export const dropdownStyle = {
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

export const patternListStyle = {
  maxHeight: '220px',
  overflowY: 'auto',
};

export const patternItemStyle = (hovered) => ({
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