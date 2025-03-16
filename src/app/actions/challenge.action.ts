"use server";

import connectiondb from "@/lib/db/connectiondb";
import Challenge from "@/lib/schemas/model.challenge";
import { revalidateTag } from "next/cache";

export async function newChallenge(formData: FormData) {
  try {
    await connectiondb();
    const challenge = {
      challenge: formData.get("challenge") as string,
      number: Number(formData.get("number")),
    };

    const existOne = await Challenge.find({ number: formData.get("number") });
    if (existOne.length > 0)
      return {
        success: false,
        message: `this number ${challenge.number} already exist`,
      };

    await Challenge.create(challenge);

    revalidateTag("challenges");
    return { success: true, message: "Challenge created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error creating challenge" };
  }
}

// update challenge
export async function updateChallenge(formData: FormData, id: string) {
  try {
    await connectiondb();
    const challenge = {
      challenge: formData.get("challenge") as string,
      number: Number(formData.get("number")),
    };

    await Challenge.findByIdAndUpdate(id, challenge);

    revalidateTag("challenges");
    return { success: true, message: "Challenge updated successfully" };
  } catch {
    return { success: false, message: "Error updating challenge" };
  }
}

// delete challenge
export async function deleteChallenge(id: string) {
  try {
    await connectiondb();
    await Challenge.findByIdAndDelete(id);

    revalidateTag("challenges");
    return { success: true, message: "Challenge deleted successfully" };
  } catch {
    return { success: false, message: "Error deleting challenge" };
  }
}