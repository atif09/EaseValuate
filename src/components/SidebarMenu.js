import React from 'react';
import { createPortal } from 'react-dom';
import {overlayStyles,sidebarStyles,dividerStyles} from '../styles/sidebarMenuStyles';



function SidebarMenu({ open, onClose, children }) {
  if (!open) return null;
  return createPortal(
    <div style={overlayStyles} onClick={onClose}>
      <aside
        style={sidebarStyles}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem', letterSpacing: 1 }}>
          Menu
        </div>
        <div style={dividerStyles} />
        {children}
      </aside>
    </div>,
    document.body
  );
}

export default SidebarMenu;