package com.enrique.comuniowebapp.comuniowebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.enrique.comuniowebapp.comuniowebapp.dto.LoginRequest;
import com.enrique.comuniowebapp.comuniowebapp.model.TokenResponse;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioAuthService;

import jakarta.servlet.http.HttpSession;

@Controller
public class HomeController {

    @GetMapping("/")
    public String Home(){
        return "index";
    }

    // @Autowired
    // private ComunioAuthService authService;

    // @PostMapping("/login")
    // public String login(@ModelAttribute LoginRequest form, HttpSession session){
    //     System.out.println("Usuario: " + form.getUsername());
    //     System.out.println("Contrasena: " + form.getPassword());

    //     try {
    //         TokenResponse token = authService.login(form.getUsername(), form.getPassword());
    //         session.setAttribute("access_token", token.getAccess_token());
    //         return "redirect:/main"; // o la página que desees
    //     } catch (Exception e) {
    //         return "redirect:/login?error=true";
    //     }
    // }

    // @GetMapping("/login")
    // public String loginForm(){
    //     return "main";
    // }
}
