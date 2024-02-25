
import { useSubscription} from "react-stomp-hooks";

const withWebsocket = (WrappedComponent) => {
   const WithWebSocket = (props) => {
       useSubscription(`/user/${localStorage.getItem("userId")}/messages`,handleMessage )
       useSubscription(`/user/${localStorage.getItem("userId")}/friends`,handleFriend )
       useSubscription(`/user/${localStorage.getItem("userId")}/reposts`,handleRepost )
       useSubscription(`/user/${localStorage.getItem("userId")}/subscriptions`,handleRepost )

       function handleMessage(msg) {
           console.log(JSON.parse(msg.body))
       }

       function handleFriend(msg) {
           console.log(JSON.parse(msg.body))
       }

       function handleRepost(msg) {
           console.log(JSON.parse(msg.body))
       }

        return (
                <WrappedComponent {...props} />
        )
   }

    WithWebSocket.displayName = `withWebsocket(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

   return WithWebSocket;
};

export {withWebsocket};
