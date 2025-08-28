import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import BoilerplateTabs from './BoilerplateTabs';
import VisualizationPanel from './VisualizationPanel';
import {panelContainerStyle,leftPanelStyle,rightPanelStyle} from '../../styles/patternPanelStyles';
import patternList from './patternList';


import slidingWindowStepDescriptions from './PatternPanels/StepDescriptions/SlidingWindowStepDescriptions';
import twoPointersStepDescriptions from './PatternPanels/StepDescriptions/TwoPointersStepDescriptions';
import subsetStepDescriptions from './PatternPanels/StepDescriptions/BacktrackingStepDescriptions';
import slidingWindowLineMaps from './PatternPanels/LineMaps/SlidingWindowLineMaps';
import topKElementsStepDescriptions from './PatternPanels/StepDescriptions/TopKElementsStepDescriptions';
import twoDimensionalDPStepDescriptions from './PatternPanels/StepDescriptions/TwoDimensionalDPStepDescriptions';
import preorderTravStepDescriptions from './PatternPanels/StepDescriptions/PreorderTravStepDescriptions';
import postorderTravStepDescriptions from './PatternPanels/StepDescriptions/PostorderTravStepDescriptions';
import mergeIntervalsStepDescriptions from './PatternPanels/StepDescriptions/MergeIntervalsStepDescriptions';
import kWayMergeStepDescriptions from './PatternPanels/StepDescriptions/KWayMergeStepDescriptions';

import twoPointersLineMaps from './PatternPanels/LineMaps/TwoPointersLineMaps';
import subsetLineMaps from './PatternPanels/LineMaps/BacktrackingLineMaps';
import topKElementsLineMaps from './PatternPanels/LineMaps/TopKElementsLineMaps';
import twoDimensionalDPLineMaps from './PatternPanels/LineMaps/TwoDimensionalDPLineMaps';
import preorderTravLineMaps from './PatternPanels/LineMaps/PreorderTravLineMaps';
import postorderTravLineMaps from './PatternPanels/LineMaps/PostorderTravLineMaps';
import mergeIntervalsLineMaps from './PatternPanels/LineMaps/MergeIntervalsLineMaps';
import kWayMergeLineMaps from './PatternPanels/LineMaps/KWayMergeLineMaps';

function PatternPanel() {
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepInfo, setCurrentStepInfo] = useState(null);
  const { patternName } = useParams();

  const selectedPattern = patternList.includes(patternName) ? patternName : patternList[0];
  const languageOptions = [
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' }
  ];

  const handleStepChange = (step) => {
    setCurrentStep(step);

    if (selectedPattern === 'Subsets (Backtracking)') {
      const stepMapping = subsetLineMaps[selectedLanguage] && subsetLineMaps[selectedLanguage][step];
      const stepDesc = subsetStepDescriptions[step];

      setHighlightedLines(stepMapping ? stepMapping.lines : []);
      setCurrentStepInfo(
        stepDesc
          ? { ...stepDesc, step, operation: stepMapping?.operation || 'unknown' }
          : null
      );
    } else if (selectedPattern === 'Sliding Window') {
      const stepMapping = slidingWindowLineMaps[selectedLanguage] && slidingWindowLineMaps[selectedLanguage][step];
      const stepDesc = slidingWindowStepDescriptions[step];

      setHighlightedLines(stepMapping ? stepMapping.lines : []);
      setCurrentStepInfo(
        stepDesc
          ? { ...stepDesc, step, operation: stepMapping?.operation || 'unknown' }
          : null
      );
    } else if (selectedPattern === 'Two Pointers') {
      const stepMapping = twoPointersLineMaps[selectedLanguage] && twoPointersLineMaps[selectedLanguage][step];
      const stepDesc = twoPointersStepDescriptions[step];

      setHighlightedLines(stepMapping ? stepMapping.lines : []);
      setCurrentStepInfo(
        stepDesc
          ? { ...stepDesc, step, operation: stepMapping?.operation || 'unknown' }
          : null
      );
    } else if (selectedPattern === 'Top K Elements (Heap)') {
      const stepMapping = topKElementsLineMaps[selectedLanguage] && topKElementsLineMaps[selectedLanguage][step];
      const stepDesc = topKElementsStepDescriptions[step];

      setHighlightedLines(stepMapping ? stepMapping.lines : []);
      setCurrentStepInfo(
        stepDesc
          ? { ...stepDesc, step, operation: stepMapping?.operation || 'unknown'}
          : null
      );
    } else if (selectedPattern === '2-Dimension DP') {
      const stepMapping = twoDimensionalDPLineMaps[selectedLanguage] && twoDimensionalDPLineMaps[selectedLanguage][step];
      const stepDesc = twoDimensionalDPStepDescriptions[step];

      setHighlightedLines(stepMapping ? stepMapping.lines : []);
      setCurrentStepInfo(
        stepDesc
          ? { ...stepDesc, step, operation: stepMapping?.operation || 'unknown'}
          : null
      );
    } else if (selectedPattern === 'Preorder Traversal (DFS)') {
      const stepMapping = preorderTravLineMaps[selectedLanguage] && preorderTravLineMaps[selectedLanguage][step];
      const stepDesc = preorderTravStepDescriptions[step];

      setHighlightedLines(stepMapping ? stepMapping.lines : []);
      setCurrentStepInfo(
        stepDesc
          ? { ...stepDesc, step, operation: stepMapping?.operation || 'unknown'}
          : null
      );
    } else if (selectedPattern === 'Postorder Traversal (DFS)') {
      const stepMapping = postorderTravLineMaps[selectedLanguage] && postorderTravLineMaps[selectedLanguage][step];
      const stepDesc = postorderTravStepDescriptions[step];

      setHighlightedLines(stepMapping ? stepMapping.lines : []);
      setCurrentStepInfo(
        stepDesc
          ? { ...stepDesc, step, operation: stepMapping?.operation || 'unknown'}
          : null
      );
    } else if (selectedPattern === 'Merge Intervals') {
      const stepMapping = mergeIntervalsLineMaps[selectedLanguage] && mergeIntervalsLineMaps[selectedLanguage][step];
      const stepDesc = mergeIntervalsStepDescriptions[step];

      setHighlightedLines(stepMapping ? stepMapping.lines : []);
      setCurrentStepInfo(
        stepDesc
          ? { ...stepDesc, step, operation: stepMapping?.operation || 'unknown'}
          : null
      );
    } else if (selectedPattern === 'K-way Merge') {
      const stepMapping = kWayMergeLineMaps[selectedLanguage] && kWayMergeLineMaps[selectedLanguage][step];
      const stepDesc = kWayMergeStepDescriptions[step];

      setHighlightedLines(stepMapping ? stepMapping.lines : []);
      setCurrentStepInfo(
        stepDesc
          ? { ...stepDesc, step, operation: stepMapping?.operation || 'unknown'}
          : null
      );
    }
  };

  const resetHighlighting = () => {
    setHighlightedLines([]);
    setCurrentStep(0);
    setCurrentStepInfo(null);
  };

  return (
    <div>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
            padding: '0 2rem'
          }}>
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              style={{
                background: '#23243a',
                color: '#fff',
                border: '1px solid #a120ff',
                borderRadius: 8,
                padding: '0.5rem 1.2rem',
                fontWeight: 600,
                fontSize: 16,
                outline: 'none',
                boxShadow: '0 2px 8px rgba(161, 32, 255, 0.2)'
              }}>
              {languageOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '2rem', padding: '0 1rem' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <BoilerplateTabs
                patternName={selectedPattern}
                highlightedLines={highlightedLines}
                selectedLanguage={selectedLanguage}
                currentStepInfo={currentStepInfo}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <VisualizationPanel
                patternName={selectedPattern}
                onStepChange={handleStepChange}
                onReset={resetHighlighting}
                selectedLanguage={selectedLanguage}
                currentStepInfo={currentStepInfo}
              />
            </div>
          </div>
        </div>
      );
}

export default PatternPanel;    