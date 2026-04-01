'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import type { TMDBMovie, LayoutItem } from '@/types';

export async function updateWidgetsLayout(username: string, allLayouts: Record<string, LayoutItem[]>) {
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
    // Group layouts by widget ID to store in the database
    // Result will look like: { "widget_id_1": { lg: {x,y,w,h}, md: {x,y,w,h} } }
    const widgetLayouts: Record<string, Record<string, Omit<LayoutItem, 'i'>>> = {};

    for (const [breakpoint, items] of Object.entries(allLayouts)) {
      for (const item of items) {
        if (!widgetLayouts[item.i]) {
          widgetLayouts[item.i] = {};
        }
        widgetLayouts[item.i][breakpoint] = {
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        };
      }
    }

    const updatePromises = Object.entries(widgetLayouts).map(([widgetId, layoutData]) =>
      prisma.widget.updateMany({
        where: {
          id: widgetId,
          userId: user.id,
        },
        data: { layoutData },
      }),
    );

    await prisma.$transaction(updatePromises);

    // Revalidate the profile page cache to ensure fresh data on next load.
    revalidatePath(`/${username}`);
  } catch (error) {
    console.error('Failed to update layout:', error);
    throw new Error('An error occurred while saving the layout.');
  }
}

export async function addMovieWidget(username: string, movie: TMDBMovie) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error('Unauthorized');

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) throw new Error('User not found.');

  try {
    await prisma.widget.create({
      data: {
        userId: user.id,
        type: 'MOVIE',
        layoutData: {
          lg: { x: 0, y: 0, w: 2, h: 2 },
          md: { x: 0, y: 0, w: 2, h: 2 },
          sm: { x: 0, y: 0, w: 2, h: 2 },
        },
        content: {
          tmdbId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date,
        },
      },
    });

    revalidatePath(`/${username}`);
  } catch (error) {
    console.error('Failed to add movie widget:', error);
    throw new Error('Could not add widget');
  }
}
