import React from 'react';

const AddPostContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='custom-container max-w-113 flex w-full flex-col gap-4 pt-4 pb-[31px] px-4 md:gap-6 md:pt-10 md:pb-34.5'>
      {children}
    </div>
  );
};

export default AddPostContainer;
