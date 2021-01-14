import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "mobx-react";
import App from "./components/App";
import { RootStore } from "./stores/RootStore";
import "./i18n/main";

const stores = {
    store: new RootStore(),
};

function render() {
    ReactDOM.render(
        <Provider {...stores}>
            <Router>
                <App />
            </Router>
        </Provider>,
        document.getElementById("root"),
    );
}

render();
