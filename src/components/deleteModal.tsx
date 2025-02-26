"use client"

export default function DeleteModal({message,deleteHandler}:{message:string,deleteHandler:()=>Promise<{ success: boolean; message: string; }>}) {
 
  return (
    <div>
      <dialog id="delete_model" className="modal modal-bottom sm:modal-middle">
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
                onClick={() => deleteHandler()}
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
