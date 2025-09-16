package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.enrique.comuniowebapp.comuniowebapp.dto.Alineacion;
import com.enrique.comuniowebapp.comuniowebapp.dto.Clasificacion;
import com.enrique.comuniowebapp.comuniowebapp.dto.Mercado;
import com.enrique.comuniowebapp.comuniowebapp.dto.News;
import com.enrique.comuniowebapp.comuniowebapp.dto.Oferta;
import com.enrique.comuniowebapp.comuniowebapp.dto.Player;
import com.enrique.comuniowebapp.comuniowebapp.dto.Transactions;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioUserService;

import jakarta.servlet.http.HttpSession;

@Controller
public class MainController {

    ComunioUserService comunioUserService;
    ComunioUserService userService;

    public MainController(ComunioUserService userService){
        this.userService = userService;
    }


    @GetMapping("/main")
    public String mostrarMain(HttpSession session, Model model){

        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");

        // Controlamos si userInfo es null para que no de error por si ha caducado la sesion
        if (userInfo == null) {
        // redirigir al login si no hay sesión
        return "redirect:/api/login";
        }

        String token = (String) session.getAttribute("token");
        model.addAttribute("userInfo", userInfo);

        //Capturamos las noticias
        List<News> news = userService.getUserNews(token, userInfo.getCommunityId(), userInfo.getId());
        //Guardamos las noticias en la sesion
        session.setAttribute("news", news);
        //Cargamos las noticias en el modelo
        model.addAttribute("newsList", news);

        //Capturamos el mercado de fichajes
        List<Mercado> mercado = userService.getMercado(token, userInfo.getCommunityId(), userInfo.getId(), userInfo.getName());
        //Ordenamos la plantilla por posicion
        mercado.sort(Comparator.comparingInt(j -> {
            switch (j.getPosition()) {
                case "PO": return 1;
                case "DF": return 2;
                case "ME": return 3;
                case "DL": return 4;
                default: return Integer.MAX_VALUE;
            }
        }));   
        //Guardamos el mercado en la sesion
        session.setAttribute("mercado", mercado);
        //Cargamos el mercado en el modelo
        model.addAttribute("mercadoList", mercado);

        //Capturamos la clasificacion
        List<Clasificacion> clasificacion = userService.getClasificacion(token, userInfo.getCommunityId());
        //Guardamos la clasificacion en la sesion
        session.setAttribute("clasificacion", clasificacion);  
        //Cargamos la clasificacion en el modelo
        model.addAttribute("clasificacion", clasificacion);        
        
        //Capturamos la alineacion
        List<Alineacion> alineacion = userService.getAlineacion(token, userInfo.getCommunityId(), userInfo.getId());
        //Guardamos la alineacion en la sesion
        session.setAttribute("alineacion", alineacion);
        //Cargamos la alineacion en el modelo
        model.addAttribute("alineacion", alineacion);

        //Capturamos la plantilla
        List<Player> plantilla = userService.getPlantilla(token, userInfo.getCommunityId(), userInfo.getId());
        //Ordenamos la plantilla por posicion
        plantilla.sort(Comparator.comparingInt(j -> {
            switch (j.getPosicion()) {
                case "PO": return 1;
                case "DF": return 2;
                case "ME": return 3;
                case "DL": return 4;
                default: return Integer.MAX_VALUE;
            }
        }));   
        //Guardamos la plantilla en la sesion
        session.setAttribute("plantilla", plantilla);
        //Cargamos la plantilla en el modelo
        model.addAttribute("plantilla", plantilla);

        //Capturamos las ofertas activas
        List<Oferta> ofertas = userService.getOfertas(token, userInfo.getCommunityId(), userInfo.getId());
        //Guardamos las ofertas en la sesion
        session.setAttribute("ofertas", ofertas);  
        //Cargamos las ofertas en el modelo
        model.addAttribute("ofertas", ofertas);

        //Capturamos el historial de ofertas
        List<Oferta> historialOfertas = userService.getHistorialOfertas(token, userInfo.getCommunityId(), userInfo.getId());
        //Guardamos el historial de ofertas en la sesion
        session.setAttribute("historialOfertas", historialOfertas);  
        //Cargamos el historial de ofertas en el modelo
        model.addAttribute("historialOfertas", historialOfertas);

        //Capturamos el historial de transacciones
        List<Transactions> historialTransacciones = userService.getTransacciones(token, userInfo.getCommunityId(), userInfo.getId());
        //Guardamos el historial de transacciones en la sesion
        session.setAttribute("historialTransacciones", historialTransacciones);
        //Cargamos el historial de transacciones en el modelo
        model.addAttribute("historialTransacciones", historialTransacciones);

        //Capturamos los datos de los usuarios
        List<UserInfo> datosUsuarios = userService.getListadoIds(token, userInfo.getCommunityId());
        //Guardamos los datos de los usuarios en la sesion
        session.setAttribute("datosUsuarios", datosUsuarios);
        //Cargamos los datos de los usuarios en el modelo
        model.addAttribute("datosUsuarios", datosUsuarios);

        return "main";
    }

    
}