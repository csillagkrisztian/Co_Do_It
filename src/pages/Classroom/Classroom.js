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

  const userObject = {
    id: user.id,
    name: user.name,
    room: `The classroom of ${params.name}`,
  };

  useEffect(() => {
    dispatch(getAllExercises());
  }, []);

  useEffect(() => {
    socket.on("refresh", (members) => {
      setRoomMembers(members);
    });
    socket.on("exercise", (exercise) => {
      dispatch(setNewExercise(exercise));
      setSelected(true);
    });
    if (!selected) {
      socket.emit("i want exercise", userObject.room);
    }
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
            <Table bordered hover variant="dark">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Exercise</th>
                  <th style={{ width: "8rem" }}>created by</th>
                </tr>
              </thead>
              <tbody>
                {exercises.length
                  ? exercises.map((ex, id) => {
                      return (
                        <tr
                          onClick={() => {
                            dispatch(setNewExercise(ex));
                            setSelected(true);
                            socket.emit("add exercise", {
                              id: userObject.id,
                              exercise: ex,
                              room: userObject.room,
                            });
                          }}
                          key={id + 1}
                        >
                          <td>{ex.id}</td>
                          <td>{ex.description}</td>
                          <td>
                            {ex.userId === 1
                              ? "admin"
                              : ex.userId === user.id
                              ? "you"
                              : "teacher"}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          ) : (
            <CodePlayground />
          )}
        </Col>
      </Row>
    </Container>
  );
}
