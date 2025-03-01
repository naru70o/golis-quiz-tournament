// import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question({ questions, dispatch, answer }) {
  //   const { questions, index } = useQuiz();
  //   const question = questions.at(index);

  console.log(questions);

  return (
    <div>
      <h4 className="question">{questions.question}</h4>
      <Options questions={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
