import { useEffect } from "react";
import { ActionKind, ActionType } from "./StartQuestions";
// import { useQuiz } from "../contexts/QuizContext";

function Timer({
  dispatch,
  secondsRemaining,
}: {
  dispatch: React.Dispatch<ActionType>;
  secondsRemaining: number;
}) {
  //   const { dispatch, secondsRemaining } = useQuiz();

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: ActionKind.tick });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
