import Logo from "@/features/shared/components/logo";
import Link from "next/link";

const RegisterHeader = () => {
  return (
    <>
      <Link href="/">
        <Logo />
      </Link>

      <h1 className="font-bold text-xl md:text-display-xs text-center">
        Register
      </h1>
    </>
  );
};

export default RegisterHeader;