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
  exerciseCompleted,
  resetState,
} from "../../store/exercise/actions";
import {
  selectExercise,
  selectMessages,
  selectIsDone,
} from "../../store/exercise/selectors";
import Loading from "../Loading";

export default function CodePlayground() {
  const dispatch = useDispatch();
  const isDone = useSelector(selectIsDone);
  const exercise = useSelector(selectExercise);
  const messages = useSelector(selectMessages);
  console.log(messages);

  useEffect(() => {
    dispatch(getRandomExercise());
  }, [dispatch]);

  useEffect(() => {
    if (exercise) {
      set_testCase(exercise.testCases[0]);
    }
  }, [exercise]);

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  const initialState = `// write here 
  `;

  const [code, set_code] = useState(initialState);
  const [testCase, set_testCase] = useState("");

  console.log(testCase);

  const runCode = (testCase, id) => {
    let submits = [];
    const givenValues = testCase.given;
    console.log(givenValues);
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

  const checker = messages.length > 1 && messages.map((m) => m[0] === "P");
  if (checker.length > 0 && checker.every((check) => check === true)) {
    dispatch(exerciseCompleted());
  }

  return !exercise ? (
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
          <div className="editor-header">
            Given code{" "}
            <select
              onChange={(e) => {
                set_testCase(exercise.testCases[e.target.selectedIndex]);
              }}
            >
              {exercise.testCases.map((tc, id) => {
                return <option key={id + 1}>{`Test Case ${id + 1}`}</option>;
              })}
            </select>
          </div>
          <CodeMirror
            className="code-text-editor"
            value={testCase.given}
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
              runCode(testCase, exercise.testCases.indexOf(testCase));
            }}
          >
            Run this test case
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          {isDone && (
            <p>
              Congratulations! You passed all the tests!
              <button
                onClick={() => {
                  set_code(initialState);
                  dispatch(resetState());
                  dispatch(getRandomExercise());
                }}
              >
                Click here for a new challenge!
              </button>
            </p>
          )}
        </div>
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
