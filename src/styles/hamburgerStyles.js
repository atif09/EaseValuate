import styled from 'styled-components';

export const hamburgerMenu = {
  position: 'relative',
  display: 'inline-block',
  zIndex: 200,
};

export const hamburgerIcon = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

export const hamburgerIconBar = {
  width: '28px',
  height: '4px',
  background: 'linear-gradient(90deg, #a259f7 60%, #202eff 100%)',
  border: '1.5px solid #3a0a5d',
  borderRadius: '3px',
  boxShadow: '0 1px 4px 0 rgba(162,89,247,0.15)',
};

export const menuDropdown = {
  position: 'absolute',
  top: '44px',
  left: 0,
  background: 'rgba(60, 0, 90, 0.92)',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 16px 2px rgba(60,0,90,0.25)',
  minWidth: '180px',
  border: '1px solid #a259f7',
  fontFamily: 'Fira Mono, monospace',
  backdropFilter: 'blur(4px)',
};

export const menuDropdownUl = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

export const menuDropdownLi = {
  padding: '14px 24px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background 0.2s',
  position: 'relative',
};

export const menuDropdownLiHover = {
  background: 'rgba(162, 89, 247, 0.25)',
};

export const menuDropdownA = {
  color: '#fff',
  textDecoration: 'none',
  display: 'block',
  width: '100%',
  height: '100%',
};

export const patternListDropdown = {
  position: 'absolute',
  left: '100%',
  top: 0,
  background: 'rgba(60, 0, 90, 0.97)',
  borderRadius: '8px',
  minWidth: '220px',
  boxShadow: '0 2px 16px 2px rgba(60,0,90,0.25)',
  border: '1px solid #a259f7',
  fontFamily: 'Fira Mono, monospace',
  maxHeight: '350px',
  overflowY: 'auto',
  zIndex: 300,
};

export const patternListItem = {
  padding: '12px 20px',
  cursor: 'pointer',
  color: '#fff',
  transition: 'background 0.2s',
};

export const patternListItemHover = {
  background: 'rgba(162, 89, 247, 0.25)',
};

