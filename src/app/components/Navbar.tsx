
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

const categories = [
  { name: "সব পণ্য", href: "/" },
  { name: "চাল", href: "/category/chal" },
  { name: "ডাল", href: "/category/dal" },
  { name: "তেল", href: "/category/tel" },
  { name: "মাছ", href: "/category/fish" },
  { name: "মাংস", href: "/category/meat" },
  { name: "সবজি", href: "/category/vegetables" },
];

export default function Navbar() {
  const pathname = usePathname();

  const today = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-green-600 p-2 text-white">
            <ShoppingCart size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500">BazarDor</p>
            <p className="mt-1 text-xs text-gray-500">
              {today}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <nav className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
          {categories.map((category) => {
            const active = pathname === category.href;

            return (
              <Link
                key={category.href}
                href={category.href}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
