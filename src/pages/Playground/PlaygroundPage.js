import React, { useEffect, useState } from "react";
import CodePlayground from "../../components/CodePlayground/CodePlayground";
import { useDispatch } from "react-redux";
import { getRandomExercise, resetState } from "../../store/exercise/actions";
import Head from "../../components/Head";

export default function Playground() {
  const initialState = `// write here 
  `;
  const [code, set_code] = useState(initialState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRandomExercise());
  }, [dispatch]);
  return (
    <div>
      <Head page={"Playground"} />
      <CodePlayground
        initialState={initialState}
        code={code}
        set_code={set_code}
        neededAction={getRandomExercise}
        resetState={resetState}
      />
    </div>
  );
}
