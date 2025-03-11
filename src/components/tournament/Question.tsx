// import { useQuiz } from "../contexts/QuizContext";
import Image from "next/image";
import Options from "./Options";
import { ActionType, Question as QuestionType } from "./StartQuestions";

function Question({
  questions,
  dispatch,
  answer,
}: {
  questions: QuestionType;
  dispatch: React.Dispatch<ActionType>;
  answer: number | null;
}) {
  return (
    <>
      <div className="flex items-center bg-[#FBE726] min-h-36 max-w-[634px] relative rounded-3xl overflow-clip mx-auto -translate-y-[100%] pr-3">
        <div className="absolute top-0 lef-0 bg-[#33479D] h-full w-[20%] rounded-3xl border-4 border-[#FBE726]">
          <Image src="/yellow-question-mark.png" alt="question-mark" fill />
        </div>
        <div className="text-3xl self-center w-full font-bold text-black text-center ml-[25%]">
          {questions.question} ?
        </div>
      </div>
      <Options questions={questions} dispatch={dispatch} answer={answer} />
    </>
  );
}

export default Question;
