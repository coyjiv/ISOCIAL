import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import ForgotPassword from "../Forgot-password/ForgotPassword";
import Groups from "../Groups/Groups";
import Videos from "../Videos/Videos";
import {
  Friends,
  FriendsAll,
  FriendsRequests,
  FriendsSuggestions,
} from "../Friends";
import Confirmation from "../Confirmation/Confirmation";

import Post from "../Post";

import UpdatePassword from "../UpdatePassword";
import Saved from "../Saved";
import { ErrorFallback } from "../../components/ErrorFallback/ErrorFallback";
import Chats from "../Chat/Chats";
import { Chat } from "../Chat/Chat";
import { PendingChat } from "../Chat/PendingChat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "profile",
    element: <Profile />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "profile/:id",
    element: <Profile />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "settings",
    element: <Settings />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "/friends",
    element: <Friends />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "/friends/requests",
    element: <FriendsRequests />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/friends/suggestions',
    element: <FriendsSuggestions />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "/friends/all",
    element: <FriendsAll />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "watch",
    element: <Videos />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "groups",
    element: <Groups />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "feed",
    element: <div>Users</div>,
  },
  {
    path: "chats",
    element: <Chats />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "chat",
    element: <PendingChat />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "chats/:id",
    element: <Chat />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "confirmation",
    element: <Confirmation />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "forgot-password/:id",
    element: <UpdatePassword />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "post/:id",
    element: <Post />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "saved",
    element: <Saved />,
    errorElement: <ErrorFallback />,
  }
]);

export const App = () => <RouterProvider router={router} />;
