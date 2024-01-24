import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import ForgotPassword from "../Forgot-password/Forgot-password";

 const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "register",
      element: <Register/>,
    },
    {
      path: "login",
      element: <Login/>,
    },
    {
      path: "profile",
      element: <Profile/>,
    },
    {
      path: "settings",
      element: <Settings/>,
    },
    {
      path: "feed",
      element: <div>Users</div>,
    },
    {
      path: "users/:id",
      element: <div>Users</div>,
    },
    {
      path: "forgotPassword",
      element: <ForgotPassword/>,
    },
  ]);

export const App = () => (<RouterProvider router={router} />);