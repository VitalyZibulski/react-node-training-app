export const reBuildTimes = (log, prevExerciseLog = null) => {
  return log.times.map((item, index) =>({
    ...item,
    prevWeight: prevExerciseLog ? prevExerciseLog.times[index].weight : 0,
    prevRepeat: prevExerciseLog ? prevExerciseLog.times[index].repeat : 0,
  }));
};