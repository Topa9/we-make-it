'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Users, Award, CheckCircle, AlertTriangle, XCircle, 
  Save, Download, Activity, Stethoscope, HelpCircle, EyeOff, Loader2 
} from 'lucide-react';

export default function TeacherDashboard() {
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [teacherProfile, setTeacherProfile] = useState<any>(null);
  const [myModules, setMyModules] = useState<any[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [students, setStudents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'grades' | 'attendance'>('grades');
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Initial Data Fetch: Get User, Teacher Profile & Assigned Modules
  useEffect(() => {
    async function fetchTeacherData() {
      setLoading(true);
      setErrorMessage(null);
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setErrorMessage("Utilisateur non authentifié.");
        setLoading(false);
        return;
      }
      
      const { data: userData } = await supabase
        .from('User')
        .select('*')
        .eq('id', user.id)
        .single();
        
      setCurrentUser(userData);

      const { data: tProfile } = await supabase
        .from('TeacherProfile')
        .select('*')
        .eq('userId', user.id)
        .single();

      setTeacherProfile(tProfile);

      if (tProfile) {
        const { data: modulesData, error: modError } = await supabase
          .from('Module')
          .select(`
            id, code, name, semester, hours, filiereId,
            Filiere ( id, code, name, degree )
          `)
          .eq('coordinatorId', tProfile.id);

        if (modulesData && modulesData.length > 0) {
          setMyModules(modulesData);
          setSelectedModuleId(modulesData[0].id);
        }
        if (modError) {
          console.error("Error fetching modules:", modError);
        }
      }
      
      setLoading(false);
    }
    
    fetchTeacherData();
  }, [supabase]);

  // 2. Fetch Students and their saved Grades when a Module is selected
  useEffect(() => {
    async function fetchStudentsAndGrades() {
      if (!selectedModuleId) return;
      
      const selectedModule = myModules.find(m => m.id === selectedModuleId);
      if (!selectedModule || !selectedModule.filiereId) return;

      // Récupération des étudiants de la filière liée au module
      const { data: studentProfiles, error: studentError } = await supabase
        .from('StudentProfile')
        .select(`
          id, currentFiliereId,
          User!inner ( id, email, role, firstName, lastName, matricule )
        `)
        .eq('currentFiliereId', selectedModule.filiereId);

      if (studentError) {
        console.error("Error fetching students:", studentError);
        return;
      }

      // Récupération des notes existantes dans la table Grade
      const { data: gradesData, error: gradesError } = await supabase
        .from('Grade')
        .select('*')
        .eq('moduleId', selectedModuleId);

      if (gradesError) {
        console.error("Error fetching grades:", gradesError);
      }

      if (studentProfiles) {
        const formattedStudents = studentProfiles.map((sp: any) => {
          let fullName = 'Étudiant';
          if (sp.User) {
            if (sp.User.firstName || sp.User.lastName) {
              fullName = `${sp.User.firstName || ''} ${sp.User.lastName || ''}`.trim();
            } else if (sp.User.email) {
              fullName = sp.User.email.split('@')[0];
            }
          }

          // Association des notes enregistrées et de leur ID unique
          const existingGrade = gradesData?.find((g: any) => g.studentId === sp.id);

          return {
            id: sp.id, // ID du StudentProfile
            gradeRecordId: existingGrade?.id || null, // ID de la ligne Grade existante
            userId: sp.User?.id,
            matricule: sp.User?.matricule || 'N/A',
            fullName: fullName,
            cc: existingGrade?.continuousAssessment ?? '', 
            tp: existingGrade?.practicalAssessment ?? '', 
            exam: existingGrade?.finalExam ?? '', 
            catchUp: existingGrade?.catchUpExam ?? '',
            absencesCount: 0,
            totalHours: selectedModule.hours || 45,
          };
        });
        setStudents(formattedStudents);
      }
    }

    fetchStudentsAndGrades();
  }, [selectedModuleId, myModules, supabase]);

  const calculateFinalGrade = (row: any): number | null => {
    if (row.cc === '' || row.tp === '' || row.exam === '') return null;
    const initialAverage = Number(row.cc) * 0.3 + Number(row.tp) * 0.3 + Number(row.exam) * 0.4;
    if (row.catchUp !== '') {
      const catchUpAverage = Number(row.cc) * 0.3 + Number(row.tp) * 0.3 + Number(row.catchUp) * 0.4;
      return Math.max(initialAverage, catchUpAverage);
    }
    return parseFloat(initialAverage.toFixed(2));
  };

  const getValidationStatus = (finalGrade: number | null, absenceRate: number) => {
    if (absenceRate > 0.15) return { label: 'Éliminé (>15%)', color: 'bg-red-100 text-red-800 border-red-300', icon: XCircle };
    if (finalGrade === null) return { label: 'Incomplet', color: 'bg-slate-100 text-slate-600 border-slate-300', icon: HelpCircle };
    if (finalGrade >= 10) return { label: 'Validé (V)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle };
    if (finalGrade >= 7) return { label: 'Rattrapage (R)', color: 'bg-amber-100 text-amber-800 border-amber-300', icon: AlertTriangle };
    return { label: 'Non Validé (NV)', color: 'bg-rose-100 text-rose-800 border-rose-300', icon: XCircle };
  };

  const handleGradeChange = (id: string, field: string, value: string) => {
    setIsSaved(false);
    const num = value === '' ? '' : Math.min(20, Math.max(0, parseFloat(value) || 0));
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: num } : s));
  };

  // 3. Sauvegarde réelle avec génération automatique de l'ID pour éviter les erreurs Prisma/Postgres
  const handleSaveAll = async () => {
    if (!teacherProfile?.id) {
      setErrorMessage("Profil enseignant introuvable pour signer les notes.");
      return;
    }

    setSaving(true);
    setIsSaved(false);
    setErrorMessage(null);

    const gradesToUpsert = students.map(student => ({
      id: student.gradeRecordId || crypto.randomUUID(), // Résout l'erreur de contrainte not-null sur l'id
      studentId: student.id,
      moduleId: selectedModuleId,
      evaluatorId: teacherProfile.id,
      continuousAssessment: student.cc === '' ? null : Number(student.cc),
      practicalAssessment: student.tp === '' ? null : Number(student.tp),
      finalExam: student.exam === '' ? null : Number(student.exam),
      catchUpExam: student.catchUp === '' ? null : Number(student.catchUp),
      updatedAt: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('Grade')
      .upsert(gradesToUpsert, { onConflict: 'studentId,moduleId' });

    setSaving(false);

    if (error) {
      console.error("Erreur lors de l'enregistrement des notes:", error);
      setErrorMessage("Erreur lors de l'enregistrement : " + error.message);
    } else {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3500);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  const selectedModuleData = myModules.find(m => m.id === selectedModuleId);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Espace Enseignant & Délibération
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {currentUser?.email || 'Professeur'}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Gestion Académique & Suivi Pédagogique
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {myModules.length > 0 ? (
            <select 
              value={selectedModuleId} 
              onChange={(e) => setSelectedModuleId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 outline-none max-w-xs"
            >
              {myModules.map(mod => (
                <option key={mod.id} value={mod.id}>
                  {mod.code} - {mod.name} ({mod.Filiere?.code || 'N/A'} - {mod.semester})
                </option>
              ))}
            </select>
          ) : (
            <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-3 py-2 rounded-lg border border-rose-200">
              Aucun module assigné
            </span>
          )}

          <button 
            onClick={handleSaveAll}
            disabled={myModules.length === 0 || saving}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} 
            {saving ? 'Enregistrement...' : 'Enregistrer les Notes'}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs px-4 py-3 rounded-xl">
          {errorMessage}
        </div>
      )}

      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Notes et observations synchronisées avec succès.
          </span>
        </div>
      )}

      {myModules.length > 0 ? (
        <>
          <div className="flex border-b border-slate-200 text-sm font-medium gap-6">
            <button onClick={() => setActiveTab('grades')} className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'grades' ? 'border-emerald-600 text-emerald-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
              <Award className="w-4 h-4" /> Grille de Notation
            </button>
            <button onClick={() => setActiveTab('attendance')} className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'attendance' ? 'border-emerald-600 text-emerald-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
              <Users className="w-4 h-4" /> Assiduité & Stages
            </button>
          </div>

          {activeTab === 'grades' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">
                    Étudiants inscrits en {selectedModuleData?.Filiere?.name || 'cette filière'} ({selectedModuleData?.semester})
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/75 text-slate-700 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Matricule</th>
                      <th className="py-3 px-4">Étudiant(e)</th>
                      <th className="py-3 px-4 text-center">CC (30%)</th>
                      <th className="py-3 px-4 text-center">TP / Simu (30%)</th>
                      <th className="py-3 px-4 text-center">Examen (40%)</th>
                      <th className="py-3 px-4 text-center">Rattrapage</th>
                      <th className="py-3 px-4 text-center">Moyenne Finale</th>
                      <th className="py-3 px-4 text-center">Statut LMD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.length > 0 ? students.map((student) => {
                      const final = calculateFinalGrade(student);
                      const absenceRate = student.absencesCount / student.totalHours;
                      const status = getValidationStatus(final, absenceRate);
                      const StatusIcon = status.icon;

                      return (
                        <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-medium text-slate-600">{student.matricule}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">{student.fullName}</td>
                          <td className="py-3 px-4 text-center">
                            <input type="number" step="0.25" min="0" max="20" value={student.cc} onChange={(e) => handleGradeChange(student.id, 'cc', e.target.value)} className="w-16 text-center border border-slate-300 rounded px-1.5 py-1 font-mono font-semibold focus:border-emerald-500 outline-none" />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input type="number" step="0.25" min="0" max="20" value={student.tp} onChange={(e) => handleGradeChange(student.id, 'tp', e.target.value)} className="w-16 text-center border border-slate-300 rounded px-1.5 py-1 font-mono font-semibold focus:border-emerald-500 outline-none" />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input type="number" step="0.25" min="0" max="20" value={student.exam} onChange={(e) => handleGradeChange(student.id, 'exam', e.target.value)} className="w-16 text-center border border-slate-300 rounded px-1.5 py-1 font-mono font-semibold focus:border-emerald-500 outline-none" />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input type="number" step="0.25" min="0" max="20" placeholder="-" value={student.catchUp} onChange={(e) => handleGradeChange(student.id, 'catchUp', e.target.value)} className="w-16 text-center border border-amber-200 bg-amber-50/50 rounded px-1.5 py-1 font-mono font-semibold focus:border-amber-500 outline-none" />
                          </td>
                          <td className="py-3 px-4 text-center font-mono font-bold text-sm">
                            {final !== null ? <span className={final >= 10 ? 'text-emerald-700' : 'text-rose-600'}>{final.toFixed(2)}/20</span> : <span className="text-slate-400">-</span>}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${status.color}`}>
                              <StatusIcon className="w-3 h-3" /> {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400 italic">
                          Aucun étudiant inscrit dans cette filière pour le moment.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
               <h3 className="text-sm font-bold text-slate-900">Suivi d'Assiduité - {selectedModuleData?.name}</h3>
               <p className="text-xs text-slate-500">Volume horaire total du module : {selectedModuleData?.hours} heures.</p>
               <div className="border border-slate-100 rounded-xl overflow-hidden">
                 <table className="w-full text-left text-xs">
                   <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                     <tr>
                       <th className="py-3 px-4">Matricule</th>
                       <th className="py-3 px-4">Étudiant(e)</th>
                       <th className="py-3 px-4 text-center">Heures d'Absence</th>
                       <th className="py-3 px-4 text-center">Taux d'Absence</th>
                       <th className="py-3 px-4 text-center">Statut Alerte</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {students.map((st) => {
                       const rate = st.absencesCount / (st.totalHours || 45);
                       return (
                         <tr key={st.id}>
                           <td className="py-3 px-4 font-mono">{st.matricule}</td>
                           <td className="py-3 px-4 font-semibold">{st.fullName}</td>
                           <td className="py-3 px-4 text-center">
                             <input 
                               type="number" 
                               min="0" 
                               max={st.totalHours} 
                               value={st.absencesCount} 
                               onChange={(e) => {
                                 const val = parseInt(e.target.value) || 0;
                                 setStudents(prev => prev.map(s => s.id === st.id ? { ...s, absencesCount: val } : s));
                               }} 
                               className="w-16 text-center border border-slate-300 rounded px-1 py-0.5 font-mono" 
                             />
                           </td>
                           <td className="py-3 px-4 text-center font-mono font-bold">
                             {(rate * 100).toFixed(1)}%
                           </td>
                           <td className="py-3 px-4 text-center">
                             {rate > 0.15 ? (
                               <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-[10px] font-bold">Alerte &gt; 15%</span>
                             ) : (
                               <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Normal</span>
                             )}
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
               </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
          <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Aucun module assigné à votre profil</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Votre compte est actif, mais aucun module ne vous a encore été assigné en tant que coordinateur dans l'administration.
          </p>
        </div>
      )}
    </div>
  );
}