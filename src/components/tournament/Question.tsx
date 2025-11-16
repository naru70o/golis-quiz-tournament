// import { useQuiz } from "../contexts/QuizContext";
import useStoreState from "@/hooks/useStoreState";
import Options from "./Options";

function Question() {
  const { questions, index } = useStoreState();
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-black">
          Question {index + 1}/{questions.length}
        </h1>
      </div>

      <div className="text-center mb-12 max-w-2xl mx-auto">
        <p className="text-2xl text-black font-bold leading-relaxed text-pretty">
          {questions[index].question}
        </p>
        <div className="h-1 w-20 bg-[#ff9966] mx-auto mt-6"></div>
      </div>

      <Options />
    </>
  );
}

export default Question;
