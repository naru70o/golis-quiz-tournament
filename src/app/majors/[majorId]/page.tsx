import Logo from "@/components/Logo";
import QuestionForm from "@/components/questionForm";
import QuestionsList from "@/components/questionsList";
import connectiondb from "@/lib/db/connectiondb";
import Major from "@/lib/schemas/model.major";
import Question from "@/lib/schemas/model.question";
import OpenModel from "@/ui/openModel";
import mongoose from "mongoose";
import { unstable_cache } from "next/cache";
import React from "react";

type Major = {
  _id: string;
  name: string;
};

const questionsMajor = unstable_cache(
  async (_id: string) => {
    const questions = (await Question.find({ majorId: _id }).lean()).map(
      (question) => ({
        _id: (question._id as mongoose.Types.ObjectId).toString(),
        question: question.question,
        majorId: (question.majorId as mongoose.Types.ObjectId).toString(),
        options: question.options.map((option) => ({
          text: option.text,
        })),
        correctOptionIndex: question.correctOptionIndex,
        totalPoints: question.totalPoints,
        createdAt: question.createdAt,
      })
    );

    return questions;
  },
  ["questions"],
  {
    revalidate: 1000,
    tags: ["questions"],
  }
);

export default async function page({
  params,
}: {
  params: Promise<{ majorId: string }>;
}) {
  const { majorId } = await params;
  await connectiondb();
  const major = (await Major.find({ _id: majorId }).lean()).map((major) => ({
    _id: (major._id as mongoose.Types.ObjectId).toString(),
    name: major.name,
  }));
  const [{ name, _id }] = major || [{} as Major];

  // fetching Questions for this major
  const questions = await questionsMajor(_id);

  console.log(questions);
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-12 px-4">
      <Logo />
      <h1 className="text-2xl font-bold mt-4">
        Major {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <div className="self-end">
        <OpenModel
          modelid={"question_form_model"}
          modelName={"new question"}
          dialog={<QuestionForm majorId={_id} />}
        />
      </div>
      <div className="w-full mt-4">
        {questions.length === 0 ? (
          <div>No Questions Found</div>
        ) : (
          <QuestionsList question={questions} />
        )}
      </div>
    </div>
  );
}

// 
