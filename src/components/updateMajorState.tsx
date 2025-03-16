"use client";

import { updateStateMajor } from "@/app/actions/action";
import React, { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function UpdateMajorState({
  _id,
  status,
  result,
}: {
  _id: string;
  status: string;
  result: number;
}) {
  const [data, action, isPending] = useActionState(updateStateMajor, undefined);
  const intialState = {
    _id,
    status,
    result,
  };
  const [formData, setFormData] = React.useState(intialState);

  useEffect(() => {
    if (!data) return;
    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  }, [data]);


  return (
    <dialog id={_id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {/* Close Button */}
        <form method="dialog" className="flex gap-2 justify-end">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            x
          </button>
        </form>

        {/* Form */}
        <form
          action={action}
          className="flex flex-col justify-center items-center"
        >
          <div className="font-medium mt-4 text-center text-2xl">
            Here is your input to update the major state
          </div>

          <div className="flex flex-col gap-2 w-full mt-6">
            {/* Radio Inputs */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <label className="text-xl">Current state</label>
                <div className="flex gap-2 justify-between items-center">
                  <div className="gap-2 flex items-center">
                    <input
                      type="radio"
                      className="radio radio-primary"
                      id="soon"
                      name="status"
                      value="soon"
                      defaultChecked={formData.status === "soon"}
                    />
                    <label htmlFor="soon" className="text-xl">
                      Soon
                    </label>
                  </div>

                  <div className="gap-2 flex items-center">
                    <input
                      type="radio"
                      className="radio radio-primary"
                      id="active"
                      name="status"
                      value="active"
                      defaultChecked={formData.status === "active"}
                    />
                    <label htmlFor="active" className="text-xl">
                      Active
                    </label>
                  </div>
                  <div className="gap-2 flex items-center">
                    <input
                      type="radio"
                      className="radio radio-primary"
                      id="finished"
                      name="status"
                      value="finished"
                      defaultChecked={formData.status === "finished"}
                    />
                    <label htmlFor="finished" className="text-xl">
                      Finished
                    </label>
                  </div>
                </div>
              </div>

              {/* Input Field */}
              <div className="flex flex-col gap-4">
                <label className="text-xl">Result</label>
                {/* hidden input for the id */}
                <input type="hidden" name="id" value={formData._id} />
                <input
                  name="result"
                  type="text"
                  value={formData.result}
                  onChange={(e) =>
                    setFormData({ ...formData, result: +e.target.value })
                  }
                  placeholder="Major result points"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              {!isPending ? (
                "Update State"
              ) : (
                <span className="loading loading-dots loading-sm"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
