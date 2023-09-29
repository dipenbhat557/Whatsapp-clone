import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { chatReducer } from "./Chat/Reducer";
import { messageReducer } from "./Message/Reducer";

// Combine multiple reducers into a single rootReducer
const rootReducer = combineReducers({
  auth: authReducer, // Authentication related state
  chat: chatReducer, // Chat related state
  message: messageReducer, // Message related state
});

// Create the Redux store with the rootReducer and apply middleware (thunk in this case)
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
