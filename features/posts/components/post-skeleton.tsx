import { Skeleton } from '@/components/ui/skeleton';

const PostSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <div className="flex-center gap-2 md:gap-3">
        <Skeleton className="size-11 md:size-16 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      <Skeleton className="w-full aspect-square rounded-md" />

      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex-1 flex-start gap-3 md:gap-4">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-12" />
        </div>
        <Skeleton className="h-6 w-6" />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export default PostSkeleton;