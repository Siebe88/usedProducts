import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('../Root'),
    children: [
      {
        lazy: () => import('./SearchProduct/SearchProduct'),
        index: true,
      },
    ],
  },
]);
