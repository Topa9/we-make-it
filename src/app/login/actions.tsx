<<<<<<< HEAD
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = createClient()

  // 1. Authentification avec Supabase Auth
  const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !user) {
    return { error: 'Identifiants invalides. Veuillez réessayer.' }
  }

  // 2. Récupération du rôle depuis la table 'User' (en renommant 'error' en 'dbError' pour éviter les conflits)
  const { data: userData, error: dbError } = await supabase
    .from('User')
    .select('role')
    .eq('email', user.email)
    .single()

  if (dbError || !userData) {
    return { error: "Utilisateur authentifié mais aucun profil correspondant trouvé dans la table 'User'." }
  }

  // Normalisation du rôle en minuscules (ex: 'ADMIN' -> 'admin')
  const role = userData.role?.toLowerCase() || 'student'

  // 3. Redirection selon le rôle
  if (role === 'admin') {
    redirect('/admin')
  } else if (role === 'teacher') {
    redirect('/teacher')
  } else {
    redirect('/student')
  }
=======
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = createClient()

  // 1. Authentification avec Supabase Auth
  const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !user) {
    return { error: 'Identifiants invalides. Veuillez réessayer.' }
  }

  // 2. Récupération du rôle depuis la table 'User' (en renommant 'error' en 'dbError' pour éviter les conflits)
  const { data: userData, error: dbError } = await supabase
    .from('User')
    .select('role')
    .eq('email', user.email)
    .single()

  if (dbError || !userData) {
    return { error: "Utilisateur authentifié mais aucun profil correspondant trouvé dans la table 'User'." }
  }

  // Normalisation du rôle en minuscules (ex: 'ADMIN' -> 'admin')
  const role = userData.role?.toLowerCase() || 'student'

  // 3. Redirection selon le rôle
  if (role === 'admin') {
    redirect('/admin')
  } else if (role === 'teacher') {
    redirect('/teacher')
  } else {
    redirect('/student')
  }
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}