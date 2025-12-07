import EditProfileContainer from "./partials/edit-profile-container";
import EditProfileForm from "./partials/edit-profile-form";
import EditProfileTitle from "./partials/edit-profile-title";

const EditProfilePage = () => {
  return (
    <EditProfileContainer>
      <EditProfileTitle />
      <EditProfileForm />
    </EditProfileContainer>
  );
};

export default EditProfilePage;