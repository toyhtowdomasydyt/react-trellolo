import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import "./index.css";
import App from "./components/App/App";
import index from "./redux/store";

ReactDOM.render(
    <Provider store={index}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
