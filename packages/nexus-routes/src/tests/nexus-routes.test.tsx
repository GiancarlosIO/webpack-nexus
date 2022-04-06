import fs from 'fs/promises';
import path from 'path';
import {
  getrouteImportPaths,
  createGlobalRouteFile,
  validateRootRouteFile,
  checkIfFileExists,
} from '../utils';
import { addOutletToRoutes } from '../react-helpers';

import routesWithChildren from './fixtures/src/apps/UserDashboard/routes';
import routesWithoutChildren from './fixtures/src/apps/Homepage/routes';

const rootPath = path.resolve(__dirname, './fixtures');
const srcFolder = 'src';
const routeGlobalRouteFilePath = path.resolve(
  __dirname,
  './fixtures/src/nexus-routes.tsx',
);

describe('nexus-routes-loader', () => {
  it('should return the routes imports', async () => {
    const routeImportPaths = await getrouteImportPaths(rootPath, srcFolder);

    expect(routeImportPaths).toMatchInlineSnapshot(`
      Array [
        "./apps/Homepage/routes",
        "./apps/ProductDetail/routes",
        "./apps/UserDashboard/routes",
      ]
    `);
  });
  it('should create the global route file that imports all route configurations', async () => {
    const code = await createGlobalRouteFile(rootPath, srcFolder);

    expect(code).toMatchInlineSnapshot(`
      "/** =============================================
        AUTOGENERATED!!!!
        PLEASE DON\\"T MODIFY THIS FILE!!
        =============================================
        */

      import { Outlet, useRoutes } from 'react-router-dom';

      // This will contains the root Layout component
      import rootRoute from './rootRoute';
      import routeConfig1 from './apps/Homepage/routes';
      import routeConfig2 from './apps/ProductDetail/routes';
      import routeConfig3 from './apps/UserDashboard/routes';

      export const childrenRoutes = [
        ...routeConfig1,
        ...routeConfig2,
        ...routeConfig3,
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
      "
    `);
    await fs.unlink(routeGlobalRouteFilePath);
  });

  it('should append Outlet component if the current route contains a children property', () => {
    expect(addOutletToRoutes(routesWithChildren)).toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [
            Object {
              "element": <Sidebar />,
              "index": true,
              "name": "sideBar",
            },
            Object {
              "children": Array [
                Object {
                  "element": <MySubProducts />,
                  "name": "mySubProducts",
                  "path": ":productId",
                },
              ],
              "element": <React.Fragment>
                <MyProducts />
                 
                <Outlet />
              </React.Fragment>,
              "name": "myProducts",
              "path": "my-products",
            },
          ],
          "element": <React.Fragment>
            <UserDashboard />
             
            <Outlet />
          </React.Fragment>,
          "name": "userDashboard",
          "path": "panel",
        },
      ]
    `);
  });
  it('should not add Outlet component to element because the routes doesnt have a children property', () => {
    expect(addOutletToRoutes(routesWithoutChildren)).toMatchInlineSnapshot(`
      Array [
        Object {
          "element": <Homepage />,
          "index": true,
          "name": "homepage",
        },
      ]
    `);
  });
  describe('validateRootRouteFile', () => {
    it("should create the rootRoute.files if it doesn't exists", async () => {
      const expectedRootRouteFilePath = path.resolve(
        rootPath,
        srcFolder,
        'rootRoute.tsx',
      );

      expect(await checkIfFileExists(expectedRootRouteFilePath)).toBe(false);

      await validateRootRouteFile(rootPath, srcFolder);
      expect(await checkIfFileExists(expectedRootRouteFilePath)).toBe(true);
      // remove the file
      await fs.unlink(expectedRootRouteFilePath);
    });
    it('should not create/modify the rootRoute.tsx file if it already exists', async () => {
      const expectedRootRouteFilePath = path.resolve(
        rootPath,
        'src2',
        'rootRoute.tsx',
      );
      const initialContent = await fs.readFile(
        expectedRootRouteFilePath,
        'utf-8',
      );

      expect(await checkIfFileExists(expectedRootRouteFilePath)).toBe(true);

      await validateRootRouteFile(rootPath, 'src2');
      const finalCotent = await fs.readFile(expectedRootRouteFilePath, 'utf-8');

      // the content must not change
      expect(initialContent === finalCotent).toBe(true);
    });
  });
});