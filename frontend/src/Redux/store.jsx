import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { chatReducer } from "./Chat/Reducer";
import { messageReducer } from "./Message/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  message: messageReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
