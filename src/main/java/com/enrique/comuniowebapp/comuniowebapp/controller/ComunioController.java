package com.enrique.comuniowebapp.comuniowebapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enrique.comuniowebapp.comuniowebapp.dto.LoginRequest;
import com.enrique.comuniowebapp.comuniowebapp.dto.LoginResponse;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioAuthService;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioUserService;

@RestController
@RequestMapping("/api")
public class ComunioController {

    private final ComunioAuthService authService;
    private final ComunioUserService userService;

    public ComunioController(ComunioAuthService authService, ComunioUserService userService){
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        String token = authService.getToken(request.getUsername(), request.getPassword());
        UserInfo userInfo = userService.getUserInfo(token);

        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setUserId(userInfo.getId());
        response.setCommunityId(userInfo.getCommunityId());

        return ResponseEntity.ok(response);
    }

}
