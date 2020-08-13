import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function TestCaseInput(props) {
  const [given, setGiven] = useState("");
  const [result, setResult] = useState("");
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
      <Button
        className="mt-3 mb-2"
        onClick={() => {
          console.log({ given, result });
        }}
      >
        Check Test Case
      </Button>
    </>
  );
}
