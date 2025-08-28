import { starQuiz } from "@/state/quizSlice";
import { AppDispatch } from "@/state/store";
import { ArrowRight } from "lucide-react";

function StartScreen({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: AppDispatch;
}) {
  return (
    <div className='flex flex-col items-end justify-end text-gray-900 p-20'>
      <h2 className='text-9xl font-bold mb-2'>
        <span className='text-[200px] font-semibold'>Q</span>uizzler{" "}
      </h2>
      <h3
        className='flex gap-1 items-center text-3xl mb-4 font-semibold select-none cursor-pointer hover:text-gray-600 transition-all'
        onClick={() => dispatch(starQuiz())}
      >
        Let&apos;s start the quiz{" "}
        <span>
          <ArrowRight />
        </span>
      </h3>
    </div>
  );
}

export default StartScreen;
