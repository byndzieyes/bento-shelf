import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function syncUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  if (existingUser) return existingUser;

  const newUser = await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      username: clerkUser.username || `user_${Math.random().toString(36).slice(2, 7)}`,
      avatarUrl: clerkUser.imageUrl,
    },
  });

  return newUser;
}
