import UserTabs from "./partials/user-tabs"
import UserContainer from "@/features/users/components/user-container";
import UserInfo from "@/features/users/components/user-info";

const ProfilePage = () => {
  return (
    <UserContainer>
      <UserInfo isMe />
      <UserTabs />
    </UserContainer>
  );
};

export default ProfilePage;