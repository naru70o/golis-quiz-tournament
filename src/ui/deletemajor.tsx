"use client";
import { deleteMajor } from "@/app/actions/action";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function Deletemajor({ majorId }: { majorId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex items-center gap-2 mt-1">
      <div>
        <Trash size={16} strokeWidth={1} />
      </div>
      <div
        onClick={() =>
          startTransition(async () => {
            const { success, message } = await deleteMajor(majorId);
            if (success) {
              toast.success(message);
            } else {
              toast.error(message);
            }
          })
        }
      >
        Delete
      </div>
    </div>
  );
}
