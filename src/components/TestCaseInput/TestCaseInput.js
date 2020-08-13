import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function TestCaseInput(props) {
  const [given, setGiven] = useState("");
  const [result, setResult] = useState("");
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
      <Form.Label>Expected Result</Form.Label>
      <Form.Control
        value={given}
        onChange={(event) => setResult(event.target.value)}
        type="text"
        placeholder="Enter a result"
        required
      />
    </>
  );
}
