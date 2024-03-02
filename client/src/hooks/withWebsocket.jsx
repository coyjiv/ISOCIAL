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


        async function handleMessage(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/chat/${body.chatId}`} msg={body} type={"MESSAGE"}/>,
                {
                    icon: () => <Link to={`/chat/${body.chatId}`}>
                        <img style={{objectFit: 'cover', borderRadius: '50%'}} width={'100%'} height={'auto'}
                             src={'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'}
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
                             src={'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'}
                             alt={'avatar'}/>
                    </Link>
                });
        }

        async function handleRepost(msg) {
            const message = await msg.body;
            const body = JSON.parse(message);
            toast.info(<ToastMessage link={`/post/${msg.postId}`} msg={body} type={"REPOST"}/>,
                {
                    icon: () => <Link to={`/post/${msg.postId}`}>
                        <img style={{objectFit: 'cover', borderRadius: '50%'}} width={'100%'} height={'auto'}
                             src={'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'}
                             alt={'avatar'}/>
                    </Link>
                });
        }


        function handleSubscription(msg) {
            toast.info(<ToastMessage msg={msg} type={"MESSAGE"}/>);
        }

        return (
            <WrappedComponent {...props} />
        )
    }

    WithWebSocket.displayName = `withWebsocket(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithWebSocket;
};

export {withWebsocket};
