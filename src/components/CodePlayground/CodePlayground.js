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
  sendMistakeStatus,
  sendErrorStatus,
  sendSuccessStatus,
  deleteStatuses,
  exerciseCompleted,
} from "../../store/exercise/actions";
import {
  selectExercise,
  selectMessages,
  selectIsDone,
} from "../../store/exercise/selectors";
import Loading from "../Loading";
import ClickSuccessButton from "../ClickSuccessButton";
import { Container, Row, Col } from "react-bootstrap";
import { titleStyle } from "../../style/titleStyle";
import buttontest from "../../images/buttontest.png";
import computerLeg from "../../images/computerlegs.png";

export default function CodePlayground(props) {
  const {
    code,
    set_code,
    initialState,
    neededAction,
    neededFunction,
    resetState,
    editorName,
  } = props;
  const dispatch = useDispatch();
  const isDone = useSelector(selectIsDone);
  const exercise = useSelector(selectExercise);
  const messages = useSelector(selectMessages);

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

  const [testCase, set_testCase] = useState("");

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
    <Container fluid>
      <Row className="row ">
        <Col className="col-sm ">
          <div className="column-desc">
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
          <div>
            {messages.length !== 0 &&
              messages.map((m, id) => {
                return m[0] === "F" ? (
                  <h6
                    className="message"
                    style={{
                      ...titleStyle,
                      background: "#B3001B",
                      color: "#BBDEF0",
                      margin: "0",
                    }}
                    key={id}
                  >
                    {m}
                  </h6>
                ) : (
                  <h6
                    className="message"
                    style={{
                      ...titleStyle,
                      background: "#00A6A6",
                      color: "#BBDEF0",
                      margin: "0",
                    }}
                    key={id}
                  >
                    {m}
                  </h6>
                );
              })}
          </div>
          {isDone && (
            <>
              <h4 style={titleStyle}>
                Congratulations! You passed all the tests!
              </h4>
              <ClickSuccessButton
                buttonText={"Click Me To SUBMIT!"}
                resetState={resetState}
                neededAction={neededAction}
                neededFunction={neededFunction}
                initialState={initialState}
              />
            </>
          )}
        </Col>
        <Col className="col-sm-7">
          <div className="code-editor">
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
            <div className="editor-header">{editorName}</div>
            <CodeMirror
              className="code-text-editor"
              value={code}
              options={{
                mode: "javascript",
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, js) => {
                set_code(js);
              }}
            />
            <button
              className="run-one-button"
              style={{ backgroundImage: buttontest }}
              onClick={() => {
                dispatch(deleteStatuses());
                runCode(testCase, exercise.testCases.indexOf(testCase));
              }}
            >
              Run One Case
            </button>
            <button
              className="run-all-button"
              onClick={() => {
                dispatch(deleteStatuses());
                runAllCases();
              }}
            >
              Run All Cases
            </button>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="col-sm-5"></div>
      </Row>
    </Container>
  );
}
