import { withLayout } from "../../hooks/withLayout";
import { FriendsMainSidebar } from "../../components/sidebars";
import { FriendsMainContent } from "./FriendsMainContent";
import { FriendsPageWrapper } from "./Friends.styled";

const FriendsPage = () => {
  return (
    <FriendsPageWrapper>
      <FriendsMainSidebar />
			<FriendsMainContent />
    </FriendsPageWrapper>
  );
};

const Friends = withLayout(FriendsPage);

export default Friends;
