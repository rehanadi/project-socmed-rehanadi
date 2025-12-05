"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import PostActions from "@/features/posts/components/post-actions";
import PostAuthor from "@/features/posts/components/post-author";
import { Icon } from "@iconify/react";
import { Ellipsis, Menu } from "lucide-react";
import Image from "next/image";

interface ModalAddCommentProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddComment = ({
  isOpen,
  onClose,
}: ModalAddCommentProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='md:w-300 md:max-w-[calc(100%-6rem)]'>
        <div className="flex-center">
          <div className="basis-720/1200 relative aspect-square">
            <Image
              src='/images/posts/post-1.png'
              alt="Post image"
              fill
            />
          </div>

          <div className="flex-1 h-full p-5 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col gap-2">
                <div className="flex-between gap-4">
                  <PostAuthor
                    author={{
                      id: 1,
                      name: 'John Doe',
                      avatar: '/images/avatar.png',
                    }}
                    createdAt='1 Minutes ago'
                    size="small"
                  />

                  <Ellipsis className="size-6 cursor-pointer" />
                </div>

                <p className="text-sm">
                  Creating unforgettable moments with my favorite person! 📸✨ Every laugh, every little adventure, every quiet moment together feels like magic. You make ordinary days feel extraordinary, and I’m so grateful to share this journey with you. Let’s keep cherishing every second, because with you, time always feels too short. 💕
                </p>
              </div>

              <Separator />

              <div className="flex flex-col items-start gap-4">
                <h3 className="font-bold text-md">Comments</h3>

                <div className="flex flex-col items-start gap-2.5">
                  <PostAuthor
                    author={{
                      id: 2,
                      name: 'Alexander',
                      avatar: '/images/avatar-2.png',
                    }}
                    createdAt='1 Minute ago'
                    size="small"
                  />
                  <p className="text-sm">
                    This is the kind of love everyone dreams about ✨
                  </p>
                </div>

                <Separator />

                <div className="flex flex-col items-start gap-2.5">
                  <PostAuthor
                    author={{
                      id: 2,
                      name: 'Alexander',
                      avatar: '/images/avatar-2.png',
                    }}
                    createdAt='1 Minute ago'
                    size="small"
                  />
                  <p className="text-sm">
                    This is the kind of love everyone dreams about ✨
                  </p>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-4">
              <PostActions
                likes={20}
                comments={20}
                shares={20}
              />

              <form className="flex-between gap-2">
                <div className="shrink-0 size-12 border border-neutral-900 rounded-xl flex-center">
                  <Icon icon="proicons:emoji" className="size-6" />
                </div>

                <div className="flex-1 size-12 px-4 border border-neutral-900 rounded-xl flex-between">
                  <Input
                    placeholder="Add Comment"
                    className="p-0 border-0 text-md font-medium flex-1 placeholder:text-neutral-600"
                  />
                  <Button
                    variant="outline"
                    className="shrink-0 border-0"
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAddComment