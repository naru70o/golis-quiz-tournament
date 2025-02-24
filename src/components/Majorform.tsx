import { newMajor } from '@/app/actions/action'
import React from 'react'

export default function Form() {
  return (
  <form action={async (formData:FormData) => {
   await newMajor(formData)   
  }
  }>
    <input name="majorName" type="text" placeholder="major name" />
  </form>
  )
}
