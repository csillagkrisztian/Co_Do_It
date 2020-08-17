import React from "react";

export function onClickPractice(props) {
  return (
    props.check && (
      <p>
        Congratulations! You passed all the tests!
        <button
          onClick={() => {
            set_code(initialState);
            dispatch(resetState());
            dispatch(getRandomExercise());
          }}
        >
          Click here for a new challenge!
        </button>
      </p>
    )
  );
}
