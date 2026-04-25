import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { Providers } from './providers';

import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find #root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
