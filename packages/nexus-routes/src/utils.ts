import fs from 'fs/promises';
import path from 'path';
import klaw from 'klaw';
import ora from 'ora';

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
  const indexRoutePath = './routes';
  const srcPath = path.resolve(rootPath, srcFolderPath);

  const routes = [indexRoutePath];

  // eslint-disable-next-line no-restricted-syntax
  for await (const file of klaw(path.resolve(srcPath, 'apps'))) {
    if (file.stats.isFile() && file.path.includes('routes.tsx')) {
      const routeImportPath = `.${file.path
        .replace(srcPath, '')
        .replace('.tsx', '')}`;

      routes.push(routeImportPath);
    }
  }

  return routes;
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
    text: '> building the nexus-route file',
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
${routes
  .map((route) => `import ${route.variableName} from '${route.importPath}';`)
  .join('\n')}

const routes = [
  ${routes
    .map((r, index) => `${index > 0 ? '  ' : ''}...${r.variableName},`)
    .join('\n')}
];

export default routes;
`;

  await fs.writeFile(
    path.resolve(rootPath, srcFolderPath, 'nexus-routes.tsx'),
    code,
    'utf-8',
  );
  spinner.succeed('Success to build the nexus-route.tsx file');

  return code;
}

export function isRouteConfigFile(filename: string) {
  return filename.split('/').slice(-1)[0] === 'routes.tsx';
}
