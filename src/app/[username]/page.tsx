import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import BentoGrid from '@/components/BentoGrid';

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

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">@{profileOwner.username}</h1>
          <p className="text-neutral-500 mt-2">Your personal shelf</p>
        </div>
        {isOwner && (
          <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-semibold">
            Edit
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto">
        <BentoGrid initialWidgets={profileOwner.widgets} isOwner={isOwner} username={profileOwner.username} />
      </div>
    </main>
  );
}
