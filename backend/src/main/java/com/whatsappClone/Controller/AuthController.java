package com.whatsappClone.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatsappClone.Exception.UserException;
import com.whatsappClone.Model.User;
import com.whatsappClone.Payload.AuthResponse;
import com.whatsappClone.Payload.LoginRequest;
import com.whatsappClone.Repository.UserRepository;
import com.whatsappClone.config.CustomUserService;
import com.whatsappClone.config.TokenProvider;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserService customUserService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String name = user.getName();
        String password = user.getPassword();

        User isUser = this.userRepository.findByEmail(email);
        if (isUser != null) {
            throw new UserException("Email is userd with another account");
        }
        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setName(name);
        // createdUser.setPassword(this.passwordEncoder.encode(password));
        createdUser.setPassword(password);

        userRepository.save(createdUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = this.tokenProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse(jwt, true);

        return new ResponseEntity<AuthResponse>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest request) {

        String email = request.getEmail();
        String password = request.getPassword();
        System.out.println(email);
        System.out.println(password);

        Authentication authentication = this.authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = this.tokenProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse(jwt, true);

        return new ResponseEntity<AuthResponse>(response, HttpStatus.ACCEPTED);

    }

    public Authentication authenticate(String username, String password) {
        UserDetails userDetails = this.customUserService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        System.out.println(password);
        System.out.println(userDetails.getPassword());
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password or username");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
