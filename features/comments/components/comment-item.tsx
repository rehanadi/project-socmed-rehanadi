import PostAuthor from "@/features/posts/components/post-author"

interface CommentItemProps {
  author: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  text: string;
}

const CommentItem = ({
  author,
  createdAt,
  text,
}: CommentItemProps) => {
  return (
    <div className="flex flex-col items-start gap-2.5">
      <PostAuthor
        author={author}
        createdAt={createdAt}
        size="small"
      />
      <p className="text-xs md:text-sm">
        {text}
      </p>
    </div>
  )
}

export default CommentItem