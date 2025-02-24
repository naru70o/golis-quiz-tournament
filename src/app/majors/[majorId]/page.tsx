import Logo from "@/components/Logo";
import QuestionForm from "@/components/questionForm";
import connectiondb from "@/lib/db/connectiondb";
import Major from "@/lib/schemas/model.major";
import OpenModel from "@/ui/openModel";
import React from "react";

type Major = {
_id: string;
name: string;
}


export default async function page({
  params,
}: {
  params: Promise<{ majorId: string }>;
}) {
  const { majorId } = await params;
  await connectiondb();
  const major = (await Major.find({ _id: majorId }).lean()).map((major) => (
    {
      _id:major._id,
      name: major.name,
    }
  ));

  const [{ name, _id }] = major || [{} as Major];

console.log(major);
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-12 px-4">
      <Logo />
      <h1 className="text-2xl font-bold mt-4">Major {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <div className="self-end"> 

      <OpenModel modelid={"question_form_model"} modelName={"new question"} dialog={<QuestionForm/>}/>
      </div>
    </div>
  );
}
