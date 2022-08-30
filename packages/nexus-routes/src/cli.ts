import minimist from 'minimist';
import { nexusRoutes } from './index';

const argv = minimist<{ src: string }>(process.argv.slice(2), {
  string: ['src'],
});

const srcFolderName = argv.src || 'src';

nexusRoutes(process.cwd(), srcFolderName);
