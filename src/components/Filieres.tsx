<<<<<<< HEAD
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight, Clock, GraduationCap } from 'lucide-react'

export default async function Filieres() {
  const supabase = await createClient()

  // Fetch only 3 active filières directly from Supabase
  const { data: filieres } = await supabase
    .from('Filiere')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(3)

  return (
    <section className="bg-slate-50 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* SINGLE CLEAN SECTION HEADER */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Diplômes d'État Accrédités
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Filières de Spécialisation Infirmière
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Un cursus LMD professionnel conforme aux directives du Ministère de la Santé et du Ministère de l'Enseignement Supérieur du Royaume du Maroc.
          </p>
        </div>

        {/* DYNAMIC FILIÈRES CARDS (TOP 3) */}
        {filieres && filieres.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filieres.map((filiere) => (
              <div 
                key={filiere.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100">
                      {filiere.code}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {filiere.degree || 'Licence Professionnelle'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {filiere.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {filiere.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Durée : {filiere.durationYears || 3} Ans</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link 
                    href={`/filieres/${filiere.id}`}
                    className="w-full py-2.5 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center justify-center gap-2 group"
                  >
                    <span>Consulter le Programme</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto space-y-2">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">Aucune filière disponible pour le moment.</p>
          </div>
        )}

        {/* VIEW ALL BUTTON */}
        <div className="text-center pt-4">
          <Link
            href="/filieres"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition"
          >
            <span>Voir Toutes les Filières Accréditées</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
=======
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight, Clock, GraduationCap } from 'lucide-react'

export default async function Filieres() {
  const supabase = await createClient()

  // Fetch only 3 active filières directly from Supabase
  const { data: filieres } = await supabase
    .from('Filiere')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(3)

  return (
    <section className="bg-slate-50 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* SINGLE CLEAN SECTION HEADER */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Diplômes d'État Accrédités
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Filières de Spécialisation Infirmière
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Un cursus LMD professionnel conforme aux directives du Ministère de la Santé et du Ministère de l'Enseignement Supérieur du Royaume du Maroc.
          </p>
        </div>

        {/* DYNAMIC FILIÈRES CARDS (TOP 3) */}
        {filieres && filieres.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filieres.map((filiere) => (
              <div 
                key={filiere.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100">
                      {filiere.code}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {filiere.degree || 'Licence Professionnelle'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {filiere.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {filiere.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Durée : {filiere.durationYears || 3} Ans</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link 
                    href={`/filieres/${filiere.id}`}
                    className="w-full py-2.5 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center justify-center gap-2 group"
                  >
                    <span>Consulter le Programme</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto space-y-2">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">Aucune filière disponible pour le moment.</p>
          </div>
        )}

        {/* VIEW ALL BUTTON */}
        <div className="text-center pt-4">
          <Link
            href="/filieres"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition"
          >
            <span>Voir Toutes les Filières Accréditées</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}