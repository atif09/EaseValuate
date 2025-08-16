import React from 'react';
import { useParams } from 'react-router-dom';
import BoilerplateTabs from './BoilerplateTabs';
import VisualizationPanel from './VisualizationPanel';
import {panelContainerStyle,leftPanelStyle,rightPanelStyle} from '../../styles/patternPanelStyles';

function PatternPanel() {
  const { patternName } = useParams();
  return (
    <div style={panelContainerStyle}>
    <div style={leftPanelStyle}>
      <BoilerplateTabs patternName={patternName} />

    </div>
    <div style={rightPanelStyle}>
      <VisualizationPanel patternName={patternName} />

    </div>
  </div>
  );
}

export default PatternPanel;
