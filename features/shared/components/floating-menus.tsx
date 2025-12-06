import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const FloatingMenus = () => {
  return (
    <div className="w-90 h-16 md:h-20 max-w-[calc(100%-3rem)] fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50  bg-neutral-950 px-[11.5px] md:px-4.25 border border-neutral-900 rounded-full flex-between gap-4">
      <LinkItem
        href="/"
        icon="solar:home-2-bold"
        label="Home"
      />

      <Button
        className="size-11! md:size-12! aspect-square rounded-full bg-primary-300 hover:opacity-80 transition-colors"
        asChild
      >
        <Link href="/posts/add">
          <Icon
            icon="material-symbols:add-rounded"
            className="size-5.5 md:size-6 text-white"
          />
        </Link>
      </Button>

      <LinkItem
        href="/profile"
        icon="solar:user-rounded-bold"
        label="Profile"
      />
    </div>
  )
};

export default FloatingMenus;

const LinkItem = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) => {
  return (
    <Link
      href={href}
      className="group w-[94px] flex flex-col items-center gap-0.5 md:gap-1 hover:text-primary-200"
    >
      <Icon icon={icon} className="size-5 md:size-6" />
      <span className="group-hover:font-bold text-xs md:text-md">
        {label}
      </span>
    </Link>
  );
};