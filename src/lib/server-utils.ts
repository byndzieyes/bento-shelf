import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function requireUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    throw new Error('Unauthorized: You must be logged in.');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) {
    throw new Error('User not found in database.');
  }

  return user;
}
