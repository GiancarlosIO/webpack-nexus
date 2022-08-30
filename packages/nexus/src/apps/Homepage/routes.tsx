import type { TRoutes } from 'nexus-routes';

import { Homepage } from './Homepage';

const routes: TRoutes = [
  {
    name: 'homepage',
    index: true,
    element: <Homepage />,
  },
];

export default routes;
