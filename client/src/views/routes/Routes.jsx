import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import Groups from "../Groups/Groups";
import Videos from "../Videos/Videos";
import Friends from "../Friends/Friends";
import Confirmation from "../Confirmation/Confirmation";
import {API_URL} from "../../api/index.js";
import {StompSessionProvider, useStompClient} from "react-stomp-hooks";
import {useLocalStorage} from "usehooks-ts";
import {useEffect} from "react";

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
        path: "profile/:id",
        element: <Profile/>
    },
    {
        path: "settings",
        element: <Settings/>,
    },
    {
        path: "friends",
        element: <Friends/>,
    },
    {
        path: "watch",
        element: <Videos/>,
    },
    {
        path: "groups",
        element: <Groups/>,
    },
    {
        path: "feed",
        element: <div>Users</div>,
    },
    {
        path: "confirmation",
        element: <Confirmation/>,
    },
]);

export const App = () => {
    return (
            <RouterProvider router={router}/>
    )
};