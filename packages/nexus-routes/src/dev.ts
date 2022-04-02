import path from 'path';
import nexusRoutes from './index';

const rootPath = path.resolve(process.cwd(), './src/tests/fixtures');
const srcFolder = 'src';

nexusRoutes(rootPath, srcFolder);
