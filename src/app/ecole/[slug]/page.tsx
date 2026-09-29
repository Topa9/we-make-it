<<<<<<< HEAD
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ecoleData } from "@/data/ecole-data";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default async function EcoleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = ecoleData[slug];

  if (!detail) {
    notFound();
  }

  const Icon = detail.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Header Banner */}
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-4">
            <Link 
              href="/ecole" 
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Retour à la présentation générale
            </Link>
            <div className="flex items-center gap-3">
              <Icon className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                Pôle D'Excellence
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {detail.detailTitle}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              {detail.detailSubtitle}
            </p>
          </div>
        </section>

        {/* Detail Content Section */}
        <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
          
          {/* Paragraphs */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Présentation Détaillée
            </h2>
            {detail.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Highlights */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Points Forts & Spécificités
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {detail.highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Back Action */}
          <div className="pt-4 text-center">
            <Link 
              href="/ecole" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" /> Découvrir les autres piliers de l'école
            </Link>
          </div>

        </section>
      </div>

      <Footer />
    </div>
  );
=======
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ecoleData } from "@/data/ecole-data";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default async function EcoleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = ecoleData[slug];

  if (!detail) {
    notFound();
  }

  const Icon = detail.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Header Banner */}
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-4">
            <Link 
              href="/ecole" 
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Retour à la présentation générale
            </Link>
            <div className="flex items-center gap-3">
              <Icon className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                Pôle D'Excellence
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {detail.detailTitle}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              {detail.detailSubtitle}
            </p>
          </div>
        </section>

        {/* Detail Content Section */}
        <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
          
          {/* Paragraphs */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Présentation Détaillée
            </h2>
            {detail.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Highlights */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Points Forts & Spécificités
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {detail.highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Back Action */}
          <div className="pt-4 text-center">
            <Link 
              href="/ecole" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" /> Découvrir les autres piliers de l'école
            </Link>
          </div>

        </section>
      </div>

      <Footer />
    </div>
  );
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}