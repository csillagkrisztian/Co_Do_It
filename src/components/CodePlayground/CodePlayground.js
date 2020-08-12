import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";

import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { equal } from "../equal";
import { useDispatch } from "react-redux";
import { getRandomExercise } from "../../store/exercise/actions";

export default function CodePlayground() {
  const exercise = {
    id: 1,
    description: "Figure out the pattern! ",
    explanation:
      "Write a function and/or just log it on the console so that if we use these variables we get the expected result:",
    pattern: [
      { given: "const a = 5; const b = 5;", result: "[10]" },
      { given: "const a = 12; const b = 52;", result: "[64]" },
    ],
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomExercise());
  }, [dispatch]);

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
    messages: [],
  });

  console.log(evalState);

  const runCode = (pattern, id) => {
    let submits = [];
    const givenValues = pattern.given;
    const codeToRun = `
const console = {log(arg) {submits=[...submits,arg];}};
const document = null;
const location = null;
const window = null;
${givenValues}
${code}
`;

    try {
      eval(codeToRun);
      if (!equal(submits, JSON.parse(pattern.result))) {
        setEvalState({
          status: "error",
        });
      } else {
        setEvalState({
          status: "success",
        });
      }
    } catch (error) {
      console.log(error);
      setEvalState({
        status: "error",
        error: [`error occured : ${error.message}`],
      });
    }
  };

  const runAllCases = () => {
    exercise.pattern.forEach((p, id) => {
      runCode(p, id);
    });
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
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
            onKeyPress={(editor, event) => {
              editor.showHint();
            }}
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
              runCode(exercise.pattern[0], 0);
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
