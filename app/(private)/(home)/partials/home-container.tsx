import React from 'react';

const HomeContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='custom-container max-w-150 flex w-full flex-col gap-4 pt-4 pb-[133px] px-4 md:gap-6 md:pt-10 md:pb-48'>
      {children}
    </div>
  );
};

export default HomeContainer;
