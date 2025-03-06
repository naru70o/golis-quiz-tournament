import React from 'react'

export default function FullSpinner() {
  return (
    <div className="grid grid-cols-1 justify-center content-center h-screen w-full">
      <div role="status" className="w-full flex justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    </div>
  )
}
