import { BASE_API_URL } from "../../config/api";
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

// Action creator for creating a single chat
export const createChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/chats/single`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
      body: JSON.stringify(chatData.data),
    });

    const data = await res.json();
    console.log("create chat ", data);

    // Dispatch an action with the created chat data
    dispatch({ type: CREATE_CHAT, payload: data });
  } catch (error) {
    console.log("catch error ", error);
  }
};

// Action creator for creating a group chat
export const createGroupChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/chats/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
      body: JSON.stringify(chatData.group),
    });

    const data = await res.json();
    console.log("create group chat ", data);

    // Dispatch an action with the created group chat data
    dispatch({ type: CREATE_GROUP, payload: data });
  } catch (error) {
    console.log("catch error ", error);
  }
};

// Action creator for getting users in a chat
export const getUsersChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/chats/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
    });

    const data = await res.json();
    console.log("get users chat ", data);

    // Dispatch an action with the fetched user chat data
    dispatch({ type: GET_USERS_CHAT, payload: data });
  } catch (error) {
    console.log("catch error ", error);
  }
};
