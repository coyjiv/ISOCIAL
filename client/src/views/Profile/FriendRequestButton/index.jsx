import { Button } from '@mui/material';
import { GoPlus, GoCheck, GoX } from 'react-icons/go';
import { useRemoveFriendMutation, useAcceptFriendRequestMutation, useDeclineFriendRequestMutation, useSendFriendRequestMutation } from '../../../store/services/friendService';
import PropTypes from 'prop-types';

const FriendRequestButton = ({ isPersonalProfile, profile, id }) => {

    const [removeFriend] = useRemoveFriendMutation();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [declineFriendRequest] = useDeclineFriendRequestMutation();
    const [sendFriendRequest, result] = useSendFriendRequestMutation()

    const isFriend = profile?.friendStatus === 'FRIEND';
    const isIncomingFriendRequest = profile?.friendStatus === 'REQUEST_SENT';
    const haveSentFriendRequest = profile?.friendStatus === 'REQUEST_RECEIVED';


    if (isPersonalProfile) {
        return null;
    }



    const handleAction = () => {
        if (isFriend) {
            removeFriend({ friendUserId: id });
        } else if (haveSentFriendRequest) {
            declineFriendRequest({ userId: id });
        } else if (isIncomingFriendRequest) {
            acceptFriendRequest({ userId: id });
        } else {
            sendFriendRequest({ userId: id });
        }
    };

    const getButtonContent = () => {
        if (isFriend) {
            return "Remove from friends";
        } else if (haveSentFriendRequest) {
            return 'Cancel friend request';
        } else if (isIncomingFriendRequest) {
            return (
                <>
                    <GoCheck /> Accept Request
                </>
            );
        } else {
            switch (result.status) {
                case 'uninitialized':
                    return (
                        <>
                            <GoPlus /> Add Friend
                        </>
                    );
                case 'loading':
                    return 'Loading...';
                case 'error':
                    return (
                        <>
                            <GoPlus /> Try Again
                        </>
                    );
                default:
                    return (
                        <>
                            <GoPlus /> Add Friend
                        </>
                    );
            }
        }
    };

    // Button for declining friend requests, shown only if there's an incoming friend request
    const declineButton = isIncomingFriendRequest && (
        <Button
            onClick={handleAction}
            variant="outlined"
            sx={{ width: '180px', height: '36px', display: 'flex', gap: '10px', fontSize: 14 }}
        >
            <GoX /> Decline Request
        </Button>
    );


    return (
        <>
            <Button
                onClick={handleAction}
                variant="outlined"
                sx={{ width: '180px', height: '36px', display: 'flex', gap: '10px', fontSize: 14 }}
            >
                {getButtonContent()}
            </Button>
            {declineButton}
        </>
    );
};

FriendRequestButton.propTypes = {
    isPersonalProfile: PropTypes.bool,
    profile: PropTypes.object,
    id: PropTypes.any,
};


export default FriendRequestButton;
