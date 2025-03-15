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

    await Challenge.create(challenge);

    revalidateTag("challenges");
    return { success: true, message: "Challenge created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error creating challenge" };
  }
}
