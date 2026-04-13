import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  FileText,
  GraduationCap,
  HeartPulse,
  Landmark,
  Sprout,
  Users,
} from "lucide-react";

type SchemeCardProps = {
  scheme: {
    id: number;
    title: string;
    shortDescription: string;
    category: {
      name: string;
      icon: string;
    };
  };
};

export function SchemeCard({ scheme }: SchemeCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100/50 transition-transform duration-300 group-hover:scale-110">
          <CategoryIcon iconName={scheme.category.icon} />
        </div>
        <span className="rounded-full border border-indigo-100 bg-indigo-50/50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {scheme.category.name}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{scheme.title}</h3>
      <p className="mt-3 flex-1 line-clamp-2 text-sm leading-relaxed text-slate-600">{scheme.shortDescription}</p>

      <Link
        href={`/scheme/${scheme.id}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:ring-4 focus:ring-blue-100"
      >
        View Details
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}

function CategoryIcon({ iconName }: { iconName: string }) {
  switch (iconName) {
    case "GraduationCap":
      return <GraduationCap size={20} />;
    case "HeartPulse":
      return <HeartPulse size={20} />;
    case "Sprout":
      return <Sprout size={20} />;
    case "Users":
      return <Users size={20} />;
    case "Briefcase":
      return <Briefcase size={20} />;
    case "FileText":
      return <FileText size={20} />;
    default:
      return <Landmark size={20} />;
  }
}
