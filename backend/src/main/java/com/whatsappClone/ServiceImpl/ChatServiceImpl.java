package com.whatsappClone.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.whatsappClone.Exception.ChatException;
import com.whatsappClone.Exception.UserException;
import com.whatsappClone.Model.Chat;
import com.whatsappClone.Model.User;
import com.whatsappClone.Payload.GroupChatRequest;
import com.whatsappClone.Repository.ChatRepository;
import com.whatsappClone.Service.ChatService;
import com.whatsappClone.Service.UserService;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Chat createChat(User reqUser, Integer userId) throws UserException {

        User user = this.userService.findUserById(userId);

        Chat isChatExist = this.chatRepository.findSingleChatByUserIds(user, reqUser);

        System.out.println(isChatExist);
        if (isChatExist != null) {
            return isChatExist;
        }

        Chat chat = new Chat();
        chat.setCreatedBy(reqUser);
        chat.getUsers().add(user);
        chat.getUsers().add(reqUser);
        chat.setGroup(false);

        chat = this.chatRepository.save(chat);

        return chat;
    }

    @Override
    public Chat findChatById(Integer chatId) throws ChatException {
        return this.chatRepository.findById(chatId)
                .orElseThrow(() -> new ChatException("The requested chat is not found"));
    }

    @Override
    public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
        User user = this.userService.findUserById(userId);

        List<Chat> chats = this.chatRepository.findChatByUserId(user.getId());

        return chats;
    }

    @Override
    public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException {
        Chat group = new Chat();
        group.setGroup(true);
        group.setChatImage(req.getChatImage());
        group.setChatName(req.getChatName());
        group.setCreatedBy(reqUser);
        group.getAdmins().add(reqUser);

        for (Integer userId : req.getUserIds()) {
            User user = this.userService.findUserById(userId);
            group.getUsers().add(user);
        }

        group = this.chatRepository.save(group);
        return group;
    }

    @Override
    public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {
        Chat chat = this.chatRepository.findById(chatId)
                .orElseThrow(() -> new ChatException("The expected chat is not found"));

        User user = this.userService.findUserById(userId);

        if (chat.getAdmins().contains((reqUser))) {
            chat.getUsers().add(user);
            return chat;
        } else {
            throw new UserException("You have not access to add user");
        }
    }

    @Override
    public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException {
        Chat chat = this.chatRepository.findById(chatId)
                .orElseThrow(() -> new ChatException("The expected chat is not found"));

        if (chat.getUsers().contains(reqUser)) {
            chat.setChatName(groupName);
            return this.chatRepository.save(chat);
        } else {
            throw new UserException("YOu are not the user");
        }
    }

    @Override
    public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
        Chat chat = this.chatRepository.findById(chatId)
                .orElseThrow(() -> new ChatException("The expected chat is not found"));

        User user = this.userService.findUserById(userId);

        if (chat.getAdmins().contains((reqUser))) {
            chat.getUsers().remove(user);
            return chat;
        } else if (chat.getUsers().contains(reqUser)) {
            if (user.getId() == reqUser.getId()) {
                chat.getUsers().remove(user);
                return this.chatRepository.save(chat);
            }

        }
        throw new UserException("You have not access to remove user");

    }

    @Override
    public void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException {
        Chat chat = this.chatRepository.findById(chatId)
                .orElseThrow(() -> new ChatException("The expected chat is not found while deleteing"));
        this.chatRepository.delete(chat);
    }

}
