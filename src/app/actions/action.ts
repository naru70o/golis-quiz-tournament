"use server";
import connectiondb from "@/lib/db/connectiondb";
import Major from "@/lib/schemas/model.major";

export const newMajor = async (formData: FormData) => {
  try {
    await connectiondb();
    const major = new Major({
      name: formData.get("majorName") as string,
    });

    await major.save();
    return { status: true, message: "major created successfully" };
  } catch (error) {
    return { status: false, message: "major not created" };
  }
};
