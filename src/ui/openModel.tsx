"use client"
import { ReactNode } from "react";

export default function OpenModel({
  modelid,
  modelName,
  dialog,
}: {
  modelid: string;
  modelName: string;
  dialog: ReactNode;
}) {
  function showModal() {
    const dialog = document.getElementById(`${modelid}`) as HTMLDialogElement;
    dialog.showModal();
  }
  return (
    <div>
      <button className="btn btn-primary" onClick={() => showModal()}>
        {modelName}
      </button>
      {dialog}
    </div>
  );
}
