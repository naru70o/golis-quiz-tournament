"use client"
import Model from '@/components/Model';
import React from 'react'

export default function OpenModel() {
    
    function showModal() {
        const dialog=  document.getElementById('my_modal_3') as HTMLDialogElement;
        dialog.showModal()
      }
  return (
    <div>
    <button className="btn btn-primary" onClick={()=>showModal()}>new major</button>
    <Model/>
    </div>
  )
}
