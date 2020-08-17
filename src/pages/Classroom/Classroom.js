import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
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
  const [roomMembers, setRoomMembers] = useState([]);
  console.log(roomMembers);

  socket = io(apiUrl);

  const setSuccess = () => {
    console.log(` ${user.name} is done`);
  };

  const setTeacherExample = () => {
    console.log(`Teachers solution`);
  };

  const userObject = {
    id: user.id,
    name: user.name,
    room: `The classroom of ${params.name}`,
  };

  useEffect(() => {
    dispatch(getAllExercises());
    if (user.accountType === "teacher") {
      socket.emit("delete previous room", userObject.room);
    }
  }, []);

  useEffect(() => {
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
                <p key={id}>{member.name}</p>
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
                <p key={id}>{member.name}</p>
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
      return <h1>Log in to join a classroom</h1>;
    }
  }
}
