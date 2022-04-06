/** =============================================
  AUTOGENERATED!!!!
  PLEASE DON"T MODIFY THIS FILE!!
  =============================================
  */

import { Outlet, useRoutes } from 'react-router-dom';

// This will contains the root Layout component
import rootRoute from './rootRoute';
import routeConfig1 from './apps/Homepage/routes';
import routeConfig2 from './apps/UserDashboard/routes';

export const childrenRoutes = [
  ...routeConfig1,
  ...routeConfig2,
];

export const appRoutes = [
  {
    ...rootRoute,
    element: (
      <>
        {rootRoute.element}
        <Outlet />
      </>
    ),
    children: childrenRoutes,
  },
];

/**
 * Use this in the root of your application. Eg:
 * import { RouteElements } from './nexus-routes';
 * ...
 *
 * const Root = () => (
 *  <BrowserRouter>
 *    <RouteElements />
 *  </BrowserRouter>
 * )
 *
 */
export const RoutesElements = () => {
  const elements = useRoutes(appRoutes);

  return elements;
};
