"use client";
import { newQuestion } from "@/app/actions/action";
import { useActionState, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function QuestionForm({ majorId }: { majorId: string }) {
  const [data, action, isPending] = useActionState(newQuestion, undefined);
  const [majorIdinput, setMajorIdInput] = useState(majorId);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (data) {
      if (data.success) {
        toast.success(data.message);
        dialogRef.current?.close();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    }
  }, [data]);

  return (
    <>
      <dialog id="question_form_model" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <form method="dialog" className="flex gap-2 justify-end">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              x
            </button>
          </form>

          <form
            action={action}
            className="flex flex-col justify-center items-center"
          >
            <div className="font-medium mt-4">
              Here is your input to add a new question
            </div>
            <div className="flex flex-col gap-2 w-full mt-6">
              {/* Question */}
              <div className="flex flex-col gap-2">
                <input
                  name="question"
                  type="text"
                  placeholder="question"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="correctOptionIndex"
                  type="text"
                  placeholder="correct option 0, 1, 2, or 3"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="totalPoints"
                  type="text"
                  placeholder="Points"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="majorId"
                  value={majorIdinput}
                  onChange={(e) => setMajorIdInput(e.target.value)}
                  type="hidden"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-2 grid-cols-1 mt-4">
                {/* option 1 */}
                <input
                  name="optionOne"
                  type="text"
                  placeholder="option One index (0)"
                  className="input input-bordered w-full"
                />
                {/* option 2 */}
                <input
                  name="optionTwo"
                  type="text"
                  placeholder="option Two index (1)"
                  className="input input-bordered w-full"
                />
                {/* option 3 */}
                <input
                  name="optionThree"
                  type="text"
                  placeholder="option index (2)"
                  className="input input-bordered w-full"
                />
                {/* option four */}
                <input
                  name="optionFour"
                  type="text"
                  placeholder="option Four index (3)"
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-primary" disabled={isPending}>
                add
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
