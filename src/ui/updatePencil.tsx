"use client"
import UpdateMajorState from "@/components/updateMajorState"
import { Pencil } from "lucide-react"

function UpdatePencil({ _id,status,result }: { _id: string;status:string;result:number }) {
  function showUpdateStateModal(elementIid: string) {
    const modal = document.getElementById(elementIid) as HTMLDialogElement;
    modal.showModal();
  }
    return (
        <div
              className="inline-block hover:opacity-40 transition-all duration-150 ease-in-out cursor-pointer"
              onClick={() => showUpdateStateModal(_id)}
            >
              <Pencil className="h-5 w-5" />
              <UpdateMajorState _id={_id} result={result} status={status} />
            </div>
    )
}

export default UpdatePencil;
