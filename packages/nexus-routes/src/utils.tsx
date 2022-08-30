import fs from 'fs/promises';
import path from 'path';
import klaw from 'klaw';
import ora from 'ora';
import chalk from 'chalk';
import slash from 'slash';

const { log } = console;

const textLogger = (text: string) =>
  `${chalk.blue.bold('nexus-routes')}: ${text}`;
const ROOT_ROUTE_FILE = 'rootRoute.tsx';
/**
 * The root path of the web project
 * */

type TRootPath = string;
/**
 * The name of the folder where the source files lives
 */
type TSrcFolder = string;

/**
 *
 * @param rootPath Path of the project root
 * @param srcFolderPath Relative folder path where the source code lives
 */
export async function getrouteImportPaths(
  rootPath: TRootPath,
  srcFolderPath: TSrcFolder,
) {
  const spinner = ora({
    text: textLogger('analyzing routes.tsx files...'),
    spinner: 'aesthetic',
  }).start();
  const srcPath = path.resolve(rootPath, srcFolderPath);

  const routes = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const file of klaw(path.resolve(srcPath, 'apps'))) {
    if (file.stats.isFile() && file.path.includes('routes.tsx')) {
      const routeImportPath = `.${slash(file.path)
        .replace(slash(srcPath), '')
        .replace('.tsx', '')}`;

      routes.push(routeImportPath);
    }
  }

  spinner.succeed(
    textLogger('Finish to recollect information from routes.tsx files.'),
  );

  return routes;
}

export async function checkIfFileExists(filepath: string) {
  // it will thrown an error if the file doesn't exists
  try {
    await fs.access(filepath);
    // file exists
    return true;
  } catch (e) {
    // the file doesn't exists
    return false;
  }
}

/**
 * It will return true if the file was created, otherwise, it will return false
 */
export async function validateRootRouteFile(
  rootPath: TRootPath,
  srcFolderPath: TSrcFolder,
) {
  const spinner = ora({
    text: textLogger(`Validating the ${srcFolderPath}/rootRoute.tsx file...`),
    spinner: 'aesthetic',
  }).start();
  const filePath = path.resolve(rootPath, srcFolderPath, ROOT_ROUTE_FILE);
  const fileExists = await checkIfFileExists(filePath);

  if (!fileExists) {
    // the file doesn't exists, create it
    const code = `import type { TRoute } from 'nexus-routes';

import GlobalLayout from './GlobalLayout';

const routes: TRoute = {
  name: 'layout',
  element: <GlobalLayout />,
  path: '/',
};

export default routes;`;

    await fs.writeFile(filePath, code, 'utf-8');
    spinner.succeed(
      textLogger(
        `The rootRoute.tsx was created because it was missing in the ${srcFolderPath}/ folder.`,
      ),
    );
    return;
  }

  spinner.succeed(
    textLogger(`Finish to validate the ${srcFolderPath}/rootRoute.tsx file.`),
  );
}

/**
 *
 * @param rootPath Path of the project root
 * @param srcFolderPath Relative folder path where the source code lives
 */
export async function createGlobalRouteFile(
  rootPath: TRootPath,
  srcFolderPath: TSrcFolder,
) {
  const spinner = ora({
    text: textLogger('building the nexus-route file'),
    spinner: 'aesthetic',
  }).start();
  const routeImportPaths = await getrouteImportPaths(rootPath, srcFolderPath);

  const head = `/** =============================================
  AUTOGENERATED!!!!
  PLEASE DON"T MODIFY THIS FILE!!
  =============================================
  */
`;
  const routes = routeImportPaths.map((importPath, index) => ({
    importPath,
    variableName: `routeConfig${index + 1}`,
  }));
  const code = `${head}
import { addOutletToRoutes } from 'nexus-routes/react-helpers';
import { Outlet, useRoutes } from 'react-router-dom';

// This will contains the root Layout component
import rootRoute from './rootRoute';
${routes
  .map((route) => `import ${route.variableName} from '${route.importPath}';`)
  .join('\n')}

export const childrenRoutes = [
  ${routes
    .map(
      (r, index) =>
        `${index > 0 ? '  ' : ''}...addOutletToRoutes(${r.variableName}),`,
    )
    .join('\n')}
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
`;

  try {
    await fs.writeFile(
      path.resolve(rootPath, srcFolderPath, 'nexus-routes.tsx'),
      code,
      'utf-8',
    );
  } catch (e) {
    log(
      chalk.red.bold('> nexus-routes: Error to create the nexus-routes file.'),
    );
    console.error(e);
  }

  spinner.succeed(textLogger('Success to build the nexus-route.tsx file'));

  return code;
}

export function isRouteConfigFile(filename: string) {
  return path.basename(filename) === 'routes.tsx';
}
