'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import FollowItem from './follow-item';
import { FollowUser } from '../types';

interface ModalFollowsProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  users: FollowUser[];
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const ModalFollows = ({
  title,
  isOpen,
  onClose,
  users,
  isLoading,
  isFetching,
  hasMore,
  onLoadMore,
}: ModalFollowsProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        onLoadMore();
      }
    },
    [hasMore, isFetching, onLoadMore]
  );

  useEffect(() => {
    if (!isOpen) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [handleObserver, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:w-137 md:max-w-[calc(100vw-6rem)] bg-neutral-950 border-0 md:border border-neutral-900 rounded-t-2xl md:rounded-2xl">
        <div className="max-h-[70vh] p-4 pb-8 md:p-5 md:pb-5 flex flex-col gap-3 md:gap-5">
          <h3 className="shrink-0 font-bold text-md md:text-xl">{title}</h3>

          {isLoading ? (
            <div className="flex-center h-40">
              <p>Loading...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex-center h-40">
              <p className="text-neutral-400">No users found</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-5 pr-2 overflow-y-auto scrollbar-thin">
              {users.map((user) => (
                <FollowItem key={user.id} user={user} />
              ))}
              {hasMore && <div ref={loadMoreRef} className="h-10" />}
              {isFetching && users.length > 0 && (
                <div className="flex-center h-20">
                  <p>Loading more...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFollows;