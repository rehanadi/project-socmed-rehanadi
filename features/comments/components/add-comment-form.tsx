import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useAddComment } from '../hooks';

interface AddCommentFormProps {
  postId: number;
}

const AddCommentForm = ({ postId }: AddCommentFormProps) => {
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { mutate: addComment, isPending } = useAddComment();

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setComment((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !postId) return;

    addComment(
      {
        postId,
        payload: { text: comment.trim() },
      },
      {
        onSuccess: () => {
          setComment('');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex-between gap-2 relative">
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="shrink-0 size-12 border border-neutral-900 rounded-xl flex-center hover:bg-neutral-900/10 transition-colors cursor-pointer"
        >
          <Icon icon="proicons:emoji" className="size-6" />
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2 z-50">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={350}
              height={400}
            />
          </div>
        )}
      </div>

      <div className="flex-1 size-12 px-4 border border-neutral-900 rounded-xl flex-between">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add Comment"
          className="p-0 bg-transparent border-0 text-md font-medium flex-1 placeholder:text-neutral-600"
        />
        <Button
          type="submit"
          variant="outline"
          disabled={!comment.trim() || isPending}
          className="shrink-0 border-0 text-primary-200 disabled:text-neutral-600"
        >
          {isPending ? 'Posting...' : 'Post'}
        </Button>
      </div>
    </form>
  );
};

export default AddCommentForm;