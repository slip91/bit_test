import * as React from "react";
import {render} from "react-dom";
import App from "./components/App";
import {Provider} from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

const rootEl = document.getElementById("root");
render(
    <Provider store={store()}>
        <App/>
    </Provider>,
    rootEl,
);
