'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks';
import { loginSchema, LoginFormData } from '../schemas';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginUser, isPending } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginUser({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-0.5">
        <Label htmlFor="email">Email</Label>

        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register('email')}
        />

        {errors.email && (
          <span className="text-accent-red font-medium text-sm">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            className="pr-11"
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="size-5 text-neutral-500 cursor-pointer" />
            ) : (
              <Eye className="size-5 text-neutral-500 cursor-pointer" />
            )}
          </button>
        </div>

        {errors.password && (
          <span className="text-accent-red font-medium text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button className="w-full px-2 h-11 md:h-12" type="submit" disabled={isPending}>
          {isPending ? 'Loading...' : 'Login'}
        </Button>

        <p className="font-semibold text-sm md:text-md text-center">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="font-bold text-primary-200 hover:text-primary-300"
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;