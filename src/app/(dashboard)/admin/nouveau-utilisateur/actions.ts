<<<<<<< HEAD
'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as 'STUDENT' | 'TEACHER' | 'ADMIN' | 'HOSPITAL_TUTOR'
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const matricule = formData.get('matricule') as string
  
  const specialty = formData.get('specialty') as string
  const department = formData.get('department') as string
  const filiereId = formData.get('filiereId') as string

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    return { error: 'Erreur critique : SUPABASE_SERVICE_ROLE_KEY est introuvable dans .env.local' }
  }

  // 1. Créer un client Admin avec la Service Role Key
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { persistSession: false } }
  )

  const plainPassword = password || 'Passerelle2026*'

  // 2. Création dans Supabase Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: plainPassword,
    email_confirm: true,
  })

  if (authError || !authData.user) {
    return { error: 'Erreur Supabase Auth: ' + (authError?.message || 'Inconnue') }
  }

  const userId = authData.user.id
  const now = new Date().toISOString()
  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const supabase = await createClient()

  // 3. Insertion dans la table User
  const { error: userError } = await supabase.from('User').insert([{
    id: userId,
    matricule: matricule || `MAT-${Math.floor(1000 + Math.random() * 9000)}`,
    email: email,
    passwordHash: hashedPassword,
    firstName: firstName || 'Nouveau',
    lastName: lastName || 'Utilisateur',
    role: role,
    isActive: true,
    createdAt: now,
    updatedAt: now
  }])

  if (userError) {
    // Si l'insertion User échoue, il faudrait idéalement nettoyer l'utilisateur Auth créé
    return { error: 'Erreur User (DB): ' + userError.message }
  }

  // 4. Profil Professeur
  if (role === 'TEACHER') {
    const { error: teacherError } = await supabase.from('TeacherProfile').insert([{
      id: crypto.randomUUID(), 
      userId: userId,
      specialty: specialty || 'Sciences Infirmières',
      department: department || 'Département des Soins Infirmiers',
      createdAt: now,
      updatedAt: now
    }])

    if (teacherError) {
      return { error: 'Erreur lors de la création du TeacherProfile: ' + teacherError.message }
    }
  }

  // 5. Profil Étudiant
  if (role === 'STUDENT') {
    const { error: studentError } = await supabase.from('StudentProfile').insert([{
      id: crypto.randomUUID(), 
      userId: userId,
      currentFiliereId: filiereId || null,
      promotionYear: new Date().getFullYear(),
      currentSemester: 'S1', // <-- CORRECTION : Ajout du semestre par défaut
      createdAt: now,
      updatedAt: now
    }])

    if (studentError) {
      return { error: 'Erreur lors de la création du StudentProfile: ' + studentError.message }
    }
  }

  redirect('/admin')
=======
'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as 'STUDENT' | 'TEACHER' | 'ADMIN' | 'HOSPITAL_TUTOR'
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const matricule = formData.get('matricule') as string
  
  const specialty = formData.get('specialty') as string
  const department = formData.get('department') as string
  const filiereId = formData.get('filiereId') as string

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    return { error: 'Erreur critique : SUPABASE_SERVICE_ROLE_KEY est introuvable dans .env.local' }
  }

  // 1. Créer un client Admin avec la Service Role Key
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { persistSession: false } }
  )

  const plainPassword = password || 'Passerelle2026*'

  // 2. Création dans Supabase Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: plainPassword,
    email_confirm: true,
  })

  if (authError || !authData.user) {
    return { error: 'Erreur Supabase Auth: ' + (authError?.message || 'Inconnue') }
  }

  const userId = authData.user.id
  const now = new Date().toISOString()
  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const supabase = await createClient()

  // 3. Insertion dans la table User
  const { error: userError } = await supabase.from('User').insert([{
    id: userId,
    matricule: matricule || `MAT-${Math.floor(1000 + Math.random() * 9000)}`,
    email: email,
    passwordHash: hashedPassword,
    firstName: firstName || 'Nouveau',
    lastName: lastName || 'Utilisateur',
    role: role,
    isActive: true,
    createdAt: now,
    updatedAt: now
  }])

  if (userError) {
    // Si l'insertion User échoue, il faudrait idéalement nettoyer l'utilisateur Auth créé
    return { error: 'Erreur User (DB): ' + userError.message }
  }

  // 4. Profil Professeur
  if (role === 'TEACHER') {
    const { error: teacherError } = await supabase.from('TeacherProfile').insert([{
      id: crypto.randomUUID(), 
      userId: userId,
      specialty: specialty || 'Sciences Infirmières',
      department: department || 'Département des Soins Infirmiers',
      createdAt: now,
      updatedAt: now
    }])

    if (teacherError) {
      return { error: 'Erreur lors de la création du TeacherProfile: ' + teacherError.message }
    }
  }

  // 5. Profil Étudiant
  if (role === 'STUDENT') {
    const { error: studentError } = await supabase.from('StudentProfile').insert([{
      id: crypto.randomUUID(), 
      userId: userId,
      currentFiliereId: filiereId || null,
      promotionYear: new Date().getFullYear(),
      currentSemester: 'S1', // <-- CORRECTION : Ajout du semestre par défaut
      createdAt: now,
      updatedAt: now
    }])

    if (studentError) {
      return { error: 'Erreur lors de la création du StudentProfile: ' + studentError.message }
    }
  }

  redirect('/admin')
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}