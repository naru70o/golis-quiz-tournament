import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { UserButton } from "@clerk/nextjs";

export default function Navigation() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal gap-4 items-center px-1">
          <li className="bg-base-200">
            <Link href="/majors">Major</Link>
          </li>
          <UserButton />
        </ul>
      </div>
    </div>
  );
}