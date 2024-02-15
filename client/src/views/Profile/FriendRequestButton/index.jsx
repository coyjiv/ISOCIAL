import { Button } from '@mui/material';
import { GoPlus, GoCheck, GoX } from 'react-icons/go';
import { useCancelFriendRequestMutation, useRemoveFriendMutation, useAvailableFriendRequestsQuery, useAcceptFriendRequestMutation, useDeclineFriendRequestMutation } from '../../../store/services/friendService';
import PropTypes from 'prop-types';

const FriendRequestButton = ({ isPersonalProfile, isFriend, haveSentFriendRequest, result, sendFriendRequest, id }) => {

    const [cancelFriendRequest] = useCancelFriendRequestMutation();
    const [removeFriend] = useRemoveFriendMutation();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [declineFriendRequest] = useDeclineFriendRequestMutation();

    const { data: availableFriendRequests } = useAvailableFriendRequestsQuery(localStorage.getItem('userId'));

    if (isPersonalProfile) {
        return null;
    }

    const userId = parseInt(id, 10);

    const isIncomingFriendRequest = availableFriendRequests?.some((request) => request.id === userId);

    const handleAction = () => {
        if (isFriend) {
            removeFriend({ userId: id });
        } else if (haveSentFriendRequest) {
            cancelFriendRequest({ userId: id });
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
            onClick={() => declineFriendRequest({ userId: id })}
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
    isFriend: PropTypes.bool,
    haveSentFriendRequest: PropTypes.bool,
    result: PropTypes.shape({
        status: PropTypes.oneOf(['uninitialized', 'pending', 'fulfilled', 'error']),
    }).isRequired,
    sendFriendRequest: PropTypes.func,
    id: PropTypes.any,
};


export default FriendRequestButton;
