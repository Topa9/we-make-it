<<<<<<< HEAD
'use client'
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, BookOpen, Layers, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function AdminFilieresManager() {
  const supabase = createClient()

  // State Management
  const [filieres, setFilieres] = useState<any[]>([])
  const [selectedFiliereId, setSelectedFiliereId] = useState<string>('')
  const [degree, setDegree] = useState<'Licence Professionnelle' | 'Master'>('Licence Professionnelle')
  const [selectedSemester, setSelectedSemester] = useState<string>('S1')
  
  // Filiere Form State
  const [newFiliereCode, setNewFiliereCode] = useState('')
  const [newFiliereName, setNewFiliereName] = useState('')
  const [newFiliereDesc, setNewFiliereDesc] = useState('')
  const [newFiliereObjectives, setNewFiliereObjectives] = useState('')
  const [newFiliereDebouches, setNewFiliereDebouches] = useState('')

  // Module Form State
  const [code, setCode] = useState('')
  const [moduleName, setModuleName] = useState('')
  const [moduleHours, setModuleHours] = useState(45)
  const [newModuleTeacherId, setNewModuleTeacherId] = useState<string>('') 
  
  const [modulesList, setModulesList] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  // 1. Fetch Synced Data
  useEffect(() => {
    async function loadData() {
      const { data: filieresData } = await supabase.from('Filiere').select('*')
      if (filieresData && filieresData.length > 0) {
        setFilieres(filieresData)
        setSelectedFiliereId(filieresData[0].id)
        setDegree(filieresData[0].degree || 'Licence Professionnelle')
      }

      const { data: modulesData } = await supabase.from('Module').select('*')
      if (modulesData) setModulesList(modulesData)

      // Fetch TeacherProfiles AND their linked User email
      const { data: teachersData, error: tError } = await supabase
        .from('TeacherProfile')
        .select(`id, User ( email )`)
      
      if (teachersData) setTeachers(teachersData)
      if (tError) console.error("Teacher fetch error:", tError)
    }
    loadData()
  }, [supabase])

  // 2. Add Filiere
  const handleAddFiliere = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFiliereCode || !newFiliereName) return
    setLoading(true)

    const now = new Date().toISOString()

    const payload = { 
      id: crypto.randomUUID(),
      code: newFiliereCode, 
      name: newFiliereName, 
      description: newFiliereDesc || 'Description du programme',
      objectives: newFiliereObjectives,
      debouches: newFiliereDebouches,
      degree: degree,
      durationYears: degree === 'Master' ? 2 : 3,
      createdAt: now,
      updatedAt: now
    }
    
    const { data, error } = await supabase.from('Filiere').insert([payload]).select().single()

    if (!error && data) {
      setFilieres([...filieres, data])
      setSelectedFiliereId(data.id)
      setNewFiliereCode('')
      setNewFiliereName('')
      setNewFiliereDesc('')
      setNewFiliereObjectives('')
      setNewFiliereDebouches('')
      setMessage({ text: 'Filière créée avec succès !', type: 'success' })
    } else {
      console.error("Filiere Error:", error)
      setMessage({ text: 'Erreur: ' + (error?.message || 'Insertion échouée'), type: 'error' })
    }
    setLoading(false)
    setTimeout(() => setMessage(null), 4000)
  }

  // 3. Delete Filiere
  const handleDeleteFiliere = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette filière ? Tous les modules associés seront également supprimés.")) return

    // Delete associated modules first to avoid foreign key constraints
    await supabase.from('Module').delete().eq('filiereId', id)

    // Delete the filière itself
    const { error } = await supabase.from('Filiere').delete().eq('id', id)

    if (!error) {
      const updatedFilieres = filieres.filter(f => f.id !== id)
      setFilieres(updatedFilieres)
      setModulesList(modulesList.filter(m => m.filiereId !== id))
      
      if (updatedFilieres.length > 0) {
        setSelectedFiliereId(updatedFilieres[0].id)
      } else {
        setSelectedFiliereId('')
      }
      setMessage({ text: 'Filière supprimée avec succès.', type: 'success' })
    } else {
      setMessage({ text: 'Erreur lors de la suppression de la filière.', type: 'error' })
    }
    setTimeout(() => setMessage(null), 4000)
  }

  const handleFiliereChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    setSelectedFiliereId(id)
    const found = filieres.find(f => f.id === id)
    if (found) {
      setDegree(found.degree || 'Licence Professionnelle')
      setSelectedSemester('S1')
    }
  }

  const totalSemesters = degree === 'Master' ? 4 : 6
  const semesterOptions = Array.from({ length: totalSemesters }, (_, i) => `S${i + 1}`)

  // 4. Add Module
  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code || !moduleName || !selectedFiliereId) return
    setLoading(true)
    
    const now = new Date().toISOString()

    const newModulePayload = {
      id: crypto.randomUUID(),
      filiereId: selectedFiliereId,
      semester: selectedSemester,
      code: code,
      name: moduleName,
      hours: Number(moduleHours),
      coordinatorId: newModuleTeacherId === '' ? null : newModuleTeacherId,
      createdAt: now,
      updatedAt: now
    }

    const { data, error } = await supabase.from('Module').insert([newModulePayload]).select().single()

    if (!error && data) {
      setModulesList([...modulesList, data])
      setCode('')
      setModuleName('')
      setModuleHours(45)
      setNewModuleTeacherId('')
      setMessage({ text: 'Module ajouté avec succès !', type: 'success' })
    } else {
      console.error("Module Error:", error)
      setMessage({ text: 'Erreur: ' + (error?.message || 'Insertion échouée'), type: 'error' })
    }
    setLoading(false)
    setTimeout(() => setMessage(null), 4000)
  }

  const handleDeleteModule = async (id: string) => {
    const { error } = await supabase.from('Module').delete().eq('id', id)
    if (!error) setModulesList(modulesList.filter(m => m.id !== id))
  }

  const handleAssignTeacher = async (moduleId: string, coordinatorId: string) => {
    const targetId = coordinatorId === '' ? null : coordinatorId
    const { error } = await supabase.from('Module').update({ coordinatorId: targetId }).eq('id', moduleId)

    if (!error) {
      setModulesList(modulesList.map(m => m.id === moduleId ? { ...m, coordinatorId: targetId } : m))
      setMessage({ text: 'Coordinateur mis à jour !', type: 'success' })
    }
    setTimeout(() => setMessage(null), 3000)
  }

  const currentSemesterModules = modulesList.filter(m => m.filiereId === selectedFiliereId && m.semester === selectedSemester)
  const totalHours = currentSemesterModules.reduce((acc, curr) => acc + (curr.hours || 0), 0)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Administration Académique
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Générateur de Filières & LMD</h1>
          <p className="text-xs text-slate-500">Gestion complète des programmes et modules.</p>
        </div>
        {message && (
          <div className={`text-xs px-4 py-2 rounded-lg font-semibold animate-pulse border ${
            message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" /> 1. Gestion des Filières
            </h2>

            <form onSubmit={handleAddFiliere} className="space-y-3 pb-4 border-b border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Code & Titre</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Ex: IP" value={newFiliereCode} onChange={(e) => setNewFiliereCode(e.target.value)} className="w-1/3 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 font-mono" required />
                  <input type="text" placeholder="Ex: Infirmier Polyvalent" value={newFiliereName} onChange={(e) => setNewFiliereName(e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description (Requise)</label>
                <input type="text" placeholder="Description du programme..." value={newFiliereDesc} onChange={(e) => setNewFiliereDesc(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Objectifs (un par ligne)</label>
                <textarea rows={2} placeholder="Objectif 1&#10;Objectif 2..." value={newFiliereObjectives} onChange={(e) => setNewFiliereObjectives(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Débouchés (un par ligne)</label>
                <textarea rows={2} placeholder="Débouché 1&#10;Débouché 2..." value={newFiliereDebouches} onChange={(e) => setNewFiliereDebouches(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-2 mt-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2">
                <Plus className="w-3 h-3" /> Sauvegarder la Filière
              </button>
            </form>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Sélectionner / Supprimer une Filière</label>
              <div className="flex gap-2">
                <select value={selectedFiliereId} onChange={handleFiliereChange} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                  {filieres.map(f => <option key={f.id} value={f.id}>{f.name} ({f.code})</option>)}
                </select>
                {selectedFiliereId && (
                  <button 
                    type="button"
                    onClick={() => handleDeleteFiliere(selectedFiliereId)}
                    className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 transition"
                    title="Supprimer cette filière"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cycle d'Études</label>
              <select value={degree} onChange={(e) => { setDegree(e.target.value as any); setSelectedSemester('S1'); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                <option value="Licence Professionnelle">Licence Professionnelle (3 Ans)</option>
                <option value="Master">Master Spécialisé (2 Ans)</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" /> 2. Ajouter un Module
            </h2>
            <form onSubmit={handleAddModule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sélectionner le Semestre</label>
                <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 font-mono">
                  {semesterOptions.map(sem => <option key={sem} value={sem}>{sem}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Code Module</label>
                  <input type="text" required placeholder="Ex: M301" value={code} onChange={(e) => setCode(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Intitulé</label>
                  <input type="text" required placeholder="Nom..." value={moduleName} onChange={(e) => setModuleName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Volume Horaire (Heures)</label>
                <input type="number" min="1" max="300" required value={moduleHours} onChange={(e) => setModuleHours(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Coordinateur</label>
                {teachers.length === 0 ? (
                  <div className="text-[10px] text-amber-600 bg-amber-50 p-2 rounded">
                    Aucun 'TeacherProfile' trouvé dans la DB.
                  </div>
                ) : (
                  <select value={newModuleTeacherId} onChange={(e) => setNewModuleTeacherId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                    <option value="">-- Aucun --</option>
                    {teachers.map(t => <option key={t.id} value={t.id}>{t.User?.email || t.id}</option>)}
                  </select>
                )}
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-xl shadow-md transition flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Ajouter le Module
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Matrice Pédagogique Active</h2>
              <p className="text-xs text-slate-500">Modules pour : {filieres.find(f => f.id === selectedFiliereId)?.name || 'Aucune filière sélectionnée'}</p>
            </div>
            <span className="bg-slate-100 text-slate-800 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-slate-200">
              {selectedSemester}
            </span>
          </div>

          <div className="p-4 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-800 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            <div className="text-xs">
              <span className="font-bold">Volume Total du Semestre : </span>Total actuel : <strong>{totalHours} Heures</strong>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Intitulé</th>
                  <th className="py-3 px-4">Coordinateur</th>
                  <th className="py-3 px-4 text-center">Volume (h)</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentSemesterModules.map((mod) => (
                    <tr key={mod.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{mod.code}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{mod.name}</td>
                      <td className="py-3 px-4">
                        <select value={mod.coordinatorId || ''} onChange={(e) => handleAssignTeacher(mod.id, e.target.value)} className="w-full min-w-[140px] px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:border-emerald-600">
                          <option value="">-- Non assigné --</option>
                          {teachers.map(t => <option key={t.id} value={t.id}>{t.User?.email || t.id}</option>)}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">{mod.hours}h</td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={() => handleDeleteModule(mod.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
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
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, BookOpen, Layers, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function AdminFilieresManager() {
  const supabase = createClient()

  // State Management
  const [filieres, setFilieres] = useState<any[]>([])
  const [selectedFiliereId, setSelectedFiliereId] = useState<string>('')
  const [degree, setDegree] = useState<'Licence Professionnelle' | 'Master'>('Licence Professionnelle')
  const [selectedSemester, setSelectedSemester] = useState<string>('S1')
  
  // Filiere Form State
  const [newFiliereCode, setNewFiliereCode] = useState('')
  const [newFiliereName, setNewFiliereName] = useState('')
  const [newFiliereDesc, setNewFiliereDesc] = useState('')
  const [newFiliereObjectives, setNewFiliereObjectives] = useState('')
  const [newFiliereDebouches, setNewFiliereDebouches] = useState('')

  // Module Form State
  const [code, setCode] = useState('')
  const [moduleName, setModuleName] = useState('')
  const [moduleHours, setModuleHours] = useState(45)
  const [newModuleTeacherId, setNewModuleTeacherId] = useState<string>('') 
  
  const [modulesList, setModulesList] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  // 1. Fetch Synced Data
  useEffect(() => {
    async function loadData() {
      const { data: filieresData } = await supabase.from('Filiere').select('*')
      if (filieresData && filieresData.length > 0) {
        setFilieres(filieresData)
        setSelectedFiliereId(filieresData[0].id)
        setDegree(filieresData[0].degree || 'Licence Professionnelle')
      }

      const { data: modulesData } = await supabase.from('Module').select('*')
      if (modulesData) setModulesList(modulesData)

      // Fetch TeacherProfiles AND their linked User email
      const { data: teachersData, error: tError } = await supabase
        .from('TeacherProfile')
        .select(`id, User ( email )`)
      
      if (teachersData) setTeachers(teachersData)
      if (tError) console.error("Teacher fetch error:", tError)
    }
    loadData()
  }, [supabase])

  // 2. Add Filiere
  const handleAddFiliere = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFiliereCode || !newFiliereName) return
    setLoading(true)

    const now = new Date().toISOString()

    const payload = { 
      id: crypto.randomUUID(),
      code: newFiliereCode, 
      name: newFiliereName, 
      description: newFiliereDesc || 'Description du programme',
      objectives: newFiliereObjectives,
      debouches: newFiliereDebouches,
      degree: degree,
      durationYears: degree === 'Master' ? 2 : 3,
      createdAt: now,
      updatedAt: now
    }
    
    const { data, error } = await supabase.from('Filiere').insert([payload]).select().single()

    if (!error && data) {
      setFilieres([...filieres, data])
      setSelectedFiliereId(data.id)
      setNewFiliereCode('')
      setNewFiliereName('')
      setNewFiliereDesc('')
      setNewFiliereObjectives('')
      setNewFiliereDebouches('')
      setMessage({ text: 'Filière créée avec succès !', type: 'success' })
    } else {
      console.error("Filiere Error:", error)
      setMessage({ text: 'Erreur: ' + (error?.message || 'Insertion échouée'), type: 'error' })
    }
    setLoading(false)
    setTimeout(() => setMessage(null), 4000)
  }

  // 3. Delete Filiere
  const handleDeleteFiliere = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette filière ? Tous les modules associés seront également supprimés.")) return

    // Delete associated modules first to avoid foreign key constraints
    await supabase.from('Module').delete().eq('filiereId', id)

    // Delete the filière itself
    const { error } = await supabase.from('Filiere').delete().eq('id', id)

    if (!error) {
      const updatedFilieres = filieres.filter(f => f.id !== id)
      setFilieres(updatedFilieres)
      setModulesList(modulesList.filter(m => m.filiereId !== id))
      
      if (updatedFilieres.length > 0) {
        setSelectedFiliereId(updatedFilieres[0].id)
      } else {
        setSelectedFiliereId('')
      }
      setMessage({ text: 'Filière supprimée avec succès.', type: 'success' })
    } else {
      setMessage({ text: 'Erreur lors de la suppression de la filière.', type: 'error' })
    }
    setTimeout(() => setMessage(null), 4000)
  }

  const handleFiliereChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    setSelectedFiliereId(id)
    const found = filieres.find(f => f.id === id)
    if (found) {
      setDegree(found.degree || 'Licence Professionnelle')
      setSelectedSemester('S1')
    }
  }

  const totalSemesters = degree === 'Master' ? 4 : 6
  const semesterOptions = Array.from({ length: totalSemesters }, (_, i) => `S${i + 1}`)

  // 4. Add Module
  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code || !moduleName || !selectedFiliereId) return
    setLoading(true)
    
    const now = new Date().toISOString()

    const newModulePayload = {
      id: crypto.randomUUID(),
      filiereId: selectedFiliereId,
      semester: selectedSemester,
      code: code,
      name: moduleName,
      hours: Number(moduleHours),
      coordinatorId: newModuleTeacherId === '' ? null : newModuleTeacherId,
      createdAt: now,
      updatedAt: now
    }

    const { data, error } = await supabase.from('Module').insert([newModulePayload]).select().single()

    if (!error && data) {
      setModulesList([...modulesList, data])
      setCode('')
      setModuleName('')
      setModuleHours(45)
      setNewModuleTeacherId('')
      setMessage({ text: 'Module ajouté avec succès !', type: 'success' })
    } else {
      console.error("Module Error:", error)
      setMessage({ text: 'Erreur: ' + (error?.message || 'Insertion échouée'), type: 'error' })
    }
    setLoading(false)
    setTimeout(() => setMessage(null), 4000)
  }

  const handleDeleteModule = async (id: string) => {
    const { error } = await supabase.from('Module').delete().eq('id', id)
    if (!error) setModulesList(modulesList.filter(m => m.id !== id))
  }

  const handleAssignTeacher = async (moduleId: string, coordinatorId: string) => {
    const targetId = coordinatorId === '' ? null : coordinatorId
    const { error } = await supabase.from('Module').update({ coordinatorId: targetId }).eq('id', moduleId)

    if (!error) {
      setModulesList(modulesList.map(m => m.id === moduleId ? { ...m, coordinatorId: targetId } : m))
      setMessage({ text: 'Coordinateur mis à jour !', type: 'success' })
    }
    setTimeout(() => setMessage(null), 3000)
  }

  const currentSemesterModules = modulesList.filter(m => m.filiereId === selectedFiliereId && m.semester === selectedSemester)
  const totalHours = currentSemesterModules.reduce((acc, curr) => acc + (curr.hours || 0), 0)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Administration Académique
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Générateur de Filières & LMD</h1>
          <p className="text-xs text-slate-500">Gestion complète des programmes et modules.</p>
        </div>
        {message && (
          <div className={`text-xs px-4 py-2 rounded-lg font-semibold animate-pulse border ${
            message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" /> 1. Gestion des Filières
            </h2>

            <form onSubmit={handleAddFiliere} className="space-y-3 pb-4 border-b border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Code & Titre</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Ex: IP" value={newFiliereCode} onChange={(e) => setNewFiliereCode(e.target.value)} className="w-1/3 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 font-mono" required />
                  <input type="text" placeholder="Ex: Infirmier Polyvalent" value={newFiliereName} onChange={(e) => setNewFiliereName(e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description (Requise)</label>
                <input type="text" placeholder="Description du programme..." value={newFiliereDesc} onChange={(e) => setNewFiliereDesc(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Objectifs (un par ligne)</label>
                <textarea rows={2} placeholder="Objectif 1&#10;Objectif 2..." value={newFiliereObjectives} onChange={(e) => setNewFiliereObjectives(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Débouchés (un par ligne)</label>
                <textarea rows={2} placeholder="Débouché 1&#10;Débouché 2..." value={newFiliereDebouches} onChange={(e) => setNewFiliereDebouches(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-2 mt-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2">
                <Plus className="w-3 h-3" /> Sauvegarder la Filière
              </button>
            </form>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Sélectionner / Supprimer une Filière</label>
              <div className="flex gap-2">
                <select value={selectedFiliereId} onChange={handleFiliereChange} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                  {filieres.map(f => <option key={f.id} value={f.id}>{f.name} ({f.code})</option>)}
                </select>
                {selectedFiliereId && (
                  <button 
                    type="button"
                    onClick={() => handleDeleteFiliere(selectedFiliereId)}
                    className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 transition"
                    title="Supprimer cette filière"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cycle d'Études</label>
              <select value={degree} onChange={(e) => { setDegree(e.target.value as any); setSelectedSemester('S1'); }} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                <option value="Licence Professionnelle">Licence Professionnelle (3 Ans)</option>
                <option value="Master">Master Spécialisé (2 Ans)</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" /> 2. Ajouter un Module
            </h2>
            <form onSubmit={handleAddModule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sélectionner le Semestre</label>
                <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600 font-mono">
                  {semesterOptions.map(sem => <option key={sem} value={sem}>{sem}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Code Module</label>
                  <input type="text" required placeholder="Ex: M301" value={code} onChange={(e) => setCode(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Intitulé</label>
                  <input type="text" required placeholder="Nom..." value={moduleName} onChange={(e) => setModuleName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Volume Horaire (Heures)</label>
                <input type="number" min="1" max="300" required value={moduleHours} onChange={(e) => setModuleHours(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Coordinateur</label>
                {teachers.length === 0 ? (
                  <div className="text-[10px] text-amber-600 bg-amber-50 p-2 rounded">
                    Aucun 'TeacherProfile' trouvé dans la DB.
                  </div>
                ) : (
                  <select value={newModuleTeacherId} onChange={(e) => setNewModuleTeacherId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600">
                    <option value="">-- Aucun --</option>
                    {teachers.map(t => <option key={t.id} value={t.id}>{t.User?.email || t.id}</option>)}
                  </select>
                )}
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-xl shadow-md transition flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Ajouter le Module
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Matrice Pédagogique Active</h2>
              <p className="text-xs text-slate-500">Modules pour : {filieres.find(f => f.id === selectedFiliereId)?.name || 'Aucune filière sélectionnée'}</p>
            </div>
            <span className="bg-slate-100 text-slate-800 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-slate-200">
              {selectedSemester}
            </span>
          </div>

          <div className="p-4 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-800 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            <div className="text-xs">
              <span className="font-bold">Volume Total du Semestre : </span>Total actuel : <strong>{totalHours} Heures</strong>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Intitulé</th>
                  <th className="py-3 px-4">Coordinateur</th>
                  <th className="py-3 px-4 text-center">Volume (h)</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentSemesterModules.map((mod) => (
                    <tr key={mod.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{mod.code}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{mod.name}</td>
                      <td className="py-3 px-4">
                        <select value={mod.coordinatorId || ''} onChange={(e) => handleAssignTeacher(mod.id, e.target.value)} className="w-full min-w-[140px] px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:border-emerald-600">
                          <option value="">-- Non assigné --</option>
                          {teachers.map(t => <option key={t.id} value={t.id}>{t.User?.email || t.id}</option>)}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">{mod.hours}h</td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={() => handleDeleteModule(mod.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
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