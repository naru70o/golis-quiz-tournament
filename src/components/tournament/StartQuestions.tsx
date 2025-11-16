"use client";

import { useAppDispatch } from "@/hooks/hooks";
import useStoreState from "@/hooks/useStoreState";
import { dataRecieved } from "@/state/quizSlice";
import { useEffect } from "react";
import Logo from "../Logo";
import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Loader from "./Loader";
import Main from "./Main";
import NextButton from "./nextButton";
import Question from "./Question";
import StartScreen from "./StartScreen";

// Typing
export type Option = {
  _id: string;
  text: string;
};

export type Question = {
  _id: string;
  question: string;
  majorId: string;
  options: Option[];
  correctOptionIndex: number;
  totalPoints: number;
  createdAt: Date;
};

export type InitialStateType = {
  questions: Question[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
};

export default function StartQuiz({ data }: { data: Question[] }) {
  const { questions, status, points, highscore, index } = useStoreState();

  const dispatch = useAppDispatch();

  console.log("the status is:", status, questions);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev: number, cur: Question) => prev + cur.totalPoints,
    0
  );

  useEffect(() => {
    dispatch(dataRecieved(data));
  }, [data, dispatch]);

  return (
    <div className="h-screen bg-backgroundHome bg-cover bg-center bg-no-repeat">
      <div className="flex justify-between items-center"></div>
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question />
            {/* <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} /> */}

            <NextButton numQuestions={numQuestions} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            question={questions}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
