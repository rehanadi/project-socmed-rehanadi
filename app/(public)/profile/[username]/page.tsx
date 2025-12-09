import UserTabs from "./partials/user-tabs"
import UserContainer from "@/features/users/components/user-container";
import UserInfo from "@/features/users/components/user-info";

const UserProfilePage = () => {
  return (
    <UserContainer>
      <UserInfo />
      <UserTabs />
    </UserContainer>
  );
};

export default UserProfilePage;