"use client"

import { useEffect, useReducer } from "react";
import Logo from "../Logo";
import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Loader from "./Loader";
import Main from "./Main";
import NextButton from "./nextButton";
import Question from "./Question";
import StartScreen from "./StartScreen";

type Option = {
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

// Typing
export type InitialStateType = {
  questions: Question[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
};

export enum ActionKind {
  dataRecieved = "dataRecieved",
  dataFailed = "dataFailed",
  start = "start",
  newAnswer = "newAnswer",
  nextQuestion = "nextQuestion",
  finish = "finish",
  restart = "restart",
  tick = "tick",
}

export type ActionType =
  | { type: ActionKind.dataRecieved; payload: Question[] }
  | { type: ActionKind.dataFailed }
  | { type: ActionKind.start }
  | { type: ActionKind.newAnswer; payload: number | null }
  | { type: ActionKind.nextQuestion }
  | { type: ActionKind.finish }
  | { type: ActionKind.restart }
  | { type: ActionKind.tick };

const initialState: InitialStateType = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(
  state: InitialStateType,
  action: ActionType
): InitialStateType {
  switch (action.type) {
    case ActionKind.dataRecieved:
      return { ...state, questions: action.payload, status: "ready" };

    case ActionKind.dataFailed:
      return { ...state, status: "error" };

    case ActionKind.start:
      return {
        ...state,
        status: "active",
        secondsRemaining: SECS_PER_QUESTION,
      };

    case ActionKind.newAnswer:
      const question = state.questions[state.index];
      if (!question) return state;

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOptionIndex
            ? state.points + question.totalPoints
            : state.points,
      };

    case ActionKind.nextQuestion:
      return { ...state, index: state.index + 1, answer: null };

    case ActionKind.finish:
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.highscore, state.points),
      };

    case ActionKind.restart:
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    case ActionKind.tick:
      if (state.secondsRemaining === null || state.secondsRemaining <= 0) {
        return { ...state, status: "finished", secondsRemaining: 0 };
      }
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };

    default:
      return state;
  }
}

export default function StartQuiz({ data }: { data: Question[] }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);


  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev: number, cur: Question) => prev + cur.totalPoints,
    0
  );

  useEffect(() => {
    dispatch({ type: ActionKind.dataRecieved, payload: data });
  }, [data]);

  return (
    <div className="bg-[#33479D] h-screen ">
      <div className="flex justify-between items-center">
        <div className="bg-[url('/ramadan-dec.png')] bg-cover bg-center h-60 w-[354px] -translate-x-12"></div>
        <div className="h-26 w-26 bg-[#FBE726] rounded-full -translate-x-[35%] ">
          <Logo />
        </div>
      </div>
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
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
