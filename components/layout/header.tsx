import Link from "next/link";
import { ShieldCheck, UserCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-900/10 bg-slate-900 text-white shadow-xl backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-inner">
            <ShieldCheck size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider sm:text-base">National Scheme Portal</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest sm:text-xs">Government Directory</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/admin"
            className="hidden items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white sm:flex"
          >
            <UserCircle size={18} />
            Official Login
          </Link>
        </nav>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-white to-green-500 opacity-80" />
    </header>
  );
}
