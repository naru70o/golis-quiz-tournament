import { ActionKind, ActionType, Question } from "./StartQuestions";

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

function Options({
  questions,
  dispatch,
  answer,
}: {
  questions: Question;
  dispatch: React.Dispatch<ActionType>;
  answer: number | null;
}) {
  // const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;
  console.log("answer ...", questions.options);
  return (
    <div className="grid grid-cols-2 gap-y-9 gap-x-32 mb-[3.2rem] container max-w-7xl mx-auto -translate-y-[20%]">
      {questions.options &&
        questions.options.map((option, index) => {
          console.log("option ...", index);
          return (
            <button
              className={`bg-[#FBE726] text-black min-w-[300px] min-h-[108px] rounded-3xl relative ${
                hasAnswered
                  ? index === questions.correctOptionIndex
                    ? "bg-green-500"
                    : "bg-red-500"
                  : ""
              }
            `}
              key={option._id}
              disabled={hasAnswered}
              onClick={() =>
                dispatch({ type: ActionKind.newAnswer, payload: index })
              }
            >
              <div className="absolute flex items-center justify-center top-0 lef-0 text-white text-center text-5xl font-bold bg-[#33479D] h-full w-[20%] rounded-3xl border-4 border-[#FBE726]">
                <div className="">{optionIdentifier(index)}</div>
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
