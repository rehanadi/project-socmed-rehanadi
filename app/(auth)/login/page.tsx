import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/features/shared/components/logo"
import { Eye } from "lucide-react"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div className="bg-[#00000033] custom-container w-111.5 max-w-full flex py-8 md:py-10 px-4 md:px-6 border border-neutral-900 rounded-2xl flex-col items-center gap-4 md:gap-6">
      <Link href="/">
        <Logo />
      </Link>

      <h1 className="font-bold text-xl md:text-display-xs">
        Welcome Back!
      </h1>

      <form className="w-full flex flex-col gap-5">
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

        <div className="flex flex-col items-center gap-4">
          <Button className="w-full px-2 h-11 md:h-12">
            Login
          </Button>

          <p className="font-semibold text-sm md:text-md">
            Don't have an account?
            {' '}
            <Link
              href="/register"
              className="font-bold text-primary-200 hover:text-primary-300"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage