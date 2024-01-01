import { KeycloakProfile } from "keycloak-js";

export interface AppState {
    isLoading: boolean;
    userState: UserState;
}

export interface UserState {
    logedIn: boolean;
    roles: string[];
    profile?: KeycloakProfile | null;
}

export const initState: AppState = {
    isLoading: false,
    userState: {
        logedIn: false,
        roles: []
    }
}