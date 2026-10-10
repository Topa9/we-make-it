// src/app/api/timetable/slot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const slotSchema = z.object({
  courseElementId: z.string().cuid(),
  teacherId: z.string().cuid(),
  roomId: z.string().cuid(),
  dayOfWeek: z.number().int().min(1).max(6),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // "08:30"
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),   // "10:30"
  targetGroup: z.string().min(2),
  isCatchUpSession: z.boolean().default(false),
  notes: z.string().optional(),
  createdById: z.string().cuid(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = slotSchema.parse(body);

    // 1. Vérification de collision de SALLE (Room Conflict)
    const conflictingRoom = await prisma.timetableSlot.findFirst({
      where: {
        roomId: data.roomId,
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
      },
      include: {
        room: true,
        courseElement: true,
      },
    });

    if (conflictingRoom) {
      return NextResponse.json(
        {
          conflict: true,
          type: 'ROOM_COLLISION',
          message: `La salle "${conflictingRoom.room.name}" est déjà occupée sur ce créneau par le cours "${conflictingRoom.courseElement.name}".`,
        },
        { status: 409 }
      );
    }

    // 2. Vérification de collision d'ENSEIGNANT (Teacher Conflict)
    const conflictingTeacher = await prisma.timetableSlot.findFirst({
      where: {
        teacherId: data.teacherId,
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
      },
      include: {
        teacher: {
          include: { user: true },
        },
      },
    });

    if (conflictingTeacher) {
      return NextResponse.json(
        {
          conflict: true,
          type: 'TEACHER_COLLISION',
          message: `L'enseignant ${conflictingTeacher.teacher.user.lastName} a déjà un cours programmé sur ce créneau horaire.`,
        },
        { status: 409 }
      );
    }

    // 3. Création du créneau si aucun conflit n'est détecté
    const newSlot = await prisma.timetableSlot.create({
      data: {
        courseElementId: data.courseElementId,
        teacherId: data.teacherId,
        roomId: data.roomId,
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        endTime: data.endTime,
        targetGroup: data.targetGroup,
        isCatchUpSession: data.isCatchUpSession,
        notes: data.notes,
        createdById: data.createdById,
      },
      include: {
        room: true,
        courseElement: true,
        teacher: { include: { user: true } },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Séance ajoutée avec succès à l’emploi du temps.',
        slot: newSlot,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Paramètres du créneau invalides', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erreur API Timetable :', error);
    return NextResponse.json(
      { error: 'Erreur lors de la réservation du créneau.' },
      { status: 500 }
    );
  }
}
