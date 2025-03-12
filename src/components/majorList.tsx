"use client";
import Deletemajor from "@/ui/deletemajor";
import UpdateMajor from "@/ui/updateMajor";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

type Majors = {
  _id: string;
  name: string;
};

export default function MajorList({ majors }: { majors: Majors[] }) {
  function showModal(id: string) {
    const dialog = document.getElementById(
      `my_modal_update_major${id}`
    ) as HTMLDialogElement;
    dialog.showModal();
  }

  function deleteModel(id: string) {
    const dialog = document.getElementById(
      `my_modal_delete_major${id}`
    ) as HTMLDialogElement;
    dialog.showModal();
  }

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
              <div className="flex gap-2">
                <div
                  className="Lucide-icon"
                  onClick={() => showModal(major._id)}
                >
                  <Pencil className="" />
                  <UpdateMajor major={major} />
                </div>
                <div
                  className="Lucide-icon"
                  onClick={() => deleteModel(major._id)}
                >
                  <Trash className="" />
                  <UpdateMajor major={major} />
                  <Deletemajor id={major._id} message={major.name} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
