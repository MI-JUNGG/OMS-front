import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./modules/store.js";
import Router from "./Router.jsx"; // Import the Router component from its module
import "./assets/fonts/Font.scss";
import "/src/styles/common.scss";

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Router />
    </Provider>,
);
