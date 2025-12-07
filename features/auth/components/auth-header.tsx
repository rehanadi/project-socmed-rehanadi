import Logo from "@/features/shared/components/logo";
import Link from "next/link";

interface AuthHeaderProps {
  title: string;
}

const AuthHeader = ({ title }: AuthHeaderProps) => {
  return (
    <>
      <Link href="/">
        <Logo />
      </Link>

      <h1 className="font-bold text-xl md:text-display-xs text-center">
        {title}
      </h1>
    </>
  );
};

export default AuthHeader;