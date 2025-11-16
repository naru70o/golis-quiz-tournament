import useStoreState from "@/hooks/useStoreState";
import { finishQuiz, nextQuestion } from "@/state/quizSlice";

function NextButton({
  numQuestions,
}: {
  numQuestions: number; // total number of questions
}) {
  const { dispatch, index, answer } = useStoreState();
  if (answer === null) return null;

  return (
    <div className="flex justify-center">
      {index < numQuestions - 1 ? (
        <button
          className="btn w-fit px-6"
          onClick={() => dispatch(nextQuestion())}
        >
          Next
        </button>
      ) : index === numQuestions - 1 ? (
        <button
          className="btn w-fit px-6"
          onClick={() => dispatch(finishQuiz())}
        >
          finish
        </button>
      ) : null}
    </div>
  );
}

export default NextButton;
