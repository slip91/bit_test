import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk, { ThunkMiddleware } from "redux-thunk";
import {ActionType} from "typesafe-actions";
import * as orderActions from "./order/actions";
import {RootActions} from "./order/types";
import orderReducer from "./order/reducer";

const rootReducer = combineReducers({
    order: orderReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const store = createStore(
        rootReducer,
        applyMiddleware(ReduxThunk as ThunkMiddleware<AppState, RootActions>),
    );

    return store;
}
