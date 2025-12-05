import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PostAuthorProps {
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
  size?: 'small' | 'large';
}

const PostAuthor = ({
  author,
  createdAt,
  size = 'large',
}: PostAuthorProps) => {
  return (
    <div
      className={cn(
        "flex-center gap-2 ",
        size === 'small' ? 'md:gap-3.25' : 'md:gap-3'
      )}
    >
      <Avatar
        className={cn(
          size === 'small' ? 'size-10' : 'size-11 md:size-16'
        )}
      >
        <AvatarImage src={author.avatar} />
        <AvatarFallback>
          {author.name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <Link href={`/authors/${author.id}`}>
          <h3
            className={cn(
              "",
              size === 'small' ? 'text-xs md:text-sm font-semibold md:font-bold' : 'font-bold text-sm md:text-md'
            )}
          >
            {author.name}
          </h3>
        </Link>
        <p
          className={cn(
            "text-xs text-neutral-400",
            size === 'small' ? 'md:text-xs' : 'md:text-sm'
          )}
        >
          {createdAt}
        </p>
      </div>
    </div>
  )
}

export default PostAuthor