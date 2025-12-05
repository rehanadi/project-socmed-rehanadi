import { Icon } from "@iconify/react"

interface PostActionsProps {
  likes: number;
  comments: number;
  shares: number;
}

const PostActions = ({
  likes,
  comments,
  shares,
}: PostActionsProps) => {
  return (
    <div className="w-full flex-between gap-4">
      <div className="flex-1 flex-start gap-3 md:gap-4">
        <div className="flex-start gap-1.5">
          <Icon icon="solar:heart-linear" className="size-6 cursor-pointer" />
          <span className="text-sm font-semibold">{likes}</span>
        </div>

        <div className="flex-start gap-1.5">
          <Icon icon="solar:chat-dots-linear" className="size-6 cursor-pointer" />
          <span className="text-sm font-semibold">{comments}</span>
        </div>

        <div className="flex-start gap-1.5">
          <Icon icon="gravity-ui:paper-plane" className="size-6 cursor-pointer" />
          <span className="text-sm font-semibold">{shares}</span>
        </div>
      </div>

      <Icon icon="mingcute:bookmark-line" className="shrink-0 size-6 cursor-pointer" />
    </div>
  )
}

export default PostActions