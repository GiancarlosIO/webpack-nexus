import type { TRoute } from 'nexus-routes';

import GlobalLayout from './GlobalLayout';

const routes: TRoute = {
  name: 'layout',
  element: <GlobalLayout />,
  path: '/',
};

export default routes;
