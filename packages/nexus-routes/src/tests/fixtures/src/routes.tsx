import React from 'react';
import type { RouteProps } from 'react-router';

import Layout from './Layout';

type TRoute = RouteProps & {
  outlet?: boolean;
  name: string;
};
const routes: TRoute[] = [
  {
    outlet: true,
    element: <Layout />,
    path: '/',
    name: 'root',
  },
];

export default routes;
