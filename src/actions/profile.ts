'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/server-utils';

export async function updateUserProfile(data: { bio?: string | null; socialLinks?: Record<string, string> }) {
  const user = await requireUser();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        bio: data.bio,
        socialLinks: data.socialLinks,
      },
    });

    revalidatePath(`/${updatedUser.username}`);
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw new Error('Could not update profile');
  }
}
