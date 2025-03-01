// import { useQuiz } from "../contexts/QuizContext";

function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="mb-16 grid justify-between gap-[1.2rem] grid-cols-[auto_auto] text-[1.8rem] text-[var(--color-medium)]">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
