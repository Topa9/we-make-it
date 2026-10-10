// src/components/clinical/ClinicalReadinessCard.tsx
'use client';

import React from 'react';
import { ShieldCheck, Stethoscope, AlertCircle, Award, CheckCircle2 } from 'lucide-react';

interface ClinicalReadinessProps {
  theoryScore: number;    // Ex: 14.5 / 20
  practicalScore: number; // Ex: 16.0 / 20
  attendanceRate: number; // Ex: 96% -> 0.96
  hospitalHoursDone: number; // Ex: 320h
  requiredHours: number;     // Ex: 400h
}

export const ClinicalReadinessCard: React.FC<ClinicalReadinessProps> = ({
  theoryScore,
  practicalScore,
  attendanceRate,
  hospitalHoursDone,
  requiredHours,
}) => {
  // Calcul de l'indice composite sur 100 :
  // 35% Théorie (sur 20 ramené à 100)
  // 40% Pratique & Simulation (sur 20 ramené à 100)
  // 25% Assiduité et Ponctualité (sur 100)
  const normalizedTheory = (theoryScore / 20) * 100;
  const normalizedPractice = (practicalScore / 20) * 100;
  const normalizedAttendance = attendanceRate * 100;

  const readinessScore = Math.round(
    normalizedTheory * 0.35 + normalizedPractice * 0.40 + normalizedAttendance * 0.25
  );

  const getTier = (score: number) => {
    if (score >= 85) return { label: 'Aptitude Clinique Avancée (Garde Urgences Autorisée)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', barColor: 'bg-emerald-500' };
    if (score >= 70) return { label: 'Aptitude Validée (Pratique sous Supervision)', color: 'text-teal-700 bg-teal-50 border-teal-200', barColor: 'bg-teal-500' };
    if (score >= 50) return { label: 'Aptitude Conditionnelle (Renforcement TP Requis)', color: 'text-amber-700 bg-amber-50 border-amber-200', barColor: 'bg-amber-500' };
    return { label: 'Non Autorisé en Milieu Hospitalier', color: 'text-rose-700 bg-rose-50 border-rose-200', barColor: 'bg-rose-500' };
  };

  const tier = getTier(readinessScore);
  const hoursProgress = Math.min(100, Math.round((hospitalHoursDone / requiredHours) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 max-w-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Clinical Readiness Score</h3>
            <p className="text-[11px] text-slate-500">Indice de Préparation Hospitalière</p>
          </div>
        </div>
        <span className="text-2xl font-black font-mono text-slate-900">
          {readinessScore}<span className="text-xs text-slate-400">/100</span>
        </span>
      </div>

      {/* Jauge principale */}
      <div className="space-y-1.5">
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${tier.barColor} transition-all duration-500`}
            style={{ width: `${readinessScore}%` }}
          />
        </div>
        <div className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${tier.color} text-center`}>
          {tier.label}
        </div>
      </div>

      {/* Détails des indicateurs */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
        <div className="p-2 rounded-lg bg-slate-50">
          <p className="text-[10px] text-slate-500">Théorie (35%)</p>
          <p className="font-bold text-slate-800 font-mono mt-0.5">{theoryScore}/20</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-50">
          <p className="text-[10px] text-slate-500">Simulation (40%)</p>
          <p className="font-bold text-teal-700 font-mono mt-0.5">{practicalScore}/20</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-50">
          <p className="text-[10px] text-slate-500">Assiduité (25%)</p>
          <p className="font-bold text-slate-800 font-mono mt-0.5">{Math.round(attendanceRate * 100)}%</p>
        </div>
      </div>

      {/* Progression des heures hospitalières */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-slate-600">Gardes Hospitalières Effectuées</span>
          <span className="font-mono text-slate-900 font-bold">{hospitalHoursDone}h / {requiredHours}h</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-600 rounded-full"
            style={{ width: `${hoursProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
