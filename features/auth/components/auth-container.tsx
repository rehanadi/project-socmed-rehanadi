import React from 'react'
import { cn } from "@/lib/utils"

interface AuthContainerProps {
  children: React.ReactNode
  className?: string
}

const AuthContainer = ({ children, className }: AuthContainerProps) => {
  return (
    <div className={cn("bg-[#00000033] custom-container w-111.5 max-w-full flex py-8 md:py-10 px-4 md:px-6 border border-neutral-900 rounded-2xl flex-col items-center gap-4 md:gap-6", className)}>
      {children}
    </div>
  );
};

export default AuthContainer;