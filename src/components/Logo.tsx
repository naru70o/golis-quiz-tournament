import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className='flex items-center justify-start w-full'>
        <div className='relative w-24 h-24'>
        <Image src="/golis-logo.png" fill className='absolute' alt='golis-logo'/>
        </div>
    </div>
  )
}
