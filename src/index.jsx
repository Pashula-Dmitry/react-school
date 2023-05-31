import React from 'react';
import './styles/styles.scss';
import './styles/_reset.scss';
import App from './core/App.jsx';
import Storage from 'core/services/back-end/Storage';
import { BrowserRouter } from 'react-router-dom';


import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript



(async () => {
  await Storage.createObjectStore(['albums', 'videos']);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
})();


