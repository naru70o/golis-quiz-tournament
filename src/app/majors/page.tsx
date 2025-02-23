import Logo from "@/components/Logo";
import MajorList from "@/components/majorList";
import Model from "@/components/Model";
import connectiondb from "@/lib/db/connectiondb";
import Major from "@/lib/schemas/model.major";
import { Types } from "mongoose";

type Majors = {
  _id: string;
  name: string;
};

export default async function page() {
  await connectiondb();

  const majors = (await Major.find().lean()).map((major) => ({
    _id: (major._id as Types.ObjectId).toString(),
    name: major.name,
  }));
  console.log(majors);
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-12 px-4">
      <Logo />
      <div className="self-end">
        <Model />
      </div>
      <MajorList majors={majors} />
    </div>
  );
}
