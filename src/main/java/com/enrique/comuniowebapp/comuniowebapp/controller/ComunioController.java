package com.enrique.comuniowebapp.comuniowebapp.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.enrique.comuniowebapp.comuniowebapp.dto.LoginRequest;
import com.enrique.comuniowebapp.comuniowebapp.dto.LoginResponse;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioAuthService;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioUserService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/api")
public class ComunioController {

    private final ComunioAuthService authService;
    private final ComunioUserService userService;

    public ComunioController(ComunioAuthService authService, ComunioUserService userService){
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login(@ModelAttribute LoginRequest request, @RequestParam(required=false) boolean rememberMe, Model model, HttpSession session){
        try{
            String token = authService.getToken(request.getUsername(), request.getPassword());
            UserInfo userInfo = userService.getUserInfo(token);


            //Guardamos userInfo con los datos para pasarlos a otros controladores por session
            session.setAttribute("userInfo", userInfo); 
            session.setAttribute("token", token);

            LoginResponse response = new LoginResponse();
            response.setToken(token);
            response.setUserId(userInfo.getId());
            response.setName(userInfo.getName());
            response.setFirstName(userInfo.getFirstName());
            response.setLastName(userInfo.getLastName());
            response.setTeamValue(userInfo.getTeamValue());
            response.setTeamCount(userInfo.getTeamCount());
            response.setTeamCountLinedUp(userInfo.getTeamCountLinedUp());
            response.setTactic(userInfo.getTactic());
            response.setEmail(userInfo.getEmail());
            response.setCommunityId(userInfo.getCommunityId());
            response.setCommunityName(userInfo.getCommunityName());

            return "redirect:/main";
        } catch (IllegalArgumentException e){
            model.addAttribute("error", e.getMessage());
            return "index";
        } catch (Exception e){
            model.addAttribute("error", "Usuario o Contraseña incorrectos");
            return "index";
        }
    }
}
