import React from 'react';
import type { RouteProps } from 'react-router';

import ProductDetail from './ProductDetail';

type TRoute = RouteProps & {
  outlet?: boolean;
  name: string;
};
const routes: TRoute[] = [
  {
    outlet: true,
    element: <ProductDetail />,
    path: 'products/:category/:productSlug',
    name: 'productDetail',
  },
];

export default routes;
