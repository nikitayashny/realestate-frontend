import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import RealtPage from "./pages/RealtPage"
import UserPage from "./pages/UserPage"
import FavoritePage from "./pages/FavoritePage"
import Admin from "./pages/Admin"
import NewsPage from "./pages/NewsPage"
import Chat from "./pages/Chat"
import SuccessPayment from "./pages/SuccessPayment"
import CancelPayment from "./pages/CancelPayment"

import { REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE, PROFILE_ROUTE, REALT_ROUTE, USER_ROUTE, FAVORITE_ROUTE, ADMIN_ROUTE, NEWS_ROUTE, CHAT_ROUTE, SUCCESS_ROUTE, CANCEL_ROUTE} from "./utils/consts"

export const authRoutes = [
    {
        path: FAVORITE_ROUTE,
        Component: FavoritePage
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: CHAT_ROUTE,
        Component: Chat
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
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
    {
        path: USER_ROUTE + '/:id',
        Component: UserPage
    },
    {
        path: NEWS_ROUTE,
        Component: NewsPage
    },
    {
        path: SUCCESS_ROUTE,
        Component: SuccessPayment
    },
    {
        path: CANCEL_ROUTE,
        Component: CancelPayment
    }
]