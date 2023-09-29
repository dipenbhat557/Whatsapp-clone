import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

// Initial state for the message store
const initialValue = {
  messages: null, // Holds an array of messages
  newMessage: null, // Holds data related to a newly created message
};

// Reducer function for handling message-related actions
export const messageReducer = (store = initialValue, { type, payload }) => {
  // Check the action type and update the store accordingly
  if (type === CREATE_NEW_MESSAGE) {
    return { ...store, newMessage: payload };
  } else if (type === GET_ALL_MESSAGE) {
    return { ...store, messages: payload };
  }
  // If the action type is not recognized, return the current store unchanged
  return store;
};
