import styled from 'styled-components';

export const Container = styled.div`
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(2px);
  border: 1px solid rgba(162, 32, 255, 0.12);
  background: rgba(17, 25, 40, 0.15);
`;

export const Header = styled.div`
  padding: 0.75rem;
  background: transparent;
  border-bottom: 1px solid rgba(162, 32, 255, 0.25);
  display:flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(162,32,255,0.15);
  

`;

export const EditorWrapper = styled.div`
  .ace_editor, 
  .ace_scroller,
  .ace_content,
  .ace_layer {
    background: transparent !important;
    backdrop-filter: none !important;
  }

  .ace_gutter {
    background: rgba(90, 20, 160, 0.08) !important;
    border-right: 1px solid rgba(162, 32, 255, 0.15);
  }

  .ace_gutter-active-line {
    background: rgba(162, 32, 255, 0.1) !important;
  }

  .ace_marker-layer .ace_active-line {
    background: rgba(162, 32, 255, 0.05) !important;
  }

  .ace_marker-layer .ace_selection {
    background: rgba(162, 32, 255, 0.2) !important;
  }

  .ace_cursor {
    color: rgba(255,255,255,0.9) !important;
  }
  .ace_text,
  .ace_xml,
  .ace_html,
  .ace_html-tag {
    opacity: 0.85;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  }

  .error-marker{
    position: absolute;
    background: rgba(255,0,0,0.1);
    border-left: 2px solid #ff4444;}

`;
