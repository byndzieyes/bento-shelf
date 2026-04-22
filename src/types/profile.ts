import type { Prisma } from '@prisma/client';

export type ProfileOwnerWithWidgets = Prisma.UserGetPayload<{
  include: {
    widgets: {
      include: {
        _count: {
          select: { likes: true };
        };
        likes: true;
      };
    };
  };
}>;
