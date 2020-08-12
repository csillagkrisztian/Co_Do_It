export const selectExercise = (state) => {
  return state.exercise.exercise;
};

export const selectMessages = (state) => {
  return state.exercise.status.messages;
};
