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
    path: 'panel',
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
