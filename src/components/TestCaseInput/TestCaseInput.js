import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTestCase } from "../../store/exerciseToBe/actions";

export default function TestCaseInput(props) {
  const [given, setGiven] = useState("");
  const [result, setResult] = useState("");
  const [givenError, setGivenError] = useState(false);
  const [resultError, setResultError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <h3>Test case {props.id}</h3>
      <Form.Label>Given Variables</Form.Label>

      <Form.Control
        as={"textarea"}
        rows={3}
        value={given}
        onChange={(event) => setGiven(event.target.value)}
        type="text"
        placeholder="Enter an exercise"
        required
      />
      <Form.Text className="text">
        Please put the variables on a separate line with a semicolon (";") at
        the end!
      </Form.Text>
      <br></br>
      <Form.Label>Expected Result</Form.Label>

      <Form.Control
        value={result}
        onChange={(event) => setResult(event.target.value)}
        type="text"
        placeholder="Enter a result"
        required
      />
      <Form.Text className="text">Please put the result in an array!</Form.Text>
      {!ready ? (
        <Button
          disabled={!given || !result}
          className="mt-3 mb-2"
          onClick={() => {
            try {
              const splitGivens = given.split("\n");
              const validGivens = splitGivens.filter((things) => {
                return things[things.length - 1] === ";";
              });
              if (splitGivens.length > validGivens.length) {
                setGivenError(true);
                return;
              } else {
                eval(`
                const console = null;
                const document = null;
                const location = null;
                const window = null;
                ${given}`);
                setGivenError(false);
              }
            } catch (error) {
              setGivenError(true);
              return;
            }
            try {
              const parsedResult = JSON.parse(`${result}`);
              if (Array.isArray(parsedResult)) {
                setResultError(false);
              }
            } catch (error) {
              setResultError(true);
              return;
            }
            setChecked(true);
          }}
        >
          Check Test Case
        </Button>
      ) : (
        <p>Ready!</p>
      )}

      {checked && !resultError && !givenError && given && result && !ready && (
        <>
          <Button
            className="mt-3 mb-2"
            onClick={() => {
              dispatch(addTestCase(given, result));
              setReady(true);
            }}
          >
            Add Test Case
          </Button>
          <p>Your testcase looks good! Press the "Add Test Case" button! </p>
        </>
      )}

      <br></br>
      {givenError &&
        "Are you sure those are valid variables? It needs a ';' at the end!"}
      <br></br>
      {resultError &&
        "Are you sure that is a valid result? It needs to be an array"}
    </>
  );
}
