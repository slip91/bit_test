import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "./components/App";
import store from "./store";

const rootEl = document.getElementById("root");
render(
    <Provider store={store()}>
        <App/>
    </Provider>,
    rootEl,
);
