import Link from "next/link";
import { Landmark } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-10 mt-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <div className="flex items-center gap-2 text-slate-400">
            <Landmark size={24} />
            <span className="font-semibold text-slate-600">GovPortal Initiative</span>
          </div>
          <p className="text-sm text-slate-500">Empowering citizens with accessible information.</p>
        </div>
        
        <div className="flex gap-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 hover:underline">Privacy Policy</Link>
          <Link href="/" className="hover:text-blue-600 hover:underline">Terms of Use</Link>
          <Link href="/admin" className="hover:text-blue-600 hover:underline">Admin Staff</Link>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} National Scheme Directory. All rights reserved.
      </div>
    </footer>
  );
}
