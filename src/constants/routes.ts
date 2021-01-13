import TestComponent from "../components/TestComponent/Component";
import { UserRoles } from "../types/main";

export const Routes = {
    Login: { url: "/login", authorizationRequired: false, component: TestComponent },
    Support: { url: "/support", component: TestComponent },
    Home: { url: "/", authorizationRequired: true, component: TestComponent },
    Demo: { url: "/demo", authorizationRequired: true, roles: [UserRoles.Trial], component: TestComponent },
    Full: { url: "/full", authorizationRequired: true, roles: [UserRoles.User], component: TestComponent },
};
