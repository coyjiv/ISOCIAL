import { useSubscription } from "react-stomp-hooks";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "../components/MessageToast/MessageToast.jsx";
import { addMessage, addWSMessage } from "../store/chatSlice.js";
import { userAvatar } from "../data/placeholders.js";
import { Avatar } from "@mui/material";
import { fetchChats } from "../store/actions/chat.js";

const withWebsocket = (WrappedComponent) => {
    const WithWebSocket = (props) => {
        const dispatch = useDispatch();
        const selectedChat = useSelector(state => state.chat.selectedChat);
        const chats = useSelector(state => state.chat.chats);

        useSubscription(`/user/${localStorage.getItem("userId")}/messages`, handleMessage)
        useSubscription(`/user/${localStorage.getItem("userId")}/friends`, handleFriend)
        useSubscription(`/user/${localStorage.getItem("userId")}/reposts`, handleRepost)
        useSubscription(`/user/${localStorage.getItem("userId")}/subscriptions`, handleSubscription)
        useSubscription(`/user/${localStorage.getItem("userId")}/likes`, handleLike)
        useSubscription(`/user/${localStorage.getItem("userId")}/comments`, handleComment)

        const avatar = body => userAvatar({ avatarsUrl: [body.senderAvatarUrl], firstName: body?.senderName?.split(' ')?.[0], lastName: body?.senderName?.split(' ')?.[1] })

        async function handleMessage(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            console.log("ws", body);
            dispatch(addMessage(body));
            if (body?.chatId === selectedChat?.id) {
                console.log("trying to add Websocket message");
                dispatch(addWSMessage(body));
            } else if (!chats.data.find(chat => chat.id === body.chatId)) {
                dispatch(fetchChats({ page: 0 }))
            }
            toast.info(<ToastMessage link={`/chats/${body.chatId}`} msg={body} type={"MESSAGE"} />,
                {
                    icon: () => <Link to={`/chats/${body.chatId}`}>
                        <Avatar sx={{ width: '100%', height: '100%' }} height={'auto'}
                            src={avatar(body)}
                            alt={`${body.senderName} avatar`} />
                    </Link>,
                    // position: isMobile ? "top-center" : "bottom-le"
                });
        }


        async function handleFriend(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/friends/requests`} msg={body} type={"FRIEND"} />,
                {
                    icon: () => <Link to={`/friends/requests`}>
                        <Avatar width={'100%'} height={'auto'}
                            src={avatar(body)}
                            alt={'avatar'} />
                    </Link>
                });
        }

        async function handleRepost(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/post/${body.postId}`} msg={body} type={"REPOST"} />,
                {
                    icon: () => <Link to={`/post/${body.postId}`}>
                        <Avatar width={'100%'} height={'auto'}
                            src={avatar(body)}
                            alt={'avatar'} />
                    </Link>
                });
        }


        async function handleSubscription(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/post/${body.postId}`} msg={body} type={"SUBSCRIPTION"} />,
                {
                    icon: () => <Link to={`/post/${body.postId}`}>
                        <Avatar width={'100%'} height={'auto'}
                            src={avatar(body)}
                            alt={'avatar'} />
                    </Link>
                });
        }

        async function handleLike(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            if (body.entityType === "POST") {
                toast.info(<ToastMessage link={`/post/${body.entityId}`} msg={body} type={"LIKE_POST"} />,
                    {
                        icon: () => <Link to={`/post/${body.entityId}`}>
                            <Avatar width={'100%'} height={'auto'}
                                src={body.likerAvatar}
                                alt={'avatar'} />
                        </Link>
                    });
            } else {
                toast.info(<ToastMessage link={`/post/${body.entityId}`} msg={body} type={"LIKE_COMMENT"} />,
                    {
                        icon: () => <Link to={`/post/${body.entityId}`}>
                            <Avatar width={'100%'} height={'auto'}
                                src={body.likerAvatar}
                                alt={'avatar'} />
                        </Link>
                    });
            }
        }

        async function handleComment(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/post/${body.postId}`} msg={body} type={"COMMENT"} />,
                {
                    icon: () => <Link to={`/post/${body.postId}`}>
                        <Avatar width={'100%'} height={'auto'}
                            src={body.commenterAvatar}
                            alt={'avatar'} />
                    </Link>
                });
        }

        return (
            <WrappedComponent {...props} />
        )
    }

    WithWebSocket.displayName = `withWebsocket(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithWebSocket;
};

export { withWebsocket };
