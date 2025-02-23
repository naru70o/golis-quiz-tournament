import React from 'react'

type Majors = {
  _id: string;
  name: string;
};

export default function MajorList({ majors }: { majors: Majors[] }) {
  return (
    <div className="mt-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center">
        {majors.map((major) => {
          return (
            <div
              className="px-4 py-2 bg-gray-600 rounded-lg w-full cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out"
              key={major._id}
            >
              <div className="font-bold">{major.name}</div>
              <div className="font-normal">34</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}