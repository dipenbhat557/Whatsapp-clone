package com.whatsappClone.Service;

import java.util.List;

import com.whatsappClone.Exception.ChatException;
import com.whatsappClone.Exception.UserException;
import com.whatsappClone.Model.Chat;
import com.whatsappClone.Model.User;
import com.whatsappClone.Payload.GroupChatRequest;

public interface ChatService {

    public Chat createChat(User reqUser, Integer userId) throws UserException;

    public Chat findChatById(Integer chatId) throws ChatException;

    public List<Chat> findAllChatByUserId(Integer userId) throws UserException;

    public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException;

    public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException;

    public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException;

    public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException;

    public void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException;

}
