import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { TodoContexProvider } from './components/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoContexProvider>
    <App />
  </TodoContexProvider>,
);
