<<<<<<< HEAD
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

=======
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;