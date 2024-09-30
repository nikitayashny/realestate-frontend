//import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
//import Basket from "./pages/Basket"
//import ProductPage from "./pages/ProductPage"
import Home from "./pages/Home"
import {LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "./utils/consts"

export const authRoutes = [
    // {
    //     path: BASKET_ROUTE,
    //     Component: Basket
    // },
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
    // {
    //     path: PRODUCT_ROUTE + '/:id',
    //     Component: ProductPage
    // },
]