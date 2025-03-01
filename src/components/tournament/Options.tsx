// import { useQuiz } from "../contexts/QuizContext";

function Options({ questions, dispatch, answer }) {
  // const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;
  console.log("answer ...", questions.options)
  return (
    <div className="flex flex-col gap-[1.2rem] mb-[3.2rem]">
      {questions.options &&
        questions.options.map((option, index) => {
          console.log("option ...", index)
        return  (
        <button
            className={`text-white btn w-full text-left ${index === answer ? "transform translate-x-[2rem]" : ""}  ${
              hasAnswered
                ? index === questions.correctOptionIndex
                  ? "bg-[var(--color-theme)] border-2 border-[var(--color-theme)] text-[var(--color-light)]"
                  : "bg-[var(--color-accent)] border-2 border-[var(--color-accent)] text-[var(--color-darkest)]"
                : ""
            }
            `}
            key={option._id}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option.text}
          </button>)}
        )}
    </div>
  );
}

export default Options;
