import Link from "next/link";
import { Eye, ArrowLeft, CheckCircle2, ChevronRight, FileText, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ViewTracker } from "@/components/view-tracker";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SchemeDetailsPage({ params }: Props) {
  const { id } = await params;

  const scheme = await prisma.scheme.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });

  if (!scheme) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8">
      <ViewTracker schemeId={scheme.id} />
      
      <div className="mb-8">
        <Link 
          href="/#schemes-directory" 
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-700"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Directory
        </Link>
      </div>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        {/* Header Block */}
        <div className="relative border-b border-slate-100 bg-slate-900 px-6 py-10 text-white sm:px-10 lg:px-12">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          
          <div className="relative z-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-100 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                {scheme.category.name}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md">
                <Eye size={14} /> {scheme.views} views
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{scheme.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              {scheme.fullDescription}
            </p>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12">
          <div className="space-y-8 lg:space-y-10">
            <DetailSection 
              icon={<CheckCircle2 className="text-emerald-500" size={24} />} 
              title="Eligibility Criteria" 
              content={scheme.eligibility} 
            />
            <DetailSection 
              icon={<Info className="text-blue-500" size={24} />} 
              title="Key Benefits" 
              content={scheme.benefits} 
            />
          </div>
          
          <div className="space-y-8 lg:space-y-10 rounded-2xl bg-slate-50 p-6 sm:p-8 border border-slate-100">
            <DetailSection 
              icon={<FileText className="text-purple-500" size={24} />} 
              title="Required Documents" 
              content={scheme.documents} 
            />
            <DetailSection 
              icon={<ChevronRight className="text-orange-500" size={24} />} 
              title="Application Process" 
              content={scheme.applicationProcess} 
            />
          </div>
        </div>
      </article>
    </main>
  );
}

function DetailSection({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-200/50">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      </div>
      <div className="prose prose-slate prose-blue max-w-none text-[15px] leading-7 text-slate-600">
        {content}
      </div>
    </section>
  );
}
