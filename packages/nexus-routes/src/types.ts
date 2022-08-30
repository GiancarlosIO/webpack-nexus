import type { RouteObject } from 'react-router';

export type TRoute = Omit<RouteObject, 'children'> & {
  name: string;
  children?: [TRoute, ...TRoute[]];
};

export type TRoutes = [TRoute, ...TRoute[]];
