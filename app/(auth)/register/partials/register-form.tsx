import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye } from "lucide-react"
import Link from "next/link"

const RegisterForm = () => {
  return (
    <form className="w-full flex flex-col gap-5">
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
        <Label htmlFor="password">
          Password
        </Label>
        
        <div className="relative">
          <Input
            type="password"
            id="password"
            placeholder="Password"
            className="pr-11"
          />
          <Eye className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-neutral-500 cursor-pointer" />
        </div>

        <span className="text-accent-red font-medium text-sm">
          Error Text Helper
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>
        
        <div className="relative">
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="pr-11"
          />
          <Eye className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-neutral-500 cursor-pointer" />
        </div>

        <span className="text-accent-red font-medium text-sm">
          Error Text Helper
        </span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button className="w-full px-2 h-11 md:h-12">
          Submit
        </Button>

        <p className="font-semibold text-sm md:text-md text-center">
          Already have an account?
          {' '}
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