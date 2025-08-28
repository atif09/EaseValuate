import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import BoilerplateTabs from './BoilerplateTabs';
import VisualizationPanel from './VisualizationPanel';
import {panelContainerStyle,leftPanelStyle,rightPanelStyle} from '../../styles/patternPanelStyles';
import patternList from './patternList'
import slidingWindowStepDescription from './PatternPanel/StepDescriptions/SlidingWindowStepDescriptions';



const subsetStepDescriptions = {
  1: {
    title: "Start Backtracking",
    description: "Begin at root with empty subset, check base case",
    operation: "start"
  },
  2: {
    title: "Include 1",
    description: "Add element 1 to current subset",
    operation: "include"
  },
  3: {
    title: "Include 2", 
    description: "Add element 2 to subset [1]",
    operation: "include"
  },
  4: {
    title: "Include 3",
    description: "Add element 3 to subset [1,2]",
    operation: "include"
  },
  5: {
    title: "Save [1,2,3]",
    description: "Base case: save complete subset [1,2,3]",
    operation: "save"
  },
  6: {
    title: "Backtrack & Exclude 3",
    description: "Remove 3 from [1,2,3], try exclude path",
    operation: "backtrack_exclude"
  },
  7: {
    title: "Save [1,2]",
    description: "Base case: save subset [1,2]",
    operation: "save"
  },
  8: {
    title: "Backtrack & Exclude 2",
    description: "Remove 2 from [1,2], try exclude path",
    operation: "backtrack_exclude"
  },
  9: {
    title: "Include 3",
    description: "Add element 3 to subset [1]",
    operation: "include"
  },
  10: {
    title: "Save [1,3]",
    description: "Base case: save subset [1,3]",
    operation: "save"
  },
  11: {
    title: "Backtrack & Exclude 3",
    description: "Remove 3 from [1,3], try exclude path",
    operation: "backtrack_exclude"
  },
  12: {
    title: "Save [1]",
    description: "Base case: save subset [1]",
    operation: "save"
  },
  13: {
    title: "Backtrack & Exclude 1",
    description: "Remove 1 from [1], try exclude path",
    operation: "backtrack_exclude"
  },
  14: {
    title: "Include 2",
    description: "Add element 2 to empty subset",
    operation: "include"
  },
  15: {
    title: "Include 3",
    description: "Add element 3 to subset [2]",
    operation: "include"
  },
  16: {
    title: "Save [2,3]",
    description: "Base case: save subset [2,3]",
    operation: "save"
  }
};



const subsetLineMaps = {
  python: {
    1: { lines: [2], operation: "start" },           
    2: { lines: [5], operation: "include" },        
    3: { lines: [5], operation: "include" },        
    4: { lines: [5], operation: "include" },       
    5: { lines: [3, 4], operation: "save" },         
    6: { lines: [7, 9], operation: "backtrack_exclude" }, 
    7: { lines: [3, 4], operation: "save" },         
    8: { lines: [7, 9], operation: "backtrack_exclude" }, 
    9: { lines: [5], operation: "include" },         
    10: { lines: [3, 4], operation: "save" },        
    11: { lines: [7, 9], operation: "backtrack_exclude" }, 
    12: { lines: [3, 4], operation: "save" },        
    13: { lines: [7, 9], operation: "backtrack_exclude" }, 
    14: { lines: [5], operation: "include" },        
    15: { lines: [5], operation: "include" },        
    16: { lines: [3, 4], operation: "save" }         
  },
  cpp: {
    1: { lines: [3], operation: "start" },          
    2: { lines: [5], operation: "include" },         
    3: { lines: [5], operation: "include" },         
    4: { lines: [5], operation: "include" },        
    5: { lines: [4, 5], operation: "save" },        
    6: { lines: [9, 11], operation: "backtrack_exclude" }, 
    7: { lines: [4, 5], operation: "save" },         
    8: { lines: [9, 11], operation: "backtrack_exclude" }, 
    9: { lines: [7], operation: "include" },        
    10: { lines: [4, 5], operation: "save" },       
    11: { lines: [9, 11], operation: "backtrack_exclude" }, 
    12: { lines: [4, 5], operation: "save" },       
    13: { lines: [9, 11], operation: "backtrack_exclude" }, 
    14: { lines: [7], operation: "include" },       
    16: { lines: [4, 5], operation: "save" }         
  },
  java: {
    1: { lines: [3], operation: "start" },          
    2: { lines: [7], operation: "include" },        
    3: { lines: [7], operation: "include" },         
    4: { lines: [7], operation: "include" },         
    5: { lines: [4, 5], operation: "save" },         
    6: { lines: [9, 11], operation: "backtrack_exclude" },
    7: { lines: [4, 5], operation: "save" },         
    8: { lines: [9, 11], operation: "backtrack_exclude" }, 
    9: { lines: [7], operation: "include" },         
    10: { lines: [4, 5], operation: "save" },        
    11: { lines: [9, 11], operation: "backtrack_exclude" }, 
    12: { lines: [4, 5], operation: "save" },        
    13: { lines: [9, 11], operation: "backtrack_exclude" }, 
    14: { lines: [7], operation: "include" },        
    15: { lines: [7], operation: "include" },        
    16: { lines: [4, 5], operation: "save" }         
  }
};

const slidingWindowLineMaps = {
  python: {
    1: { lines: [2, 3], operation: "initialize" },   
    2: { lines: [5, 11], operation: "expand" },    
    3: { lines: [5, 11], operation: "expand" },   
    4: { lines: [5, 11], operation: "expand" },    
    5: { lines: [5,6,7,8], operation: "shrink" },        
    6: { lines: [9,10], operation: "expand" },   
    7: { lines: [10], operation: "duplicate_found" } 
  },
  cpp: {
    1: { lines: [2, 3], operation: "initialize" },  
    2: { lines: [4,12], operation: "expand" }, 
    3: { lines: [4, 12], operation: "expand" }, 
    4: { lines: [4, 12], operation: "expand" }, 
    5: { lines: [4,5, 6, 7], operation: "shrink" },        
    6: { lines: [4, 9, 10, 11], operation: "expand" }, 
    7: { lines: [ 10], operation: "duplicate_found" } 
  },
  java: {
    1: { lines: [2, 3], operation: "initialize" },   
    2: { lines: [5, 12], operation: "expand" }, 
    3: { lines: [5, 12], operation: "expand" }, 
    4: { lines: [5, 12], operation: "expand" },
    5: { lines: [5,6,7,8], operation: "shrink" },        
    6: { lines: [5,9,10,11], operation: "expand" }, 
    7: { lines: [10], operation: "duplicate_found" } 
  }
};

const twoPointersStepDescriptions = {
  1: {
    title: "Initialize Pointers",
    description: "LEFT=0, RIGHT=3, sum=17 > target=9, move RIGHT--",
    operation: "check_sum"
  },
  2: {
    title: "Move Right Pointer",
    description: "LEFT=0, RIGHT=2, sum=13 > target=9, move RIGHT--",
    operation: "check_sum"
  },
  3: {
    title: "Target Found",
    description: "LEFT=0, RIGHT=1, sum=9 == target=9, return indices",
    operation: "found"
  }
};

const twoPointersLineMaps = {
  python: {
    1: { lines: [2, 3, 4, 5], operation: "check_sum" },    
    2: { lines: [3, 4, 5], operation: "check_sum" },        
    3: { lines: [3, 8, 9], operation: "found" }             
  },
  cpp: {
    1: { lines: [2, 3, 4, 5], operation: "check_sum" },    
    2: { lines: [3, 4, 5], operation: "check_sum" },       
    3: { lines: [3, 8, 9], operation: "found" }            
  },
  java: {
    1: { lines: [2, 3, 4, 5], operation: "check_sum" },     
    2: { lines: [3, 4, 5], operation: "check_sum" },       
    3: { lines: [3, 8, 9], operation: "found" }            
  }
};


function PatternPanel() {
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepInfo, setCurrentStepInfo] = useState(null);
  const { patternName } = useParams();

  const selectedPattern = patternList.includes(patternName) ? patternName : patternList[0];
  const languageOptions = [
    {value: 'python', label: 'Python'},
    {value: 'cpp', label: 'C++'},
    {value: 'java', label: 'Java'}
  ];

  const handleStepChange = (step) => {
    setCurrentStep(step);
    if (selectedPattern === 'Subsets (Backtracking)') {
      const stepMapping = subsetLineMaps[selectedLanguage] && subsetLineMaps[selectedLanguage][step];
      const stepDesc = subsetStepDescriptions[step];
      
      if (stepMapping) {
        setHighlightedLines(stepMapping.lines);
      } else {
        setHighlightedLines([]);
      }
      
      if (stepDesc) {
        setCurrentStepInfo({
          ...stepDesc,
          step: step,
          operation: stepMapping?.operation || 'unknown'
        });
      }
    } else if (selectedPattern === 'Sliding Window') {
      const stepMapping = slidingWindowLineMaps[selectedLanguage] && slidingWindowLineMaps[selectedLanguage][step];
      const stepDesc = slidingWindowStepDescriptions[step];
      
      if (stepMapping) {
        setHighlightedLines(stepMapping.lines);
      } else {
        setHighlightedLines([]);
      }
      
      if (stepDesc) {
        setCurrentStepInfo({
          ...stepDesc,
          step: step,
          operation: stepMapping?.operation || 'unknown'
        });
      }
    } else if (selectedPattern === 'Two Pointers') {
      const stepMapping = twoPointersLineMaps[selectedLanguage] && twoPointersLineMaps[selectedLanguage][step];
      const stepDesc = twoPointersStepDescriptions[step];

      if(stepMapping) {
        setHighlightedLines(stepMapping.lines);
      } else {
        setHighlightedLines([]);
      }

      if(stepDesc) {
        setCurrentStepInfo({
          ...stepDesc,
          step: step,
          operation: stepMapping?.operation || 'unknown'
        });
    }
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
      
      <div style={{display: 'flex', gap: '2rem', padding: '0 1rem'}}>
        <div style={{flex: 1, minWidth: 0}}>
          <BoilerplateTabs
            patternName={selectedPattern}
            highlightedLines={highlightedLines}
            selectedLanguage={selectedLanguage}
            currentStepInfo={currentStepInfo}
          />
        </div>
        <div style={{flex: 1, minWidth: 0}}>
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

