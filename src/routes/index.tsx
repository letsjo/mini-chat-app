import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { authLoader } from './loaders/authLoader';

import EnsureAuthenticated from '@/components/_public/EnsureAuthenticated';
import ChatLayout from '@/pages/ChatLayout';
import Login from '@/pages/Login';
import MainLayout from '@/pages/MainLayout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
    loader: authLoader,
  },
  {
    path: '/chat',
    element: (
      <EnsureAuthenticated fallback={<Login />}>
        <MainLayout />
      </EnsureAuthenticated>
    ),
    children: [{ path: '/chat/:roomName', element: <ChatLayout /> }],
  },
];

const router = createBrowserRouter(routes);

export default function PageRouter() {
  return <RouterProvider router={router} />;
}
