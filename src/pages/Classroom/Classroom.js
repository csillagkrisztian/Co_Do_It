import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { getAllExercises } from "../../store/classRoom/actions";
import { selectExercises } from "../../store/classRoom/selectors";
import { setNewExercise } from "../../store/exercise/actions";

import CodePlayground from "../../components/CodePlayground/CodePlayground";
import { selectExercise } from "../../store/exercise/selectors";
import ClassroomTable from "../../components/ClassroomTable/ClassroomTable";
let socket;

export default function Classroom() {
  const dispatch = useDispatch();
  const params = useParams() || "nothing";
  const user = useSelector(selectUser);
  const exercises = useSelector(selectExercises);
  const specificExercise = useSelector(selectExercise);

  const [selected, setSelected] = useState(false);
  const [doneMembers, setDoneMembers] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);
  console.log(doneMembers);

  socket = io(apiUrl);

  const userObject = {
    id: user.id,
    name: user.name,
    room: `The classroom of ${params.name}`,
  };

  const setSuccess = () => {
    socket.emit("success", userObject);
  };

  const setTeacherExample = () => {
    console.log(`Teachers solution`);
  };

  useEffect(() => {
    dispatch(getAllExercises());
    if (user.accountType === "teacher") {
      socket.emit("delete previous room", userObject.room);
      socket.emit("delete finished students", userObject.room);
    }
  }, []);

  useEffect(() => {
    socket.on("star refresh", (done) => {
      setDoneMembers(done);
    });

    socket.on("refresh", (members) => {
      setRoomMembers(members);
    });
    socket.on("exercise", (exercise) => {
      dispatch(setNewExercise(exercise));
      setSelected(true);
    });
    if (!specificExercise) {
      socket.emit("i want exercise", userObject.room);
    }

    return () => {
      socket.off();
    };
  });

  useEffect(() => {
    if (!userObject.name) {
      return;
    }
    socket.emit("joined", userObject, (members) => {});

    return () => {
      socket.emit("unjoined", userObject, (members) => {});
      socket.off();
    };
  }, [user]);

  switch (user.accountType) {
    case "teacher": {
      return (
        <Container fluid>
          <Row className="justify-content-center">
            <h2 className="mt-2">{`Welcome ${params.name}! Ready to teach?`}</h2>
          </Row>
          <Row>
            <Col className="col-2">
              {roomMembers.map((member, id) => (
                <p key={id}>
                  {member.name}
                  {doneMembers.find((done) => done.name === member.name)
                    ? "٭"
                    : ""}
                </p>
              ))}
            </Col>
            <Col>
              {!selected ? (
                <ClassroomTable
                  exercises={exercises}
                  socket={socket}
                  id={user.id}
                  room={userObject.room}
                  setSelected={setSelected}
                  user={user}
                />
              ) : (
                <CodePlayground neededFunction={setTeacherExample} />
              )}
            </Col>
          </Row>
        </Container>
      );
    }
    case "student": {
      return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h1 className="mt-2">{`The Classroom of ${params.name}`}</h1>
          </Row>
          <Row>
            <Col className="col-2">
              {roomMembers.map((member, id) => (
                <p key={id}>
                  {member.name}
                  {doneMembers.find((done) => done.name === member.name)
                    ? "٭"
                    : ""}
                </p>
              ))}
            </Col>
            <Col>
              {!selected ? (
                <p style={{ textAlign: "center" }}>
                  Your teacher is selecting material... Is this what exitement
                  is like?
                </p>
              ) : (
                <CodePlayground neededFunction={setSuccess} />
              )}
            </Col>
          </Row>
        </Container>
      );
    }
    default: {
      return (
        <Container>
          <Row>
            <Col>
              <h1 style={{ textAlign: "center" }}>
                Log in to join a classroom
              </h1>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}
