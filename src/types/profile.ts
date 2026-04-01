import type { Prisma } from '@prisma/client';

export type ProfileOwnerWithWidgets = Prisma.UserGetPayload<{
  include: { widgets: true };
}>;
