import { BASE_API_URL } from "../../config/api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType.js";

// Action creator for creating a new message
export const createMessage = (messageData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/messages/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${messageData.token}`,
      },
      body: JSON.stringify(messageData.data),
    });

    const data = await res.json();
    console.log("create message ", data);

    // Dispatch an action with the created message data
    dispatch({ type: CREATE_NEW_MESSAGE, payload: data });
  } catch (error) {
    console.log("catch error ", error);
  }
};

// Action creator for getting all messages for a chat
export const getAllMessages = (reqData) => async (dispatch) => {
  console.log("Came inside get all messages");

  try {
    const res = await fetch(`${BASE_API_URL}/api/messages/${reqData.chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reqData.token}`,
      },
    });

    const data = await res.json();
    console.log("get all messages from action method", data);

    // Dispatch an action with the fetched messages data
    dispatch({ type: GET_ALL_MESSAGE, payload: data });
  } catch (error) {
    console.log("catch error ", error);
  }
};
