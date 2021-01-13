import React, { useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import { Routes } from "../../constants/routes";
import { UserRoles } from "../../types/main";
import AppLayout from "../AppLayout";
import "./styles.scss";

interface IRoutesManagerProps {
    children?: any;
}

const RoutesManager: React.FC<IRoutesManagerProps> = () => {
    // TODO: remove hardcoded values
    const isAuthorized = true;
    const userRole = UserRoles.User;

    const renderRoute = useCallback((data) => {
        const { authorizationRequired, component: Component } = data;

        if (authorizationRequired) {
            return (
                <AppLayout>
                    <Component />
                </AppLayout>
            );
        }
        return <Component />;
    }, []);

    return (
        <div>
            <Switch>
                {Object.keys(Routes).map((key) => {
                    const data = Routes[key];
                    const { authorizationRequired, roles, url } = data;

                    if (
                        authorizationRequired === undefined ||
                        (authorizationRequired === false && !isAuthorized) ||
                        (authorizationRequired && isAuthorized && (!roles || (roles && roles.includes(userRole))))
                    ) {
                        return <Route key={key} path={url} exact render={() => renderRoute(data)} />;
                    }
                    return null;
                })}
                {/* Add page not found */}
                {/* Add redirect from home to "/" empty route */}
            </Switch>
        </div>
    );
};

export default RoutesManager;
