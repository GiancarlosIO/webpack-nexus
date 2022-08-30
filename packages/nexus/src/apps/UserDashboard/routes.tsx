/* eslint-disable import/no-unresolved */
import type { TRoutes } from 'nexus-routes';
import {
  UserDashboard,
  MyProducts,
  MyInvoices,
  Sidebard,
} from './UserDashbord';

const routes: TRoutes = [
  {
    name: 'rootUserDashboard',
    path: 'userDashboard',
    element: <Sidebard />,
    children: [
      {
        name: 'userDashboard',
        index: true,
        element: <UserDashboard />,
      },
      {
        name: 'myProducts',
        path: 'my-products',
        element: <MyProducts />,
        children: [
          {
            path: ':productId',
            element: <div>product ID</div>,
            name: 'productDetail',
          },
        ],
      },
      {
        name: 'myInvoices',
        path: 'my-invoices',
        element: <MyInvoices />,
      },
    ],
  },
];

export default routes;
