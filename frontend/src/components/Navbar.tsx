'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-3 px-1">
      <Link href="/" className="text-2xl font-bold text-black hover:text-yellow-700 transition">
        Petwear
      </Link>

      <ul className="flex space-x-6 text-black">
        <li>
          <Link href="/" className="hover:text-yellow-700 transition">Home</Link>
        </li>
        <li>
          <Link href="/cart" className="hover:text-yellow-700 transition">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}
