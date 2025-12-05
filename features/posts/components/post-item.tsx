import Image from "next/image";
import Link from "next/link";
import { Post } from "../types";
import PostAuthor from "./post-author";
import PostActions from "./post-actions";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const { caption, image, author, createdAt, likes, comments, shares } = post;

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <PostAuthor author={author} createdAt={createdAt} />

      <div className="w-full aspect-square rounded-md overflow-hidden relative">
        <Image
          src={image}
          alt='Post Image'
          fill
          className='object-cover hover:scale-110 transition-transform'
        />
      </div>

      <PostActions
        likes={likes}
        comments={comments}
        shares={shares}
      />

      <div className="flex flex-col gap-0 md:gap-1">
        <Link href={`/authors/${author.id}`}>
          <h3 className="text-sm font-semibold md:text-md">{author.name}</h3>
        </Link>
        <p className="text-sm md:text-md">
          {caption}
        </p>
        <Link
          href="#"
          className="text-sm md:text-md font-bold md:font-semibold text-primary-200 hover:text-primary-300 transition-colors"
        >
          Show More
        </Link>
      </div>
    </div>
  )
}

export default PostItem