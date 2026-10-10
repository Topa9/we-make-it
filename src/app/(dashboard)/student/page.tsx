<<<<<<< HEAD
'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  GraduationCap, Calendar, Clock, CheckCircle, AlertTriangle, 
  Download, Stethoscope, Activity, MapPin, FileText, Loader2, HelpCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [filiere, setFiliere] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'academic' | 'clinical'>('academic');

  useEffect(() => {
    async function fetchStudentData() {
      setLoading(true);
      
      // 1. Récupérer l'utilisateur connecté
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // 2. Récupérer les infos de base (User)
      const { data: userData } = await supabase
        .from('User')
        .select('*')
        .eq('id', user.id)
        .single();

      // 3. Récupérer le profil étudiant
      const { data: profileData } = await supabase
        .from('StudentProfile')
        .select('*')
        .eq('userId', user.id)
        .single();

      // Formatage du nom complet
      let fullName = 'Étudiant(e)';
      if (userData?.firstName || userData?.lastName) {
        fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
      } else if (userData?.email) {
        fullName = userData.email.split('@')[0];
      }

      setStudentInfo({
        ...profileData,
        fullName,
        email: userData?.email
      });

      // 4. Si l'étudiant est assigné à une filière, charger la filière et ses modules
      if (profileData?.currentFiliereId) {
        const { data: filiereData } = await supabase
          .from('Filiere')
          .select('*')
          .eq('id', profileData.currentFiliereId)
          .single();
        
        setFiliere(filiereData);

        const { data: modulesData } = await supabase
          .from('Module')
          .select('*')
          .eq('filiereId', profileData.currentFiliereId)
          .order('semester', { ascending: true }); // Trier par semestre (S1, S2, etc.)

        if (modulesData) {
          setModules(modulesData);
        }
      }
      
      setLoading(false);
    }

    fetchStudentData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  // Stages statiques pour la démonstration (à dynamiser plus tard)
  const clinicalRotations = [
    { date: 'Lundi 25 Sept', time: '08:00 - 16:00', department: 'Réanimation Polyvalente', location: 'CHU Ibn Sina', supervisor: 'Dr. Naciri', status: 'upcoming' },
    { date: 'Jeudi 28 Sept', time: '20:00 - 08:00', department: 'Urgences Médicales', location: 'Hôpital Militaire', supervisor: 'Inf. Chef Benali', status: 'upcoming' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* HEADER ÉTUDIANT */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Espace Étudiant
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">{studentInfo?.matricule || 'Sans Matricule'}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 capitalize">{studentInfo?.fullName}</h1>
          <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            {filiere ? `${filiere.name} (${filiere.code})` : 'Aucune filière assignée'}
          </p>
        </div>

        {/* Global KPIs */}
        <div className="flex gap-4">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center min-w-[100px]">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Moyenne</p>
            <p className="text-2xl font-black text-slate-300">-</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center min-w-[100px]">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Modules</p>
            <p className="text-2xl font-black text-slate-800">{modules.length}</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center min-w-[100px]">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Absences</p>
            <p className="text-2xl font-black text-emerald-600">0h</p>
          </div>
        </div>
      </div>

      {filiere ? (
        <>
          {/* ONGLETS */}
          <div className="flex border-b border-slate-200 text-sm font-medium gap-6">
            <button
              onClick={() => setActiveTab('academic')}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'academic' 
                  ? 'border-emerald-600 text-emerald-600 font-semibold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              Programme & Résultats LMD
            </button>
            <button
              onClick={() => setActiveTab('clinical')}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'clinical' 
                  ? 'border-emerald-600 text-emerald-600 font-semibold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Planning des Stages & Gardes
            </button>
          </div>

          {/* CONTENU ONGLET 1 : RÉSULTATS ACADÉMIQUES */}
          {activeTab === 'academic' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-bold text-slate-800">Vos Modules Inscrits</h2>
                <button className="text-xs bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 transition-all">
                  <Download className="w-3.5 h-3.5" /> Exporter Relevé
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Semestre</th>
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Module (Unité d'Enseignement)</th>
                      <th className="py-3 px-4 text-center">Volume Horaire</th>
                      <th className="py-3 px-4 text-center">Statut (Note)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {modules.length > 0 ? modules.map((mod) => (
                      <tr key={mod.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-500">{mod.semester}</td>
                        <td className="py-4 px-4 font-mono text-slate-600 text-xs">{mod.code}</td>
                        <td className="py-4 px-4 font-semibold text-slate-800">{mod.name}</td>
                        <td className="py-4 px-4 text-center text-slate-600">{mod.hours}h</td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
                            <HelpCircle className="w-3 h-3" /> En attente d'évaluation
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 italic">
                          Aucun module n'a encore été configuré pour votre filière.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CONTENU ONGLET 2 : STAGES CLINIQUES */}
          {activeTab === 'clinical' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinicalRotations.map((stage, idx) => (
                <div key={idx} className="p-5 rounded-2xl border bg-white border-emerald-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500 text-white animate-pulse">
                      À Venir
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{stage.department}</h3>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> {stage.date}</p>
                      <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> {stage.time}</p>
                      <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {stage.location}</p>
                      <p className="flex items-center gap-2"><Stethoscope className="w-4 h-4 text-slate-400" /> {stage.supervisor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Aucune filière assignée</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Votre compte est actif, mais l'administration ne vous a pas encore assigné de filière (ex: Infirmier Polyvalent). Veuillez contacter le secrétariat.
          </p>
        </div>
      )}
    </div>
  );
=======
'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  GraduationCap, Calendar, Clock, CheckCircle, AlertTriangle, 
  Download, Stethoscope, Activity, MapPin, FileText, Loader2, HelpCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [filiere, setFiliere] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'academic' | 'clinical'>('academic');

  useEffect(() => {
    async function fetchStudentData() {
      setLoading(true);
      
      // 1. Récupérer l'utilisateur connecté
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // 2. Récupérer les infos de base (User)
      const { data: userData } = await supabase
        .from('User')
        .select('*')
        .eq('id', user.id)
        .single();

      // 3. Récupérer le profil étudiant
      const { data: profileData } = await supabase
        .from('StudentProfile')
        .select('*')
        .eq('userId', user.id)
        .single();

      // Formatage du nom complet
      let fullName = 'Étudiant(e)';
      if (userData?.firstName || userData?.lastName) {
        fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
      } else if (userData?.email) {
        fullName = userData.email.split('@')[0];
      }

      setStudentInfo({
        ...profileData,
        fullName,
        email: userData?.email
      });

      // 4. Si l'étudiant est assigné à une filière, charger la filière et ses modules
      if (profileData?.currentFiliereId) {
        const { data: filiereData } = await supabase
          .from('Filiere')
          .select('*')
          .eq('id', profileData.currentFiliereId)
          .single();
        
        setFiliere(filiereData);

        const { data: modulesData } = await supabase
          .from('Module')
          .select('*')
          .eq('filiereId', profileData.currentFiliereId)
          .order('semester', { ascending: true }); // Trier par semestre (S1, S2, etc.)

        if (modulesData) {
          setModules(modulesData);
        }
      }
      
      setLoading(false);
    }

    fetchStudentData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  // Stages statiques pour la démonstration (à dynamiser plus tard)
  const clinicalRotations = [
    { date: 'Lundi 25 Sept', time: '08:00 - 16:00', department: 'Réanimation Polyvalente', location: 'CHU Ibn Sina', supervisor: 'Dr. Naciri', status: 'upcoming' },
    { date: 'Jeudi 28 Sept', time: '20:00 - 08:00', department: 'Urgences Médicales', location: 'Hôpital Militaire', supervisor: 'Inf. Chef Benali', status: 'upcoming' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* HEADER ÉTUDIANT */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Espace Étudiant
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">{studentInfo?.matricule || 'Sans Matricule'}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 capitalize">{studentInfo?.fullName}</h1>
          <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            {filiere ? `${filiere.name} (${filiere.code})` : 'Aucune filière assignée'}
          </p>
        </div>

        {/* Global KPIs */}
        <div className="flex gap-4">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center min-w-[100px]">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Moyenne</p>
            <p className="text-2xl font-black text-slate-300">-</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center min-w-[100px]">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Modules</p>
            <p className="text-2xl font-black text-slate-800">{modules.length}</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center min-w-[100px]">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Absences</p>
            <p className="text-2xl font-black text-emerald-600">0h</p>
          </div>
        </div>
      </div>

      {filiere ? (
        <>
          {/* ONGLETS */}
          <div className="flex border-b border-slate-200 text-sm font-medium gap-6">
            <button
              onClick={() => setActiveTab('academic')}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'academic' 
                  ? 'border-emerald-600 text-emerald-600 font-semibold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              Programme & Résultats LMD
            </button>
            <button
              onClick={() => setActiveTab('clinical')}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'clinical' 
                  ? 'border-emerald-600 text-emerald-600 font-semibold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Planning des Stages & Gardes
            </button>
          </div>

          {/* CONTENU ONGLET 1 : RÉSULTATS ACADÉMIQUES */}
          {activeTab === 'academic' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-bold text-slate-800">Vos Modules Inscrits</h2>
                <button className="text-xs bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 transition-all">
                  <Download className="w-3.5 h-3.5" /> Exporter Relevé
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Semestre</th>
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Module (Unité d'Enseignement)</th>
                      <th className="py-3 px-4 text-center">Volume Horaire</th>
                      <th className="py-3 px-4 text-center">Statut (Note)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {modules.length > 0 ? modules.map((mod) => (
                      <tr key={mod.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-500">{mod.semester}</td>
                        <td className="py-4 px-4 font-mono text-slate-600 text-xs">{mod.code}</td>
                        <td className="py-4 px-4 font-semibold text-slate-800">{mod.name}</td>
                        <td className="py-4 px-4 text-center text-slate-600">{mod.hours}h</td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
                            <HelpCircle className="w-3 h-3" /> En attente d'évaluation
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 italic">
                          Aucun module n'a encore été configuré pour votre filière.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CONTENU ONGLET 2 : STAGES CLINIQUES */}
          {activeTab === 'clinical' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinicalRotations.map((stage, idx) => (
                <div key={idx} className="p-5 rounded-2xl border bg-white border-emerald-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500 text-white animate-pulse">
                      À Venir
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{stage.department}</h3>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> {stage.date}</p>
                      <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> {stage.time}</p>
                      <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {stage.location}</p>
                      <p className="flex items-center gap-2"><Stethoscope className="w-4 h-4 text-slate-400" /> {stage.supervisor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Aucune filière assignée</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Votre compte est actif, mais l'administration ne vous a pas encore assigné de filière (ex: Infirmier Polyvalent). Veuillez contacter le secrétariat.
          </p>
        </div>
      )}
    </div>
  );
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}