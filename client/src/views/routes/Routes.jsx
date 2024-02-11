import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import ForgotPassword from "../Forgot-password/ForgotPassword";
import Groups from "../Groups/Groups";
import Videos from "../Videos/Videos";
import Friends from "../Friends/Friends";
import Confirmation from "../Confirmation/Confirmation";
import UpdatePassword from "../UpdatePassword";
import { ErrorFallback } from "../../components/ErrorFallback/ErrorFallback";
import Chat from "../Chat/Chat";
import ChatList from "../Chat/ChatList";

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
    path: "friends",
    element: <Friends />,
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
    element: <ChatList />,
  },
  {
    path: "chats/:id",
    element: <Chat />,
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
  }
]);

export const App = () => <RouterProvider router={router} />;
