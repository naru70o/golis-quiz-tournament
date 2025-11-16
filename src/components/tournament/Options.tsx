"use client";
import useStoreState from "@/hooks/useStoreState";
import { newAnswer } from "@/state/quizSlice";
import { useState } from "react";

const optionIdentifier = (index: number) => {
  if (index === 0) {
    return "A";
  } else if (index === 1) {
    return "B";
  } else if (index === 2) {
    return "C";
  } else if (index === 3) {
    return "D";
  }
};

function Options() {
  const { questions, dispatch, answer, index: questionIndex } = useStoreState();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasAnswered = answer !== null;
  console.log(
    "answer ...",
    `here is the index ${questionIndex}`,
    questions[questionIndex]?.options
  );
  return (
    <div className="grid grid-cols-2 gap-y-9 gap-x-32 mb-[3.2rem] container max-w-7xl mx-auto -translate-y-[20%]">
      {questions[questionIndex]?.options &&
        questions[questionIndex].options.map((option, optionIndex) => {
          return (
            <button
              className={`bg-[#FBE726] text-black min-w-[300px] min-h-[108px] rounded-3xl relative  ${
                hasAnswered
                  ? optionIndex === questions[questionIndex].correctOptionIndex
                    ? "bg-green-500 "
                    : selectedIndex === optionIndex
                    ? "bg-red-500 animate-pulse"
                    : ""
                  : ""
              }
            `}
              key={option._id}
              disabled={hasAnswered}
              onClick={() => {
                setSelectedIndex(optionIndex);
                dispatch(newAnswer(optionIndex));
              }}
            >
              <div className="absolute flex items-center justify-center top-0 left-0 text-white text-center text-5xl font-bold bg-[#33479D] h-full w-[20%] rounded-3xl border-4 border-[#FBE726]">
                <div className="">{optionIdentifier(optionIndex)}</div>
              </div>
              <div className="text-3xl text-center font-bold ml-[25%]">
                {option.text}
              </div>
            </button>
          );
        })}
    </div>
  );
}

export default Options;
