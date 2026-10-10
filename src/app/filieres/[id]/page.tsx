<<<<<<< HEAD
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Clock, Award, BookOpen, CheckCircle, Briefcase, Calendar, MapPin, User } from "lucide-react";

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const TIME_SLOTS = [
  '08:30 - 10:30',
  '10:30 - 12:30',
  '14:30 - 16:30',
  '16:30 - 18:30'
];

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function FiliereDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Fetch the specific Filiere by ID
  const { data: filiere, error: filiereError } = await supabase
    .from('Filiere')
    .select('*')
    .eq('id', id)
    .single()

  if (filiereError || !filiere) {
    notFound()
  }

  // 2. Fetch all Modules linked to this Filiere
  const { data: modules } = await supabase
    .from('Module')
    .select('*')
    .eq('filiereId', id)
    .order('semester', { ascending: true })

  // 3. Fetch Timetable Slots for this Filiere created by Admin
  const { data: timetableSlots } = await supabase
    .from('TimetableSlot')
    .select(`
      id, day, timeSlot, classroom, semester,
      Module ( id, code, name ),
      TeacherProfile ( id, User ( firstName, lastName, email ) )
    `)
    .eq('filiereId', id)

  // Split text lines into dynamic arrays for bullet points
  const objectivesList = filiere.objectives ? filiere.objectives.split('\n').filter(Boolean) : [
    "Évaluer l'état de santé d'une personne et analyser les situations de soin.",
    "Concevoir, définir et planifier des projets de soins personnalisés."
  ]

  const debouchesList = filiere.debouches ? filiere.debouches.split('\n').filter(Boolean) : [
    "Hôpitaux publics et centres hospitaliers (CHU)",
    "Cliniques privées et centres de santé"
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <Link href="/filieres" className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition">
            <ArrowLeft className="w-4 h-4" /> Retour aux Filières
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Code: {filiere.code}
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {filiere.durationYears || 3} Ans ({filiere.degree === 'Master' ? '4 Semestres' : '6 Semestres'})
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> {filiere.degree || 'Licence Professionnelle d\'État'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">{filiere.name}</h1>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-8">
          
          {/* Presentation */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Présentation du Programme</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {filiere.description}
            </p>
          </div>

          {/* Dynamic Objectives */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" /> Objectifs de la Formation
            </h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {objectivesList.map((obj: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span> {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Modules Enseignés Grouped by Semester */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" /> Modules Enseignés par Semestre
            </h2>
            
            {modules && modules.length > 0 ? (
              Array.from(new Set(modules.map((m: any) => m.semester)))
                .sort()
                .map((sem: any) => {
                  const semModules = modules.filter((m: any) => m.semester === sem);
                  const semTotalHours = semModules.reduce((acc: number, curr: any) => acc + (curr.hours || 0), 0);
                  const semSlots = (timetableSlots || []).filter((s: any) => s.semester === sem);

                  return (
                    <details key={sem} className="group space-y-3 pt-4 first:pt-0 border-t border-slate-100 first:border-none">
                      <summary className="cursor-pointer flex flex-wrap justify-between items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 transition list-none">
                        <span className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                          Semestre {sem}
                        </span>

                        <div className="flex items-center gap-3 mt-2 sm:mt-0">
                          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                            {semTotalHours} Heures au total
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg shadow-sm transition">
                            <Calendar className="w-3.5 h-3.5" /> Voir Emploi du Temps ({semSlots.length})
                          </span>
                        </div>
                      </summary>

                      {/* Semester Modules Grid */}
                      <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 pt-3">
                        {semModules.map((mod: any) => (
                          <div key={mod.id} className="p-3.5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between gap-1 shadow-sm hover:border-slate-300 transition">
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold">{mod.code}</span>
                              <span className="text-emerald-600 font-bold">{mod.hours}h</span>
                            </div>
                            <span className="text-slate-900 font-bold text-sm mt-1">{mod.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Timetable Grid */}
                      <div className="pt-4 space-y-2">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-emerald-600" /> Planning des Séances - Semestre {sem}
                        </h4>

                        {semSlots.length > 0 ? (
                          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
                            <table className="w-full border-collapse text-xs text-center">
                              <thead>
                                <tr className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                                  <th className="p-2 border-r border-slate-200 w-24">Créneau</th>
                                  {DAYS.map((day) => (
                                    <th key={day} className="p-2 border-r border-slate-200 last:border-none">{day}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {TIME_SLOTS.map((time) => (
                                  <tr key={time} className="border-b border-slate-100 last:border-none">
                                    <td className="p-2 font-mono font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">
                                      {time}
                                    </td>
                                    {DAYS.map((day) => {
                                      const matchedSlot = semSlots.find(
                                        (s: any) => s.day === day && s.timeSlot === time
                                      );

                                      // Safely extract teacher information
                                      const teacherData = Array.isArray(matchedSlot?.TeacherProfile)
                                        ? matchedSlot?.TeacherProfile[0]
                                        : matchedSlot?.TeacherProfile;

                                      const userData = Array.isArray(teacherData?.User)
                                        ? teacherData?.User[0]
                                        : teacherData?.User;

                                      const moduleData = Array.isArray(matchedSlot?.Module)
                                        ? matchedSlot?.Module[0]
                                        : matchedSlot?.Module;

                                      return (
                                        <td key={day} className="p-2 border-r border-slate-200 last:border-none align-top h-20 bg-white">
                                          {matchedSlot ? (
                                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-2 rounded-lg text-left h-full flex flex-col justify-between">
                                              <div>
                                                <span className="font-mono font-bold text-[9px] bg-emerald-200 text-emerald-800 px-1 py-0.5 rounded">
                                                  {moduleData?.code || 'MOD'}
                                                </span>
                                                <div className="font-bold text-[11px] mt-1 leading-tight line-clamp-2">
                                                  {moduleData?.name || 'Module'}
                                                </div>
                                              </div>
                                              <div className="text-[10px] text-slate-500 space-y-0.5 mt-1 border-t border-emerald-100 pt-1">
                                                <div className="flex items-center gap-1 font-semibold text-emerald-700">
                                                  <MapPin className="w-3 h-3 text-emerald-600" /> {matchedSlot.classroom}
                                                </div>
                                                {userData && (
                                                  <div className="flex items-center gap-1 truncate text-slate-600">
                                                    <User className="w-3 h-3 text-slate-400" />
                                                    {userData.lastName
                                                      ? `${userData.firstName || ''} ${userData.lastName}`
                                                      : userData.email}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          ) : (
                                            <span className="text-slate-300 text-[10px] italic">Libre</span>
                                          )}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-400 italic">
                            Aucun emploi du temps n'a encore été configuré par l'administration pour le Semestre {sem}.
                          </div>
                        )}
                      </div>
                    </details>
                  );
                })
            ) : (
              <p className="text-xs text-slate-400 italic py-4">Aucun module n'a encore été configuré pour cette filière.</p>
            )}
          </div>
        </div>    

        {/* Sidebar - Dynamic Débouchés */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" /> Débouchés
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {debouchesList.map((deb: string, index: number) => (
                <li key={index} className="flex items-center gap-2 border-b border-slate-100 pb-2 last:border-none">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full shrink-0"></span> {deb}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 text-center">
            <h3 className="text-lg font-bold">Inscriptions Ouvertes</h3>
            <p className="text-xs text-slate-300">Soumettez votre candidature pour le concours d'accès.</p>
            <Link href="/inscriptions" className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition">
              S'inscrire Maintenant
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
=======
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Clock, Award, BookOpen, CheckCircle, Briefcase, Calendar, MapPin, User } from "lucide-react";

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const TIME_SLOTS = [
  '08:30 - 10:30',
  '10:30 - 12:30',
  '14:30 - 16:30',
  '16:30 - 18:30'
];

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function FiliereDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Fetch the specific Filiere by ID
  const { data: filiere, error: filiereError } = await supabase
    .from('Filiere')
    .select('*')
    .eq('id', id)
    .single()

  if (filiereError || !filiere) {
    notFound()
  }

  // 2. Fetch all Modules linked to this Filiere
  const { data: modules } = await supabase
    .from('Module')
    .select('*')
    .eq('filiereId', id)
    .order('semester', { ascending: true })

  // 3. Fetch Timetable Slots for this Filiere created by Admin
  const { data: timetableSlots } = await supabase
    .from('TimetableSlot')
    .select(`
      id, day, timeSlot, classroom, semester,
      Module ( id, code, name ),
      TeacherProfile ( id, User ( firstName, lastName, email ) )
    `)
    .eq('filiereId', id)

  // Split text lines into dynamic arrays for bullet points
  const objectivesList = filiere.objectives ? filiere.objectives.split('\n').filter(Boolean) : [
    "Évaluer l'état de santé d'une personne et analyser les situations de soin.",
    "Concevoir, définir et planifier des projets de soins personnalisés."
  ]

  const debouchesList = filiere.debouches ? filiere.debouches.split('\n').filter(Boolean) : [
    "Hôpitaux publics et centres hospitaliers (CHU)",
    "Cliniques privées et centres de santé"
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <Link href="/filieres" className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition">
            <ArrowLeft className="w-4 h-4" /> Retour aux Filières
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Code: {filiere.code}
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {filiere.durationYears || 3} Ans ({filiere.degree === 'Master' ? '4 Semestres' : '6 Semestres'})
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> {filiere.degree || 'Licence Professionnelle d\'État'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">{filiere.name}</h1>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-8">
          
          {/* Presentation */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Présentation du Programme</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {filiere.description}
            </p>
          </div>

          {/* Dynamic Objectives */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" /> Objectifs de la Formation
            </h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {objectivesList.map((obj: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span> {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Modules Enseignés Grouped by Semester */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" /> Modules Enseignés par Semestre
            </h2>
            
            {modules && modules.length > 0 ? (
              Array.from(new Set(modules.map((m: any) => m.semester)))
                .sort()
                .map((sem: any) => {
                  const semModules = modules.filter((m: any) => m.semester === sem);
                  const semTotalHours = semModules.reduce((acc: number, curr: any) => acc + (curr.hours || 0), 0);
                  const semSlots = (timetableSlots || []).filter((s: any) => s.semester === sem);

                  return (
                    <details key={sem} className="group space-y-3 pt-4 first:pt-0 border-t border-slate-100 first:border-none">
                      <summary className="cursor-pointer flex flex-wrap justify-between items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 transition list-none">
                        <span className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                          Semestre {sem}
                        </span>

                        <div className="flex items-center gap-3 mt-2 sm:mt-0">
                          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                            {semTotalHours} Heures au total
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg shadow-sm transition">
                            <Calendar className="w-3.5 h-3.5" /> Voir Emploi du Temps ({semSlots.length})
                          </span>
                        </div>
                      </summary>

                      {/* Semester Modules Grid */}
                      <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 pt-3">
                        {semModules.map((mod: any) => (
                          <div key={mod.id} className="p-3.5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between gap-1 shadow-sm hover:border-slate-300 transition">
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold">{mod.code}</span>
                              <span className="text-emerald-600 font-bold">{mod.hours}h</span>
                            </div>
                            <span className="text-slate-900 font-bold text-sm mt-1">{mod.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Timetable Grid */}
                      <div className="pt-4 space-y-2">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-emerald-600" /> Planning des Séances - Semestre {sem}
                        </h4>

                        {semSlots.length > 0 ? (
                          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
                            <table className="w-full border-collapse text-xs text-center">
                              <thead>
                                <tr className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                                  <th className="p-2 border-r border-slate-200 w-24">Créneau</th>
                                  {DAYS.map((day) => (
                                    <th key={day} className="p-2 border-r border-slate-200 last:border-none">{day}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {TIME_SLOTS.map((time) => (
                                  <tr key={time} className="border-b border-slate-100 last:border-none">
                                    <td className="p-2 font-mono font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">
                                      {time}
                                    </td>
                                    {DAYS.map((day) => {
                                      const matchedSlot = semSlots.find(
                                        (s: any) => s.day === day && s.timeSlot === time
                                      );

                                      // Safely extract teacher information
                                      const teacherData = Array.isArray(matchedSlot?.TeacherProfile)
                                        ? matchedSlot?.TeacherProfile[0]
                                        : matchedSlot?.TeacherProfile;

                                      const userData = Array.isArray(teacherData?.User)
                                        ? teacherData?.User[0]
                                        : teacherData?.User;

                                      const moduleData = Array.isArray(matchedSlot?.Module)
                                        ? matchedSlot?.Module[0]
                                        : matchedSlot?.Module;

                                      return (
                                        <td key={day} className="p-2 border-r border-slate-200 last:border-none align-top h-20 bg-white">
                                          {matchedSlot ? (
                                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-2 rounded-lg text-left h-full flex flex-col justify-between">
                                              <div>
                                                <span className="font-mono font-bold text-[9px] bg-emerald-200 text-emerald-800 px-1 py-0.5 rounded">
                                                  {moduleData?.code || 'MOD'}
                                                </span>
                                                <div className="font-bold text-[11px] mt-1 leading-tight line-clamp-2">
                                                  {moduleData?.name || 'Module'}
                                                </div>
                                              </div>
                                              <div className="text-[10px] text-slate-500 space-y-0.5 mt-1 border-t border-emerald-100 pt-1">
                                                <div className="flex items-center gap-1 font-semibold text-emerald-700">
                                                  <MapPin className="w-3 h-3 text-emerald-600" /> {matchedSlot.classroom}
                                                </div>
                                                {userData && (
                                                  <div className="flex items-center gap-1 truncate text-slate-600">
                                                    <User className="w-3 h-3 text-slate-400" />
                                                    {userData.lastName
                                                      ? `${userData.firstName || ''} ${userData.lastName}`
                                                      : userData.email}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          ) : (
                                            <span className="text-slate-300 text-[10px] italic">Libre</span>
                                          )}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-400 italic">
                            Aucun emploi du temps n'a encore été configuré par l'administration pour le Semestre {sem}.
                          </div>
                        )}
                      </div>
                    </details>
                  );
                })
            ) : (
              <p className="text-xs text-slate-400 italic py-4">Aucun module n'a encore été configuré pour cette filière.</p>
            )}
          </div>
        </div>    

        {/* Sidebar - Dynamic Débouchés */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" /> Débouchés
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {debouchesList.map((deb: string, index: number) => (
                <li key={index} className="flex items-center gap-2 border-b border-slate-100 pb-2 last:border-none">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full shrink-0"></span> {deb}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 text-center">
            <h3 className="text-lg font-bold">Inscriptions Ouvertes</h3>
            <p className="text-xs text-slate-300">Soumettez votre candidature pour le concours d'accès.</p>
            <Link href="/inscriptions" className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition">
              S'inscrire Maintenant
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}