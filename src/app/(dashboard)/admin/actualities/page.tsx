<<<<<<< HEAD
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Newspaper, Plus, Trash2, Calendar, Tag, Upload, Image as ImageIcon, Loader2 } from 'lucide-react'

export default function AdminNewsManager() {
  const supabase = createClient()

  const [newsList, setNewsList] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Événement')
  const [description, setDescription] = useState('')
  
  // Gestion de l'image fichier
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    const { data, error } = await supabase
      .from('News')
      .select('*')
      .order('publishedAt', { ascending: false })

    if (data) setNewsList(data)
    if (error) console.error('Error fetching news:', error)
  }

  // Prévisualisation de l'image sélectionnée
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return

    setLoading(true)
    setMessage(null)

    let publicImageUrl: string | null = null

    // 1. Upload de l'image vers Supabase Storage si un fichier est sélectionné
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`
      const filePath = `public/${fileName}`

      const { data: storageData, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload Error:', uploadError)
        setMessage({ text: `Erreur d'upload image: ${uploadError.message}. Assurez-vous que le bucket 'news-images' existe.`, type: 'error' })
        setLoading(false)
        return
      }

      // Récupération de l'URL publique
      const { data: urlData } = supabase.storage
        .from('news-images')
        .getPublicUrl(filePath)

      publicImageUrl = urlData.publicUrl
    }

    // 2. Auteur par défaut (User)
    const { data: userData } = await supabase.from('User').select('id').limit(1).single()
    const fallbackAuthorId = userData?.id || crypto.randomUUID()

    // 3. Génération du Slug
    const generatedSlug = title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

    // 4. Insertion dans la base de données Prisma/Supabase
    const payload = {
      id: crypto.randomUUID(),
      title: title,
      slug: generatedSlug,
      summary: description.slice(0, 150),
      content: description,
      category: category,
      imageUrl: publicImageUrl,
      authorId: fallbackAuthorId,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const { data, error } = await supabase.from('News').insert([payload]).select().single()

    if (!error && data) {
      setNewsList([data, ...newsList])
      setTitle('')
      setDescription('')
      setImageFile(null)
      setImagePreview(null)
      setMessage({ text: 'Actualité publiée avec succès !', type: 'success' })
    } else {
      console.error('Error adding news:', error)
      setMessage({ 
        text: `Erreur: ${error?.message || 'Problème lors de la sauvegarde.'}`, 
        type: 'error' 
      })
    }
    setLoading(false)
  }

  const handleDeleteNews = async (id: string) => {
    const { error } = await supabase.from('News').delete().eq('id', id)
    if (!error) {
      setNewsList(newsList.filter(n => n.id !== id))
      setMessage({ text: 'Actualité supprimée.', type: 'success' })
    } else {
      console.error('Error deleting news:', error)
      setMessage({ text: `Erreur: ${error.message}`, type: 'error' })
    }
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Espace d'Administration
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Gestion des Actualités & Événements</h1>
          <p className="text-xs text-slate-500">Publiez ou supprimez les annonces visibles sur le portail public.</p>
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
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-emerald-600" /> Publier une Nouvelle Actualité
          </h2>

          <form onSubmit={handleAddNews} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Catégorie / Badge</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="Événement">Événement</option>
                <option value="Partenariat">Partenariat</option>
                <option value="Admission">Admission</option>
                <option value="Vie Étudiante">Vie Étudiante</option>
                <option value="Examen & Stage">Examen & Stage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Titre de l'Actualité</label>
              <input
                type="text"
                required
                placeholder="Ex: Rentrée universitaire 2026-2027"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Champ de Téléversement Fichier Image */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Image d'Illustration (Optionnelle)</label>
              <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/20 transition relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <div className="space-y-2">
                    <img src={imagePreview} alt="Aperçu" className="h-28 w-full object-cover rounded-lg border border-slate-200" />
                    <p className="text-[11px] text-emerald-600 font-medium">Cliquer pour changer l'image</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <p className="text-xs font-semibold text-slate-600">Choisissez un fichier image</p>
                    <p className="text-[10px] text-slate-400">PNG, JPG ou WEBP jusqu'à 5MB</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Résumé</label>
              <textarea
                required
                rows={4}
                placeholder="Rédigez le texte de l'actualité..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {loading ? 'Téléversement & Publication...' : 'Publier l\'Actualité'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Actualités en Ligne ({newsList.length})
          </h2>

          {newsList.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              Aucune actualité publiée pour le moment.
            </div>
          ) : (
            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
              {newsList.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition flex justify-between items-start gap-4">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg border border-slate-200 shrink-0"
                    />
                  )}

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {item.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(item.publishedAt || item.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.content || item.summary}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
=======
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Newspaper, Plus, Trash2, Calendar, Tag, Upload, Image as ImageIcon, Loader2 } from 'lucide-react'

export default function AdminNewsManager() {
  const supabase = createClient()

  const [newsList, setNewsList] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Événement')
  const [description, setDescription] = useState('')
  
  // Gestion de l'image fichier
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    const { data, error } = await supabase
      .from('News')
      .select('*')
      .order('publishedAt', { ascending: false })

    if (data) setNewsList(data)
    if (error) console.error('Error fetching news:', error)
  }

  // Prévisualisation de l'image sélectionnée
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return

    setLoading(true)
    setMessage(null)

    let publicImageUrl: string | null = null

    // 1. Upload de l'image vers Supabase Storage si un fichier est sélectionné
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`
      const filePath = `public/${fileName}`

      const { data: storageData, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload Error:', uploadError)
        setMessage({ text: `Erreur d'upload image: ${uploadError.message}. Assurez-vous que le bucket 'news-images' existe.`, type: 'error' })
        setLoading(false)
        return
      }

      // Récupération de l'URL publique
      const { data: urlData } = supabase.storage
        .from('news-images')
        .getPublicUrl(filePath)

      publicImageUrl = urlData.publicUrl
    }

    // 2. Auteur par défaut (User)
    const { data: userData } = await supabase.from('User').select('id').limit(1).single()
    const fallbackAuthorId = userData?.id || crypto.randomUUID()

    // 3. Génération du Slug
    const generatedSlug = title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

    // 4. Insertion dans la base de données Prisma/Supabase
    const payload = {
      id: crypto.randomUUID(),
      title: title,
      slug: generatedSlug,
      summary: description.slice(0, 150),
      content: description,
      category: category,
      imageUrl: publicImageUrl,
      authorId: fallbackAuthorId,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const { data, error } = await supabase.from('News').insert([payload]).select().single()

    if (!error && data) {
      setNewsList([data, ...newsList])
      setTitle('')
      setDescription('')
      setImageFile(null)
      setImagePreview(null)
      setMessage({ text: 'Actualité publiée avec succès !', type: 'success' })
    } else {
      console.error('Error adding news:', error)
      setMessage({ 
        text: `Erreur: ${error?.message || 'Problème lors de la sauvegarde.'}`, 
        type: 'error' 
      })
    }
    setLoading(false)
  }

  const handleDeleteNews = async (id: string) => {
    const { error } = await supabase.from('News').delete().eq('id', id)
    if (!error) {
      setNewsList(newsList.filter(n => n.id !== id))
      setMessage({ text: 'Actualité supprimée.', type: 'success' })
    } else {
      console.error('Error deleting news:', error)
      setMessage({ text: `Erreur: ${error.message}`, type: 'error' })
    }
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Espace d'Administration
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Gestion des Actualités & Événements</h1>
          <p className="text-xs text-slate-500">Publiez ou supprimez les annonces visibles sur le portail public.</p>
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
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-emerald-600" /> Publier une Nouvelle Actualité
          </h2>

          <form onSubmit={handleAddNews} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Catégorie / Badge</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="Événement">Événement</option>
                <option value="Partenariat">Partenariat</option>
                <option value="Admission">Admission</option>
                <option value="Vie Étudiante">Vie Étudiante</option>
                <option value="Examen & Stage">Examen & Stage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Titre de l'Actualité</label>
              <input
                type="text"
                required
                placeholder="Ex: Rentrée universitaire 2026-2027"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Champ de Téléversement Fichier Image */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Image d'Illustration (Optionnelle)</label>
              <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/20 transition relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <div className="space-y-2">
                    <img src={imagePreview} alt="Aperçu" className="h-28 w-full object-cover rounded-lg border border-slate-200" />
                    <p className="text-[11px] text-emerald-600 font-medium">Cliquer pour changer l'image</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <p className="text-xs font-semibold text-slate-600">Choisissez un fichier image</p>
                    <p className="text-[10px] text-slate-400">PNG, JPG ou WEBP jusqu'à 5MB</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Résumé</label>
              <textarea
                required
                rows={4}
                placeholder="Rédigez le texte de l'actualité..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {loading ? 'Téléversement & Publication...' : 'Publier l\'Actualité'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Actualités en Ligne ({newsList.length})
          </h2>

          {newsList.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              Aucune actualité publiée pour le moment.
            </div>
          ) : (
            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
              {newsList.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition flex justify-between items-start gap-4">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg border border-slate-200 shrink-0"
                    />
                  )}

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {item.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(item.publishedAt || item.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.content || item.summary}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}