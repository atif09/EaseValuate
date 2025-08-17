import React from 'react';
import { useParams } from 'react-router-dom';
import BoilerplateTabs from './BoilerplateTabs';
import VisualizationPanel from './VisualizationPanel';
import {panelContainerStyle,leftPanelStyle,rightPanelStyle} from '../../styles/patternPanelStyles';
import patternList from './patternList'


function PatternPanel() {
  const { patternName } = useParams();

  const selectedPattern = patternList.includes(patternName) ? patternName : patternList[0];


  return (
    <div style={panelContainerStyle}>
    <div style={leftPanelStyle}>
      <BoilerplateTabs patternName={selectedPattern} />

    </div>
    <div style={rightPanelStyle}>
      <VisualizationPanel patternName={selectedPattern} />

    </div>
  </div>
  );
}

export default PatternPanel;
