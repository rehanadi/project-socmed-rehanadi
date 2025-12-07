'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUpToLine, CloudUpload, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddPost } from '@/features/posts/hooks';
import { addPostSchema, AddPostFormData } from '@/features/posts/schemas';

const AddPostForm = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddPostFormData>({
    resolver: zodResolver(addPostSchema),
  });

  const { mutate: addPost, isPending } = useAddPost();

  const onSubmit = (data: AddPostFormData) => {
    addPost({
      image: data.image,
      caption: data.caption,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file, { shouldValidate: true });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    setValue('image', null as any, { shouldValidate: true });
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-0.5">
        <Label htmlFor="image">Photo</Label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="bg-neutral-950 px-6 py-4 border border-dashed border-neutral-900 rounded-xl flex flex-col items-center gap-3">
          {previewUrl ? (
            <>
              <div className="w-full aspect-square overflow-hidden relative">
                <Image
                  src={previewUrl}
                  alt="Uploaded Image"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-center gap-3 md:pb-7">
                <Button
                  type="button"
                  variant="secondary"
                  className="px-3 flex-center gap-1.5"
                  onClick={handleChangeImage}
                >
                  <ArrowUpToLine className="size-5" />
                  <span>Change Image</span>
                </Button>

                <Button
                  type="button"
                  variant="danger"
                  className="px-3 flex-center gap-1.5"
                  onClick={handleDeleteImage}
                >
                  <Trash2 className="size-5" />
                  <span>Delete Image</span>
                </Button>
              </div>
            </>
          ) : (
            <div
              className="w-full cursor-pointer flex flex-col items-center gap-3"
              onClick={handleUploadClick}
            >
              <div className="size-10 border border-neutral-900 rounded-md flex-center">
                <CloudUpload className="size-5" />
              </div>

              <div className="flex flex-col items-center gap-0.5 text-neutral-600 font-semibold text-sm">
                <p>
                  <span className="text-primary-200 font-bold">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>

                <p>PNG or JPG (max. 5mb)</p>
              </div>
            </div>
          )}
        </div>

        {errors.image && (
          <span className="text-accent-red font-medium text-sm">
            {errors.image.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor="caption">Caption</Label>

        <Textarea
          id="caption"
          placeholder="Create your caption"
          className="min-h-[101px] max-h-100"
          {...register('caption')}
        />

        {errors.caption && (
          <span className="text-accent-red font-medium text-sm">
            {errors.caption.message}
          </span>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? 'Sharing...' : 'Share'}
      </Button>
    </form>
  );
};

export default AddPostForm;