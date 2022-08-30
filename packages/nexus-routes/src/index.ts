import path from 'path';
import chokidar from 'chokidar';

import {
  isRouteConfigFile,
  createGlobalRouteFile,
  validateRootRouteFile,
} from './utils';

/**
 *
 * @param rootPath Path of the project root
 * @param srcFolderPath Relative folder path where the source code lives
 */
export async function nexusRoutes(
  rootPath: string,
  srcFolderPath: string,
  debug?: boolean,
) {
  let rootFileValidated = false;

  if (!rootFileValidated) {
    await validateRootRouteFile(rootPath, srcFolderPath);
    rootFileValidated = true;
  }

  function log(...value: Parameters<typeof console.log>) {
    if (debug) {
      console.log(...value);
    }
  }

  // create the nexus-routes.tsx file before to watch files
  createGlobalRouteFile(rootPath, srcFolderPath);
  const watcher = chokidar.watch(path.resolve(rootPath, srcFolderPath), {
    ignoreInitial: true,
  });

  const handler =
    ({
      event,
    }: {
      event: 'ready' | 'change' | 'add' | 'unlink' | 'unlinkDir';
    }) =>
    (filename?: string) => {
      log({ event });
      if (filename) {
        if (isRouteConfigFile(filename)) {
          // re-create the nexus-routes.tsx if there are changes in any routes.tsx file
          createGlobalRouteFile(rootPath, srcFolderPath);
          log({ filename });
        }
      }
    };

  watcher
    .on('ready', handler({ event: 'ready' }))
    .on('change', handler({ event: 'change' }))
    .on('add', handler({ event: 'add' }))
    .on('unlink', handler({ event: 'unlink' }))
    .on('unlinkDir', handler({ event: 'unlinkDir' }));
}

export * from './types';
export * from './utils';
