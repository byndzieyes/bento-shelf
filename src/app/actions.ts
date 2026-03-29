'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

interface WidgetLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export async function updateWidgetsLayout(username: string, layout: WidgetLayout[]) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    throw new Error('Unauthorized: You must be logged in to update the layout.');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  try {
    const updatePromises = layout.map((item) =>
      prisma.widget.updateMany({
        where: {
          id: item.i,
          userId: user.id,
        },
        data: { x: item.x, y: item.y, w: item.w, h: item.h },
      }),
    );

    await prisma.$transaction(updatePromises);

    revalidatePath(`/${username}`);
  } catch (error) {
    console.error('Failed to update layout:', error);
    throw new Error('An error occurred while saving the layout.');
  }
}
