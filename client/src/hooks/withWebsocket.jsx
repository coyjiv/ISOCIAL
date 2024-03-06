import {useSubscription} from "react-stomp-hooks";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import ToastMessage from "../components/MessageToast/MessageToast.jsx";

const withWebsocket = (WrappedComponent) => {
    const WithWebSocket = (props) => {
        useSubscription(`/user/${localStorage.getItem("userId")}/messages`, handleMessage)
        useSubscription(`/user/${localStorage.getItem("userId")}/friends`, handleFriend)
        useSubscription(`/user/${localStorage.getItem("userId")}/reposts`, handleRepost)
        useSubscription(`/user/${localStorage.getItem("userId")}/subscriptions`, handleSubscription)
        useSubscription(`/user/${localStorage.getItem("userId")}/likes`, handleLike)
        useSubscription(`/user/${localStorage.getItem("userId")}/comments`, handleComment)


        async function handleMessage(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/chat/${body.chatId}`} msg={body} type={"MESSAGE"}/>,
                {
                    icon: () => <Link to={`/chat/${body.chatId}`}>
                        <img style={{objectFit: 'cover', borderRadius: '50%'}} width={'100%'} height={'auto'}
                             src={body.senderAvatarUrl}
                             alt={'avatar'}/>
                    </Link>
                });
        }


        async function handleFriend(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/friends/requests`} msg={body} type={"FRIEND"}/>,
                {
                    icon: () => <Link to={`/friends/requests`}>
                        <img style={{objectFit: 'cover', borderRadius: '50%'}} width={'100%'} height={'auto'}
                             src={body.senderAvatarUrl}
                             alt={'avatar'}/>
                    </Link>
                });
        }

        async function handleRepost(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/post/${body.postId}`} msg={body} type={"REPOST"}/>,
                {
                    icon: () => <Link to={`/post/${body.postId}`}>
                        <img style={{objectFit: 'cover', borderRadius: '50%'}} width={'100%'} height={'auto'}
                             src={body.senderAvatarUrl}
                             alt={'avatar'}/>
                    </Link>
                });
        }


        async function handleSubscription(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/post/${body.postId}`} msg={body} type={"SUBSCRIPTION"}/>,
                {
                    icon: () => <Link to={`/post/${body.postId}`}>
                        <img style={{objectFit: 'cover', borderRadius: '50%'}} width={'100%'} height={'auto'}
                             src={'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'}
                             alt={'avatar'}/>
                    </Link>
                });
        }

        async function handleLike(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            if (body.entityType === "POST"){
                toast.info(<ToastMessage link={`/post/${body.entityId}`} msg={body} type={"LIKE_POST"}/>,
                    {
                        icon: () => <Link to={`/post/${body.entityId}`}>
                            <img style={{objectFit: 'cover', borderRadius: '50%'}} width={'100%'} height={'auto'}
                                 src={body.likerAvatar}
                                 alt={'avatar'}/>
                        </Link>
                    });
            } else {
                toast.info(<ToastMessage link={`/post/${body.entityId}`} msg={body} type={"LIKE_COMMENT"}/>,
                    {
                        icon: () => <Link to={`/post/${body.entityId}`}>
                            <img style={{objectFit: 'cover', borderRadius: '50%'}} width={'100%'} height={'auto'}
                                 src={body.likerAvatar}
                                 alt={'avatar'}/>
                        </Link>
                    });
            }
        }

        async function handleComment(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/post/${body.postId}`} msg={body} type={"COMMENT"}/>,
                {
                    icon: () => <Link to={`/post/${body.postId}`}>
                        <img style={{objectFit: 'cover', borderRadius: '50%'}} width={'100%'} height={'auto'}
                             src={body.commenterAvatar}
                             alt={'avatar'}/>
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

export {withWebsocket};
