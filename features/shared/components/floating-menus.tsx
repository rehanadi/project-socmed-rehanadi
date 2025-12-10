'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { cn } from '@/lib/utils';

const FloatingMenus = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined) {
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: '200%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="w-90 h-16 md:h-20 max-w-[calc(100%-3rem)] fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-neutral-950 px-[11.5px] md:px-4.25 border border-neutral-900 rounded-full flex-between gap-4"
    >
      <LinkItem href="/" icon="solar:home-2-bold" label="Home" />

      <Button
        className="size-11! md:size-12! aspect-square rounded-full bg-primary-300 hover:opacity-80 transition hover:scale-110"
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
    </motion.div>
  );
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
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'group w-[94px] flex flex-col items-center gap-0.5 md:gap-1 hover:text-primary-200',
        isActive && 'text-primary-200'
      )}
    >
      <Icon icon={icon} className="size-5 md:size-6" />
      <span
        className={cn(
          'group-hover:font-bold text-xs md:text-md',
          isActive && 'font-bold'
        )}
      >
        {label}
      </span>
    </Link>
  );
};