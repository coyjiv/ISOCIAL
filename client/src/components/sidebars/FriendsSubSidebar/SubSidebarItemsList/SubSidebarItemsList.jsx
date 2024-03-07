import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import { FriendsSidebarUserCard } from "../../../friends-page-components/index.js";
import { SidebarItemsList } from "../FriendsSubSidebar.styled.js";

const SubSidebarItemsList = ({ users, searchValue, variant, subTitle, handleDeleteRequest, handleConfirmRequest, handleChooseUser }) => {
  const filteredUsers = users?.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <SidebarItemsList>
      <Typography
        fontSize="17px"
        fontWeight="600"
        marginLeft="12px"
        marginBottom="12px"
      >{`${users?.length ?? "0"} ${subTitle}`}</Typography>
      <Stack width="100%" gap="10px">
        {filteredUsers?.map(({ id, firstName, lastName, avatar }) => (
          <FriendsSidebarUserCard
            key={id}
            userImage={avatar}
            fullName={`${firstName} ${lastName}`}
            variant={variant}
            onDelete={(e) => handleDeleteRequest(e, id)}
            onConfirm={() => handleConfirmRequest(id)}
            onClick={() => handleChooseUser(id)}
          />
        ))}
      </Stack>
    </SidebarItemsList>
  );
};

SubSidebarItemsList.propTypes = {
  users: PropTypes.array,
  searchValue: PropTypes.string,
  variant: PropTypes.string,
  subTitle: PropTypes.string,
  handleDeleteRequest: PropTypes.func,
  handleConfirmRequest: PropTypes.func,
  handleChooseUser: PropTypes.func,
};

SubSidebarItemsList.displayName = "SubSidebarItemsList";

export default SubSidebarItemsList;
