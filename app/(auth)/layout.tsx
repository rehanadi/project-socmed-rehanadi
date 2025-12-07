import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
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