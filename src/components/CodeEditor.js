import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { Container, Header, EditorWrapper } from '../styles/codeEditorStyles';
import AnimatedCodeIcon from '../icons/AnimatedCodeIcon';
import { supportedLanguages, languageSettings } from '../config/languages';
import { htmlErrorHandler} from '../utils/errorHandlers';

// Ace Editor modes/themes
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const CodeEditor = ({ value, onChange, currentLanguage, onLanguageChange }) => {
  const [editorError, setEditorError] = useState(null);

  useEffect(() => {
    const validateCode = () => {
      if (!value) {
        setEditorError(null);
        return;
      }
      let error = null;
      switch (currentLanguage) {
        case 'html':
          error = htmlErrorHandler(value);
          break;
        default:
          error = null;
      }
      setEditorError(error);
    };

    const debounce = setTimeout(validateCode, 400);
    return () => clearTimeout(debounce);
  }, [value, currentLanguage]);

  return (
    <Container>
      <Header>
        <AnimatedCodeIcon onLanguageChange={onLanguageChange} />
      </Header>
      <EditorWrapper>
        <AceEditor
          mode={supportedLanguages[currentLanguage]?.mode || 'html'}
          theme="monokai"
          value={value}
          onChange={onChange}
          name="code-editor"
          width="100%"
          height="400px"
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            ...languageSettings[currentLanguage],
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: languageSettings[currentLanguage]?.tabSize || 2,
          }}
          annotations={
            editorError
              ? [
                  {
                    row: 0,
                    column: 0,
                    text: editorError,
                    type: 'error',
                  },
                ]
              : []
          }
        />
      </EditorWrapper>
    </Container>
  );
};

export default CodeEditor;