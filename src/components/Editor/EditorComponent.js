import React from 'react';
import AceEditor from 'react-ace';
import { supportedLanguages } from '../../config/languages';
import { EditorWrapper } from '../../styles/codeEditorStyles';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/worker-javascript';

const EditorComponent = ({ 
  value, 
  onChange, 
  currentLanguage, 
  editorError 
}) => (
  <EditorWrapper>
    <AceEditor
      mode={supportedLanguages[currentLanguage].mode}
      theme="monokai"
      onChange={onChange}
      value={value}
      name="code-editor"
      width="100%"
      height="100%"
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      markers={editorError ? [{
        startRow: 0,
        startCol: 0,
        endRow: value.split('\n').length,
        endCol: 0,
        className: 'error-marker',
        type: 'background'
      }] : []}
      annotations={editorError ? [{
        row: 0,
        column: 0,
        text: editorError,
        type: 'error'
      }] : []}
    />
  </EditorWrapper>
);

export default EditorComponent;