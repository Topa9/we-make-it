<<<<<<< HEAD
// src/app/(public)/inscriptions/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Upload, 
  FileText, 
  AlertCircle,
  ChevronLeft
} from 'lucide-react';

export default function InscriptionPage() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceCode, setReferenceCode] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    cin: '',
    dateNaissance: '',
    ville: '',
    typeBac: 'Sciences Expérimentales - SVT',
    anneeBac: '2026',
    mentionBac: 'Bien',
    noteBac: '',
    filiere: 'Infirmier Polyvalent (IP)',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Génération d'un code de dossier fictif
    const randomRef = `ESSI-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(randomRef);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* HEADER MINIMALISTE */}
      <header className="bg-slate-900 text-white border-b border-slate-800 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs font-medium">
            <ChevronLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <div className="flex items-center space-x-2">
            <HeartPulse className="w-5 h-5 text-teal-400" />
            <span className="font-bold text-sm tracking-tight">Ecole MAROC — Espace Inscription</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION DE LA PAGE */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold px-3 py-1 rounded-full">
            Session de Recrutement 2026 - 2027
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Plateforme de Candidature en Ligne
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Remplissez soigneusement le formulaire ci-dessous pour soumettre votre dossier de candidature aux Licences Professionnelles en Sciences Infirmières.
          </p>
        </div>
      </section>

      {/* CONTENU PRINCIPAL / FORMULAIRE */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-8 py-10 -mt-6">
        
        {!isSubmitted ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10">
            
            {/* PROGRESS BAR SIMULÉE */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 text-xs font-semibold">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-teal-600' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 1 ? 'bg-teal-600' : 'bg-slate-300'}`}>1</span>
                Informations Personnelles
              </div>
              <div className="w-12 h-0.5 bg-slate-200"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-teal-600' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 2 ? 'bg-teal-600' : 'bg-slate-300'}`}>2</span>
                Parcours & Filière
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-600" />
                    Identité & Coordonnées du Candidat
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Nom</label>
                      <input 
                        type="text" 
                        name="nom"
                        required
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Ex: Alami"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom</label>
                      <input 
                        type="text" 
                        name="prenom"
                        required
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Ex: Fatima Zahra"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nom.prenom@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro de Téléphone</label>
                      <input 
                        type="tel" 
                        name="telephone"
                        required
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="+212 6 XX XX XX XX"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">N° CIN / Passeport</label>
                      <input 
                        type="text" 
                        name="cin"
                        required
                        value={formData.cin}
                        onChange={handleChange}
                        placeholder="Ex: AB123456"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date de Naissance</label>
                      <input 
                        type="date" 
                        name="dateNaissance"
                        required
                        value={formData.dateNaissance}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ville de Résidence</label>
                      <input 
                        type="text" 
                        name="ville"
                        required
                        value={formData.ville}
                        onChange={handleChange}
                        placeholder="Ex: Rabat"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
                    >
                      Étape Suivante <ArrowRight className="w-4 h-4 text-teal-400" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    Choix du Diplôme & Cursus Antérieur
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Filière Souhaitée</label>
                    <select 
                      name="filiere"
                      value={formData.filiere}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                    >
                      <option value="Infirmier Polyvalent (IP)">Infirmier Polyvalent (IP)</option>
                      <option value="Anesthésie-Réanimation (IAR)">Anesthésie-Réanimation (IAR)</option>
                      <option value="Urgences & Soins Intensifs (ISUSI)">Urgences & Soins Intensifs (ISUSI)</option>
                      <option value="Pédiatrie & Néonatologie (PED)">Pédiatrie & Néonatologie (PED)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Type de Baccalauréat</label>
                      <select 
                        name="typeBac"
                        value={formData.typeBac}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      >
                        <option value="Sciences Expérimentales - SVT">Sciences Expérimentales - SVT</option>
                        <option value="Sciences Expérimentales - PC">Sciences Expérimentales - PC</option>
                        <option value="Sciences Mathématiques A">Sciences Mathématiques A</option>
                        <option value="Bac Professionnel Santé">Bac Professionnel Santé</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mention Obtenue au Bac</label>
                      <select 
                        name="mentionBac"
                        value={formData.mentionBac}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      >
                        <option value="Passable">Passable</option>
                        <option value="Assez Bien">Assez Bien</option>
                        <option value="Bien">Bien</option>
                        <option value="Très Bien">Très Bien</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Moyenne Générale du Baccalauréat (/20)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      max="20"
                      min="10"
                      name="noteBac"
                      required
                      value={formData.noteBac}
                      onChange={handleChange}
                      placeholder="Ex: 14.50"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                    />
                  </div>

                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-teal-900 leading-relaxed">
                      En soumettant ce formulaire, vous certifiez l&apos;exactitude des informations fournies. Un dossier physique complet vous sera demandé lors de votre convocation au concours écrit.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs px-5 py-3 rounded-xl transition-all"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-lg shadow-teal-900/20 transition-all flex items-center gap-2"
                    >
                      Valider & Soumettre ma Candidature <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </form>

          </div>
        ) : (
          /* ÉCRAN DE SUCCÈS APRÈS SOUMISSION */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Candidature Enregistrée avec Succès</span>
              <h2 className="text-2xl font-bold text-slate-900">Félicitations, {formData.prenom} !</h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Votre pré-inscription pour la filière <strong>{formData.filiere}</strong> a été prise en compte dans notre système académique.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto space-y-1">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Référence de Dossier</p>
              <p className="text-lg font-mono font-bold text-slate-900">{referenceCode}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button 
                onClick={() => window.print()}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-teal-400" />
                Imprimer mon Reçu
              </button>
              <Link 
                href="/"
                className="border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold px-5 py-3 rounded-xl transition-all"
              >
                Retour à l&apos;Accueil
              </Link>
            </div>
          </div>
        )}

      </main>

    </div>
  );
=======
// src/app/(public)/inscriptions/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Upload, 
  FileText, 
  AlertCircle,
  ChevronLeft
} from 'lucide-react';

export default function InscriptionPage() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceCode, setReferenceCode] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    cin: '',
    dateNaissance: '',
    ville: '',
    typeBac: 'Sciences Expérimentales - SVT',
    anneeBac: '2026',
    mentionBac: 'Bien',
    noteBac: '',
    filiere: 'Infirmier Polyvalent (IP)',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Génération d'un code de dossier fictif
    const randomRef = `ESSI-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(randomRef);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* HEADER MINIMALISTE */}
      <header className="bg-slate-900 text-white border-b border-slate-800 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs font-medium">
            <ChevronLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <div className="flex items-center space-x-2">
            <HeartPulse className="w-5 h-5 text-teal-400" />
            <span className="font-bold text-sm tracking-tight">Ecole MAROC — Espace Inscription</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION DE LA PAGE */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold px-3 py-1 rounded-full">
            Session de Recrutement 2026 - 2027
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Plateforme de Candidature en Ligne
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Remplissez soigneusement le formulaire ci-dessous pour soumettre votre dossier de candidature aux Licences Professionnelles en Sciences Infirmières.
          </p>
        </div>
      </section>

      {/* CONTENU PRINCIPAL / FORMULAIRE */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-8 py-10 -mt-6">
        
        {!isSubmitted ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10">
            
            {/* PROGRESS BAR SIMULÉE */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 text-xs font-semibold">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-teal-600' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 1 ? 'bg-teal-600' : 'bg-slate-300'}`}>1</span>
                Informations Personnelles
              </div>
              <div className="w-12 h-0.5 bg-slate-200"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-teal-600' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 2 ? 'bg-teal-600' : 'bg-slate-300'}`}>2</span>
                Parcours & Filière
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-600" />
                    Identité & Coordonnées du Candidat
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Nom</label>
                      <input 
                        type="text" 
                        name="nom"
                        required
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Ex: Alami"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom</label>
                      <input 
                        type="text" 
                        name="prenom"
                        required
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Ex: Fatima Zahra"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nom.prenom@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro de Téléphone</label>
                      <input 
                        type="tel" 
                        name="telephone"
                        required
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="+212 6 XX XX XX XX"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">N° CIN / Passeport</label>
                      <input 
                        type="text" 
                        name="cin"
                        required
                        value={formData.cin}
                        onChange={handleChange}
                        placeholder="Ex: AB123456"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date de Naissance</label>
                      <input 
                        type="date" 
                        name="dateNaissance"
                        required
                        value={formData.dateNaissance}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ville de Résidence</label>
                      <input 
                        type="text" 
                        name="ville"
                        required
                        value={formData.ville}
                        onChange={handleChange}
                        placeholder="Ex: Rabat"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
                    >
                      Étape Suivante <ArrowRight className="w-4 h-4 text-teal-400" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    Choix du Diplôme & Cursus Antérieur
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Filière Souhaitée</label>
                    <select 
                      name="filiere"
                      value={formData.filiere}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                    >
                      <option value="Infirmier Polyvalent (IP)">Infirmier Polyvalent (IP)</option>
                      <option value="Anesthésie-Réanimation (IAR)">Anesthésie-Réanimation (IAR)</option>
                      <option value="Urgences & Soins Intensifs (ISUSI)">Urgences & Soins Intensifs (ISUSI)</option>
                      <option value="Pédiatrie & Néonatologie (PED)">Pédiatrie & Néonatologie (PED)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Type de Baccalauréat</label>
                      <select 
                        name="typeBac"
                        value={formData.typeBac}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      >
                        <option value="Sciences Expérimentales - SVT">Sciences Expérimentales - SVT</option>
                        <option value="Sciences Expérimentales - PC">Sciences Expérimentales - PC</option>
                        <option value="Sciences Mathématiques A">Sciences Mathématiques A</option>
                        <option value="Bac Professionnel Santé">Bac Professionnel Santé</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mention Obtenue au Bac</label>
                      <select 
                        name="mentionBac"
                        value={formData.mentionBac}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                      >
                        <option value="Passable">Passable</option>
                        <option value="Assez Bien">Assez Bien</option>
                        <option value="Bien">Bien</option>
                        <option value="Très Bien">Très Bien</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Moyenne Générale du Baccalauréat (/20)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      max="20"
                      min="10"
                      name="noteBac"
                      required
                      value={formData.noteBac}
                      onChange={handleChange}
                      placeholder="Ex: 14.50"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                    />
                  </div>

                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-teal-900 leading-relaxed">
                      En soumettant ce formulaire, vous certifiez l&apos;exactitude des informations fournies. Un dossier physique complet vous sera demandé lors de votre convocation au concours écrit.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs px-5 py-3 rounded-xl transition-all"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-lg shadow-teal-900/20 transition-all flex items-center gap-2"
                    >
                      Valider & Soumettre ma Candidature <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </form>

          </div>
        ) : (
          /* ÉCRAN DE SUCCÈS APRÈS SOUMISSION */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Candidature Enregistrée avec Succès</span>
              <h2 className="text-2xl font-bold text-slate-900">Félicitations, {formData.prenom} !</h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Votre pré-inscription pour la filière <strong>{formData.filiere}</strong> a été prise en compte dans notre système académique.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto space-y-1">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Référence de Dossier</p>
              <p className="text-lg font-mono font-bold text-slate-900">{referenceCode}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button 
                onClick={() => window.print()}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-teal-400" />
                Imprimer mon Reçu
              </button>
              <Link 
                href="/"
                className="border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold px-5 py-3 rounded-xl transition-all"
              >
                Retour à l&apos;Accueil
              </Link>
            </div>
          </div>
        )}

      </main>

    </div>
  );
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}