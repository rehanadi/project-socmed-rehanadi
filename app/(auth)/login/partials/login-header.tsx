import Logo from "@/features/shared/components/logo";
import Link from "next/link";

const LoginHeader = () => {
  return (
    <>
      <Link href="/">
        <Logo />
      </Link>

      <h1 className="font-bold text-xl md:text-display-xs text-center">
        Welcome Back!
      </h1>
    </>
  );
};

export default LoginHeader;