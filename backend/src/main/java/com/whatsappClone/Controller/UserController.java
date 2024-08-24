package com.whatsappClone.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatsappClone.Exception.UserException;
import com.whatsappClone.Model.User;
import com.whatsappClone.Payload.ApiResponse;
import com.whatsappClone.Payload.UpdateUserRequest;
import com.whatsappClone.ServiceImpl.UserServiceImpl;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token)
            throws UserException {

        User user = this.userService.findUserProfile(token);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("/{query}")
    public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String query) {

        List<User> users = this.userService.searchUser(query);
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest request,
            @RequestHeader("Authorization") String token) throws UserException {

        User user = this.userService.findUserProfile(token);
        this.userService.updateUser(user.getId(), request);

        ApiResponse response = new ApiResponse();
        response.setMessage("User updated Successfully");
        response.setStatus(true);

        return new ResponseEntity<ApiResponse>(response, HttpStatus.ACCEPTED);
    }

}
