'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
        <p className='mt-2 text-neutral-600'>Redirecting to homepage...</p>
      </div>
    </div>
  );
}
