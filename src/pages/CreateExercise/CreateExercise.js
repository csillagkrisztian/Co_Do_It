import React, { useState, useEffect } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import TestCaseInput from "../../components/TestCaseInput/TestCaseInput";
import { useDispatch, useSelector } from "react-redux";
import {
  addExerciseDetails,
  resetExerciseToBe,
  createExercise,
} from "../../store/exerciseToBe/actions";
import { selectTestCases } from "../../store/exerciseToBe/selectors";
import { titleStyle } from "../../style/titleStyle";
import { buttonCenter } from "../../style/buttonCenter";
import { containerBackground } from "../../style/containerBackground";

export default function CreateExercise() {
  const [description, setDescription] = useState("");
  const [explanation, setExplanation] = useState("");

  const [inputList, setInputList] = useState([]);
  const [pressedCount, setPressedCount] = useState(2);

  const [isPublic, setIsPublic] = useState(false);

  const dispatch = useDispatch();
  const testCases = useSelector(selectTestCases);

  useEffect(() => {
    dispatch(resetExerciseToBe);
  }, []);

  return (
    <Container style={{ ...containerBackground, height: "auto" }}>
      <Row className="justify-content-center">
        <Form md={{ span: 5 }} className="mt-5">
          <h1 style={titleStyle}>Create a new Exercise</h1>
          <Form.Group style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                placeholder="Awesome name of your exercise"
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
                placeholder="Your clear and straightforward explanation"
                required
              />
            </Form.Group>

            <Form.Label style={{ textAlign: "center" }}>
              Do you want to make this exercise public?
            </Form.Label>
            <Form.Control
              value={isPublic}
              onChange={(event) => setIsPublic(!isPublic)}
              type="checkbox"
              placeholder="isTeacher"
              required
            />
            <br></br>
            {isPublic && (
              <Form.Text style={{ textAlign: "center" }}>
                Thank you for the exercise, you are awesome!
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            {testCases.length >= 2 && description && explanation && (
              <div style={buttonCenter}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    dispatch(
                      addExerciseDetails(description, explanation, isPublic)
                    );
                    dispatch(createExercise());
                    dispatch(resetExerciseToBe);
                  }}
                >
                  Submit Exercise
                </Button>
              </div>
            )}
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <TestCaseInput id={1} />
        <TestCaseInput id={2} />
        {inputList}
      </Row>
      <Row>
        <Col>
          <div style={buttonCenter}>
            <Button
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}
