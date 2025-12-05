import { Fragment } from "react"
import { postData } from "@/features/posts/constants/post-data"
import PostItem from "@/features/posts/components/post-item"
import { Separator } from "@/components/ui/separator"

const Timeline = () => {
  return (
    <>
      {postData.map((post, index) => (
        <Fragment key={post.id}>
          <PostItem post={post} />
          {index < postData.length - 1 && <Separator />}
        </Fragment>
      ))}
    </>
  )
}

export default Timeline