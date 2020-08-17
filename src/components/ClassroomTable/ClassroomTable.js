import React from "react";
import { setNewExercise } from "../../store/exercise/actions";
import { useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

export default function ClassroomTable(params) {
  const { exercises, socket, room, user, setSelected } = params;
  const dispatch = useDispatch();
  return (
    <div>
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
                        id: id,
                        exercise: ex,
                        room: room,
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
    </div>
  );
}
