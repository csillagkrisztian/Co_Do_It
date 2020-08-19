import React, { useState, useEffect, cloneElement } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import io from "socket.io-client";
import CodePlayground from "../../components/CodePlayground/CodePlayground";
import { apiUrl } from "../../config/constants";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserNames } from "../../store/user/selectors";
import { useParams } from "react-router-dom";
import { selectExercise } from "../../store/exercise/selectors";
import {
  getRandomExercise,
  setNewExercise,
  resetState,
} from "../../store/exercise/actions";
import { profileIconStyle } from "../../style/profileIconStyle";
import { getUserNames } from "../../store/user/actions";

let socket;

export default function BattleRoom() {
  const initialCode = `//write here`;
  const editorName = "Your Code Editor";

  const params = useParams() || "nothing";
  const dispatch = useDispatch();
  const [winner, setWinner] = useState();
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState(initialCode);
  const [roomMembers, setRoomMembers] = useState([]);
  const randomExercise = useSelector(selectExercise);
  const user = useSelector(selectUser);

  socket = io(apiUrl);

  const userObject = {
    imageUrl: user.imageUrl,
    id: user.id,
    name: user.name,
    room: `Battle room of ${params.name}`,
  };

  const { name, room } = userObject;

  const sendWinner = (user) => {
    socket.emit("winner", user);
  };

  const resetGame = (room) => {
    socket.emit("reset game", room);
  };

  useEffect(() => {
    if (!ready && params.name === name && !randomExercise) {
      dispatch(getRandomExercise());
    }
  }, [user]);

  useEffect(() => {
    if (randomExercise && !ready) {
      socket.emit("add exercise", {
        id: user.id,
        room: room,
        exercise: randomExercise,
      });
    }
    if (!randomExercise) {
      socket.emit("i want exercise", room);
    }
    socket.on("refresh", (members) => {
      setRoomMembers(members);
    });
    socket.on("exercise", (exercise) => {
      dispatch(setNewExercise(exercise));
      setReady(true);
    });

    socket.on("set winner", (winner) => {
      setWinner(winner);
    });

    socket.on("set play again", (room) => {
      dispatch(resetState());

      setWinner(false);
      setReady(false);
      if (params.name === name) {
        dispatch(getRandomExercise());
      }
    });
    return () => {
      socket.emit("unjoined", userObject, () => {});
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

  return user.accountType === "guest" ? (
    <h1>Please log in to Battle</h1>
  ) : roomMembers.length < 2 ? (
    <h1>Waiting for a challenger</h1>
  ) : (
    <Container fluid>
      <Row>
        <Col className="col-2">
          {roomMembers.map((member, id) => (
            <p key={id + 1}>
              <img
                src={member.imageUrl}
                style={{ ...profileIconStyle, marginRight: "1rem" }}
              ></img>
              {member.name}
            </p>
          ))}
        </Col>
        <Col>
          {ready &&
          !winner &&
          roomMembers.find((member) => member.name === params.name) ? (
            <CodePlayground
              initialState={initialCode}
              code={code}
              set_code={setCode}
              neededFunction={() => {
                sendWinner(userObject);
              }}
              editorName={editorName}
            />
          ) : !roomMembers.find((member) => member.name === params.name) ? (
            <h1>The owner is not in the room!</h1>
          ) : (
            ""
          )}
          {winner && (
            <div>
              <h1>{winner.name} is the winner!</h1>
              {params.name === user.name && (
                <Button
                  onClick={() => {
                    resetGame(room);
                  }}
                >
                  Play again?
                </Button>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
