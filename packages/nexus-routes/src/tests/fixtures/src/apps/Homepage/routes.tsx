import React from 'react';
import type { RouteProps } from 'react-router';

import Homepage from './Homepage';

type TRoute = RouteProps & {
  outlet?: boolean;
  name: string;
};
const routes: TRoute[] = [
  {
    element: <Homepage />,
    index: true,
    name: 'homepage',
  },
];

export default routes;
