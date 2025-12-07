'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <main
      className="min-h-screen px-6 py-15 flex-center"
      style={{
        backgroundImage: "url('/images/bg-auth.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
      }}
    >
      {children}
    </main>
  );
};

export default AuthLayout;