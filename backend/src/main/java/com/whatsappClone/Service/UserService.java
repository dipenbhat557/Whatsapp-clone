package com.whatsappClone.Service;

import java.util.List;

import com.whatsappClone.Exception.UserException;
import com.whatsappClone.Model.User;
import com.whatsappClone.Payload.UpdateUserRequest;

public interface UserService {

    public User findUserById(Integer id) throws UserException;

    public User findUserProfile(String jwt) throws UserException;

    public User updateUser(Integer userId, UpdateUserRequest req) throws UserException;

    public List<User> searchUser(String query);
}
