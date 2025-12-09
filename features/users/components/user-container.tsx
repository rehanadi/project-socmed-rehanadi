import React from 'react';

const UserContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='custom-container max-w-203 flex w-full flex-col gap-4 pt-4 pb-[69px] px-4 md:gap-4 md:pt-10 md:pb-34.5'>
      {children}
    </div>
  );
};

export default UserContainer;
