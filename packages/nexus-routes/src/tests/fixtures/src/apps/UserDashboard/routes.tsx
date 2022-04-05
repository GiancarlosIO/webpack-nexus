import React from 'react';

import UserDashboard from './UserDashboard';
import Sidebar from './Sidebar';
import MyProducts, { MySubProducts } from './MyProducts';

import type { TRoutes } from '../../../../../types';

const routes: TRoutes = [
  {
    element: <UserDashboard />,
    path: 'panel',
    name: 'userDashboard',
    children: [
      {
        element: <Sidebar />,
        index: true,
        name: 'sideBar',
      },
      {
        element: <MyProducts />,
        path: 'my-products',
        name: 'myProducts',
        children: [
          {
            name: 'mySubProducts',
            element: <MySubProducts />,
            path: ':productId',
          },
        ],
      },
    ],
  },
];

export default routes;
