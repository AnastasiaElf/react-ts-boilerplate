import React from "react";
import { observer, inject } from "mobx-react";
import { RootStore } from "../../stores/RootStore";
import Component, { IRoutesManagerProps } from "./Component";

const storesToProps = (rootStore: { store: RootStore }) => {
    const { store } = rootStore;
    const { isAuthorized, userRole } = store.testStore;

    return {
        isAuthorized,
        userRole,
    };
};

export type TInjectedProps = ReturnType<typeof storesToProps>;
export default (inject(storesToProps)(observer(Component)) as any) as React.FC<IRoutesManagerProps>;
