import path from 'path';
import chokidar from 'chokidar';
import minimist from 'minimist';

import { isRouteConfigFile, createGlobalRouteFile } from './utils';

const argv = minimist<{ debug: boolean }>(process.argv.slice(2), {
  boolean: ['debug'],
});

function log(...value: Parameters<typeof console.log>) {
  if (argv.debug) {
    console.log(...value);
  }
}

/**
 *
 * @param rootPath Path of the project root
 * @param srcFolderPath Relative folder path where the source code lives
 */
async function main(rootPath: string, srcFolderPath: string) {
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

export default main;
