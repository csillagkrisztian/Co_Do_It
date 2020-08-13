import React, { useState } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import TestCaseInput from "../../components/TestCaseInput/TestCaseInput";

export default function CreateExercise() {
  const [description, setDescription] = useState("");
  const [explanation, setExplanation] = useState("");

  const [inputList, setInputList] = useState([]);
  const [pressedCount, setPressedCount] = useState(2);

  const [isPublic, setIsPublic] = useState(false);

  console.log(inputList);
  console.log(pressedCount);

  return (
    <Container>
      <Row className="justify-content-center">
        <Form as={Col} md={{ span: 5 }} className="mt-5">
          <h1 style={{ textAlign: "center" }}>Create a new Exercise</h1>
          <Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Explanation</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={explanation}
                onChange={(event) => setExplanation(event.target.value)}
                type="text"
                placeholder="Enter name"
                required
              />
            </Form.Group>

            <Form.Label>Do you want to make this public?</Form.Label>
            <Form.Control
              value={isPublic}
              onChange={(event) => setIsPublic(!isPublic)}
              type="checkbox"
              placeholder="isTeacher"
              required
            />
            <Form.Text className="text">
              Others will have a chance to play your exercise! Every
              contribution helps!
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Button
              style={{ marginLeft: "33%" }}
              variant="primary"
              type="submit"
              onClick={() => {
                console.log({ description, explanation, isPublic });
              }}
            >
              Submit Exercise
            </Button>
          </Form.Group>
        </Form>
        <Col></Col>
        <Form as={Col} md={{ span: 5 }} className="mt-5">
          <Form.Group>
            <TestCaseInput id={1} />
            <TestCaseInput id={2} />
            {inputList}
          </Form.Group>
          <Button
            style={{ marginLeft: "33%", marginTop: "2rem" }}
            onClick={() => {
              setPressedCount(pressedCount + 1);
              setInputList(
                inputList.concat(
                  <TestCaseInput key={pressedCount} id={pressedCount + 1} />
                )
              );
            }}
          >
            Add a Test Case
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
