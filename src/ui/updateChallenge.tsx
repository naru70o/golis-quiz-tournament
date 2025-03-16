"use client"
import { updateChallenge } from '@/app/actions/challenge.action';
import React, { useRef, useState, useTransition } from 'react'
import toast from 'react-hot-toast';

type Challenge = {
    _id: string;
    challenge: string;
    number: number;
  };

export default function UpdateChallenge({challenge}:{challenge:Challenge}) {
      const [pending, startTransition] = useTransition();
      const dialogRef = useRef<HTMLDialogElement>(null);
      const [data, setData] = useState({number:challenge.number,challengeText:challenge.challenge});

  return (
    <dialog
        id={`my_modal_update_challenge${challenge._id}`}
        className="modal"
        ref={dialogRef}
      >
        <div className="modal-box">
          {/* Close Button */}
          <form method="dialog" className="flex gap-2 justify-end">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              x
            </button>
          </form>

          <form
            action={async (formData: FormData) => {
              startTransition(async () => {
                const { success, message } = await updateChallenge(
                    formData,
                    challenge._id
                );
                dialogRef.current?.close();
                if (success) {
                  toast.success(message);
                } else {
                  toast.error(message);
                }
              });
            }}
            className="flex flex-col justify-center items-center"
          >
            <div className="font-medium mt-4">
              here is your input to Update the Faculty
            </div>
            <div className="flex flex-col gap-2 w-full mt-6">
              <input
                value={data.challengeText}
                name="challenge"
                type="text"
                onChange={(e) => setData({...data,challengeText:e.target.value})}
                className="input input-bordered w-full"
              />
              <input
                value={data.number}
                name="number"
                type="text"
                onChange={(e) => setData({...data,number:Number(e.target.value)})}
                className="input input-bordered w-full"
              />
              <button className="btn btn-primary" disabled={pending}>
                update
              </button>
            </div>
          </form>
        </div>
      </dialog>
  )
}
