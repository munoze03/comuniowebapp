package com.enrique.comuniowebapp.comuniowebapp.controller;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.enrique.comuniowebapp.comuniowebapp.dto.Clasificacion;
import com.enrique.comuniowebapp.comuniowebapp.dto.LoginRequest;
import com.enrique.comuniowebapp.comuniowebapp.dto.LoginResponse;
import com.enrique.comuniowebapp.comuniowebapp.dto.Mercado;
import com.enrique.comuniowebapp.comuniowebapp.dto.News;
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

            //Capturamos las noticias
            List<News> news = userService.getUserNews(token, userInfo.getCommunityId(), userInfo.getId());
            //Guardamos las noticias en la sesion
            session.setAttribute("news", news);

            //Capturamos el mercado de fichajes
            List<Mercado> mercado = userService.getMercado(token, userInfo.getCommunityId(), userInfo.getId());
            //Guarcamos el mercado en la sesion
            session.setAttribute("mercado", mercado);

            //Capturamos la clasificacion
            List<Clasificacion> clasificacion = userService.getClasificacion(token, userInfo.getCommunityId(), userInfo.getId());
            //Guarcamos la clasificacion en la sesion
            session.setAttribute("clasificacion", clasificacion);            

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
