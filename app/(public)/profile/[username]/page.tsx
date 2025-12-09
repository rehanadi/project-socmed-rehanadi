import UserTabs from "./partials/user-tabs"
import UserContainer from "@/features/users/components/user-container";
import UserInfo from "@/features/users/components/user-info";
import UserStatistics from "@/features/users/components/user-statistics";

const UserProfilePage = () => {
  return (
    <UserContainer>
      <UserInfo  />
      <UserStatistics />
      <UserTabs />
    </UserContainer>
  );
};

export default UserProfilePage;