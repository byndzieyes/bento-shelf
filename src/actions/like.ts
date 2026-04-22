'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function toggleLike(widgetId: string, username: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error('You must be logged in to like a widget.');
  }

  const internalUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!internalUser) {
    throw new Error('Internal user not found.');
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_widgetId: {
        userId: internalUser.id,
        widgetId,
      },
    },
  });

  if (existingLike) {
    // Unlike
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    // Like
    await prisma.like.create({
      data: {
        userId: internalUser.id,
        widgetId,
      },
    });
  }

  revalidatePath(`/${username}`);
}
