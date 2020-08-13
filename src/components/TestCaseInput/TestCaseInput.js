import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function TestCaseInput(props) {
  const [given, setGiven] = useState("");
  const [result, setResult] = useState("");
  const [givenError, setGivenError] = useState(false);
  const [resultError, setResultError] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <>
      <br></br>
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
      <Form.Label>Expected Result</Form.Label>
      <Form.Control
        value={result}
        onChange={(event) => setResult(event.target.value)}
        type="text"
        placeholder="Enter a result"
        required
      />
      {!ready ? (
        <Button
          disabled={!given || !result}
          className="mt-3 mb-2"
          onClick={() => {
            try {
              const stuff = given.split("\n");
              console.log("stuff", stuff);
              const check = stuff.filter((things) => {
                return things[things.length - 1] === ";";
              });
              console.log("check", check);
              console.log();
              if (stuff.length > check.length) {
                setGivenError(true);
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
            }
            try {
              const hey = JSON.parse(`${result}`);
              if (Array.isArray(hey)) {
                console.log("it's an array");
                setResultError(false);
              }
              console.log({ given, result });
            } catch (error) {
              setResultError(true);
            }

            setReady(true);
          }}
        >
          Check Test Case
        </Button>
      ) : (
        <Form.Text className="text">Ready!</Form.Text>
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
