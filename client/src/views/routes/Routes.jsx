import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import ForgotPassword from "../Forgot-password/Forgot-password";
import Groups from "../Groups/Groups";
import Videos from "../Videos/Videos";
import Friends from "../Friends/Friends";
import Confirmation from "../Confirmation/Confirmation";
import { ErrorFallback } from "../../components/ErrorFallBack/ErrorFallBack";

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
    path: "profile/:id",
    element: <Profile />
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
    path: "confirmation",
    element: <Confirmation />,
    errorElement: <ErrorFallback />,
  },
  { path: "forgotPassword", element: <ForgotPassword /> },
]);

export const App = () => <RouterProvider router={router} />;
