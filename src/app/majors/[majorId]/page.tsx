import Logo from "@/components/Logo";
import Navigation from "@/components/navigation";
import QuestionForm from "@/components/questionForm";
import QuestionsList from "@/components/questionsList";
import connectiondb from "@/lib/db/connectiondb";
import Major from "@/lib/schemas/model.major";
import Question from "@/lib/schemas/model.question";
import NotFound from "@/ui/noFound";
import OpenModel from "@/ui/openModel";
import { ArrowRight, Pencil } from "lucide-react";
import mongoose from "mongoose";
import { unstable_cache } from "next/cache";
import Link from "next/link";
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
    <>
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-12 px-4">
        <Navigation />
        <div className="flex flex-col items-center justify-center w-full my-4">
          <h1 className="text-3xl font-bold mb-2">
            Major {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
            <Pencil className="inline-block h-5 w-5 hover:opacity-40 transition-all duration-150 ease-in-out cursor-pointer" />
          </h1>
          <div className="flex items-center gap-2">
            <div className="text-[10px] min-w-9 tracking-widest py-1 px-2 bg-primary text-primary-content rounded-full">
              soon
            </div>
            <div className="text-[10px] tracking-widest py-1 px-2 bg-accent text-accent-content rounded-full">
              60 points
            </div>
            <Link href={`/majors/${_id}/questions`}>
              <div className="text-[10px] tracking-widest py-1 px-2 bg-secondary text-secondary-content rounded-full cursor-pointer hover:underline-offset-1">
                Start{" "}
                <ArrowRight className="inline-block h-2 w-2 hover:opacity-40 transition-all duration-150 ease-in-out cursor-pointer" />
              </div>
            </Link>
          </div>
        </div>
        <div className="self-end">
          <OpenModel
            modelid={"question_form_model"}
            modelName={"new question"}
            dialog={<QuestionForm majorId={_id} />}
          />
        </div>
        <div className="w-full mt-8 h-full">
          {questions.length === 0 ? (
            <NotFound message="questions not found for this major yet." />
          ) : (
            <QuestionsList question={questions} />
          )}
        </div>
      </div>
    </>
  );
}