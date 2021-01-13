// import { observable, action } from "mobx";
import { TestStore } from "./TestStore";

export class RootStore {
    testStore: TestStore = new TestStore(this);
}
