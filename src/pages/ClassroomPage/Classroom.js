import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { getAllExercises } from "../../store/classRoom/actions";
import { selectExercises } from "../../store/classRoom/selectors";
import { setNewExercise, resetState } from "../../store/exercise/actions";

import CodePlayground from "../../components/CodePlayground/CodePlayground";
import { selectExercise } from "../../store/exercise/selectors";
import ClassroomTable from "../../components/ClassroomTable/ClassroomTable";
import { titleStyle } from "../../style/titleStyle";
import { profileIconStyle } from "../../style/profileIconStyle";
let socket;

export default function Classroom() {
  const dispatch = useDispatch();
  const params = useParams() || "nothing";
  const user = useSelector(selectUser);
  const exercises = useSelector(selectExercises);
  const specificExercise = useSelector(selectExercise);
  const initialCode = "";
  const initialEditorName = "Your Editor";

  const [editorName, setEditorName] = useState(initialEditorName);
  const [code, setCode] = useState(initialCode);
  const [selected, setSelected] = useState(false);
  const [doneMembers, setDoneMembers] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);
  console.log(doneMembers);

  socket = io(apiUrl);

  const userObject = {
    imageUrl: user.imageUrl,
    id: user.id,
    name: user.name,
    room: `The classroom of ${params.name}`,
  };

  const { imageUrl, id, name, room } = userObject;

  const setSuccess = () => {
    socket.emit("success", userObject, code);
  };

  const setTeacherExample = () => {
    console.log(`Teachers solution`);
  };

  const clearAllDoneMembers = () => {
    socket.emit("clear all finished", room);
    setSelected(false);
    dispatch(resetState());
  };

  const findDoneMember = (member) =>
    doneMembers.find((done) => done.name === member.name);

  useEffect(() => {
    dispatch(getAllExercises());
    if (user.accountType === "teacher") {
      socket.emit("delete previous room", room);
      socket.emit("delete finished students", room);
    }
  }, []);

  useEffect(() => {
    socket.on("new exercise", () => {
      setSelected(false);
      dispatch(resetState());
    });

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
      socket.emit("i want exercise", room);
    }

    return () => {
      socket.off();
    };
  });

  useEffect(() => {
    if (!name) {
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
            <h2
              style={titleStyle}
              className="mt-2"
            >{`Welcome ${params.name}! Ready to teach?`}</h2>
          </Row>
          <Row>
            <Col className="col-2">
              {roomMembers.map((member, id) => (
                <p
                  key={id}
                  onClick={() => {
                    if (findDoneMember(member)) {
                      const doneMember = findDoneMember(member);
                      setCode(doneMember.code);
                      setEditorName(`The code of ${member.name}`);
                    } else {
                      console.log("nope");
                    }
                  }}
                >
                  <img
                    src={member.imageUrl}
                    style={{ ...profileIconStyle, marginRight: "1rem" }}
                  ></img>
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
                  room={room}
                  setSelected={setSelected}
                  user={user}
                />
              ) : (
                <CodePlayground
                  initialState={initialCode}
                  code={code}
                  set_code={setCode}
                  neededFunction={setTeacherExample}
                  editorName={editorName}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => {
                  clearAllDoneMembers();
                }}
              >
                Start a new class
              </Button>
            </Col>
          </Row>
        </Container>
      );
    }
    case "student": {
      return findDoneMember(userObject) ? (
        <h1>CONGRATULATIONS! WHOOHOO!</h1>
      ) : (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h1 className="mt-2">{`The Classroom of ${params.name}`}</h1>
          </Row>
          <Row>
            <Col className="col-2">
              {roomMembers.map((member, id) => (
                <p key={id}>
                  {member.name}
                  {findDoneMember(member) ? "٭" : ""}
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
                <CodePlayground
                  code={code}
                  set_code={setCode}
                  neededFunction={setSuccess}
                  editorName={editorName}
                />
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
              <h1
                style={{
                  ...titleStyle,
                  textAlign: "center",
                  marginBottom: "4rem",
                }}
              >
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
                <Button className="btn-lg">Login</Button>
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
                <Button className="btn-lg">Sign Up</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}
