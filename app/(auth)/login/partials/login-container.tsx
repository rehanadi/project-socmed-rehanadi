import React from 'react'

interface LoginContainerProps {
  children: React.ReactNode
}

const LoginContainer = ({ children }: LoginContainerProps) => {
  return (
    <div className="bg-[#00000033] custom-container w-111.5 max-w-full flex py-8 md:py-10 px-4 md:px-6 border border-neutral-900 rounded-2xl flex-col items-center gap-4 md:gap-6">
      {children}
    </div>
  );
};

export default LoginContainer;