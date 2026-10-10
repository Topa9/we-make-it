<<<<<<< HEAD
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ecoleData } from "@/data/ecole-data";
import { ArrowRight } from "lucide-react";

export default function EcolePage() {
  const sections = Object.values(ecoleData);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />
        
        {/* Header Banner */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Institution Accréditée</span>
            <h1 className="text-4xl font-extrabold">À Propos de l'ESSI MAROC</h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Former les cadres paramédicaux de haut niveau avec une exigence académique alignée sur les standards internationaux.
            </p>
          </div>
        </section>

        {/* 3 Clickable Cards */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link 
                key={sec.slug}
                href={`/ecole/${sec.slug}`}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all group flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <Icon className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {sec.cardTitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {sec.cardDescription}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 pt-4 border-t border-slate-100">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </section>
      </div>

      <Footer />
    </div>
  );
=======
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ecoleData } from "@/data/ecole-data";
import { ArrowRight } from "lucide-react";

export default function EcolePage() {
  const sections = Object.values(ecoleData);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />
        
        {/* Header Banner */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Institution Accréditée</span>
            <h1 className="text-4xl font-extrabold">À Propos de l'ESSI MAROC</h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Former les cadres paramédicaux de haut niveau avec une exigence académique alignée sur les standards internationaux.
            </p>
          </div>
        </section>

        {/* 3 Clickable Cards */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link 
                key={sec.slug}
                href={`/ecole/${sec.slug}`}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all group flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <Icon className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {sec.cardTitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {sec.cardDescription}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 pt-4 border-t border-slate-100">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </section>
      </div>

      <Footer />
    </div>
  );
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}