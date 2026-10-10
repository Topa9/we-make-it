// src/app/(public)/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  Stethoscope, 
  GraduationCap, 
  ShieldAlert, 
  Calendar, 
  Clock, 
  ArrowRight, 
  PhoneCall, 
  Globe, 
  ChevronRight, 
  CheckCircle2, 
  Syringe, 
  Activity, 
  Building2 
} from 'lucide-react';

export default function PublicHomepage() {
  const [newsCategory, setNewsCategory] = useState<string>('Toutes');

  const newsItems = [
    {
      id: '1',
      title: 'Ouverture du Concours d’Admission 2024-2025 en Soins Infirmiers & IAR',
      category: 'Examens',
      date: '14 Septembre 2024',
      readTime: '3 min',
      summary: 'Dépôt des dossiers de candidature en ligne pour les bacheliers scientifiques et les professionnels de santé en reconversion.',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: '2',
      title: 'Convention de Stage Clinique Exclusive avec le Centre Hospitalier Universitaire',
      category: 'Stages Cliniques',
      date: '10 Septembre 2024',
      readTime: '4 min',
      summary: 'Plus de 450 places de stages en soins intensifs, urgences et réanimation pédiatrique allouées à nos promotions S3 et S5.',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    },
    {
      id: '3',
      title: 'Inauguration du Centre de Simulation Médicale Haute-Fidélité SimWard 3.0',
      category: 'Événements',
      date: '02 Septembre 2024',
      readTime: '2 min',
      summary: 'Équipé de mannequins robotisés interactifs et de salles de débriefing vidéo pour un entraînement immersif aux urgences vitales.',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      id: '4',
      title: 'Calendrier des Évaluations Semestrielles et Délibérations du S2',
      category: 'Général',
      date: '28 Août 2024',
      readTime: '5 min',
      summary: 'Publication des procès-verbaux de notes et ouverture des demandes de consultation de copies en ligne sur le portail.',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  const filteredNews = newsCategory === 'Toutes' 
    ? newsItems 
    : newsItems.filter(item => item.category === newsCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* 1. TOPBAR INSTITUTIONNELLE */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <PhoneCall className="w-3.5 h-3.5" />
              Permanence Admission : +212 (0) 5 37 77 88 99
            </span>
            <span className="hidden md:inline-block text-slate-400">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              Centre Hospitalier Partenaire : CHU Ibn Sina Rabat
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span className="font-semibold">FR</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400 hover:text-white">AR</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400 hover:text-white">EN</span>
            </div>
            <Link 
              href="/login" 
              className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-3 py-1 rounded transition-colors shadow-sm"
            >
              Portail Authentification
            </Link>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR PRINCIPALE STICKY */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-700 flex items-center justify-center text-white shadow-md">
              <HeartPulse className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                ESSI <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-semibold">MAROC</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                École Supérieure des Sciences Infirmières
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-700">
            <Link href="/" className="text-teal-600 font-semibold transition-colors">Accueil</Link>
            <Link href="#ecole" className="hover:text-teal-600 transition-colors">L&apos;École</Link>
            <Link href="#filieres" className="hover:text-teal-600 transition-colors">Filières & Diplômes</Link>
            <Link href="#simulation" className="hover:text-teal-600 transition-colors">Laboratoire Simulation</Link>
            <Link href="#actualites" className="hover:text-teal-600 transition-colors">Actualités</Link>
            <Link href="#contact" className="hover:text-teal-600 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/login"
              className="border border-slate-300 hover:border-teal-500 text-slate-800 hover:text-teal-600 font-medium text-sm px-4 py-2 rounded-lg transition-all"
            >
              Espace Membre
            </Link>
            <Link 
              href="/inscriptions"
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              Inscriptions
              <ChevronRight className="w-4 h-4 text-teal-400" />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION DYNAMIQUE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white py-20 lg:py-28 px-4 sm:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <Stethoscope className="w-4 h-4" />
              Excellence Médicale & Formation Clinique Accréditée
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Former l’Élite des <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Soins Infirmiers</span> & de la Santé de Demain.
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Inspirée de la rigueur académique universitaire marocaine et dotée d’un hôpital de simulation virtuelle de dernière génération. Préparez-vous aux réalités du bloc opératoire, des urgences et de la réanimation hospitalière.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#filieres"
                className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-teal-900/30 flex items-center gap-2 transition-all group"
              >
                Découvrir les Filières
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Statistiques Rapides */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-white">98%</p>
                <p className="text-xs text-slate-400 font-medium">Insertion CHU & Cliniques</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-teal-400">180</p>
                <p className="text-xs text-slate-400 font-medium">Crédits ECTS Reconnus</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-amber-400">1400h</p>
                <p className="text-xs text-slate-400 font-medium">Pratique Clinique & Gardes</p>
              </div>
            </div>
          </div>

          {/* Carte Visuelle Interactif / Laboratoire de Simulation */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700/80 p-6 border border-slate-700 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Live Simulation Lab</span>
                </div>
                <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-mono">SimMan 3G Ready</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-8 h-8 text-emerald-400" />
                    <div>
                      <p className="text-xs text-slate-400">Fréquence Cardiaque Simulée</p>
                      <p className="text-xl font-bold text-white font-mono">74 BPM <span className="text-xs text-emerald-400 font-normal">Rythme Sinusal</span></p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">Stable</span>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Syringe className="w-8 h-8 text-teal-400" />
                    <div>
                      <p className="text-xs text-slate-400">Atelier Urgence S4</p>
                      <p className="text-sm font-semibold text-white">Pose de Cathéter & Intubation</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Salle 204</span>
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200 leading-relaxed">
                    Les étudiants en S3 et S5 effectuent actuellement leur stage de pré-garde en réanimation médico-chirurgicale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HUB ACTUALITÉS & ANNONCES AVEC FILTRAGE */}
      <section id="actualites" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-teal-600 text-xs font-bold uppercase tracking-wider">Communication Officielle</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Actualités & Annonces Académiques
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Affichage des avis de concours, dates d’examens, conventions et vie de l&apos;institut.
            </p>
          </div>

          {/* Filtres par Catégories */}
          <div className="flex flex-wrap gap-2">
            {['Toutes', 'Général', 'Stages Cliniques', 'Examens', 'Événements'].map(cat => (
              <button
                key={cat}
                onClick={() => setNewsCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  newsCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des Cartes d'Actualités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map(item => (
            <article 
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
                <span className="text-teal-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer">
                  Lire <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. SECTION FILIÈRES & SPÉCIALITÉS (BENTO GRID) */}
      <section id="filieres" className="py-16 px-4 sm:px-8 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-teal-700 text-xs font-bold uppercase tracking-wider">Diplômes d&apos;État Accrédités</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
              Filières de Spécialisation Infirmière
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Un cursus LMD professionnel conforme aux directives du Ministère de la Santé et du Ministère de l&apos;Enseignement Supérieur du Royaume du Maroc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Bento Carte 1 : Grande - Infirmier Polyvalent */}
            <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10 text-teal-400">
                <Stethoscope className="w-64 h-64" />
              </div>
              <div>
                <span className="bg-teal-500/20 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full border border-teal-500/30">
                  Licence Professionnelle (3 Ans / S1 à S6)
                </span>
                <h3 className="text-2xl font-bold mt-4 text-white">
                  Infirmier Polyvalent (IP)
                </h3>
                <p className="text-slate-300 text-sm mt-3 max-w-md leading-relaxed">
                  Le pilier de la dispensation des soins de santé. Formation intensive en médecine interne, chirurgie générale, sémiologie, pharmacologie et prise en charge globale du patient.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    Stages Médecine & Chirurgie
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    Soins Ambulatoires & Santé Publique
                  </div>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Code Filière : FIL-IP</span>
                <Link href="/filieres/ip" className="text-teal-300 hover:text-teal-200 text-xs font-semibold flex items-center gap-1">
                  Consulter le programme <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Bento Carte 2 : Anesthésie & Réanimation */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-teal-500 transition-colors">
              <div>
                <span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  Spécialité Critique
                </span>
                <h3 className="text-lg font-bold mt-3 text-slate-900">
                  Anesthésie-Réanimation (IAR)
                </h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  Gestion des voies aériennes, monitorage hémodynamique au bloc opératoire et réanimation chirurgicale.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">FIL-IAR</span>
                <span className="text-teal-600 font-semibold cursor-pointer">Détails →</span>
              </div>
            </div>

            {/* Bento Carte 3 : Urgences & Soins Intensifs */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-teal-500 transition-colors">
              <div>
                <span className="bg-rose-100 text-rose-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  Urgences Vitales
                </span>
                <h3 className="text-lg font-bold mt-3 text-slate-900">
                  Urgences & Soins Intensifs
                </h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  Triage des polytraumatisés, protocoles SAMU/SMUR et réanimation cardio-pulmonaire avancée.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">FIL-ISUSI</span>
                <span className="text-teal-600 font-semibold cursor-pointer">Détails →</span>
              </div>
            </div>

            {/* Bento Carte 4 : Pédiatrie & Néonatologie */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-teal-500 transition-colors">
              <div>
                <span className="bg-blue-100 text-blue-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  Mère & Enfant
                </span>
                <h3 className="text-lg font-bold mt-3 text-slate-900">
                  Pédiatrie & Néonatologie
                </h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  Soins aux prématurés en couveuse, réanimation néonatale et accompagnement pédiatrique bienveillant.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">FIL-PED</span>
                <span className="text-teal-600 font-semibold cursor-pointer">Détails →</span>
              </div>
            </div>

            {/* Bento Carte 5 : Laboratoire de Simulation Haute-Fidélité */}
            <div className="md:col-span-2 lg:col-span-3 bg-teal-900 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <span className="bg-teal-700/50 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full">
                  Infrastructure Hospitalière Dédiée
                </span>
                <h3 className="text-xl font-bold text-white">Centre de Simulation Clinique Virtuelle</h3>
                <p className="text-teal-100 text-xs max-w-xl">
                  Plus de 600m² recréant les conditions exactes d’un service d’urgence, d’un bloc opératoire et d’une chambre d’hospitalisation pour s’entraîner sans risque pour le patient.
                </p>
              </div>
              <Link 
                href="#simulation" 
                className="bg-white text-teal-900 hover:bg-teal-50 font-semibold text-xs px-5 py-3 rounded-xl shrink-0 transition-colors"
              >
                Visiter Virtuellement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER INSTITUTIONNEL COMPLET */}
      <footer id="contact" className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <HeartPulse className="w-5 h-5 text-teal-400" />
              <span className="text-white font-bold text-base">ESSI MAROC</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              École Supérieure des Sciences Infirmières. Établissement d&apos;enseignement supérieur accrédité formant les cadres de santé de référence au Maroc et à l&apos;international.
            </p>
            <p className="text-slate-500 text-[11px]">
              Agréé par le Ministère de l&apos;Enseignement Supérieur & le Ministère de la Santé.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Accès Rapide</h4>
            <ul className="space-y-2.5">
              <li><Link href="/login" className="hover:text-teal-400 transition-colors">Portail des Étudiants</Link></li>
              <li><Link href="/login" className="hover:text-teal-400 transition-colors">Espace Enseignants & Délibérations</Link></li>
              <li><Link href="#filieres" className="hover:text-teal-400 transition-colors">Filières & Programmes LMD</Link></li>
              <li><Link href="#actualites" className="hover:text-teal-400 transition-colors">Calendrier des Stages Hospitaliers</Link></li>
              <li><Link href="/reglement" className="hover:text-teal-400 transition-colors">Charte & Règlement des Examens</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Hôpitaux Universitaires Affiliés</h4>
            <ul className="space-y-2.5">
              <li>CHU Ibn Sina - Rabat</li>
              <li>Hôpital Militaire d’Instruction Mohammed V</li>
              <li>Hôpital d’Enfants de Rabat (HER)</li>
              <li>CHU Ibn Rochd - Casablanca</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact & Emplacement</h4>
            <p className="leading-relaxed">
              Avenue Allal El Fassi, Cité Universitaire Madinat Al Irfane, Rabat, Maroc.
            </p>
            <p className="mt-2 text-teal-400 font-medium">Tél : +212 (0) 5 37 77 88 00</p>
            <p className="text-slate-400">Email : contact@essi-sante.ac.ma</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} École Supérieure des Sciences Infirmières. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-slate-400">Mentions Légales</Link>
            <Link href="#" className="hover:text-slate-400">Protection des Données (CNDP)</Link>
            <Link href="#" className="hover:text-slate-400">Support Informatique</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}