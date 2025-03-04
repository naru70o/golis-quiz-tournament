import { ActionType,ActionKind } from "@/components/tournament/StartQuestions";

function StartScreen({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: React.Dispatch<ActionType>;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-2">
        Welcome to The Golis Ramadan Quiz!
      </h2>
      <h3 className="mb-4">{numQuestions} questions for this major</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionKind.start })}
      >
        Let&apos;s start
      </button>
    </div>
  );
}

export default StartScreen;
