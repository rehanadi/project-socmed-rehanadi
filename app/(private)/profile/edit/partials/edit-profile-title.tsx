import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const EditProfileTitle = () => {
  return (
    <div className="flex-start gap-3">
      <Link href="/profile">
        <ArrowLeft className="size-8" />
      </Link>

      <h1 className="font-bold text-display-xs">
        Edit Profile
      </h1>
    </div>
  );
};

export default EditProfileTitle;