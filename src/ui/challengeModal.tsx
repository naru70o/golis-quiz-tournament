"use client"

import { SmilePlus } from "lucide-react"

function ChallengeModal({_id,challenge}: { _id: string,challenge: string }) {
  return (
    <dialog id={_id} className="modal modal-bottom sm:modal-middle text-white">
    <div className="modal-box">
      {/* Close Button */}
      <form method="dialog" className="flex gap-2 justify-end">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          x
        </button>
      </form>
      <div className="flex justify-center flex-col mt-8">
        <div className="self-center mb-4">
        <SmilePlus size={48} />
        </div>
        <p className=" text-2xl font-bold text-center">
            {challenge}
        </p>
      </div>
    </div>
  </dialog>
  )
}

export default ChallengeModal