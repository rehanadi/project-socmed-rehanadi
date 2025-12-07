import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const EditProfileForm = () => {
  return (
    <form className="flex flex-col md:flex-row gap-4 md:gap-12">
      <div className="shrink-0 flex flex-col items-center gap-4">
        <Avatar className="size-20 md:size-32.5">
          <AvatarImage src="/images/avatar.png" />
          <AvatarFallback>
            User
          </AvatarFallback>
        </Avatar>

        <Button variant="outline" className="w-40 px-4">
          Change Photo
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-0.5">
          <Label htmlFor="name">
            Name
          </Label>
          
          <Input
            type="text"
            id="name"
            placeholder="Name"
          />

          <span className="text-accent-red font-medium text-sm">
            Error Text Helper
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <Label htmlFor="username">
            Username
          </Label>
          
          <Input
            type="text"
            id="username"
            placeholder="Username"
          />

          <span className="text-accent-red font-medium text-sm">
            Error Text Helper
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <Label htmlFor="email">
            Email
          </Label>
          
          <Input
            type="email"
            id="email"
            placeholder="Email"
          />

          <span className="text-accent-red font-medium text-sm">
            Error Text Helper
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <Label htmlFor="phone">
            Number Phone
          </Label>
          
          <Input
            type="number"
            id="phone"
            placeholder="Number Phone"
          />

          <span className="text-accent-red font-medium text-sm">
            Error Text Helper
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <Label htmlFor="bio">
            Bio
          </Label>
          
          <Textarea
            id="bio"
            placeholder="Create your bio"
            className="min-h-[101px] max-h-100"
          />

          <span className="text-accent-red font-medium text-sm">
            Error Text Helper
          </span>
        </div>

        <Button className="w-full">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;