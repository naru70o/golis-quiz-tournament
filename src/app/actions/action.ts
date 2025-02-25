"use server";
import mongoose from "mongoose";
import connectiondb from "@/lib/db/connectiondb";
import Major from "@/lib/schemas/model.major";
import Question from "@/lib/schemas/model.question";
import { revalidateTag } from "next/cache";

export const newMajor = async (formData: FormData) => {
  try {
    await connectiondb();
    const major = new Major({
      name: formData.get("majorName") as string,
    });

    await major.save();
    revalidateTag("majors");
    return { status: true, message: "major created successfully" };
  } catch (error) {
    return { status: false, message: "major not created" };
  }
};

export const deleteMajor = async (id: string) => {
  try {
    await connectiondb();
    await Major.findByIdAndDelete(id);
    revalidateTag("majors");
    return { status: true, message: "major deleted successfully" };
  } catch (error) {
    return { status: false, message: "major not deleted" };
  }
};

export const updateMajor = async (id: string, formData: FormData) => {
  try {
    await connectiondb();
    await Major.findByIdAndUpdate(id, {
      name: formData.get("majorName") as string,
    });
    revalidateTag("majors");
    return { status: true, message: "major updated successfully" };
  } catch (error) {
    return { status: false, message: "major not updated" };
  }
};

// Question

export const newQuestion = async (
  currentState: unknown,
  formData: FormData
) => {
  try {
    await connectiondb(); // Ensure DB connection

    const questionText = formData.get("question") as string;
    const majorId = formData.get("majorId") as string;
    const correctOptionIndex = Number(formData.get("correctOptionIndex"));
    const totalPoints = Number(formData.get("totalPoints"));

    // majorId is converted to an ObjectId
    const majorObjectId = new mongoose.Types.ObjectId(majorId);

    //  options array
    const options = [
      { text: formData.get("optionOne") as string },
      { text: formData.get("optionTwo") as string },
      { text: formData.get("optionThree") as string },
      { text: formData.get("optionFour") as string },
    ].filter((option) => option.text.trim() !== ""); // Remove empty options

    // least two options are provided
    if (options.length < 4) {
      return { success: false, message: "At least 4 options are required." };
    }

    // question text is not empty
    if (!questionText.trim()) {
      return { success: false, message: "Question text is required." };
    }

    // correctOptionIndex is within range
    if (correctOptionIndex < 0 || correctOptionIndex >= options.length) {
      return {
        success: false,
        message: "Correct option index is out of range.",
      };
    }

    // totalPoints is a positive number
    if (totalPoints <= 0) {
      return {
        success: false,
        message: "Total points must be a positive number.",
      };
    }

    // Save to MongoDB
    const newQuestion = new Question({
      question: questionText,
      majorId: majorObjectId,
      options,
      correctOptionIndex,
      totalPoints, // Store correct answer index
    });

    console.log(newQuestion);

    await newQuestion.save();
    return { success: true, message: "Question added successfully" };
  } catch (error) {
    console.error("Error adding question:", error);
    return { success: false, message: error.message };
  }
};

export const deleteQuestion = async (questionId: string) => {
  try {
    await Question.findByIdAndDelete(questionId);
    return { success: true, message: "Question deleted successfully" };
  } catch (error) {
    console.error("Error deleting question:", error);
    return { success: false, message: error.message };
  }
};


export const updateQuestion = async (
  currentState: unknown,
  formData: FormData
) => {
  try {
    await connectiondb(); // Ensure DB connection

    const questionText = formData.get("question") as string;
    const questionId = formData.get("questionId") as string;
    const majorId = formData.get("majorId") as string;
    const correctOptionIndex = Number(formData.get("correctOptionIndex"));
    const totalPoints = Number(formData.get("totalPoints"));

    // majorId is converted to an ObjectId
    const majorObjectId = new mongoose.Types.ObjectId(majorId);

    //  options array
    const options = [
      { text: formData.get("option1") as string },
      { text: formData.get("option2") as string },
      { text: formData.get("option3") as string },
      { text: formData.get("option4") as string },
    ].filter((option) => option.text.trim() !== ""); // Remove empty options

    // least two options are provided
    if (options.length < 4) {
      return { success: false, message: "At least 4 options are required." };
    }

    // question text is not empty
    if (!questionText.trim()) {
      return { success: false, message: "Question text is required." };
    }

    // correctOptionIndex is within range
    if (correctOptionIndex < 0 || correctOptionIndex >= options.length) {
      return {
        success: false,
        message: "Correct option index is out of range.",
      };
    }

    // totalPoints is a positive number
    if (totalPoints <= 0) {
      return {
        success: false,
        message: "Total points must be a positive number.",
      };
    }

    // Save to MongoDB
    const rowData = {
      question: questionText,
      majorId: majorObjectId,
      options,
      correctOptionIndex,
      totalPoints, // Store correct answer index
    };

    await Question.findByIdAndUpdate(questionId, rowData, { new: true });

    return { success: true, message: "Question updated successfully" };
  } catch (error) {
    console.error("Error adding question:", error);
    return { success: false, message: error.message };
  }
};