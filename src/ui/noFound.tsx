import React from 'react'

export default function NotFound({message}: { message: string }) {
  return (
    <div className="grid grid-cols-1 mt-32 place-items-center">
    <div className="col-start-1 col-span-1">
      <p>{message}</p>
    </div>
  </div>
  )
}