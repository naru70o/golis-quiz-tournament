import { starQuiz } from "@/state/quizSlice";
import { AppDispatch } from "@/state/store";
import { Dispatch } from "@reduxjs/toolkit";

function StartScreen({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: AppDispatch;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-2">
        Welcome to The Gollis Ramadan Quiz!
      </h2>
      <h3 className="mb-4">{numQuestions} questions for this major</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch(starQuiz())}
      >
        Let&apos;s start
      </button>
    </div>
  );
}

export default StartScreen;
