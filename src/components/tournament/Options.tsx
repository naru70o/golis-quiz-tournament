"use client";
import useStoreState from "@/hooks/useStoreState";
import { newAnswer } from "@/state/quizSlice";
import { useEffect, useState } from "react";

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

  // When the current question changes, clear the local selectedIndex
  useEffect(() => {
    setSelectedIndex(null);
  }, [questionIndex]);

  // If the store has an answer (e.g. preloaded state), reflect it locally
  useEffect(() => {
    if (answer !== null) {
      setSelectedIndex(answer);
    }
  }, [answer]);

  return (
    <div className="space-y-4 mb-10">
      {questions[questionIndex]?.options &&
        questions[questionIndex].options.map((option, optionIndex) => {
          const isSelected = selectedIndex === optionIndex;
          const isCorrect =
            optionIndex === questions[questionIndex].correctOptionIndex;

          // Determine styling based on answer state
          let buttonStyle, circleStyle;

          if (hasAnswered) {
            if (isCorrect) {
              // Correct answer - green
              buttonStyle = "bg-[#FFECDB] text-black shadow-lg";
              circleStyle = "bg-white text-green-500";
            } else if (isSelected && !isCorrect) {
              // Selected but incorrect - red
              buttonStyle = "bg-[#FE909D] text-white shadow-lg";
              circleStyle = "bg-[#FF475D] text-white";
            } else {
              // Not selected and not correct
              buttonStyle = "bg-white text-black";
              circleStyle = "bg-[#FFECDB] text-[#FF475D]";
            }
          } else {
            // Not answered yet
            buttonStyle = isSelected
              ? "bg-[#ff99cc] text-white shadow-lg"
              : "bg-white text-black hover:shadow-md";
            circleStyle = isSelected
              ? "bg-white text-[#ff99cc]"
              : "bg-[#ffccdd] text-[#ff6699]";
          }

          return (
            <button
              key={option._id}
              disabled={hasAnswered}
              onClick={() => {
                setSelectedIndex(optionIndex);
                dispatch(newAnswer(optionIndex));
              }}
              className={`w-full max-w-4xl mx-auto p-5 rounded-lg font-medium text-lg transition-all flex items-center gap-4 ${buttonStyle}`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full font-bold flex items-center justify-center ${circleStyle}`}
              >
                {optionIdentifier(optionIndex)}
              </div>
              <span className="text-left">{option.text}</span>
            </button>
          );
        })}
    </div>
  );
}

export default Options;
