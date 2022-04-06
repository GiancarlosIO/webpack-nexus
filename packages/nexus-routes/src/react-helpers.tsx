import { Outlet } from 'react-router-dom';
import type { TRoutes } from './types';

export function addOutletToRoutes(routes: TRoutes) {
  routes.forEach((route) => {
    if (route.children) {
      if (route.element) {
        route.element = (
          <>
            {route.element} <Outlet />
          </>
        );
      }
      route.children = addOutletToRoutes(route.children);
    }
  });

  return routes;
}
