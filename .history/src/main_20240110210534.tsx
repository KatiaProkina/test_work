import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "../node_modules/@reduxjs/toolkit/dist/configureStore";
import App from "./App";
import { githubApi } from "./gitHubApiSlice";
import { Provider } from "../node_modules/react-redux/dist/react-redux";

const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
