import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {reduxSetup} from "./Components/widgets/Redux/ReduxSetup.ts";
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={reduxSetup}>
          <App />
      </Provider>
  </StrictMode>,
)
