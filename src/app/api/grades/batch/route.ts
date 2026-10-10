// src/app/api/grades/batch/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Schéma de validation des notes soumises
const gradeItemSchema = z.object({
  studentId: z.string().cuid(),
  moduleId: z.string().cuid(),
  continuousAssessment: z.number().min(0).max(20).nullable().optional(),
  practicalAssessment: z.number().min(0).max(20).nullable().optional(),
  finalExam: z.number().min(0).max(20).nullable().optional(),
  catchUpExam: z.number().min(0).max(20).nullable().optional(),
  remarks: z.string().max(500).optional(),
});

const batchGradesSchema = z.object({
  evaluatorId: z.string().cuid(),
  grades: z.array(gradeItemSchema).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = batchGradesSchema.parse(body);

    const { evaluatorId, grades } = validatedData;

    // Vérifier l'existence et l'habilitation du professeur
    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: evaluatorId },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: 'Enseignant non identifié ou non autorisé.' },
        { status: 403 }
      );
    }

    // Transaction atomique pour enregistrer ou mettre à jour toutes les notes
    const results = await prisma.$transaction(
      grades.map((item) => {
        const cc = item.continuousAssessment ?? 0;
        const tp = item.practicalAssessment ?? 0;
        const exam = item.finalExam ?? 0;
        const catchUp = item.catchUpExam;

        // Calcul de la moyenne du module : CC (30%) + TP (30%) + Examen (40%)
        let computedFinal = cc * 0.3 + tp * 0.3 + exam * 0.4;

        if (catchUp !== null && catchUp !== undefined) {
          const catchUpAverage = cc * 0.3 + tp * 0.3 + catchUp * 0.4;
          computedFinal = Math.max(computedFinal, catchUpAverage);
        }

        // Règle d'attribution du statut de validation LMD marocain
        let status: 'VALIDATED' | 'CATCH_UP' | 'FAILED' = 'FAILED';
        if (computedFinal >= 10.0) {
          status = 'VALIDATED';
        } else if (computedFinal >= 7.0) {
          status = 'CATCH_UP';
        } else {
          status = 'FAILED';
        }

        return prisma.grade.upsert({
          where: {
            studentId_moduleId: {
              studentId: item.studentId,
              moduleId: item.moduleId,
            },
          },
          update: {
            continuousAssessment: item.continuousAssessment,
            practicalAssessment: item.practicalAssessment,
            finalExam: item.finalExam,
            catchUpExam: item.catchUpExam,
            moduleFinalGrade: parseFloat(computedFinal.toFixed(2)),
            status,
            remarks: item.remarks,
            evaluatorId,
          },
          create: {
            studentId: item.studentId,
            moduleId: item.moduleId,
            evaluatorId,
            continuousAssessment: item.continuousAssessment,
            practicalAssessment: item.practicalAssessment,
            finalExam: item.finalExam,
            catchUpExam: item.catchUpExam,
            moduleFinalGrade: parseFloat(computedFinal.toFixed(2)),
            status,
            remarks: item.remarks,
          },
        });
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: `${results.length} notes ont été enregistrées et délibérées avec succès.`,
        data: results,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erreur API saisie des notes :', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur lors de la sauvegarde des notes.' },
      { status: 500 }
    );
  }
}
