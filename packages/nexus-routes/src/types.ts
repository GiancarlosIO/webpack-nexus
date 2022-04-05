import type { RouteObject } from 'react-router';

export type TRoute = RouteObject & {
  name: string;
  children?: TRoute[];
};

export type TRoutes = [TRoute, ...TRoute[]];
