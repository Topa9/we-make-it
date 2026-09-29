<<<<<<< HEAD
import Link from 'next/link'
import { Activity, ShieldCheck, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-[#0b1329] text-white py-16 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#00875A]/20 border border-[#00875A]/40 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
            <ShieldCheck size={16} />
            <span>Excellence Médicale & Formation Clinique Accréditée</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Former l’Élite des Soins Infirmiers & de la Santé de Demain.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
            Inspirée de la rigueur académique universitaire marocaine et dotée d’un hôpital de 
            simulation virtuelle de dernière génération. Préparez-vous aux réalités du bloc 
            opératoire, des urgences et de la réanimation hospitalière.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link 
              href="/filieres" 
              className="px-6 py-3.5 bg-[#00875A] hover:bg-[#00704a] text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition"
            >
              Découvrir les Filières <ArrowRight size={18} />
            </Link>

          </div>
        </div>

        {/* Right Column: Dynamic Live Simulation Widget */}
        <div className="lg:col-span-5">
          <div className="bg-[#131d38] border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            
            {/* Widget Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-400">
                <Activity size={16} className="animate-pulse" />
                <span>Live Simulation Lab</span>
              </div>
              <span className="bg-slate-800 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-slate-700">
                SimMan 3G Ready
              </span>
            </div>

            {/* Sim Metric 1 */}
            <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-4 mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium block mb-1">Fréquence Cardiaque Simulée</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-400 font-mono">74</span>
                  <span className="text-xs font-bold text-slate-400">BPM</span>
                </div>
              </div>
              <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 text-xs font-semibold px-3 py-1 rounded-md">
                Rythme Sinusal Stable
              </span>
            </div>

            {/* Sim Metric 2 */}
            <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-4">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-slate-400 font-medium">Atelier Urgence S4</span>
                <span className="text-xs text-amber-400 font-semibold">Salle 204</span>
              </div>
              <h4 className="font-bold text-white text-base mb-1">Pose de Cathéter & Intubation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Les étudiants en S3 et S5 effectuent actuellement leur stage de pré-garde en réanimation médico-chirurgicale.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
=======
import Link from 'next/link'
import { Activity, ShieldCheck, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-[#0b1329] text-white py-16 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#00875A]/20 border border-[#00875A]/40 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
            <ShieldCheck size={16} />
            <span>Excellence Médicale & Formation Clinique Accréditée</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Former l’Élite des Soins Infirmiers & de la Santé de Demain.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
            Inspirée de la rigueur académique universitaire marocaine et dotée d’un hôpital de 
            simulation virtuelle de dernière génération. Préparez-vous aux réalités du bloc 
            opératoire, des urgences et de la réanimation hospitalière.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link 
              href="/filieres" 
              className="px-6 py-3.5 bg-[#00875A] hover:bg-[#00704a] text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition"
            >
              Découvrir les Filières <ArrowRight size={18} />
            </Link>

          </div>
        </div>

        {/* Right Column: Dynamic Live Simulation Widget */}
        <div className="lg:col-span-5">
          <div className="bg-[#131d38] border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            
            {/* Widget Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-400">
                <Activity size={16} className="animate-pulse" />
                <span>Live Simulation Lab</span>
              </div>
              <span className="bg-slate-800 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-slate-700">
                SimMan 3G Ready
              </span>
            </div>

            {/* Sim Metric 1 */}
            <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-4 mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium block mb-1">Fréquence Cardiaque Simulée</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-400 font-mono">74</span>
                  <span className="text-xs font-bold text-slate-400">BPM</span>
                </div>
              </div>
              <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 text-xs font-semibold px-3 py-1 rounded-md">
                Rythme Sinusal Stable
              </span>
            </div>

            {/* Sim Metric 2 */}
            <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-4">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-slate-400 font-medium">Atelier Urgence S4</span>
                <span className="text-xs text-amber-400 font-semibold">Salle 204</span>
              </div>
              <h4 className="font-bold text-white text-base mb-1">Pose de Cathéter & Intubation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Les étudiants en S3 et S5 effectuent actuellement leur stage de pré-garde en réanimation médico-chirurgicale.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}