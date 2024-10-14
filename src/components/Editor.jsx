import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import Output from "./Output";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../constants";
import { executeCode } from "../api";



const EditorComponent = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const language = "javascript";

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

  return (
    <div className="editor-container">
      <div className="editor-section">
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          height="80vh"
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
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
