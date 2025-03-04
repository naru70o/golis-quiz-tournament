"use client"

import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./nextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import Logo from "../Logo";

type Option = {
  text: string;
};

type Question = {
  _id: string;
  question: string;
  majorId: string;
  options: Option[];
  correctOptionIndex: number;
  totalPoints: number;
  createdAt: Date;
};

// import { type } from "@testing-library/user-event/dist/type";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOptionIndex
            ? state.points + question.totalPoints
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("case unknown");
  }
}

export default function StartQuiz({ data }: { data: Question[] }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(points);

  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.totalPoints,
    0
  );

  useEffect(
    function () {
      dispatch({ type: "dataRecieved", payload: data });
    },
    [data]
  );

  return (
    <div className="bg-[#33479D] h-screen">
      <div className="flex justify-between items-center">
        <div className="bg-[url('/ramadan-dec.png')] bg-cover bg-center h-60 w-[354px] -translate-x-12"></div>
        <Logo />
      </div>
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          // {status}
        )}
        {status === "active" && (
          <>
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              {/* <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} /> */}

              <p>
                Question <strong>{index + 1}</strong> / {numQuestions}
              </p>

              <p>
                <strong>{points}</strong> / {maxPossiblePoints}
              </p>

              <NextButton
                index={index}
                numQuestions={numQuestions}
                dispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
