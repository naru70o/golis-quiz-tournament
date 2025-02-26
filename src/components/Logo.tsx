import Image from 'next/image'
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center justify-start w-full">
      <Link href="/" className="relative w-24 h-24 block">
        <Image
          src="/golis-logo.png"
          fill
          className="absolute"
          alt="golis-logo"
        />
      </Link>
    </div>
  );
}
