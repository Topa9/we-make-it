<<<<<<< HEAD
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'L\'École', href: '/ecole' },
    { label: 'Filières & Diplômes', href: '/filieres' },
    { label: 'Laboratoire Simulation', href: '/simulation' },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Contact', href: '/#contact' }, // Modifié pour pointer vers la section contact en bas de page
  ]

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      const targetId = href.replace('/#', '')
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* SCHOOL LOGO & NAME */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#00875A] rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm">
            NNE {/* CHANGE ABBREVIATION HERE */}
          </div>
          <div>
            <span className="font-black text-slate-900 text-sm tracking-tight block leading-none">
              NOUVEAU NOM DE L'ÉCOLE {/* CHANGE SCHOOL NAME HERE */}
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">
              Portail Académique Officiel
            </span>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {navLinks.map((link) => {
            const isActive = link.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleContactClick(e, link.href)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
          >
            Espace Membre
          </Link>
          <Link
            href="/inscriptions"
            className="px-4 py-2 bg-[#00875A] hover:bg-[#00704a] text-white rounded-xl text-xs font-bold shadow-sm transition"
          >
            Inscriptions
          </Link>
        </div>

      </div>
    </header>
  )
=======
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'L\'École', href: '/ecole' },
    { label: 'Filières & Diplômes', href: '/filieres' },
    { label: 'Laboratoire Simulation', href: '/simulation' },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Contact', href: '/#contact' }, // Modifié pour pointer vers la section contact en bas de page
  ]

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      const targetId = href.replace('/#', '')
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* SCHOOL LOGO & NAME */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#00875A] rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm">
            NNE {/* CHANGE ABBREVIATION HERE */}
          </div>
          <div>
            <span className="font-black text-slate-900 text-sm tracking-tight block leading-none">
              NOUVEAU NOM DE L'ÉCOLE {/* CHANGE SCHOOL NAME HERE */}
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">
              Portail Académique Officiel
            </span>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {navLinks.map((link) => {
            const isActive = link.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleContactClick(e, link.href)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
          >
            Espace Membre
          </Link>
          <Link
            href="/inscriptions"
            className="px-4 py-2 bg-[#00875A] hover:bg-[#00704a] text-white rounded-xl text-xs font-bold shadow-sm transition"
          >
            Inscriptions
          </Link>
        </div>

      </div>
    </header>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}