'use client';

import Logo from './logo';
import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { logout } from '@/features/auth/stores';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SearchDropdown from './search-dropdown';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-16 w-full gap-4 bg-black md:h-20 border-b border-neutral-900">
      <div className="custom-container flex-between h-full gap-4">
        <Link href="/">
          <Logo />
        </Link>

        <SearchDropdown className="hidden md:flex w-2/5" />

        {mounted && isAuthenticated ? (
          <div className="flex-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex-center gap-3.25 cursor-pointer">
                  <Avatar className="size-10 md:size-12">
                    <AvatarImage
                      src={user?.avatarUrl || '/images/avatar.png'}
                      className="aspect-square rounded-full object-cover"
                    />
                    <AvatarFallback>{user?.name || 'User'}</AvatarFallback>
                  </Avatar>

                  <span className="text-md-bold hidden md:block">
                    {user?.name || 'User'}
                  </span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-3">
                  <p className="font-semibold text-md">{user?.name}</p>
                  <p className="text-sm text-neutral-400">@{user?.username}</p>
                </div>

                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <User className="size-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogout}
                  variant="destructive"
                  className="cursor-pointer"
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <AuthButtons className="hidden md:grid" />

            <div className="gap-4 flex md:hidden items-center">
              <AnimatePresence>
                {showMenu ? (
                  <>
                    <X
                      className="block size-6 cursor-pointer md:hidden text-white"
                      onClick={() => setShowMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-x-0 top-16 z-60"
                    >
                      <AuthButtons className="grid w-full justify-between bg-black p-4 -mt-px pt-px md:hidden" />
                    </motion.div>
                  </>
                ) : (
                  <Menu
                    className="block size-6 cursor-pointer md:hidden text-white"
                    onClick={() => setShowMenu(true)}
                  />
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

const AuthButtons = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'grid-cols-2 items-center justify-center gap-4',
        className
      )}
    >
      <Button variant="outline" className="w-full md:w-[163px]" asChild>
        <Link href="/login">Login</Link>
      </Button>

      <Button className="w-full md:w-[163px]" asChild>
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );
};