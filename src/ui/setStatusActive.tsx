"use client"
import { majorSetStatusActive } from '@/app/actions/action';
import useStoreState from '@/hooks/useStoreState';
import { restart } from '@/state/quizSlice';
import { ArrowRight } from 'lucide-react';

export default function SetStatusActive({_id}: { _id: string }) {
  const {dispatch} = useStoreState()

  const handleClick = async () => {
    await majorSetStatusActive(_id);
    dispatch(restart())
  };

  return (
    <button
      className="flex items-center text-[10px] tracking-widest py-1 px-2 primary-content rounded-full cursor-pointer hover:underline-offset-1"
      onClick={handleClick}
    >
      <span>Start</span>
      <ArrowRight className="inline-block h-2 w-2 hover:opacity-40 transition-all duration-150 ease-in-out cursor-pointer" />
    </button>
  );
}
