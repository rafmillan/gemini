import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <React.Fragment>
        <ul className="flex w-full text-gray-900 bg-gray-100 py-1 drop-shadow-sm text-sm">
          <li className="border-r border-gray-200 px-2 py-1">
            <Link className="px-3 py-1 cursor-pointer rounded-xl hover:bg-gray-200"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className="border-r border-gray-200 px-2 py-1">
            <Link className="px-3 py-1 cursor-pointer rounded-xl hover:bg-gray-200"
              href="/chat"
            >
              Chat
            </Link>
          </li>
          <li className="border-0 border-gray-200 px-2 py-1">
            <Link className="px-3 py-1 last:cursor-pointer rounded-xl hover:bg-gray-200"
              href="/doc"
            >
              Document Q&A
            </Link>
          </li>
        </ul>
    </React.Fragment>
  )
}