'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/server-utils';
import type { TMDBMovie, LayoutItem, WidgetContentData } from '@/types';
import { InputJsonValue } from '@prisma/client/runtime/client';

export async function updateWidgetsLayout(username: string, allLayouts: Record<string, LayoutItem[]>) {
  const user = await requireUser();

  try {
    const widgetLayouts: Record<string, Record<string, Omit<LayoutItem, 'i'>>> = {};

    for (const [breakpoint, items] of Object.entries(allLayouts)) {
      for (const item of items) {
        if (!widgetLayouts[item.i]) widgetLayouts[item.i] = {};
        widgetLayouts[item.i][breakpoint] = { x: item.x, y: item.y, w: item.w, h: item.h };
      }
    }

    const updatePromises = Object.entries(widgetLayouts).map(([widgetId, layoutData]) =>
      prisma.widget.updateMany({
        where: { id: widgetId, userId: user.id },
        data: { layoutData },
      }),
    );

    await prisma.$transaction(updatePromises);
    revalidatePath(`/${username}`);
  } catch (error) {
    console.error('Failed to update layout:', error);
    throw new Error('An error occurred while saving the layout.');
  }
}

export async function addMovieWidget(username: string, movie: TMDBMovie) {
  const user = await requireUser();

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

export async function addCustomTextWidget(username: string, text: string) {
  const user = await requireUser();

  try {
    await prisma.widget.create({
      data: {
        userId: user.id,
        type: 'CUSTOM_TEXT',
        layoutData: {
          lg: { x: 0, y: 0, w: 2, h: 1 },
          md: { x: 0, y: 0, w: 2, h: 1 },
          sm: { x: 0, y: 0, w: 2, h: 1 },
        },
        content: { text },
      },
    });

    revalidatePath(`/${username}`);
  } catch (error) {
    console.error('Failed to add custom text widget:', error);
    throw new Error('Could not add widget');
  }
}

export async function updateWidgetContent(widgetId: string, username: string, newContent: WidgetContentData) {
  const user = await requireUser();

  try {
    await prisma.widget.update({
      where: {
        id: widgetId,
        userId: user.id,
      },
      data: {
        content: newContent as InputJsonValue,
      },
    });

    revalidatePath(`/${username}`);
  } catch (error) {
    console.error('Failed to update widget content:', error);
    throw new Error('Could not update widget content');
  }
}

export async function deleteWidget(widgetId: string, username: string) {
  const user = await requireUser();

  try {
    await prisma.widget.delete({
      where: {
        id: widgetId,
        userId: user.id,
      },
    });

    revalidatePath(`/${username}`);
  } catch (error) {
    console.error('Failed to delete widget:', error);
    throw new Error('Could not delete widget');
  }
}
