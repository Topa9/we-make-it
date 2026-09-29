<<<<<<< HEAD
'use client'

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { createClient } from "@/lib/supabase/client"
import { Calendar, Tag } from "lucide-react"

export default function ActualitesPage() {
  const supabase = createClient()
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from('News')
        .select('*')
        .order('publishedAt', { ascending: false })

      if (data) setNews(data)
      if (error) console.error("Error fetching public news:", error)
      setLoading(false)
    }
    fetchNews()
  }, [supabase])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Actualités & Événements
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              Restez informés de la vie académique et clinique de l'école.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          {loading ? (
            <div className="text-center py-16 text-xs text-slate-400">
              Chargement des actualités...
            </div>
          ) : news && news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
                >
                  {item.imageUrl && (
                    <div className="h-56 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}

                  <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {item.category || 'Général'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(item.publishedAt || item.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                        {item.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {item.content || item.summary || item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
              <p className="text-xs text-slate-500">Aucune actualité publiée pour le moment.</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  )
=======
'use client'

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { createClient } from "@/lib/supabase/client"
import { Calendar, Tag } from "lucide-react"

export default function ActualitesPage() {
  const supabase = createClient()
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from('News')
        .select('*')
        .order('publishedAt', { ascending: false })

      if (data) setNews(data)
      if (error) console.error("Error fetching public news:", error)
      setLoading(false)
    }
    fetchNews()
  }, [supabase])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Actualités & Événements
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              Restez informés de la vie académique et clinique de l'école.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          {loading ? (
            <div className="text-center py-16 text-xs text-slate-400">
              Chargement des actualités...
            </div>
          ) : news && news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
                >
                  {item.imageUrl && (
                    <div className="h-56 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}

                  <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {item.category || 'Général'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(item.publishedAt || item.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                        {item.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {item.content || item.summary || item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
              <p className="text-xs text-slate-500">Aucune actualité publiée pour le moment.</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}