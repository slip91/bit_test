import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { mapReducer } from "./map/reducers";

const rootReducer = combineReducers({
    map: mapReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    // const middlewares = [thunkMiddleware];
    // const middleWareEnhancer = applyMiddleware(...middlewares);
    const store = createStore(
        rootReducer,
        composeWithDevTools(),
    );

    return store;
}
