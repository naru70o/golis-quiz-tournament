import ChallengesList from "@/components/challengesList";
import Navigation from "@/components/navigation";
import NewChallengeModel from "@/components/newChallenge";
import connectiondb from "@/lib/db/connectiondb";
import Challenge from "@/lib/schemas/model.challenge";
import OpenModel from "@/ui/openModel";
import { Types } from "mongoose";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import React from "react";

type Challenge = {
  _id: string;
  challenge: string;
  number: number;
};

const challengesData = unstable_cache(
  async () => {
    const challenges = (await Challenge.find().lean()).map((challenge) => ({
      _id: (challenge._id as Types.ObjectId).toString(),
      challenge: challenge.challenge as string,
      number: challenge.number,
    }));

    return challenges as Challenge[];
  },
  ["challenges"],
  {
    revalidate: 1000,
    tags: ["challenges"],
  }
);

export default async function page() {
  await connectiondb();

  const challenges = await challengesData();
  // largest number
  const maxNumber = Math.max(
    ...challenges.map((challenge) => challenge.number)
  );
  console.log(maxNumber);

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-12 px-4">
      <Navigation />
      <div className="self-end">
        <div className="flex gap-2 items-center">
          <Link href="/challenge/pick-number">
            <button className="btn btn-secondary">Pick your number</button>
          </Link>
          <OpenModel
            modelid={"major_form_modal"}
            modelName={"New Challenge"}
            dialog={<NewChallengeModel lastNumber={maxNumber} />}
          />
        </div>
      </div>
      <ChallengesList challenges={challenges} />
    </div>
  );
}
