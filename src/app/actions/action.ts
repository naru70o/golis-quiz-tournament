"use server";
import connectiondb from "@/lib/db/connectiondb";
import Major from "@/lib/schemas/model.major";
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