import React from "react";
import * as serviceWorker from "./serviceWorker";
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

serviceWorker.unregister();
