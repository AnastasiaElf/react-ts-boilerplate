import React from "react";
import "./styles.scss";

import { RootStore } from "../../stores/RootStore";
import RoutesManager from "../RoutesManager";

const App: React.FC = () => (
    <div className="app">
        <RoutesManager />
        {/* TODO: Request Status (fetching, error, success) */}
        {/* TODO: Modals dialogs */}
    </div>
);

App.defaultProps = {
    store: {} as RootStore,
};

export default App;
