import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";

export default function CodePlayground() {
  const exercise = {
    id: 1,
    description: "Figure out the pattern! ",
    explanation:
      "Write a function and/or just log it on the console so that if we use these variables we get the expected result:",
    pattern: [
      { given: "const a = 5; const b = 5;", result: [10] },
      { given: "const a = 12; const b = 52;", result: [64] },
    ],
  };

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  const [code, set_code] = useState(`// write here 
  `);
  const [evalState, setEvalState] = useState({
    status: "idle",
  });

  console.log(evalState);

  let submits = [];
  let messages = [];

  const runCode = (pattern, id) => {
    const givenValues = pattern.given;
    const codeToRun = `
const console = {log(arg) {submits=[arg];}};
const document = null;
const location = null;
const window = null;
${givenValues}
${code}
`;

    try {
      eval(codeToRun);
      if (JSON.stringify(submits) !== JSON.stringify(pattern.result)) {
        messages.push(
          `We expected the result of test ${id + 1} to be: ${
            pattern.result
          }, but instead it was: ${submits}`
        );
        setEvalState({
          status: "error",
          submits: submits,
          messages,
        });
      } else {
        setEvalState({
          status: "success",
          messages,
        });
      }
    } catch (error) {
      console.log(error);
      setEvalState({
        status: "error",
        submits: submits,
        error: error.message,
      });
    }
  };

  const runAllCases = () => {
    // Compares the evaluated code with the result

    exercise.pattern.forEach((p, id) => {
      runCode(p, id);
    });
  };

  return (
    <div className="container page">
      <div className="row editor-row">
        <div className="col-sm">
          <h3>{exercise.description}</h3>
          <h5>{exercise.explanation}</h5>
          <div className="example">
            {exercise.pattern.map((p, id) => {
              return (
                <p key={id + 1}>
                  {p.given} the result should be {"=>"} {p.result}
                </p>
              );
            })}
          </div>
        </div>
        <div className="col-sm-7 code-editor">
          <div className="editor-header">Given code</div>
          <CodeMirror
            className="code-text-editor"
            value={exercise.pattern[0].given}
            options={{
              mode: "javascript",
              ...codeMirrorOptions,
            }}
          />
          <div className="editor-header">Your Editor</div>
          <CodeMirror
            className="code-text-editor"
            value={code}
            options={{
              mode: "javascript",
              ...codeMirrorOptions,
            }}
            onKeyPress={(editor, event) => {}}
            onBeforeChange={(editor, data, js) => {
              set_code(js);
            }}
          />
          <button
            onClick={() => {
              runAllCases();
            }}
          >
            Submit code
          </button>
          <button
            onClick={() => {
              runCode(exercise.pattern[1], 2);
            }}
          >
            Run this test case
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
}
