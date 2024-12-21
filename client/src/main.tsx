import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { store, persistor } from "./stores/store.ts";
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import "./scss/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <App />
        {/* </PersistGate> */}
      {/* </Provider> */}
    </BrowserRouter>
  </StrictMode>,
)