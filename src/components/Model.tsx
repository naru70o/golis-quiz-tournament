"use client"
import { newMajor } from '@/app/actions/action';
import React, { useRef, useTransition } from 'react'

export default function Model() {
    const [pending,startTransition]=useTransition();
    const dialogRef = useRef<HTMLDialogElement>(null); 

    function showModal() {
      const dialog=  document.getElementById('my_modal_3') as HTMLDialogElement;
      dialog.showModal()
    }
  return (
    <>
<button className="btn" onClick={()=>showModal()}>new major</button>
<dialog id="my_modal_3" className="modal" ref={dialogRef}>
  <div className="modal-box">
    <form action={async (formData:FormData) => {
        startTransition(async()=>
        {
            await newMajor(formData)
            dialogRef.current?.close()
        })
    }
    } className='flex flex-col justify-center items-center'>
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => dialogRef.current?.close()}>✕</button>
    <div className='font-medium mt-4'>here is your inputs to add new major</div>
    <div className='flex flex-col gap-2 w-full mt-6'>
        <input name="majorName" type="text" placeholder="major name" className="input input-bordered w-full" />
        <button className='btn btn-primary' disabled={pending}>add</button>
        </div>
    
    </form> 
    </div>
</dialog>
    </>
  )
}
