"use client";
import Deletemajor from "@/ui/deletemajor";
import UpdateMajor from "@/ui/updateMajor";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

type Majors = {
  _id: string;
  name: string;
};

export default function MajorList({ majors }: { majors: Majors[] }) {
  return (
    <div className="mt-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center">
        {majors.map((major) => {
          return (
            <div
              className="flex justify-between items-center px-4 py-2 bg-gray-600 rounded-lg w-full cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out"
              key={major._id}
            >
              <Link href={`/majors/${major._id}`} className="w-full">
                <div className="flex flex-col">
                  <div className="font-bold">{major.name}</div>
                </div>
              </Link>
              <details className="dropdown">
                <summary className="btn m-1 px-2 border-none">
                  <EllipsisVertical />
                </summary>
                <ul className="menu dropdown-content gap-1 inline-block z-[1] p-2 shadow bg-gray-500">
                  <UpdateMajor major={major} />
                  <Deletemajor majorId={major._id} />
                </ul>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
}
