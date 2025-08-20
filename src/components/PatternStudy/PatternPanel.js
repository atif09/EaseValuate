import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import BoilerplateTabs from './BoilerplateTabs';
import VisualizationPanel from './VisualizationPanel';
import {panelContainerStyle,leftPanelStyle,rightPanelStyle} from '../../styles/patternPanelStyles';
import patternList from './patternList'

const subsetLineMaps = {
  python: {
    1: [1],
    2: [2, 3],
    3: [4, 5],
    4: [6],
    5: [7],
    6: [9]
  },
  cpp: {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7],
    5: [8],
    6: [9]
  },
  java: {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7],
    5: [8],
    6: [9]
  }
}

function PatternPanel() {
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [currentStep, setCurrentStep] = useState(0);
  const { patternName } = useParams();

  const selectedPattern = patternList.includes(patternName) ? patternName : patternList[0];
  const languageOptions = [
    {value: 'python', label: 'Python'},
    {value: 'cpp', label: 'C++'},
    {value: 'java', label: 'Java'}
  ];

  const handleStepChange = (step) => {
    setCurrentStep(step);
    if (selectedPattern === 'Subsets (Backtracking)' && subsetLineMaps[selectedLanguage] && subsetLineMaps[selectedLanguage][step]) {
      setHighlightedLines(subsetLineMaps[selectedLanguage][step]);
    } else {
      setHighlightedLines([]);
    }
  };

  const resetHighlighting = () => {
    setHighlightedLines([]);
    setCurrentStep(0);
  };

  return (
    <div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16}}>
        <select
        value={selectedLanguage}
        onChange={e => setSelectedLanguage(e.target.value)}
        style={{
          background: '#23243a',
          color: '#fff',
          border: '1px solid #a120ff',
          borderRadius: 6,
          padding: '0.3rem 1rem',
          fontWeight: 600,
          fontSize: 16,
          outline: 'none'
        }}>
          {languageOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1, minWidth: 0}}>
          <BoilerplateTabs
            patternName={selectedPattern}
            highlightedLines={highlightedLines}
            selectedLanguage={selectedLanguage}
          />
        </div>
        <div style={{flex: 1}}>
          <VisualizationPanel
            patternName={selectedPattern}
            onStepChange={handleStepChange}
            onReset={resetHighlighting}
            selectedLanguage={selectedLanguage}
          />
        </div>
      </div>
    </div>
  );
}

export default PatternPanel;

