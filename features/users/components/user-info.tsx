import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link"
import UserStatistics from "./user-statistics"

interface UserInfoProps {
  isMe?: boolean;
}

const UserInfo = ({
  isMe = false,
}: UserInfoProps) => {
  const isFollowing = false;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-start md:justify-between md:items-center gap-3">
        <div className="flex-center gap-3 md:gap-5">
          <Avatar className="size-16">
            <AvatarImage src="/images/avatar.png" />
            <AvatarFallback>
              John Doe
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link href={`/profile/rehan1`}>
              <h3 className="text-sm md:text-md font-bold">
                John Doe
              </h3>
            </Link>
            <p className="text-sm md:text-md">
              johndoe
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto flex-between gap-3">
          {isMe ? (
            <Button
              variant="outline"
              className="flex-1 px-5.5"
              asChild
            >
              <Link href="/profile/edit">
                Edit Profile
              </Link>
            </Button>
          ) : (
            <>
              {isFollowing ? (
                <Button
                  variant="outline"
                  className="flex-1 flex-center gap-2 px-4"
                >
                  <Icon icon="material-symbols:check-circle-outline-rounded" className="size-5" />
                  <span>Following</span>
                </Button>
              ) : (
                <Button className="flex-1 px-6 h-10 md:h-12">
                  Follow
                </Button>
              )}
            </>
          )}
          <Button
            variant="outline"
            className="shrink-0"
          >
            <Icon
              icon="gravity-ui:paper-plane"
              className="size-5"
            />
          </Button>
        </div>
      </div>

      <p className="text-sm md:text-md">
        Creating unforgettable moments with my favorite person! 📸✨ Let's cherish every second together!
      </p>

      <UserStatistics />
    </div>
  );
};

export default UserInfo;