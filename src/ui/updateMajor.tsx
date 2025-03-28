import { updateMajor } from '@/app/actions/action';
import { Pencil } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import toast from "react-hot-toast";

type Major = {
  _id: string;
  name: string;
};

export default function UpdateMajor({ major }: { major: Major }) {
  const [pending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState<string>(major.name);

  function showModal() {
    const dialog = document.getElementById(
      "my_modal_update_major"
    ) as HTMLDialogElement;
    dialog.showModal();
  }

  return (
    <>
      <dialog
        id={`my_modal_update_major${major._id}`}
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
                const { success, message } = await updateMajor(
                  major._id,
                  formData
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
  );
}
