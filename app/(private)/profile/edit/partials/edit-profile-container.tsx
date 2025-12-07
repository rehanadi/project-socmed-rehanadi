import React from 'react';

const EditProfileContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='custom-container max-w-200 flex w-full flex-col gap-4 pt-4 pb-[57px] px-4 md:gap-8 md:pt-10 md:pb-34.5'>
      {children}
    </div>
  );
};

export default EditProfileContainer;
