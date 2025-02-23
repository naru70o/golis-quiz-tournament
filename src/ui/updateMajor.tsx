import { updateMajor } from '@/app/actions/action';
import { Pencil } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';

type Major={
    _id:string;
    name:string;
}

export default function UpdateMajor({major}:{major:Major}) {
    const [pending,startTransition]=useTransition()
    const dialogRef=useRef<HTMLDialogElement>(null);
    const [name,setName]=useState<string>(major.name)

    function showModal() {
        const dialog = document.getElementById("my_modal_update_major") as HTMLDialogElement;
        dialog.showModal();
      }

  return (
    <>
     <div
      className="border-b border-gray-400 flex items-center gap-2 pb-1" onClick={()=>showModal()}
       >
     
      <Pencil size={16} strokeWidth={1} />
 <div>Update</div>

  </div>

 <dialog id="my_modal_update_major" className="modal" ref={dialogRef}>
         <div className="modal-box">
           <form
             action={async (formData: FormData) => {
               startTransition(async () => {
                 await updateMajor(
                    major._id,formData);
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
               here is your inputs to Update the major
             </div>
             <div className="flex flex-col gap-2 w-full mt-6">
               <input
                 value={name}
                 name="majorName"
                 type="text"
                 onChange={(e) => setName(e.target.value)}
                 className="input input-bordered w-full"
               />
               <button className="btn btn-primary" disabled={pending}>
                 update
               </button>
             </div>
           </form>
         </div>
       </dialog>
</>
  )
}
