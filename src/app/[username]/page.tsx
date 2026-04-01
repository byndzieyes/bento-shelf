import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import ProfileClientView from '@/components/ProfileClientView';

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const profileOwner = await prisma.user.findUnique({
    where: { username },
    include: { widgets: true },
  });

  if (!profileOwner) {
    return notFound();
  }

  const loggedInUser = await currentUser();
  const isOwner = loggedInUser?.id === profileOwner.clerkId;

  return <ProfileClientView profileOwner={profileOwner} isOwner={isOwner} />;
}
