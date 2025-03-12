"use client"
import { Pencil, Trash } from "lucide-react";
import DeleteModal from "./deleteModal";
import UpdateQuestionForm from "./updateQuestionFom";

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

const optionIdentifier = (index: number) => {
  if (index === 0) {
    return "A";
  } else if (index === 1) {
    return "B";
  } else if (index === 2) {
    return "C";
  } else if (index === 3) {
    return "D";
  }
}

export default function QuestionsList({question}: {question: Question[]}) {
  const questions = question;

  function UpdateshowModal(elementIid: string) {
    const modal = document.getElementById(elementIid) as HTMLDialogElement;
    modal.showModal();
  }

  function DeleteShowModal(elementIid: string) {
    const modal = document.getElementById(elementIid) as HTMLDialogElement;
    modal.showModal();
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {questions.map((question) => (
        <div
          tabIndex={0}
          className="collapse collapse-arrow border-base-300 bg-base-200 border"
          key={question._id}
        >
          <div className="collapse-title text-xl font-medium">
            {question.question.charAt(0).toUpperCase() +
              question.question.slice(1)}{" "}
            ?
          </div>

          <div className="collapse-content mt-1">
            <div className="flex gap-2 items-center justify-end mb-2">
              <div
                className="Lucide-icon"
                onClick={() => UpdateshowModal(question._id)}
              >
                <Pencil className="" />
                <UpdateQuestionForm question={question} />
              </div>
              <div
                className="Lucide-icon"
                onClick={() => DeleteShowModal(question._id + "_delete")}
              >
                <Trash />
                <DeleteModal message="Question" id={question._id} />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-y-3 gap-x-3 grid-cols-1">
              {question.options.map((option: Option, index: number) => (
                <div
                  className="px-4 py-2 bg-accent text-accent-content rounded-xl relative overflow-clip w-full"
                  key={option.text}
                >
                  <div className="absolute rounded-xl bg-success text-success-content px-4 py-2 left-0 top-0 h-full text-3xl font-bold">
                    {optionIdentifier(index)}
                  </div>
                  <div className="ml-12 text-3xl font-bold">{option.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
