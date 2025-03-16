import Logo from "@/components/Logo";
import NumberList from "@/components/numberList";
import connectiondb from "@/lib/db/connectiondb";
import Challenge from "@/lib/schemas/model.challenge";
import { ArrowLeft } from "lucide-react";
import { Types } from "mongoose";
import { unstable_cache } from "next/cache";
import Link from "next/link";

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

  return (
    <div className="bg-[rgb(51,71,157)] h-screen relative overflow-clip">
          <div className="flex justify-between items-center">
            <div className="bg-[url('/ramadan-dec.png')] bg-cover bg-center h-60 w-[354px] -translate-x-12"></div>
            <div className="h-26 w-26 bg-[#FBE726] rounded-full -translate-x-[35%] ">
              <Logo />
            </div>
        </div>
        <div className="flex flex-col items-center h-[50%] justify-center flex-wrap max-w-7xl mx-auto py-12 px-4 overflow-clip relative">
            <NumberList numbers={challenges} />
        </div>
        <div className="absolute bottom-10 left-10 w-8 h-8">
            <Link href="/challenge">
            <ArrowLeft height={32} width={32} />
            </Link>
        </div>
    </div>
  )
}
