import React from "react";
import "./styles.scss";

import RoutesManager from "../RoutesManager";

const App: React.FC = () => (
    <div className="app">
        <RoutesManager />
        {/* TODO: Request Status (fetching, error, success) */}
        {/* TODO: Modals dialogs */}
    </div>
);

export default App;
