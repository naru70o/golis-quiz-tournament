"use client"
import React, { useRef, useTransition } from 'react'

export default function QuestionForm() {
        const [pending,startTransition]=useTransition();
        const dialogRef = useRef<HTMLDialogElement>(null); 
    
      return (
        <>
          <dialog id="question_form_model" className="modal" ref={dialogRef}>
            <div className="modal-box">
              <form
                action={async (formData: FormData) => {
                  startTransition(async () => {
                    
                    dialogRef.current?.close();
                  });
                }}
                className="flex flex-col justify-center items-center"
              >
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => dialogRef.current?.close()}
                >
                  ✕
                </button>
                <div className="font-medium mt-4">
                  Here is your input to add a new question
                </div>
                <div className="flex flex-col gap-2 w-full mt-6">
                    {/* Question */}
               <div>
                  <input
                    name="question"
                    type="text"
                    placeholder="question"
                    className="input input-bordered w-full"
                    />
              </div>

              <div className='grid lg:grid-cols-2 gap-2 grid-cols-1 mt-4'>
                {/* option 1 */}
              <input
                    name="optionOne"
                    type="text"
                    placeholder="option One"
                    className="input input-bordered w-full"
                    /> 
                    {/* option 2 */}
                    <input
                    name="optionTwo"
                    type="text"
                    placeholder="option Two"
                    className="input input-bordered w-full"
                    /> 
                    {/* option 3 */}
                    <input
                    name="optionThree"
                    type="text"
                    placeholder="option Three"
                    className="input input-bordered w-full"
                    />
                    {/* option four */}
                     <input
                    name="optionFour"
                    type="text"
                    placeholder="option Four"
                    className="input input-bordered w-full"
                    />
              </div>
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
