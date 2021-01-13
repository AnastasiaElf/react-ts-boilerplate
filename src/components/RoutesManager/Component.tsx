import React, { useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import { Routes } from "../../constants/routes";
import AppLayout from "../AppLayout";
import "./styles.scss";
import { TInjectedProps } from ".";

export interface IRoutesManagerProps {
    children?: any;
}
type TRoutesManagerProps = TInjectedProps & IRoutesManagerProps;

const RoutesManager: React.FC<TRoutesManagerProps> = (props) => {
    const { isAuthorized, userRole } = props;

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
                {/* TODO: Add page not found */}
                {/* TODO: Add redirect from home to "/" empty route */}
            </Switch>
        </div>
    );
};

export default RoutesManager;
