// import { observable, action } from "mobx";
import { RootStore } from "./RootStore";

export class TestStore {
    constructor(public rootStore: RootStore) {}
}
