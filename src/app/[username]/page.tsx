import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import ProfileClientView from '@/components/ProfileClientView';

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const loggedInUser = await currentUser();

  const profileOwner = await prisma.user.findUnique({
    where: { username },
    include: {
      widgets: {
        include: {
          _count: {
            select: { likes: true },
          },
          likes: loggedInUser
            ? {
                where: {
                  user: { clerkId: loggedInUser.id },
                },
              }
            : false,
        },
      },
      _count: {
        select: { widgets: true },
      },
    },
  });

  if (!profileOwner) {
    return notFound();
  }

  const isOwner = loggedInUser?.id === profileOwner.clerkId;

  return (
    <ProfileClientView
      profileOwner={profileOwner}
      isOwner={isOwner}
    />
  );
}
