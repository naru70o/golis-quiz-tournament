import React from 'react'
import Logo from './Logo'
import Link from 'next/link'

export default function Navigation() {
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
<Logo/>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link href="/majors">Major</Link></li>

    </ul>
  </div>
</div>
  )
}
