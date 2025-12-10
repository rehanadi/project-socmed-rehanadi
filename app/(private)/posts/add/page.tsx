import AddPostContainer from "./partials/add-post-container"
import AddPostTitle from "./partials/add-post-title"
import AddPostForm from "./partials/add-post-form"
import FloatingMenus from "@/features/shared/components/floating-menus";

const AddPostPage = () => {
  return (
    <AddPostContainer>
      <AddPostTitle />
      <AddPostForm />
      <FloatingMenus />
    </AddPostContainer>
  );
};

export default AddPostPage;