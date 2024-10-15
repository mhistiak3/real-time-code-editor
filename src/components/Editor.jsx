import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState, useCallback } from "react";
import Output from "./Output";
import { executeCode } from "../api";
import { ACTIONS } from "../../Actions";
import { debounce } from "lodash";

const EditorComponent = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const editorValueRef = useRef(""); // Ref to store the current editor value without causing re-renders
  const [value, setValue] = useState(""); // State for debounced value (for updates)
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const language = "javascript";

  // Debounce code change event to limit unnecessary re-renders and emissions
  const debouncedEmitCodeChange = useCallback(
    debounce((code) => {
      onCodeChange(code);
      if (socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
      }
    }, 500),
    [socketRef, roomId]
  );

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorChange = (newValue) => {
    editorValueRef.current = newValue;
    debouncedEmitCodeChange(newValue);
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.SYNC_CODE, ({ code }) => {
        if (code) {
          setValue(code);
          editorValueRef.current = code;
        }
      });
      const handleCodeChange = ({ code }) => {
        if (code !== null && code !== editorValueRef.current) {
          setValue(code);

          editorValueRef.current = code;
        }
      };

      socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

      return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
      };
    }
  }, [socketRef.current, roomId]);

  return (
    <div className="editor-container">
      <div className="editor-section">
        <Editor
          options={{
            minimap: { enabled: false },
          }}
          height="80vh"
          theme="vs-dark"
          language={language}
          defaultValue={value}
          onMount={onMount}
          value={value}
          onChange={handleEditorChange} // Use ref-based change handler
        />
      </div>
      <button className="run-button" onClick={runCode} disabled={isLoading}>
        {isLoading ? "🧑‍💻 Running..." : "🧑‍💻 Run Code"}
      </button>
      <Output output={output} isError={isError} />
    </div>
  );
};

export default EditorComponent;
