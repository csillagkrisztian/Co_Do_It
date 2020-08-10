import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";

export default function CodePlayground() {
  const exercise = {
    id: 1,
    description: "//add the two variables together",
    starterCode: `
    const a = 4; 
    const b = 5;
    `,
  };
  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  const [code, set_code] = useState("");
  const [evalState, setEvalState] = useState({
    status: "idle",
  });

  const runCode = () => {
    const logs = [];

    const codeToRun = `
    const console = {log(arg) {logs.push(arg);}};
    const document = null;
    const location = null;
    const window = null;
    ${code}
    `;

    console.log(codeToRun);

    try {
      eval(codeToRun);
      setEvalState({
        status: "success",
        logs,
      });
    } catch (error) {
      setEvalState({
        status: "error",
        logs,
        error: error.message,
      });
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          Hello! This is the code playground! Anything you write here on the
          right will be shown on the bottom
        </div>
        <div className="col-sm code-editor">
          <div className="editor-header">Playground</div>
          <CodeMirror
            value={code}
            options={{
              mode: "javascript",
              ...codeMirrorOptions,
            }}
            onBeforeChange={(editor, data, js) => {
              /*editor.markText(
                { line: 1, ch: 0 },
                { line: 4, ch: 0 },
                { readOnly: true }
              );*/
              set_code(js);
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          {evalState.logs &&
            evalState.logs.map((log, id) => {
              return <div key={id + 1}>{log}</div>;
            })}
        </div>
        <div className="col-sm">
          <button
            onClick={() => {
              runCode();
            }}
          >
            Submit code
          </button>
        </div>
      </div>
    </div>
  );
}
