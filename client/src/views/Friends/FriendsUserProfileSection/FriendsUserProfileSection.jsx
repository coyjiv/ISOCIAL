import { FriendsNoUserSection } from "../FriendsNoUserSection";
import { ProfileLayout } from "../../Profile/ProfileLayout";
import { FriendsUserProfileContainer } from "./FriendsUserProfileSection.styled";
import { useSearchParams } from "react-router-dom";

const FriendsUserProfileSection = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  if (!id) {
    return (
      <FriendsUserProfileContainer>
        <FriendsNoUserSection />
      </FriendsUserProfileContainer>
    );
  }

  return (
    <FriendsUserProfileContainer>
      <ProfileLayout id={id} />
    </FriendsUserProfileContainer>
  );
};

FriendsUserProfileSection.displayName = "FriendsUserProfileSection";

export default FriendsUserProfileSection;
