import React from "react";
import { ActionType, ActionKind } from "./StartQuestions";

function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: {
  dispatch: React.Dispatch<ActionType>;
  answer: number | null;
  index: number; // current question index
  numQuestions: number; // total number of questions
}) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn px-8"
        onClick={() => dispatch({ type: ActionKind.nextQuestion })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn px-8"
        onClick={() => dispatch({ type: ActionKind.finish })}
      >
        finish
      </button>
    );
}

export default NextButton;
