import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";

import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { equal } from "../equal";
import { useDispatch, useSelector } from "react-redux";
import {
  getRandomExercise,
  sendMistakeStatus,
  sendErrorStatus,
  sendSuccessStatus,
  deleteStatuses,
} from "../../store/exercise/actions";
import { selectExercise, selectMessages } from "../../store/exercise/selectors";
import Loading from "../Loading";

export default function CodePlayground() {
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  const messages = useSelector(selectMessages);
  console.log(messages);
  console.log(exercise);

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

  const runCode = (testCase, id) => {
    let submits = [];
    const givenValues = testCase.given;
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
      if (!equal(submits, JSON.parse(testCase.result))) {
        dispatch(sendMistakeStatus(submits, JSON.parse(testCase.result)));
      } else {
        dispatch(sendSuccessStatus(id + 1));
      }
    } catch (error) {
      console.log(error);
      dispatch(sendErrorStatus(error));
    }
  };

  const runAllCases = () => {
    exercise.testCases.forEach((testCase, id) => {
      runCode(testCase, id);
    });
  };

  return !exercise.description ? (
    <Loading />
  ) : (
    <div className="container-fluid">
      <div className="row editor-row">
        <div className="col-sm">
          <h3>{exercise.description}</h3>
          <h5>{exercise.explanation}</h5>
          <div className="example">
            {exercise.testCases.map((p, id) => {
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
            value={exercise.testCases[0].given}
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
              dispatch(deleteStatuses());
              runAllCases();
            }}
          >
            Submit code
          </button>
          <button
            onClick={() => {
              dispatch(deleteStatuses());
              runCode(exercise.testCases[0], 0);
            }}
          >
            Run this test case
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          {messages.length !== 0 &&
            messages.map((m, id) => {
              return <p key={id}>{m}</p>;
            })}
        </div>
      </div>
    </div>
  );
}
