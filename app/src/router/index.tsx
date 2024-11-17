import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Home from '../pages';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';
import { useAuthStore } from '../store/auth.ts';
import { useCallback, useEffect } from 'react';
import { getFromLocalStorage } from '../utils/ls-utils.ts';

export const routes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
} as const;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!getFromLocalStorage('access_token'))
    return <Navigate to={routes.signIn} replace />;

  return children;
};

const Layout = () => {
  const { fetchUserProfile, signedIn } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      await fetchUserProfile();
      navigate(routes.home);
    } catch {
      if (
        ![routes.signIn.slice(1), routes.signUp.slice(1)].includes(
          location.pathname,
        )
      )
        navigate(routes.signIn);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [signedIn]);

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Wrap all routes in the Layout
    children: [
      {
        path: routes.home,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.signIn,
        element: <SignIn />,
      },
      {
        path: routes.signUp,
        element: <SignUp />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
