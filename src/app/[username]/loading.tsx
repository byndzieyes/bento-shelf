import { Skeleton } from '@/components/ui/Skeleton';
import BentoGridSkeleton from '@/components/BentoGridSkeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row items-start gap-6 flex-1 w-full">
          {/* Avatar Skeleton */}
          <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full shrink-0 border-2 border-neutral-800" />

          <div className="flex-1 sm:mt-2 w-full space-y-4">
            {/* Username Skeleton */}
            <Skeleton className="h-10 md:h-14 w-48 md:w-64" />
            {/* Subtitle Skeleton */}
            <Skeleton className="h-5 w-32" />

            <div className="mt-6 space-y-3">
              {/* Bio Skeleton */}
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-4 w-3/4 max-w-sm" />

              {/* Socials Skeleton */}
              <div className="flex items-center gap-4 pt-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-5 w-5 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex items-center gap-3 sm:mt-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <BentoGridSkeleton />
      </div>
    </main>
  );
}
