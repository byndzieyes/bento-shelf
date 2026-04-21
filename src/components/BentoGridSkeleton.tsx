import { Skeleton } from './ui/Skeleton';

export default function BentoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-1 h-45 rounded-[2.5rem] bg-neutral-900 border border-neutral-800 p-6">
        <div className="flex flex-col gap-3 h-full">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-3/4 mt-auto" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <div className="col-span-1 sm:col-span-2 h-45 rounded-[2.5rem] bg-neutral-900 border border-neutral-800 p-6">
        <div className="flex gap-6 h-full items-center">
          <Skeleton className="h-full w-1/3 rounded-2xl" />
          <div className="flex-1 flex flex-col gap-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      <div className="col-span-1 h-95 sm:row-span-2 rounded-[2.5rem] bg-neutral-900 border border-neutral-800 p-6">
        <div className="flex flex-col h-full gap-4">
          <Skeleton className="h-full w-full rounded-2xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <div className="col-span-1 h-45 rounded-[2.5rem] bg-neutral-900 border border-neutral-800 p-6">
        <div className="flex flex-col justify-center h-full gap-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-4/6" />
        </div>
      </div>

      <div className="col-span-1 h-45 rounded-[2.5rem] bg-neutral-900 border border-neutral-800 p-6 flex items-center justify-center">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>

      <div className="col-span-1 sm:col-span-2 h-45 rounded-[2.5rem] bg-neutral-900 border border-neutral-800 p-6">
        <div className="flex flex-col gap-3 h-full justify-end">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
}
