import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import router from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
