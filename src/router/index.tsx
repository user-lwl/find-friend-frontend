import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../pages/error/NotFound';
import HomePage from '../pages/HomePage';
import Login from '../pages/user/Login';
import Profile from '../pages/user/Profile';
import Register from '../pages/user/Register';

const router = createBrowserRouter([{
    path: "/",
    element: <HomePage />
}, {
    path: "/register",
    element: <Register />
}, {
    path: "/login",
    element: <Login />
}, {
    path: "/profile",
    element: <Profile />
}, {
    path: "*",
    element: <NotFound />
}])

export default router;