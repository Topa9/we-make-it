<<<<<<< HEAD
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { GraduationCap, ArrowRight, Clock } from 'lucide-react'

export default async function PublicFilieresPage() {
  const supabase = await createClient()

  // Fetch all filières from your database
  const { data: filieres, error } = await supabase
    .from('Filiere')
    .select('*')
    .order('createdAt', { ascending: false })

  if (error) {
    console.error('Error loading public filieres:', error)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <div>
        {/* NAVBAR CENTRALISÉ */}
        <Navbar />

        {/* Header Banner */}
        <div className="bg-[#0b1329] text-white py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
              Diplômes d'État Accrédités
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              Filières de Spécialisation Infirmière
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
              Découvrez nos cursus LMD professionnels conformes aux directives du Ministère de la Santé, enrichis par l'hôpital de simulation virtuelle.
            </p>
          </div>
        </div>

        {/* Grid of Dynamic Filières */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {filieres && filieres.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filieres.map((filiere) => (
                <div 
                  key={filiere.id}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100">
                        {filiere.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {filiere.degree || 'Licence Professionnelle'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {filiere.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {filiere.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>Durée : {filiere.durationYears || 3} Ans ({filiere.degree === 'Master' ? '4 Semestres' : '6 Semestres'})</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link 
                      href={`/filieres/${filiere.id}`}
                      className="w-full py-2.5 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center justify-center gap-2 group"
                    >
                      <span>Consulter le Programme & Modules</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 max-w-xl mx-auto space-y-3">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">Aucune filière publiée pour l'instant</h3>
              <p className="text-xs text-slate-500">Utilisez votre tableau de bord administrateur pour ajouter de nouvelles filières.</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER CENTRALISÉ */}
      <Footer />
    </div>
  )
=======
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { GraduationCap, ArrowRight, Clock } from 'lucide-react'

export default async function PublicFilieresPage() {
  const supabase = await createClient()

  // Fetch all filières from your database
  const { data: filieres, error } = await supabase
    .from('Filiere')
    .select('*')
    .order('createdAt', { ascending: false })

  if (error) {
    console.error('Error loading public filieres:', error)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <div>
        {/* NAVBAR CENTRALISÉ */}
        <Navbar />

        {/* Header Banner */}
        <div className="bg-[#0b1329] text-white py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
              Diplômes d'État Accrédités
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              Filières de Spécialisation Infirmière
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
              Découvrez nos cursus LMD professionnels conformes aux directives du Ministère de la Santé, enrichis par l'hôpital de simulation virtuelle.
            </p>
          </div>
        </div>

        {/* Grid of Dynamic Filières */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {filieres && filieres.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filieres.map((filiere) => (
                <div 
                  key={filiere.id}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100">
                        {filiere.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {filiere.degree || 'Licence Professionnelle'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {filiere.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {filiere.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>Durée : {filiere.durationYears || 3} Ans ({filiere.degree === 'Master' ? '4 Semestres' : '6 Semestres'})</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link 
                      href={`/filieres/${filiere.id}`}
                      className="w-full py-2.5 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center justify-center gap-2 group"
                    >
                      <span>Consulter le Programme & Modules</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 max-w-xl mx-auto space-y-3">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">Aucune filière publiée pour l'instant</h3>
              <p className="text-xs text-slate-500">Utilisez votre tableau de bord administrateur pour ajouter de nouvelles filières.</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER CENTRALISÉ */}
      <Footer />
    </div>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}