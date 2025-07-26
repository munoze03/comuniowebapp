package com.enrique.comuniowebapp.comuniowebapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.enrique.comuniowebapp.comuniowebapp.dto.LoginForm;

@Controller
public class HomeController {

    @GetMapping("/")
    public String Home(){
        return "index";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute LoginForm form, Model model){
        System.out.println("Usuario: " + form.getUsername());
        System.out.println("Contrasena: " + form.getPassword());

        return "index";
    }

}
