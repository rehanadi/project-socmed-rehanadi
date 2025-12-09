"use client";

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import LikeItem from "./like-item";

interface ModalLikesProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLikes = ({
  isOpen,
  onClose,
}: ModalLikesProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='md:w-137 md:max-w-[calc(100vw-6rem)] bg-neutral-950 border-0 md:border border-neutral-900 rounded-t-2xl md:rounded-2xl'>
        <div className="max-h-[70vh] p-4 pb-8 md:p-5 md:pb-5 flex flex-col gap-3 md:gap-5">
          <h3 className="shrink-0 font-bold text-md md:text-xl">Likes</h3>
          
          <div className="flex-1 flex flex-col gap-5 pr-2 overflow-y-auto scrollbar-thin">
            <LikeItem
              author={{
                id: 1,
                username: "johndoe",
                name: "John Doe",
                avatarUrl: "/images/avatar.png",
              }}
              isFollowing={true}
            />

            <LikeItem
              author={{
                id: 1,
                username: "johndoe",
                name: "John Doe",
                avatarUrl: "/images/avatar.png",
              }}
              isFollowing={true}
            />

            <LikeItem
              author={{
                id: 1,
                username: "johndoe",
                name: "John Doe",
                avatarUrl: "/images/avatar.png",
              }}
              isFollowing={false}
            />

            <LikeItem
              author={{
                id: 1,
                username: "johndoe",
                name: "John Doe",
                avatarUrl: "/images/avatar.png",
              }}
              isFollowing={false}
            />

            <LikeItem
              author={{
                id: 1,
                username: "johndoe",
                name: "John Doe",
                avatarUrl: "/images/avatar.png",
              }}
              isFollowing={false}
            />

            <LikeItem
              author={{
                id: 1,
                username: "johndoe",
                name: "John Doe",
                avatarUrl: "/images/avatar.png",
              }}
              isFollowing={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLikes;