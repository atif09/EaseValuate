export const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 99999,
  background: 'rgba(10,13,22,0.7)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  display: 'flex',
  alignItems: 'stretch',
};

export const sidebarStyles = {
  height: '100vh',
  width: '270px',
  background: '#0a0d16',
  color: '#fff',
  boxShadow: '2px 0 24px 4px rgba(162,32,255,0.18)',
  zIndex: 100000,
  padding: '2rem 1.5rem 1.5rem 1.5rem',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

export const dividerStyles = {
  height: '2px',
  width: '100%',
  background: 'linear-gradient(90deg, #a120ff 0%, #202eff 100%)',
  boxShadow: '0 2px 8px 0 rgba(162,32,255,0.18)',
  border: 'none',
  margin: '1.2rem 0 1.2rem 0',
  padding: 0,
};