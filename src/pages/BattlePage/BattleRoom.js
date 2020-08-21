import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import io from "socket.io-client";
import CodePlayground from "../../components/CodePlayground/CodePlayground";
import { apiUrl } from "../../config/constants";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { useParams } from "react-router-dom";
import { selectExercise } from "../../store/exercise/selectors";
import {
  getRandomExercise,
  setNewExercise,
  resetState,
} from "../../store/exercise/actions";
import { profileIconStyle } from "../../style/profileIconStyle";
import { titleStyle } from "../../style/titleStyle";
import congratulations from "../../images/Congratulations.gif";
import OnlineFeed from "../../components/ClassroomComponents/OnlineFeed";
import { imageCenter } from "../../style/imageCenter";

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

  /**
   * Some Socket IO event listeners and emitters
   *
   */
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!ready && params.name === name && !randomExercise) {
        dispatch(getRandomExercise());
      }
    }
    return () => {
      mounted = false;
      socket.emit("unjoined", userObject, (members) => {});
      socket.off();
    };
  }, [user]);

  useEffect(() => {
    let mounted = true;

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
    if (mounted) {
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
    }

    return () => {
      mounted = false;
    };
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!name) {
        return;
      }
      socket.emit("joined", userObject, (members) => {});
    }

    return () => {
      mounted = false;
      socket.emit("unjoined", userObject, (members) => {});
      socket.off();
    };
  }, [user]);

  return user.accountType === "guest" ? (
    <h1 style={titleStyle}>Please log in to Battle</h1>
  ) : roomMembers.length < 2 ? (
    <h1 style={titleStyle}>Waiting for a challenger</h1>
  ) : !roomMembers.find((member) => member.name === params.name) ? (
    <h1 style={titleStyle}>The owner is not in the room!</h1>
  ) : (
    <Container fluid>
      <Row>
        <OnlineFeed roomMembers={roomMembers} />
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
          ) : (
            ""
          )}
          {winner && (
            <div>
              <h1 style={titleStyle}>{winner.name} is the winner!</h1>
              <img style={imageCenter} src={congratulations} />
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
