import React from 'react'

interface RegisterContainerProps {
  children: React.ReactNode
}

const RegisterContainer = ({ children }: RegisterContainerProps) => {
  return (
    <div className="bg-[#00000033] custom-container w-130.75 max-w-full flex py-8 md:py-10 px-4 md:px-6 border border-neutral-900 rounded-2xl flex-col items-center gap-4 md:gap-6">
      {children}
    </div>
  );
};

export default RegisterContainer;