"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl mb-12 py-24 sm:py-32">
      {/* Decorative Tricolor Top Line */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]" />
      
      {/* Pristine Modern Background Patterns */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white" />
      <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-2xl shadow-blue-500/5 ring-1 ring-slate-100 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-4xl text-center">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-[#000080] bg-blue-50/80 ring-1 ring-blue-600/20 backdrop-blur-sm"
          >
            <ShieldCheck className="h-5 w-5 text-[#FF9933]" />
            National Digital Directory
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl leading-[1.1]"
          >
            Empowering Citizens with
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#000080] to-[#2563eb] drop-shadow-sm pb-2">
               Access to Growth
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto font-medium"
          >
            Discover, verify, and apply for central and state government schemes effortlessly. A unified, transparent portal designed to bring health, education, and financial support directly to you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <button
              onClick={() => document.getElementById("schemes-directory")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-[#000080] px-10 py-4 text-base font-bold text-white shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all hover:-translate-y-1"
            >
              Explore Directory
            </button>
            <button
              onClick={() => document.getElementById("schemes-directory")?.scrollIntoView({ behavior: "smooth" })}
              className="text-base font-bold leading-6 text-slate-900 flex items-center gap-2 group hover:text-[#FF9933] transition-colors"
            >
              Check Eligibility <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
        
        {/* Elegant Abstract Tri-Color Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-20 max-w-3xl border-t border-slate-200/80 pt-12 sm:mt-24 lg:mx-0 lg:max-w-none lg:flex lg:justify-center"
        >
          <dl className="grid grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-3 text-center">
            <div className="flex flex-col-reverse gap-y-3">
              <dt className="text-sm leading-7 text-slate-500 font-bold uppercase tracking-widest">Active Programs</dt>
              <dd className="text-5xl font-black tracking-tight text-[#FF9933]">50+</dd>
            </div>
            <div className="flex flex-col-reverse gap-y-3">
              <dt className="text-sm leading-7 text-slate-500 font-bold uppercase tracking-widest">Verified Records</dt>
              <dd className="text-5xl font-black tracking-tight text-[#000080]">100%</dd>
            </div>
            <div className="flex flex-col-reverse gap-y-3">
              <dt className="text-sm leading-7 text-slate-500 font-bold uppercase tracking-widest">Citizen Cost</dt>
              <dd className="text-5xl font-black tracking-tight text-[#138808]">Free</dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
