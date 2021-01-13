import React from "react";
import "./styles.scss";

import { RootStore } from "../../stores/RootStore";
import RoutesManager from "../RoutesManager";

interface IAppProps {
    store?: RootStore;
    children?: any;
}

const App: React.FC<IAppProps> = () => (
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
