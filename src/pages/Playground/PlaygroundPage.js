import React, { useEffect } from "react";
import CodePlayground from "../../components/CodePlayground/CodePlayground";
import { useDispatch } from "react-redux";
import { getRandomExercise } from "../../store/exercise/actions";

export default function Playground() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRandomExercise());
  }, [dispatch]);
  return (
    <div>
      <CodePlayground />
    </div>
  );
}
