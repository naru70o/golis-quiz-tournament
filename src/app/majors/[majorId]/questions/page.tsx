// app/majors/[majorId]/questions/page.tsx

import connectiondb from "@/lib/db/connectiondb";
import Question from "@/lib/schemas/model.question";
import mongoose from "mongoose";
import { unstable_cache } from "next/cache";
import React from "react";
import StartQuiz from "@/components/tournament/StartQuestions"

type Option = {
  _id: unknown;
  text: string;
};

type Question = {
  _id: unknown;
  question: string;
  majorId: unknown;
  options: Option[];
  correctOptionIndex: number;
  totalPoints: number;
  createdAt: Date;
};

    // Define the fetching function for the questions using unstable_cache
const questionsMajor = unstable_cache(
  async (majorId: string) => {
    // Query questions with the matching majorId and convert Mongoose ObjectIDs to strings
    const questions = (await Question.find({ majorId }).lean<Question[]>()).map(
      (question) => ({
        _id: (question._id as mongoose.Types.ObjectId).toString(),
        question: question.question,
        majorId: (question.majorId as mongoose.Types.ObjectId).toString(),
        options: question.options.map((option) => ({
          text: option.text,
          _id: (option._id as mongoose.Types.ObjectId).toString(),
        })),
        correctOptionIndex: question.correctOptionIndex,
        totalPoints: question.totalPoints,
        createdAt: question.createdAt,
      })
    );

    return questions;
  },
  ["questions"], // Cache key
  {
    revalidate: 1000, // How often to revalidate
    tags: ["questions"],
  }
);

// Main page component to fetch and display the questions
export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ majorId: string }>;
}) {
  // Extract the majorId from the route parameters
  const { majorId } = await params;

  // the database connection is established
  await connectiondb();

  // Fetch questions for the given major using our helper function
  const questions = await questionsMajor(majorId);

  return <StartQuiz data={questions} />;
}
