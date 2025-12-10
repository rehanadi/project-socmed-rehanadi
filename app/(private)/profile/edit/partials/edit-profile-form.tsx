'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import {
  updateProfileSchema,
  UpdateProfileFormData,
} from '@/features/users/schemas';
import { useUpdateProfile, useGetMyProfile } from '@/features/users/hooks';
import { useAppSelector } from '@/lib/hooks';

const EditProfileForm = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const { data: profileData, isLoading } = useGetMyProfile();
  const [previewImage, setPreviewImage] = useState<string | null>(
    currentUser?.avatarUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: '',
      username: '',
      phone: '',
      bio: '',
      avatar: null,
    },
  });

  // Set form values when profile data is loaded
  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.profile.name,
        username: profileData.profile.username,
        phone: profileData.profile.phone,
        bio: profileData.profile.bio || '',
        avatar: null,
      });
      setPreviewImage(profileData.profile.avatarUrl);
    }
  }, [profileData, reset]);

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('avatar', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfile({
      name: data.name,
      username: data.username,
      phone: data.phone,
      bio: data.bio,
      avatar: data.avatar || null,
    });
  };

  if (isLoading) {
    return (
      <div className="flex-center h-40">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-4 md:gap-12"
    >
      <div className="shrink-0 flex flex-col items-center gap-4">
        <Avatar className="size-20 md:size-32.5">
          <AvatarImage
            src={previewImage || '/images/avatar.png'}
            className="aspect-square rounded-full object-cover"
          />
          <AvatarFallback>{currentUser?.name || 'User'}</AvatarFallback>
        </Avatar>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          type="button"
          variant="outline"
          className="w-40 px-4"
          onClick={handleChangePhoto}
        >
          Change Photo
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-0.5">
          <Label htmlFor="name">Name</Label>

          <Input
            type="text"
            id="name"
            placeholder="Name"
            {...register('name')}
          />

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
            value={currentUser?.email || ''}
            disabled
          />
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
          <Label htmlFor="bio">Bio</Label>

          <Textarea
            id="bio"
            placeholder="Create your bio"
            className="min-h-[101px] max-h-100"
            {...register('bio')}
          />

          {errors.bio && (
            <span className="text-accent-red font-medium text-sm">
              {errors.bio.message}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;