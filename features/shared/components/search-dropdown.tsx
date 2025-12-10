'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { useSearchUsersPagination } from '@/features/users/hooks/search-users-pagination-hook';

interface SearchDropdownProps {
  className?: string;
}

const SearchDropdown = ({ className }: SearchDropdownProps) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    users,
    isLoading,
    isFetching,
    loadMore,
    hasMore,
    reset,
  } = useSearchUsersPagination(debouncedQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Reset when input is cleared
  useEffect(() => {
    if (inputValue.length === 0 && debouncedQuery.length > 0) {
      reset();
    }
  }, [inputValue, debouncedQuery, reset]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setInputValue('');
        setDebouncedQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        loadMore();
      }
    },
    [hasMore, isFetching, loadMore]
  );

  useEffect(() => {
    if (inputValue.length === 0) return;

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
  }, [handleObserver, inputValue]);

  const handleClear = () => {
    setInputValue('');
    setDebouncedQuery('');
    reset();
  };

  const handleLinkClick = () => {
    setInputValue('');
    setDebouncedQuery('');
    reset();
  };

  const showDropdown = inputValue.length > 0;

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <div className="h-10 md:h-12 w-full flex items-center gap-1 rounded-full bg-neutral-950 border border-neutral-900 px-4 md:gap-1.5">
        <Search className="size-5 shrink-0 text-neutral-500" />

        <Input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-0 border-0 outline-none placeholder:text-neutral-600"
        />

        {inputValue && (
          <X
            className="size-5 shrink-0 text-neutral-500 cursor-pointer hover:text-neutral-300"
            onClick={handleClear}
          />
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-950 border border-neutral-900 rounded-3xl shadow-lg max-h-[400px] overflow-y-auto scrollbar-thin z-50">
          {isLoading ? (
            <div className="p-4 text-center text-neutral-400">Loading...</div>
          ) : users.length === 0 && debouncedQuery ? (
            <div className="p-8 text-center flex flex-col items-center gap-1">
              <p className="font-bold text-md">No results found</p>
              <p className="text-sm text-neutral-400">Change your keyword</p>
            </div>
          ) : (
            <div className="p-2">
              {users.map((user) => (
                <Link
                  key={user.id}
                  href={`/profile/${user.username}`}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 p-3 rounded-2xl hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  <Avatar className="size-12">
                    <AvatarImage
                      src={user.avatarUrl || '/images/avatar.png'}
                      className="aspect-square rounded-full object-cover"
                    />
                    <AvatarFallback>{user.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-sm text-neutral-400">@{user.username}</p>
                  </div>
                </Link>
              ))}
              {hasMore && <div ref={loadMoreRef} className="h-10" />}
              {isFetching && users.length > 0 && (
                <div className="p-4 text-center text-neutral-400">
                  Loading more...
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;