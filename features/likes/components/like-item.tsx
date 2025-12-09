import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface LikeItemProps {
  author: {
    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
  };
  isFollowing: boolean;
}

const LikeItem = ({
  author,
  isFollowing,
}: LikeItemProps) => {
  return (
    <div className="flex-between gap-4">
      <div className="flex-center gap-2">
        <Avatar className="size-12">
          <AvatarImage src={author.avatarUrl ?? "/images/avatar.png"} />
          <AvatarFallback>
            {author.name}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Link href={`/profile/${author.username}`}>
            <h3 className="text-sm font-bold">
              {author.name}
            </h3>
          </Link>
          <p className="text-sm text-neutral-400">
            {author.name}
          </p>
        </div>
      </div>

      {isFollowing ? (
        <Button variant="outline" className="flex-center gap-2 px-4">
          <Icon icon="material-symbols:check-circle-outline-rounded" className="size-5" />
          <span>Following</span>
        </Button>
      ) : (
        <Button className="px-6">
          Follow
        </Button>
      )}
    </div>
  )
}

export default LikeItem