import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

// Initial state for the chat store
const initialValue = {
  chats: [], // Holds an array of chat data
  createdGroup: null, // Holds data related to a created group chat
  createdChat: null, // Holds data related to a created single chat
};

// Reducer function for handling chat-related actions
export const chatReducer = (store = initialValue, { type, payload }) => {
  // Check the action type and update the store accordingly
  if (type === CREATE_CHAT) {
    return { ...store, createdChat: payload };
  } else if (type === CREATE_GROUP) {
    return { ...store, createdGroup: payload };
  } else if (type === GET_USERS_CHAT) {
    return { ...store, chats: payload };
  }
  // If the action type is not recognized, return the current store unchanged
  return store;
};
