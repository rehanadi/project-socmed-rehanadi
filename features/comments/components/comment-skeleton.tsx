import { Skeleton } from '@/components/ui/skeleton';

const CommentSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-2.5">
      <div className="flex-center gap-2 md:gap-3.25">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export default CommentSkeleton;