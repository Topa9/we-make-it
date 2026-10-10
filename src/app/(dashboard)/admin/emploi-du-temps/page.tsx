<<<<<<< HEAD
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Calendar, Clock, Plus, Trash2, MapPin, User, Loader2 } from 'lucide-react'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const TIME_SLOTS = [
  '08:30 - 10:30',
  '10:30 - 12:30',
  '14:30 - 16:30',
  '16:30 - 18:30'
]

export default function TimetableManagementPage() {
  const supabase = createClient()

  const [filieres, setFilieres] = useState<any[]>([])
  const [selectedFiliereId, setSelectedFiliereId] = useState<string>('')
  const [selectedSemester, setSelectedSemester] = useState<string>('S1')
  
  const [modules, setModules] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [slots, setSlots] = useState<any[]>([])

  // Form State
  const [selectedModuleId, setSelectedModuleId] = useState('')
  const [selectedDay, setSelectedDay] = useState(DAYS[0])
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0])
  const [classroom, setClassroom] = useState('Amphi A')
  const [teacherId, setTeacherId] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  // Load Filières & Teachers
  useEffect(() => {
    async function loadInitialData() {
      const { data: filieresData } = await supabase.from('Filiere').select('*')
      if (filieresData && filieresData.length > 0) {
        setFilieres(filieresData)
        setSelectedFiliereId(filieresData[0].id)
      }

      const { data: teachersData } = await supabase
        .from('TeacherProfile')
        .select(`id, User ( email, firstName, lastName )`)
      if (teachersData) setTeachers(teachersData)
    }
    loadInitialData()
  }, [supabase])

  // Load Modules & Slots
  useEffect(() => {
    async function loadScheduleData() {
      if (!selectedFiliereId) return

      const { data: modulesData } = await supabase
        .from('Module')
        .select('*')
        .eq('filiereId', selectedFiliereId)
        .eq('semester', selectedSemester)

      if (modulesData) setModules(modulesData)

      const { data: slotsData, error } = await supabase
        .from('TimetableSlot')
        .select(`
          id, day, timeSlot, classroom, moduleId, teacherId,
          Module ( id, code, name ),
          TeacherProfile ( id, User ( email, firstName, lastName ) )
        `)
        .eq('filiereId', selectedFiliereId)
        .eq('semester', selectedSemester)

      if (slotsData) setSlots(slotsData)
      if (error) console.error("Erreur de chargement des créneaux:", error)
    }
    loadScheduleData()
  }, [selectedFiliereId, selectedSemester, supabase])

  // Handle Adding Slot
  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedModuleId || !selectedFiliereId) {
      setMessage({ text: 'Veuillez sélectionner un module et une filière.', type: 'error' })
      return
    }

    setLoading(true)

    const payload = {
      id: crypto.randomUUID(),
      filiereId: selectedFiliereId,
      semester: selectedSemester,
      moduleId: selectedModuleId,
      teacherId: teacherId === '' ? null : teacherId,
      day: selectedDay,
      timeSlot: selectedTime,
      classroom: classroom,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('TimetableSlot')
      .insert([payload])
      .select(`
        id, day, timeSlot, classroom, moduleId, teacherId,
        Module ( id, code, name ),
        TeacherProfile ( id, User ( email, firstName, lastName ) )
      `)
      .single()

    if (!error && data) {
      setSlots((prev) => [...prev, data])
      setMessage({ text: 'Séance ajoutée avec succès !', type: 'success' })
    } else {
      console.error('Erreur Supabase Timetable:', error)
      setMessage({ text: 'Erreur: ' + (error?.message || 'Échec de la réservation'), type: 'error' })
    }

    setLoading(false)
    setTimeout(() => setMessage(null), 4000)
  }

  // Handle Delete
  const handleDeleteSlot = async (id: string) => {
    const { error } = await supabase.from('TimetableSlot').delete().eq('id', id)
    if (!error) {
      setSlots(slots.filter(s => s.id !== id))
      setMessage({ text: 'Séance supprimée.', type: 'success' })
      setTimeout(() => setMessage(null), 2000)
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans bg-slate-50 min-h-screen text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Gestion de la Planification
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Planification des Séances & Salles</h1>
          <p className="text-xs text-slate-500">Configurez l'emploi du temps hebdomadaire par filière, semestre et amphi.</p>
        </div>

        {message && (
          <div className={`text-xs px-4 py-2 rounded-lg font-semibold border ${
            message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-4 h-4 text-emerald-600" /> 1. Sélection Cible
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Filière</label>
              <select value={selectedFiliereId} onChange={(e) => setSelectedFiliereId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                {filieres.map(f => <option key={f.id} value={f.id}>{f.name} ({f.code})</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Semestre</label>
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 font-mono">
                {['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].map(sem => <option key={sem} value={sem}>{sem}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-4 h-4 text-emerald-600" /> 2. Programmer une Séance
            </h2>

            <form onSubmit={handleAddSlot} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Module</label>
                {modules.length === 0 ? (
                  <div className="text-xs text-amber-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    Aucun module configuré pour cette filière ({selectedSemester}).
                  </div>
                ) : (
                  <select value={selectedModuleId} onChange={(e) => setSelectedModuleId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600" required>
                    <option value="">-- Choisir un module --</option>
                    {modules.map(m => <option key={m.id} value={m.id}>{m.code} - {m.name}</option>)}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jour</label>
                  <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Créneau</label>
                  <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 font-mono">
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enseignant / Intervenant</label>
                <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                  <option value="">-- Non spécifié --</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.User?.firstName ? `${t.User.firstName} ${t.User.lastName}` : t.User?.email}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Salle / Emplacement</label>
                <input type="text" value={classroom} onChange={(e) => setClassroom(e.target.value)} placeholder="Ex: Amphi A, Salle 12..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600" required />
              </div>

              <button type="submit" disabled={loading || modules.length === 0} className="w-full py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Programmer la Séance
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Grille Hebdomadaire</h2>
              <p className="text-xs text-slate-500">
                Planning de {filieres.find(f => f.id === selectedFiliereId)?.name || 'Sélection'} ({selectedSemester})
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 text-xs text-center">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold">
                  <th className="border border-slate-200 p-2 w-28">Créneau</th>
                  {DAYS.map(day => <th key={day} className="border border-slate-200 p-2">{day}</th>)}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map(time => (
                  <tr key={time}>
                    <td className="border border-slate-200 p-2 font-mono font-semibold bg-slate-50 text-slate-600">
                      {time}
                    </td>
                    {DAYS.map(day => {
                      const matchedSlot = slots.find(s => s.day === day && s.timeSlot === time)
                      return (
                        <td key={day} className="border border-slate-200 p-2 align-top h-24 bg-white hover:bg-slate-50/50">
                          {matchedSlot ? (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-2 rounded-lg text-left h-full flex flex-col justify-between group relative">
                              <div>
                                <span className="font-mono font-bold text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded mr-1">
                                  {matchedSlot.Module?.code}
                                </span>
                                <div className="font-bold text-xs mt-1 leading-tight line-clamp-2">
                                  {matchedSlot.Module?.name}
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-500 space-y-0.5 mt-2 border-t border-emerald-100 pt-1">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-emerald-600" /> {matchedSlot.classroom}
                                </div>
                                {matchedSlot.TeacherProfile && (
                                  <div className="flex items-center gap-1 truncate">
                                    <User className="w-3 h-3 text-emerald-600" />
                                    {matchedSlot.TeacherProfile.User?.lastName 
                                      ? `${matchedSlot.TeacherProfile.User.firstName || ''} ${matchedSlot.TeacherProfile.User.lastName}`
                                      : matchedSlot.TeacherProfile.User?.email}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteSlot(matchedSlot.id)}
                                className="absolute top-1 right-1 p-1 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
                                title="Supprimer la séance"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-300 text-[10px] italic">Disponible</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
=======
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Calendar, Clock, Plus, Trash2, MapPin, User, Loader2 } from 'lucide-react'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const TIME_SLOTS = [
  '08:30 - 10:30',
  '10:30 - 12:30',
  '14:30 - 16:30',
  '16:30 - 18:30'
]

export default function TimetableManagementPage() {
  const supabase = createClient()

  const [filieres, setFilieres] = useState<any[]>([])
  const [selectedFiliereId, setSelectedFiliereId] = useState<string>('')
  const [selectedSemester, setSelectedSemester] = useState<string>('S1')
  
  const [modules, setModules] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [slots, setSlots] = useState<any[]>([])

  // Form State
  const [selectedModuleId, setSelectedModuleId] = useState('')
  const [selectedDay, setSelectedDay] = useState(DAYS[0])
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0])
  const [classroom, setClassroom] = useState('Amphi A')
  const [teacherId, setTeacherId] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  // Load Filières & Teachers
  useEffect(() => {
    async function loadInitialData() {
      const { data: filieresData } = await supabase.from('Filiere').select('*')
      if (filieresData && filieresData.length > 0) {
        setFilieres(filieresData)
        setSelectedFiliereId(filieresData[0].id)
      }

      const { data: teachersData } = await supabase
        .from('TeacherProfile')
        .select(`id, User ( email, firstName, lastName )`)
      if (teachersData) setTeachers(teachersData)
    }
    loadInitialData()
  }, [supabase])

  // Load Modules & Slots
  useEffect(() => {
    async function loadScheduleData() {
      if (!selectedFiliereId) return

      const { data: modulesData } = await supabase
        .from('Module')
        .select('*')
        .eq('filiereId', selectedFiliereId)
        .eq('semester', selectedSemester)

      if (modulesData) setModules(modulesData)

      const { data: slotsData, error } = await supabase
        .from('TimetableSlot')
        .select(`
          id, day, timeSlot, classroom, moduleId, teacherId,
          Module ( id, code, name ),
          TeacherProfile ( id, User ( email, firstName, lastName ) )
        `)
        .eq('filiereId', selectedFiliereId)
        .eq('semester', selectedSemester)

      if (slotsData) setSlots(slotsData)
      if (error) console.error("Erreur de chargement des créneaux:", error)
    }
    loadScheduleData()
  }, [selectedFiliereId, selectedSemester, supabase])

  // Handle Adding Slot
  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedModuleId || !selectedFiliereId) {
      setMessage({ text: 'Veuillez sélectionner un module et une filière.', type: 'error' })
      return
    }

    setLoading(true)

    const payload = {
      id: crypto.randomUUID(),
      filiereId: selectedFiliereId,
      semester: selectedSemester,
      moduleId: selectedModuleId,
      teacherId: teacherId === '' ? null : teacherId,
      day: selectedDay,
      timeSlot: selectedTime,
      classroom: classroom,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('TimetableSlot')
      .insert([payload])
      .select(`
        id, day, timeSlot, classroom, moduleId, teacherId,
        Module ( id, code, name ),
        TeacherProfile ( id, User ( email, firstName, lastName ) )
      `)
      .single()

    if (!error && data) {
      setSlots((prev) => [...prev, data])
      setMessage({ text: 'Séance ajoutée avec succès !', type: 'success' })
    } else {
      console.error('Erreur Supabase Timetable:', error)
      setMessage({ text: 'Erreur: ' + (error?.message || 'Échec de la réservation'), type: 'error' })
    }

    setLoading(false)
    setTimeout(() => setMessage(null), 4000)
  }

  // Handle Delete
  const handleDeleteSlot = async (id: string) => {
    const { error } = await supabase.from('TimetableSlot').delete().eq('id', id)
    if (!error) {
      setSlots(slots.filter(s => s.id !== id))
      setMessage({ text: 'Séance supprimée.', type: 'success' })
      setTimeout(() => setMessage(null), 2000)
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans bg-slate-50 min-h-screen text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Gestion de la Planification
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Planification des Séances & Salles</h1>
          <p className="text-xs text-slate-500">Configurez l'emploi du temps hebdomadaire par filière, semestre et amphi.</p>
        </div>

        {message && (
          <div className={`text-xs px-4 py-2 rounded-lg font-semibold border ${
            message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-4 h-4 text-emerald-600" /> 1. Sélection Cible
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Filière</label>
              <select value={selectedFiliereId} onChange={(e) => setSelectedFiliereId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                {filieres.map(f => <option key={f.id} value={f.id}>{f.name} ({f.code})</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Semestre</label>
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 font-mono">
                {['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].map(sem => <option key={sem} value={sem}>{sem}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-4 h-4 text-emerald-600" /> 2. Programmer une Séance
            </h2>

            <form onSubmit={handleAddSlot} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Module</label>
                {modules.length === 0 ? (
                  <div className="text-xs text-amber-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    Aucun module configuré pour cette filière ({selectedSemester}).
                  </div>
                ) : (
                  <select value={selectedModuleId} onChange={(e) => setSelectedModuleId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600" required>
                    <option value="">-- Choisir un module --</option>
                    {modules.map(m => <option key={m.id} value={m.id}>{m.code} - {m.name}</option>)}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jour</label>
                  <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Créneau</label>
                  <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 font-mono">
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enseignant / Intervenant</label>
                <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                  <option value="">-- Non spécifié --</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.User?.firstName ? `${t.User.firstName} ${t.User.lastName}` : t.User?.email}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Salle / Emplacement</label>
                <input type="text" value={classroom} onChange={(e) => setClassroom(e.target.value)} placeholder="Ex: Amphi A, Salle 12..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600" required />
              </div>

              <button type="submit" disabled={loading || modules.length === 0} className="w-full py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Programmer la Séance
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Grille Hebdomadaire</h2>
              <p className="text-xs text-slate-500">
                Planning de {filieres.find(f => f.id === selectedFiliereId)?.name || 'Sélection'} ({selectedSemester})
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 text-xs text-center">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold">
                  <th className="border border-slate-200 p-2 w-28">Créneau</th>
                  {DAYS.map(day => <th key={day} className="border border-slate-200 p-2">{day}</th>)}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map(time => (
                  <tr key={time}>
                    <td className="border border-slate-200 p-2 font-mono font-semibold bg-slate-50 text-slate-600">
                      {time}
                    </td>
                    {DAYS.map(day => {
                      const matchedSlot = slots.find(s => s.day === day && s.timeSlot === time)
                      return (
                        <td key={day} className="border border-slate-200 p-2 align-top h-24 bg-white hover:bg-slate-50/50">
                          {matchedSlot ? (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-2 rounded-lg text-left h-full flex flex-col justify-between group relative">
                              <div>
                                <span className="font-mono font-bold text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded mr-1">
                                  {matchedSlot.Module?.code}
                                </span>
                                <div className="font-bold text-xs mt-1 leading-tight line-clamp-2">
                                  {matchedSlot.Module?.name}
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-500 space-y-0.5 mt-2 border-t border-emerald-100 pt-1">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-emerald-600" /> {matchedSlot.classroom}
                                </div>
                                {matchedSlot.TeacherProfile && (
                                  <div className="flex items-center gap-1 truncate">
                                    <User className="w-3 h-3 text-emerald-600" />
                                    {matchedSlot.TeacherProfile.User?.lastName 
                                      ? `${matchedSlot.TeacherProfile.User.firstName || ''} ${matchedSlot.TeacherProfile.User.lastName}`
                                      : matchedSlot.TeacherProfile.User?.email}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteSlot(matchedSlot.id)}
                                className="absolute top-1 right-1 p-1 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
                                title="Supprimer la séance"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-300 text-[10px] italic">Disponible</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}