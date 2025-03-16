"use client"

import { deleteQuestion } from "@/app/actions/action";
import { use, useTransition } from "react";
import toast from "react-hot-toast";

export default function DeleteModal({
  message,
  id,
}: {
  message: string;
  id: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <div>
      <dialog
        id={id + "_delete"}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg"> Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete {message}? This action cannot be
            undone. Press &quot;Delete&quot; to confirm or &quot;Close&quot; to
            cancel.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-success">Close</button>
              <button
                className="btn btn-warning"
                onClick={() =>
                  startTransition(async () => {
                    const { success, message } = await deleteQuestion(id);
                    if (success) {
                      toast.success(message);
                    } else {
                      toast.error(message);
                    }
                  })
                }
                disabled={pending}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
