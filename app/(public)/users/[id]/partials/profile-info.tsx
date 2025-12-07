import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Separator } from "@radix-ui/react-separator"
import Link from "next/link"

const ProfileInfo = () => {
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
            <Link href={`/authors/1`}>
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

      <div className="w-full h-full flex-between flex-wrap gap-6">
        <StatisticItem count={50} label="Post" />
        <Separator orientation="vertical" />
        <StatisticItem count={100} label="Followers" />
        <Separator orientation="vertical" />
        <StatisticItem count={43} label="Following" />
        <Separator orientation="vertical" />
        <StatisticItem count={567} label="Likes" />
      </div>
    </div>
  )
}

export default ProfileInfo

const StatisticItem = ({
  count,
  label,
}: {
  count: number;
  label: string;
}) => {
  return (
    <div className="flex-1 flex flex-col items-center gap-0.5">
      <span className="font-bold text-lg md:text-xl">{count}</span>
      <span className="text-xs md:text-md text-neutral-400">{label}</span>
    </div>
  )
};