import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpToLine, CloudUpload, Trash2 } from "lucide-react";
import Image from "next/image";

const AddPostForm = () => {
  const imageIsFilled = false;

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <Label htmlFor="image">
          Photo
        </Label>

        <div className="bg-neutral-950 px-6 py-4 border border-dashed border-neutral-900 rounded-xl flex flex-col items-center gap-3">
          {imageIsFilled ? (
            <>
              <div className="w-full aspect-square overflow-hidden relative">
                <Image
                  src="/images/posts/post-1.png"
                  alt="Uploaded Image"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-center gap-3 md:pb-7">
                <Button variant="secondary" className="px-3 flex-center gap-1.5">
                  <ArrowUpToLine className="size-5" />
                  <span>Change Image</span>
                </Button>

                <Button variant="danger" className="px-3 flex-center gap-1.5">
                  <Trash2 className="size-5" />
                  <span>Delete Image</span>
                </Button>
              </div>
            </>
          ): (
            <>
            <div className="size-10 border border-neutral-900 rounded-md flex-center">
              <CloudUpload className="size-5" />
            </div>

            <div className="flex flex-col items-center gap-0.5 text-neutral-600 font-semibold text-sm">
              <p>
                <span className="text-primary-200 font-bold">Click to upload</span> or drag and drop
              </p>

              <p>
                PNG or JPG  (max. 5mb)
              </p>
            </div>
            </>
          )}
        </div>

        <span className="text-accent-red font-medium text-sm">
          Error Text Helper
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor="caption">
          Caption
        </Label>

        <Textarea
          id="caption"
          placeholder="Create your caption"
          className="min-h-[101px] max-h-100"
        />

        <span className="text-accent-red font-medium text-sm">
          Error Text Helper
        </span>
      </div>

      <Button className="w-full">
        Share
      </Button>
    </form>
  );
};

export default AddPostForm;