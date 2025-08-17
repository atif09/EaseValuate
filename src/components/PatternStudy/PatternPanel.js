import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import BoilerplateTabs from './BoilerplateTabs';
import VisualizationPanel from './VisualizationPanel';
import {panelContainerStyle,leftPanelStyle,rightPanelStyle} from '../../styles/patternPanelStyles';
import patternList from './patternList'


function PatternPanel() {
  const [highlightLine, setHighlightLine] = useState(null);
  const { patternName } = useParams();

  const selectedPattern = patternList.includes(patternName) ? patternName : patternList[0];


  return (
    <div style={{display:'flex'}}>

    <div style={{flex: 1}}>
      <BoilerplateTabs patternName={selectedPattern} highlightLine={highlightLine} />

    </div>
    <div style={{flex: 1}}>
      <VisualizationPanel patternName={selectedPattern} onHighlightLineChange={setHighlightLine} />

    </div>
  </div>
  );
}

export default PatternPanel;
