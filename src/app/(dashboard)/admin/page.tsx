<<<<<<< HEAD
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Settings, UserPlus, Users, GraduationCap, BookOpen, Layers, AlertCircle, Calendar, Newspaper } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch real-time counts from database tables
  const { count: studentCount } = await supabase
    .from('User')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'STUDENT')

  const { count: teacherCount } = await supabase
    .from('TeacherProfile')
    .select('*', { count: 'exact', head: true })

  const { count: filiereCount } = await supabase
    .from('Filiere')
    .select('*', { count: 'exact', head: true })

  const { count: moduleCount } = await supabase
    .from('Module')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans bg-slate-50 min-h-screen text-slate-800">
      
      {/* Top Header Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Direction & Administration
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">Vue Globale Établissement</h1>
          <p className="text-xs text-slate-500 font-medium">Année Académique 2026/2027</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link 
            href="/admin/emploi-du-temps" 
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Calendar className="w-4 h-4 text-emerald-600" /> Emploi du Temps
          </Link>
          <Link 
            href="/admin/actualities" 
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Newspaper className="w-4 h-4 text-emerald-600" /> Actualités
          </Link>
          <Link 
            href="/admin/filieres" 
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Settings className="w-4 h-4 text-slate-500" /> Configurer Semestres
          </Link>
          <Link 
            href="/admin/nouveau-utilisateur" 
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition"
          >
            <UserPlus className="w-4 h-4" /> Nouvel Utilisateur
          </Link>
        </div>
      </div>

      {/* Real-Time Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Students */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Étudiants Inscrits</span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Users className="w-4 h-4" /></span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {studentCount ?? 0}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>Donnée synchronisée DB</span>
          </p>
        </div>

        {/* Card 2: Teachers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Professeurs & Encadrants</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><GraduationCap className="w-4 h-4" /></span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {teacherCount ?? 0}
          </div>
          <p className="text-[11px] text-slate-500 font-semibold">
            Actifs au département
          </p>
        </div>

        {/* Card 3: Filieres */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filières Accréditées</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Layers className="w-4 h-4" /></span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {filiereCount ?? 0}
          </div>
          <p className="text-[11px] text-blue-600 font-semibold">
            Cycles LMD Configurés
          </p>
        </div>

        {/* Card 4: Modules */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modules Enseignés</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl"><BookOpen className="w-4 h-4" /></span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {moduleCount ?? 0}
          </div>
          <p className="text-[11px] text-amber-600 font-semibold">
            Répartis sur les semestres
          </p>
        </div>

      </div>

      {/* Lower Section: Tasks & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Administrative Tasks */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <AlertCircle className="w-5 h-5 text-indigo-600" /> Tâches Administratives & Planning
          </h2>
          
          <div className="space-y-3">
            {/* Planification des Séances -> /admin/emploi-du-temps */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Planification des Séances & Salles</h4>
                <p className="text-xs text-slate-500 mt-0.5">Configurer l'emploi du temps par filière, semestre et amphi.</p>
              </div>
              <Link href="/admin/emploi-du-temps" className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition">
                Planifier
              </Link>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Validation des Modules & Attribution Enseignants</h4>
                <p className="text-xs text-slate-500 mt-0.5">Configurer la matrice LMD et affecter les coordinateurs aux modules.</p>
              </div>
              <Link href="/admin/filieres" className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition">
                Gérer
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Quick Access Links */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Gestion Accès Rapide
          </h2>
          
          <div className="space-y-3">
            {/* Emploi du Temps Quick Action -> /admin/emploi-du-temps */}
            <Link href="/admin/emploi-du-temps" className="p-3.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 flex items-center justify-between transition group">
              <div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-600">Emploi du Temps</h4>
                <p className="text-[11px] text-slate-500">Grille hebdomadaire, cours et salles</p>
              </div>
              <Calendar className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
            </Link>

            <Link href="/admin/nouveau-utilisateur" className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 flex items-center justify-between transition group">
              <div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600">Créer un Utilisateur</h4>
                <p className="text-[11px] text-slate-500">Inscrire étudiants et enseignants</p>
              </div>
              <UserPlus className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
            </Link>

            <Link href="/admin/filieres" className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 flex items-center justify-between transition group">
              <div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600">Programmes Filières & LMD</h4>
                <p className="text-[11px] text-slate-500">Gérer les cursus, ECTS et enseignants</p>
              </div>
              <Layers className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
            </Link>

            <Link href="/admin/actualities" className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 flex items-center justify-between transition group">
              <div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600">Gestion des Actualités</h4>
                <p className="text-[11px] text-slate-500">Publier ou supprimer les annonces</p>
              </div>
              <Newspaper className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
=======
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Settings, UserPlus, Users, GraduationCap, BookOpen, Layers, AlertCircle, Calendar, Newspaper } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch real-time counts from database tables
  const { count: studentCount } = await supabase
    .from('User')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'STUDENT')

  const { count: teacherCount } = await supabase
    .from('TeacherProfile')
    .select('*', { count: 'exact', head: true })

  const { count: filiereCount } = await supabase
    .from('Filiere')
    .select('*', { count: 'exact', head: true })

  const { count: moduleCount } = await supabase
    .from('Module')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans bg-slate-50 min-h-screen text-slate-800">
      
      {/* Top Header Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Direction & Administration
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">Vue Globale Établissement</h1>
          <p className="text-xs text-slate-500 font-medium">Année Académique 2026/2027</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link 
            href="/admin/emploi-du-temps" 
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Calendar className="w-4 h-4 text-emerald-600" /> Emploi du Temps
          </Link>
          <Link 
            href="/admin/actualities" 
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Newspaper className="w-4 h-4 text-emerald-600" /> Actualités
          </Link>
          <Link 
            href="/admin/filieres" 
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Settings className="w-4 h-4 text-slate-500" /> Configurer Semestres
          </Link>
          <Link 
            href="/admin/nouveau-utilisateur" 
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition"
          >
            <UserPlus className="w-4 h-4" /> Nouvel Utilisateur
          </Link>
        </div>
      </div>

      {/* Real-Time Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Students */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Étudiants Inscrits</span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Users className="w-4 h-4" /></span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {studentCount ?? 0}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>Donnée synchronisée DB</span>
          </p>
        </div>

        {/* Card 2: Teachers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Professeurs & Encadrants</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><GraduationCap className="w-4 h-4" /></span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {teacherCount ?? 0}
          </div>
          <p className="text-[11px] text-slate-500 font-semibold">
            Actifs au département
          </p>
        </div>

        {/* Card 3: Filieres */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filières Accréditées</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Layers className="w-4 h-4" /></span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {filiereCount ?? 0}
          </div>
          <p className="text-[11px] text-blue-600 font-semibold">
            Cycles LMD Configurés
          </p>
        </div>

        {/* Card 4: Modules */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modules Enseignés</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl"><BookOpen className="w-4 h-4" /></span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {moduleCount ?? 0}
          </div>
          <p className="text-[11px] text-amber-600 font-semibold">
            Répartis sur les semestres
          </p>
        </div>

      </div>

      {/* Lower Section: Tasks & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Administrative Tasks */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <AlertCircle className="w-5 h-5 text-indigo-600" /> Tâches Administratives & Planning
          </h2>
          
          <div className="space-y-3">
            {/* Planification des Séances -> /admin/emploi-du-temps */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Planification des Séances & Salles</h4>
                <p className="text-xs text-slate-500 mt-0.5">Configurer l'emploi du temps par filière, semestre et amphi.</p>
              </div>
              <Link href="/admin/emploi-du-temps" className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition">
                Planifier
              </Link>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Validation des Modules & Attribution Enseignants</h4>
                <p className="text-xs text-slate-500 mt-0.5">Configurer la matrice LMD et affecter les coordinateurs aux modules.</p>
              </div>
              <Link href="/admin/filieres" className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition">
                Gérer
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Quick Access Links */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Gestion Accès Rapide
          </h2>
          
          <div className="space-y-3">
            {/* Emploi du Temps Quick Action -> /admin/emploi-du-temps */}
            <Link href="/admin/emploi-du-temps" className="p-3.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 flex items-center justify-between transition group">
              <div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-600">Emploi du Temps</h4>
                <p className="text-[11px] text-slate-500">Grille hebdomadaire, cours et salles</p>
              </div>
              <Calendar className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
            </Link>

            <Link href="/admin/nouveau-utilisateur" className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 flex items-center justify-between transition group">
              <div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600">Créer un Utilisateur</h4>
                <p className="text-[11px] text-slate-500">Inscrire étudiants et enseignants</p>
              </div>
              <UserPlus className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
            </Link>

            <Link href="/admin/filieres" className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 flex items-center justify-between transition group">
              <div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600">Programmes Filières & LMD</h4>
                <p className="text-[11px] text-slate-500">Gérer les cursus, ECTS et enseignants</p>
              </div>
              <Layers className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
            </Link>

            <Link href="/admin/actualities" className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 flex items-center justify-between transition group">
              <div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600">Gestion des Actualités</h4>
                <p className="text-[11px] text-slate-500">Publier ou supprimer les annonces</p>
              </div>
              <Newspaper className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}