import {useSubscription, useStompClient} from "react-stomp-hooks";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ToastMessage from "../components/MessageToast/MessageToast.jsx";
import {addMessage, addWSMessage} from "../store/chatSlice.js";
import {userAvatar} from "../data/placeholders.js";
import {Avatar} from "@mui/material";
import {fetchChats} from "../store/actions/chat.js";
import {notificationApi} from "../store/services/notification.js";
import {useGetSettingsQuery} from "../store/services/settingsService.js";
import {API_URL, instance} from "../api/index.js";

const extractUserInfo = (body) => {
    // Attempt to extract user information in a unified way across different body types
    const gender = body.senderGender === 'MALE' ? 'MALE' : body.senderGender === 'FEMALE' ? 'FEMALE' : undefined;
    let avatarUrl;
    let firstName;
    let lastName;

    // Determine which fields are available in the body and use them
    if (body.senderName || body.commenterName || body.likerName) {
        const name = body.senderName || body.commenterName || body.likerName;
        const nameParts = name.split(' ');
        firstName = nameParts[0];
        lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    }

    if (body.senderAvatarUrl || body.commenterAvatar || body.likerAvatar) {
        avatarUrl = body.senderAvatarUrl || body.commenterAvatar || body.likerAvatar;
    }

    return {gender, firstName, lastName, avatarUrl};
};

const avatar = (body) => {
    const {gender, firstName, lastName, avatarUrl} = extractUserInfo(body);

    // Construct a temporary user object to fit the userAvatar function's expected input
    const user = {
        avatarsUrl: avatarUrl ? [avatarUrl] : undefined,
        gender: gender,
        firstName: firstName,
        lastName: lastName,
    };

    return userAvatar(user, firstName, lastName);
};

export default avatar;

const withWebsocket = (WrappedComponent) => {
    const WithWebSocket = (props) => {
        const dispatch = useDispatch();
        const selectedChat = useSelector(state => state.chat.selectedChat);
        const chats = useSelector(state => state.chat.chats);

        const {data: settings} = useGetSettingsQuery()
        useSubscription(`/user/${localStorage.getItem("userId")}/messages`, handleMessage)
        useSubscription(`/user/${localStorage.getItem("userId")}/friends`, handleFriend)
        useSubscription(`/user/${localStorage.getItem("userId")}/reposts`, handleRepost)
        useSubscription(`/user/${localStorage.getItem("userId")}/subscriptions`, handleSubscription)
        useSubscription(`/user/${localStorage.getItem("userId")}/likes`, handleLike)
        useSubscription(`/user/${localStorage.getItem("userId")}/comments`, handleComment)


        async function handleMessage(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            console.log("ws", body, avatar(body));
            dispatch(addMessage(body));
            dispatch(notificationApi.util.prefetch('getNotification', {
                recieverId: localStorage.getItem('userId'),
                page: 0,
                quantity: 50
            }, {force: true}))

            if (body?.chatId === selectedChat?.id) {
                console.log("trying to add Websocket message");
                dispatch(addWSMessage(body));
                await instance.post(`/chats/${selectedChat.id}/read`, JSON.stringify({chatId: selectedChat.id}));
            } else if (!chats.data.find(chat => chat.id === body.chatId)) {
                dispatch(fetchChats({page: 0}))
            }
            if (settings?.receiveNotifications) {
                toast.info(<ToastMessage link={`/chats/${body.chatId}`} msg={body} type={"MESSAGE"}/>,
                    {
                        icon: () => <Link to={`/chats/${body.chatId}`}>
                            <Avatar sx={{width: '100%', height: '100%'}} height={'auto'}
                                    src={avatar(body)}
                                    alt={`${body.senderName} avatar`}/>
                        </Link>,
                        // position: isMobile ? "top-center" : "bottom-le"
                    });
            }
        }


        async function handleFriend(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            console.log("ws", body);

            dispatch(notificationApi.util.prefetch('getNotification', {
                recieverId: localStorage.getItem('userId'),
                page: 0,
                quantity: 50
            }, {force: true}))
            dispatch(notificationApi.util.invalidateTags(['Notifications']))
            if (settings?.receiveNotifications) {
                toast.info(<ToastMessage link={`/friends/requests`} msg={body} type={"FRIEND"}/>,
                    {
                        icon: () => <Link to={`/friends/requests`}>
                            <Avatar sx={{width: '100%', height: '100%'}}
                                    src={avatar(body)}
                                    alt={'avatar'}/>
                        </Link>
                    });
            }
        }

        async function handleRepost(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            console.log("ws", body, avatar(body));

            dispatch(notificationApi.util.prefetch('getNotification', {
                recieverId: localStorage.getItem('userId'),
                page: 0,
                quantity: 50
            }, {force: true}))
            dispatch(notificationApi.util.invalidateTags(['Notifications']))
            if (settings?.receiveNotifications && body.senderId != localStorage.getItem('userId')) {
                toast.info(<ToastMessage link={`/post/${body.postId}`} msg={body} type={"REPOST"}/>,
                    {
                        icon: () => <Link to={`/post/${body.postId}`}>
                            <Avatar sx={{width: '100%', height: '100%'}}
                                    src={avatar(body)}
                                    alt={'avatar'}/>
                        </Link>
                    });
            }
        }


        async function handleSubscription(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            console.log("ws", body, avatar(body));

            dispatch(notificationApi.util.prefetch('getNotification', {
                recieverId: localStorage.getItem('userId'),
                page: 0,
                quantity: 50
            }, {force: true}))
            dispatch(notificationApi.util.invalidateTags(['Notifications']))
            if (settings?.receiveNotifications) {
                toast.info(<ToastMessage link={`/post/${body.postId}`} msg={body} type={"SUBSCRIPTION"}/>,
                    {
                        icon: () => <Link to={`/post/${body.postId}`}>
                            <Avatar sx={{width: '100%', height: '100%'}}
                                    src={avatar(body)}
                                    alt={'avatar'}/>
                        </Link>
                    });
            }
        }

        async function handleLike(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            console.log("ws", body, avatar(body));

            dispatch(notificationApi.util.prefetch('getNotification', {
                recieverId: localStorage.getItem('userId'),
                page: 0,
                quantity: 50
            }, {force: true}))
            dispatch(notificationApi.util.invalidateTags(['Notifications']))
            if (settings?.receiveNotifications && body.senderId != localStorage.getItem('userId')) {
                if (body.entityType === "POST") {
                    toast.info(<ToastMessage link={`/post/${body.entityId}`} msg={body} type={"LIKE_POST"}/>,
                        {
                            icon: () => <Link to={`/post/${body.entityId}`}>
                                <Avatar sx={{width: '100%', height: '100%'}}
                                        src={avatar(body)}
                                        alt={'avatar'}/>
                            </Link>
                        });
                } else {
                    toast.info(<ToastMessage link={`/post/${body.entityId}`} msg={body} type={"LIKE_COMMENT"}/>,
                        {
                            icon: () => <Link to={`/post/${body.entityId}`}>
                                <Avatar sx={{width: '100%', height: '100%'}}
                                        src={body.likerAvatar}
                                        alt={'avatar'}/>
                            </Link>
                        });
                }
            }
        }

        async function handleComment(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            console.log("ws", body, avatar(body));

            dispatch(notificationApi.util.prefetch('getNotification', {
                recieverId: localStorage.getItem('userId'),
                page: 0,
                quantity: 50
            }, {force: true}))
            dispatch(notificationApi.util.invalidateTags(['Notifications']))
            if (settings?.receiveNotifications && body.senderId != localStorage.getItem('userId')) {
                toast.info(<ToastMessage link={`/post/${body.postId}`} msg={body} type={"COMMENT"}/>,
                    {
                        icon: () => <Link to={`/post/${body.postId}`}>
                            <Avatar sx={{width: '100%', height: '100%'}}
                                    src={avatar(body)}
                                    alt={'avatar'}/>
                        </Link>
                    });
            }
        }

        return (
            <WrappedComponent {...props} />
        )
    }

    WithWebSocket.displayName = `withWebsocket(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithWebSocket;
};

export {withWebsocket};
