import React from 'react'
import { EllipsisVertical } from 'lucide-react';
export default function Dropdown() {
  return (
    <details className="dropdown">
  <summary className="btn m-1"><EllipsisVertical /></summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</details>
  )
}
