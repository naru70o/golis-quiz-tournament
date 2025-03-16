"use client"
import DeleteChallenge from '@/ui/deleteChallenge';
import UpdateChallenge from '@/ui/updateChallenge';
import { Link, Pencil, Trash } from 'lucide-react';
import React from 'react'

type Challenge = {
  _id: string;
  challenge: string;
  number: number;
};

export default function ChallengesList({challenges}:{challenges:Challenge[]}) {

    function showModalUpdate(id:string) {
        const dialog = document.getElementById(
          "my_modal_update_challenge"+id
        ) as HTMLDialogElement;
        dialog.showModal();
    }

    function showModalDelete(id:string) {
        const dialog = document.getElementById(
          id + "_delete"
        ) as HTMLDialogElement;
        dialog.showModal();
    }

  return (
    <div className="mt-6 w-full">
    <div className="flex flex-col gap-4 justify-center items-center">
      {challenges.map((challenge) => {
        return (
          <div
            className="flex justify-between items-center px-4 py-2 bg-gray-600 rounded-lg w-full cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out"
            key={challenge._id}
          >

            <div className='flex items-center gap-4'>
              <div className='bg-primary text-primary-content rounded-md p-4'>{challenge.number}</div>
              <div className="flex flex-col">
                <div className="font-bold">{challenge.challenge}</div>
              </div>
            </div>
           
            <div className="flex gap-2">
              <div
                className="Lucide-icon"
                onClick={() => showModalUpdate(challenge._id)}
              >
                <Pencil className="" />
                <UpdateChallenge challenge={challenge} />
              </div>
              <div
                className="Lucide-icon"
                onClick={() => showModalDelete(challenge._id)}
              >
                <Trash className="" />
                <DeleteChallenge id={challenge._id} message="challenge" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  )
}
