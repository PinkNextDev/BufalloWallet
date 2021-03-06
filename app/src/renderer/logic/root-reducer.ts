
import { combineReducers } from "redux";

import auth from "./auth/reducer";
import settings from "./settings/reducer";


export interface AppState {

    readonly auth: typeof auth.initialState;
    readonly settings: typeof settings.initialState;
}

const rootReducer = combineReducers({

    auth: auth.reducer,
    settings: settings.reducer
});

export default rootReducer;
