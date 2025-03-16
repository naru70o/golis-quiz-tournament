"use client";

import ChallengeModal from "@/ui/challengeModal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Challenge = {
  _id: string;
  challenge: string;
  number: number;
};

export default function NumberList({ numbers }: { numbers: Challenge[] }) {
  const [selectedNumbers, setSelectedNumbers] = useState<Challenge[]>([]);
  // Load stored numbers from local storage when the component mounts
  useEffect(() => {
    const storedNumbers = localStorage.getItem("selectedNumbers");
    if (storedNumbers) {
      setSelectedNumbers(JSON.parse(storedNumbers));
    }
  }, []);

  // handle selection and update local storage
  function handleSelect(number: Challenge) {
    setSelectedNumbers((prev) => {
      const updatedNumbers = [...prev, number];

      // Save to local storage
      localStorage.setItem("selectedNumbers", JSON.stringify(updatedNumbers));

      return updatedNumbers;
    });
  }

   // clear local storage and reset selected numbers
   function clearSelectedNumbers() {
    localStorage.removeItem("selectedNumbers");
    setSelectedNumbers([]); 
  }

  function showModal(_id: string) {
    const dialog = document.getElementById(_id) as HTMLDialogElement;
    dialog.showModal();
  }

    // "C" key hold to clear storage
    useEffect(() => {
      let timeout: NodeJS.Timeout;
  
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key.toLowerCase() === "c") {
          timeout = setTimeout(() => {
            clearSelectedNumbers();
          }, 3000); // 3-second hold to clear storage
        }
      }
      
      function handleKeyUp(event: KeyboardEvent) {
        if (event.key.toLowerCase() === "c") {
          clearTimeout(timeout); // Prevent clearing if released early
        }
      }
  
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, []);

  return (
    <>
    <div className="flex gap-2 items-center justify-start flex-wrap overflow-y-auto absolute max-h-64">
      {numbers.map((number) => (
        <div
        className={`bg-secondary text-secondary-content rounded-lg font-bold shadow-xl text-2xl p-4 hover:bg-primary-content hover:text-primary transition-all duration-300 ease-in-out cursor-pointer self-start ${
          selectedNumbers.some((item) => item._id === number._id)
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        key={number._id}
        onClick={() => {
          if (!selectedNumbers.some((item) => item._id === number._id)) {
            showModal(number._id);
            handleSelect(number);
          }
        }}
      >
          <p>{number.number}</p>
          <ChallengeModal _id={number._id} challenge={number.challenge} />
        </div>
      ))}
    </div>
    </>
  );
}
