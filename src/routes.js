//import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
//import Basket from "./pages/Basket"
import RealtPage from "./pages/RealtPage"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import {LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, PROFILE_ROUTE, REALT_ROUTE } from "./utils/consts"

export const authRoutes = [
    // {
    //     path: BASKET_ROUTE,
    //     Component: Basket
    // },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
]

export const adminRoutes = [
    // {
    //     path: ADMIN_ROUTE,
    //     Component: Admin
    // },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: REALT_ROUTE + '/:id',
        Component: RealtPage
    },
]