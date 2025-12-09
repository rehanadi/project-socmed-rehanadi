import { Separator } from "@/components/ui/separator";

const UserStatistics = () => {
  return (
    <div className="w-full h-full flex-between flex-wrap gap-6">
      <StatisticItem count={50} label="Post" />
      <Separator orientation="vertical" />
      <StatisticItem count={100} label="Followers" />
      <Separator orientation="vertical" />
      <StatisticItem count={43} label="Following" />
      <Separator orientation="vertical" />
      <StatisticItem count={567} label="Likes" />
    </div>
  );
};

export default UserStatistics;

const StatisticItem = ({
  count,
  label,
  onClick,
}: {
  count: number;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex-1 flex flex-col items-center gap-0.5 cursor-pointer"
      onClick={onClick}
    >
      <span className="font-bold text-lg md:text-xl">{count}</span>
      <span className="text-xs md:text-md text-neutral-400">{label}</span>
    </div>
  )
};