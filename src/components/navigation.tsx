"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathName = usePathname();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal gap-4 items-center px-1">
          <li
            className={`rounded-md ${
              pathName.includes("/majors") ? "bg-base-200" : ""
            }`}
          >
            <Link href="/majors">Faculties</Link>
          </li>
          <li
            className={`rounded-md ${
              pathName.includes("/challenge") ? "bg-base-200" : ""
            }`}
          >
            <Link href="/challenge">Challenges</Link>
          </li>
          <UserButton />
        </ul>
      </div>
    </div>
  );
}
