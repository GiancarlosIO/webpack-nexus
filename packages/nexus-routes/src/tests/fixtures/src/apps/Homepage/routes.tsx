import React from 'react';
import type { TRoutes } from '../../../../../types';

import Homepage from './Homepage';

const routes: TRoutes = [
  {
    element: <Homepage />,
    index: true,
    name: 'homepage',
  },
];

export default routes;
