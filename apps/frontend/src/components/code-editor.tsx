import { useRef } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";

const CodeEditor = ({
  value,
  language,
  onChange,
  onLanguageChange,
}: {
  value: string;
  language: string;
  onChange: (val: string) => void;
  onLanguageChange: (lang: string) => void;
}) => {
  const editorRef = useRef<unknown>(null);

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="bg-[#181f2a] rounded-xl shadow-lg p-0 max-w-3xl mx-auto border border-[#232c3b]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#232c3b]">
        <LanguageSelector language={language} onSelect={onLanguageChange} />
      </div>
      <div className="rounded-b-xl overflow-hidden p-4">
        <Editor
          className="rounded-lg"
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            fontFamily:
              'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            scrollBeyondLastLine: false,
            wordWrap: "on",
            lineNumbers: "on",
            automaticLayout: true,
            theme: "vs-dark",
          }}
          height="350px"
          theme="vs-dark"
          language={language}
          value={value}
          onMount={onMount}
          onChange={(val) => onChange(val || "")}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
