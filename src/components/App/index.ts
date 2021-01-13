import { observer, inject } from "mobx-react";
import { RootStore } from "../../stores/RootStore";
import Component from "./Component";

export default inject((rootStore: { store: RootStore }) => {
    const { store } = rootStore;
    return {
        store,
    };
})(observer(Component));
