"use client";

import { updateQuestion} from "@/app/actions/action";
import React, { useActionState, useRef, useState } from "react";

type Option = {
  text: string;
};

type Question = {
  _id: string;
  question: string;
  majorId: string;
  options: Option[];
  correctOptionIndex: number;
  totalPoints: number;
  createdAt: Date;
};

export default function UpdateQuestionForm({ question }: { question: Question }) {
  const {
    _id,
    question: questionText,
    majorId,
    options,
    correctOptionIndex,
    totalPoints,
    createdAt,
  } = question;

  console.log("here is the question so take a look at it", question);

  const [data, action, isPending] = useActionState(updateQuestion, undefined);
  const [majorIdInput, setMajorIdInput] = useState(majorId);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [formData, setFormData] = useState({
    question: questionText,
    majorId: majorId,
    options: options.map((option) => option.text),
    correctOptionIndex: correctOptionIndex,
    totalPoints: totalPoints,
    createdAt: createdAt,
  });

  return (
    <>
      <dialog id={_id} className="modal modal-bottom sm:modal-middle">
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
            {/* Close button */}

            <div className="font-medium mt-4">
              Here is your input to update the question
            </div>

            <div className="flex flex-col gap-2 w-full mt-6">
              {/* Question Input Fields */}
              <div className="flex flex-col gap-2">
                <input
                  name="question"
                  type="text"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="Question"
                  className="input input-bordered w-full"
                />

                {/* Hidden Question ID */}
                <input type="hidden" name="questionId" value={_id} />

                <input
                  name="correctOptionIndex"
                  type="text"
                  value={formData.correctOptionIndex}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      correctOptionIndex: Number(e.target.value),
                    })
                  }
                  placeholder="Correct Option Index"
                  className="input input-bordered w-full"
                />
                <input
                  name="totalPoints"
                  type="text"
                  value={formData.totalPoints}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalPoints: Number(e.target.value),
                    })
                  }
                  placeholder="Total Points"
                  className="input input-bordered w-full"
                />
                <input
                  name="majorId"
                  value={majorIdInput}
                  onChange={(e) => setMajorIdInput(e.target.value)}
                  type="hidden"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Options Input Fields */}
              <div className="grid lg:grid-cols-2 gap-2 grid-cols-1 mt-4">
                {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    name={`option${index + 1}`}
                    type="text"
                    value={formData.options[index] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        options: formData.options.map((option, i) =>
                          i === index ? e.target.value : option
                        ),
                      })
                    }
                    placeholder={`Option ${index + 1}`}
                    className="input input-bordered w-full"
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending}
                onClick={() => {
                  if (!data?.success) return;
                  dialogRef.current?.close();
                }}
              >
                {isPending ? "Updating..." : "Update Question"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
