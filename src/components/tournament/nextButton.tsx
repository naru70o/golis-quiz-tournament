import useStoreState from "@/hooks/useStoreState";
import { finishQuiz, nextQuestion } from "@/state/quizSlice";

function NextButton({
  numQuestions,
}: {
  numQuestions: number; // total number of questions
}) {
  const {dispatch,index,answer} = useStoreState();
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn px-8"
        onClick={() => dispatch(nextQuestion())}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn px-8"
        onClick={() => dispatch(finishQuiz())}
      >
        finish
      </button>
    );
}

export default NextButton;
