import Link from "next/link";
import { HomeIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full bg-black/40 backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between items-center py-6 px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <HomeIcon className="w-8 h-8 text-blue-400" />
          <span className="text-2xl font-extrabold text-white tracking-wide">
            IJURU <span className="text-blue-400">HUB</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-8 font-semibold text-white">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/about" className="hover:text-blue-400 transition">About</Link>
          <Link href="/spaces" className="hover:text-blue-400 transition">Spaces</Link>
          <Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
