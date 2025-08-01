package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.enrique.comuniowebapp.comuniowebapp.dto.Mercado;
import com.enrique.comuniowebapp.comuniowebapp.dto.News;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioUserService;

import jakarta.servlet.http.HttpSession;

@Controller
public class MainController {

    ComunioUserService comunioUserService;

    @GetMapping("/main")
    public String mostrarMain(HttpSession session, Model model){

        //Recuperamos UserInfo desde session
        UserInfo userInfo =  (UserInfo) session.getAttribute("userInfo");
        model.addAttribute("userInfo", userInfo);

        //Recuperamos Noticias desde session
        List<News> newsList = (List<News>) session.getAttribute("news");
        model.addAttribute("newsList", newsList);

        //Recuperamos Mercado desde session
        List<Mercado> mercadoList = (List<Mercado>) session.getAttribute("mercado");
        model.addAttribute("mercadoList", mercadoList);
        
        return "main";
    }
}