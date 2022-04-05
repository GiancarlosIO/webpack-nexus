import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Root from './Root';

const container = document.getElementById('app') as HTMLDivElement;

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
);
