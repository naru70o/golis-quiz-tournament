"use client"
import React, { useRef, useTransition } from 'react'
import toast from 'react-hot-toast';

export default function NewChallengeModel() {
 const [pending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <dialog id="major_form_modal" className="modal" ref={dialogRef}>
        <div className="modal-box">
      <form method="dialog" className="flex gap-2 justify-end">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            x
          </button>
        </form>
          <form
            action={async (formData: FormData) => {
            //   startTransition(async () => {
            //     const { success, message } = await newMajor(formData);
            //     dialogRef.current?.close();
            //     if (success) {
            //       toast.success(message);
            //     } else {
            //       toast.error(message);
            //     }
            //   });
            }}
            className="flex flex-col justify-center items-center"
          >
            <div className="font-medium mt-4">
              Here is your input to add a new challenge
            </div>
            <div className="flex flex-col gap-2 w-full mt-6">
              <input
                name="challenge"
                type="text"
                placeholder="challenge"
                className="input input-bordered w-full"
                required
              />
              <button className="btn btn-primary" disabled={pending}>
                add
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
