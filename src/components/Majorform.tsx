"use client";
import { newMajor } from "@/app/actions/action";
import React, { useTransition } from "react";
import toast from "react-hot-toast";

export default function Form() {
  const [pending, startTransition] = useTransition();
  return (
    <form
      action={async (formData: FormData) => {
        startTransition(async () => {
          const { success, message } = await newMajor(formData);
          if (success) {
            toast.success(message);
          } else {
            toast.error(message);
          }
        });
      }}
    >
      <input name="majorName" type="text" placeholder="major name" required />
    </form>
  );
}
