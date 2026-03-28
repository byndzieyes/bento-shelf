import { syncUser } from '@/lib/user';

export default async function Home() {
  const user = await syncUser();

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-8">
      <h1 className="text-4xl font-bold">My Bento Shelf</h1>
    </main>
  );
}
