import ProfileContainer from "./partials/profile-container"
import ProfileTabs from "./partials/profile-tabs"
import ProfileInfo from "./partials/profile-info"

const UserProfilePage = () => {
  return (
    <ProfileContainer>
      <ProfileInfo />
      <ProfileTabs />
    </ProfileContainer>
  );
};

export default UserProfilePage;