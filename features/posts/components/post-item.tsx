import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Post } from "../types";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const { caption, image, author, createdAt, likes, comments, shares } = post;

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <div className="flex-center gap-2 md:gap-3">
        <Avatar className='size-11 md:size-16'>
          <AvatarImage src={author.avatar} />
          <AvatarFallback>
            {author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <Link href={`/authors/${author.id}`}>
            <h3 className="text-sm font-bold md:text-md">{author.name}</h3>
          </Link>
          <p className="text-xs text-neutral-400 md:text-sm">{createdAt}</p>
        </div>
      </div>

      <div className="w-full aspect-square rounded-md overflow-hidden relative">
        <Image
          src={image}
          alt='Post Image'
          fill
          className='object-cover hover:scale-110 transition-transform'
        />
      </div>

      <div className="w-full flex-between gap-4">
        <div className="flex-1 flex-start gap-3 md:gap-4">
          <div className="flex-start gap-1.5">
            <Icon icon="solar:heart-linear" className="size-6 cursor-pointer" />
            <span className="text-sm font-semibold">{likes}</span>
          </div>

          <div className="flex-start gap-1.5">
            <Icon icon="solar:chat-dots-linear" className="size-6 cursor-pointer" />
            <span className="text-sm font-semibold">{comments}</span>
          </div>

          <div className="flex-start gap-1.5">
            <Icon icon="gravity-ui:paper-plane" className="size-6 cursor-pointer" />
            <span className="text-sm font-semibold">{shares}</span>
          </div>
        </div>

        <Icon icon="mingcute:bookmark-line" className="shrink-0 size-6 cursor-pointer" />
      </div>

      <div className="flex flex-col gap-0 md:gap-1">
        <Link href={`/authors/${author.id}`}>
          <h3 className="text-sm font-semibold md:text-md">{author.name}</h3>
        </Link>
        <p className="text-sm md:text-md">
          {caption}
        </p>
        <Link
          href="#"
          className="text-sm md:text-md font-bold md:font-semibold text-primary-200 hover:text-primary-300 transition-colors"
        >
          Show More
        </Link>
      </div>
    </div>
  )
}

export default PostItem