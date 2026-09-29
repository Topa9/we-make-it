<<<<<<< HEAD
'use client'
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { createUser } from './actions' // Import de la Server Action sécurisée
import Link from 'next/link'
import { UserPlus, ArrowLeft, CheckCircle2, AlertCircle, Shield, GraduationCap, Users } from 'lucide-react'

export default function NewUserPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<'STUDENT' | 'TEACHER' | 'ADMIN' | 'HOSPITAL_TUTOR'>('STUDENT')
  const [matricule, setMatricule] = useState('')
  const [filiereId, setFiliereId] = useState('')
  
  // Champs spécifiques Professeur
  const [department, setDepartment] = useState('')
  const [specialty, setSpecialty] = useState('')

  const [filieres, setFilieres] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Récupération des filières pour l'affectation des étudiants
  useEffect(() => {
    async function fetchFilieres() {
      const { data } = await supabase.from('Filiere').select('*')
      if (data) setFilieres(data)
    }
    fetchFilieres()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('role', role)
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('matricule', matricule)

      if (role === 'STUDENT') {
        formData.append('filiereId', filiereId)
      }

      if (role === 'TEACHER') {
        formData.append('department', department)
        formData.append('specialty', specialty)
      }

      // Appel de la Server Action sécurisée
      const result = await createUser(formData)

      if (result && result.error) {
        throw new Error(result.error)
      }

      setMessage({ type: 'success', text: 'Utilisateur créé avec succès ! Redirection...' })
      setTimeout(() => {
        router.push('/admin')
      }, 1500)

    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Une erreur est survenue lors de la création.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 font-sans bg-slate-50 min-h-screen text-slate-800">
      
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin" 
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Administration
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">Créer un Nouvel Utilisateur</h1>
          </div>
        </div>
      </div>

      {/* Feedback Alert */}
      {message && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-semibold ${message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Role Selector Cards */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Rôle de l'Utilisateur</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`p-4 rounded-xl border text-left transition flex flex-col gap-2 ${role === 'STUDENT' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <Users className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-bold text-sm">Étudiant</p>
                  <p className="text-[11px] text-slate-500">Accès notes et stages</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('TEACHER')}
                className={`p-4 rounded-xl border text-left transition flex flex-col gap-2 ${role === 'TEACHER' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-bold text-sm">Professeur</p>
                  <p className="text-[11px] text-slate-500">Saisie notes & évaluation</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`p-4 rounded-xl border text-left transition flex flex-col gap-2 ${role === 'ADMIN' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <Shield className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-bold text-sm">Administrateur</p>
                  <p className="text-[11px] text-slate-500">Gestion globale de l'école</p>
                </div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prénom */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Prénom</label>
              <input
                type="text"
                required
                placeholder="Ex: Youssef"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
              />
            </div>

            {/* Nom */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nom</label>
              <input
                type="text"
                required
                placeholder="Ex: El Amrani"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Adresse Email</label>
              <input
                type="email"
                required
                placeholder="email@essi.ac.ma"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mot de passe temporaire</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matricule (Étudiant / Professeur) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Numéro de Matricule</label>
              <input
                type="text"
                required
                placeholder={role === 'STUDENT' ? 'ETU-2024-XXXX' : 'PRF-2024-XXXX'}
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:border-emerald-600 transition"
              />
            </div>

            {/* Champs spécifiques aux Professeurs */}
            {role === 'TEACHER' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Département</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sciences Infirmières"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Spécialité</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Anesthésiologie & Réanimation"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </>
            )}
          </div>

          {/* Filière Selection for Students */}
          {role === 'STUDENT' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Filière d'Inscription</label>
              <select
                value={filiereId}
                onChange={(e) => setFiliereId(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:border-emerald-600 transition"
              >
                <option value="">-- Sélectionner une filière --</option>
                {filieres.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.title || f.name} ({f.code})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link
              href="/admin"
              className="px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> {loading ? 'Création en cours...' : 'Créer l\'utilisateur'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
=======
'use client'
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { createUser } from './actions' // Import de la Server Action sécurisée
import Link from 'next/link'
import { UserPlus, ArrowLeft, CheckCircle2, AlertCircle, Shield, GraduationCap, Users } from 'lucide-react'

export default function NewUserPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<'STUDENT' | 'TEACHER' | 'ADMIN' | 'HOSPITAL_TUTOR'>('STUDENT')
  const [matricule, setMatricule] = useState('')
  const [filiereId, setFiliereId] = useState('')
  
  // Champs spécifiques Professeur
  const [department, setDepartment] = useState('')
  const [specialty, setSpecialty] = useState('')

  const [filieres, setFilieres] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Récupération des filières pour l'affectation des étudiants
  useEffect(() => {
    async function fetchFilieres() {
      const { data } = await supabase.from('Filiere').select('*')
      if (data) setFilieres(data)
    }
    fetchFilieres()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('role', role)
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('matricule', matricule)

      if (role === 'STUDENT') {
        formData.append('filiereId', filiereId)
      }

      if (role === 'TEACHER') {
        formData.append('department', department)
        formData.append('specialty', specialty)
      }

      // Appel de la Server Action sécurisée
      const result = await createUser(formData)

      if (result && result.error) {
        throw new Error(result.error)
      }

      setMessage({ type: 'success', text: 'Utilisateur créé avec succès ! Redirection...' })
      setTimeout(() => {
        router.push('/admin')
      }, 1500)

    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Une erreur est survenue lors de la création.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 font-sans bg-slate-50 min-h-screen text-slate-800">
      
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin" 
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Administration
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">Créer un Nouvel Utilisateur</h1>
          </div>
        </div>
      </div>

      {/* Feedback Alert */}
      {message && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-semibold ${message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Role Selector Cards */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Rôle de l'Utilisateur</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`p-4 rounded-xl border text-left transition flex flex-col gap-2 ${role === 'STUDENT' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <Users className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-bold text-sm">Étudiant</p>
                  <p className="text-[11px] text-slate-500">Accès notes et stages</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('TEACHER')}
                className={`p-4 rounded-xl border text-left transition flex flex-col gap-2 ${role === 'TEACHER' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-bold text-sm">Professeur</p>
                  <p className="text-[11px] text-slate-500">Saisie notes & évaluation</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`p-4 rounded-xl border text-left transition flex flex-col gap-2 ${role === 'ADMIN' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <Shield className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-bold text-sm">Administrateur</p>
                  <p className="text-[11px] text-slate-500">Gestion globale de l'école</p>
                </div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prénom */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Prénom</label>
              <input
                type="text"
                required
                placeholder="Ex: Youssef"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
              />
            </div>

            {/* Nom */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nom</label>
              <input
                type="text"
                required
                placeholder="Ex: El Amrani"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Adresse Email</label>
              <input
                type="email"
                required
                placeholder="email@essi.ac.ma"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mot de passe temporaire</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matricule (Étudiant / Professeur) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Numéro de Matricule</label>
              <input
                type="text"
                required
                placeholder={role === 'STUDENT' ? 'ETU-2024-XXXX' : 'PRF-2024-XXXX'}
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:border-emerald-600 transition"
              />
            </div>

            {/* Champs spécifiques aux Professeurs */}
            {role === 'TEACHER' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Département</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sciences Infirmières"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Spécialité</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Anesthésiologie & Réanimation"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </>
            )}
          </div>

          {/* Filière Selection for Students */}
          {role === 'STUDENT' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Filière d'Inscription</label>
              <select
                value={filiereId}
                onChange={(e) => setFiliereId(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:border-emerald-600 transition"
              >
                <option value="">-- Sélectionner une filière --</option>
                {filieres.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.title || f.name} ({f.code})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link
              href="/admin"
              className="px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> {loading ? 'Création en cours...' : 'Créer l\'utilisateur'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}