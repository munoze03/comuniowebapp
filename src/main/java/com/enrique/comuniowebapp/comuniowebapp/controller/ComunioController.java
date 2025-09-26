package com.enrique.comuniowebapp.comuniowebapp.controller;


import java.time.Instant;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.enrique.comuniowebapp.comuniowebapp.dto.LoginRequest;
import com.enrique.comuniowebapp.comuniowebapp.dto.LoginResponse;
import com.enrique.comuniowebapp.comuniowebapp.dto.TokenResponse;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.AuthService;
import com.enrique.comuniowebapp.comuniowebapp.service.MainService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/api")
public class ComunioController {

    private final AuthService authService;
    private final MainService userService;

    public ComunioController(AuthService authService, MainService userService){
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping("/login")
    public String loginForm() {
        return "index"; 
    }

    @PostMapping("/login")
    public String login(@ModelAttribute LoginRequest request, 
        @RequestParam(required=false) boolean rememberMe, 
        Model model, 
        HttpSession session, 
        RedirectAttributes redirectAttributes){
        try{
            TokenResponse tokenResponse = authService.getToken(request.getUsername(), request.getPassword());
            UserInfo userInfo = userService.getUserInfo(tokenResponse.getAccessToken());



            //Guardamos userInfo con los datos para pasarlos a otros controladores por session
            session.setAttribute("userInfo", userInfo); 
            session.setAttribute("token", tokenResponse.getAccessToken());
            session.setAttribute("refreshToken", tokenResponse.getRefreshToken());
            session.setAttribute("tokenExpiry", Instant.now().plusSeconds(tokenResponse.getExpiresIn()));


            LoginResponse response = new LoginResponse();
            response.setToken(tokenResponse.getAccessToken());
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
            redirectAttributes.addFlashAttribute("mensajeVenta", "Usuario o Contraseña incorrectos");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/api/login";
        } catch (Exception e){
            redirectAttributes.addFlashAttribute("mensajeVenta", "Usuario o Contraseña incorrectos");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/api/login";
        }
    }
}
