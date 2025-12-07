'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '../hooks';
import { registerSchema, RegisterFormData } from '../schemas';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit = (data: RegisterFormData) => {
    registerUser({
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
  };

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-0.5">
        <Label htmlFor="name">Name</Label>

        <Input type="text" id="name" placeholder="Name" {...register('name')} />

        {errors.name && (
          <span className="text-accent-red font-medium text-sm">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor="username">Username</Label>

        <Input
          type="text"
          id="username"
          placeholder="Username"
          {...register('username')}
        />

        {errors.username && (
          <span className="text-accent-red font-medium text-sm">
            {errors.username.message}
          </span>
        )}
      </div>

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
        <Label htmlFor="phone">Number Phone</Label>

        <Input
          type="text"
          id="phone"
          placeholder="Number Phone"
          {...register('phone')}
        />

        {errors.phone && (
          <span className="text-accent-red font-medium text-sm">
            {errors.phone.message}
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

      <div className="flex flex-col gap-0.5">
        <Label htmlFor="confirmPassword">Confirm Password</Label>

        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="Confirm Password"
            className="pr-11"
            {...register('confirmPassword')}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showConfirmPassword ? (
              <EyeOff className="size-5 text-neutral-500 cursor-pointer" />
            ) : (
              <Eye className="size-5 text-neutral-500 cursor-pointer" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <span className="text-accent-red font-medium text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button className="w-full px-2 h-11 md:h-12" type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>

        <p className="font-semibold text-sm md:text-md text-center">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-bold text-primary-200 hover:text-primary-300"
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;