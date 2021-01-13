// import { observable, action } from "mobx";
import { UserRoles } from "../types/main";
import { RootStore } from "./RootStore";

export class TestStore {
    isAuthorized = true;
    userRole = UserRoles.User;

    constructor(public rootStore: RootStore) {}
}
