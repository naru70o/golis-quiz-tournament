"use client";

import { majorSetStatusFinished } from "@/app/actions/action";
import { ActionKind, ActionType, Question } from "./StartQuestions";
import Link from "next/link";

function FinishScreen({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
  question,
}: {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
  dispatch: React.Dispatch<ActionType>;
  question: Question[];
}) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  const majorId = question[0].majorId;

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-3xl font-bold mb-2">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>{" "}
      <p className="text-3xl font-bold mb-2">(Highscore: {highscore} points)</p>
      <Link href={`/majors/${majorId}`}>
        <button
          className="btn px-8"
          onClick={async () => {
            dispatch({ type: ActionKind.restart });
            await majorSetStatusFinished(majorId, points);
            if (typeof window !== "undefined") {
              localStorage.removeItem("state");
            }
          }}
        >
          Restart quiz
        </button>
      </Link>
    </div>
  );
}

export default FinishScreen;
