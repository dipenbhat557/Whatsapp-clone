import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/Reducer";

const rootReducer = combineReducers({ auth: authReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
