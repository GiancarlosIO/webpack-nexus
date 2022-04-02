import React from 'react';
import type { RouteObject } from 'react-router';

import UserDashboard from './UserDashboard';
import Sidebar from './Sidebar';
import MyProducts from './MyProducts';

type TRoute = RouteObject & {
  name: string;
  children?: TRoute[];
};

const routes: TRoute[] = [
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
        outlet: false,
      },
    ],
  },
];

export default routes;
