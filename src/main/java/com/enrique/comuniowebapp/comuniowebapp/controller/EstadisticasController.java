package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.enrique.comuniowebapp.comuniowebapp.dto.CalendarioJornada;
import com.enrique.comuniowebapp.comuniowebapp.dto.EquipoLaLiga;
import com.enrique.comuniowebapp.comuniowebapp.dto.EstadisticasJugador;
import com.enrique.comuniowebapp.comuniowebapp.dto.Jornada;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.EstadisticasService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpSession;

@Controller
public class EstadisticasController {

    private final EstadisticasService estadisticasService;

    public EstadisticasController(EstadisticasService estadisticasService) {
        this.estadisticasService = estadisticasService;
    }

    @GetMapping("/estadisticas")
    public void cargarEstadisticas(HttpSession session, Model model) throws IOException {

        cargarEstadisticasJugadores(session, model);
        cargarClasificacionLaLiga(session, model);
        cargarPartidosJornada(session, model);
        cargarCalendarioLaLiga(session, model);
        
    }

    public String cargarClasificacionLaLiga(HttpSession session, Model model) throws IOException {

        // Añades al modelo lo que necesites (ej. userInfo si también lo usas aquí)
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        // Añadimos userInfo al modelo
        model.addAttribute("userInfo", userInfo);

        // Controlamos si userInfo es null para que no de error por si ha caducado la sesion
        if (userInfo == null) {
        // redirigir al login si no hay sesión
        return "redirect:/api/login";
        }
        
        // Llamamos al servicio
        List<EquipoLaLiga> equiposLaLiga = estadisticasService.getClasificacionLaLiga();
        ObjectMapper mapper = new ObjectMapper();
        String equiposLaLigaJson = mapper.writeValueAsString(equiposLaLiga);
        model.addAttribute("equiposLaLigaJson", equiposLaLigaJson);

        return "estadisticas"; 
    }

    public String cargarEstadisticasJugadores(HttpSession session, Model model) throws IOException {

        // Recuperamos Userinfo de la session
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        // Añadimos userInfo al modelo
        model.addAttribute("userInfo", userInfo);

        // Controlamos si userInfo es null para que no de error por si ha caducado la sesion
        if (userInfo == null) {
        // redirigir al login si no hay sesión
        return "redirect:/api/login";
        }
        
        // Llamamos al servicio
        List<EstadisticasJugador> jugadores = estadisticasService.getEstadisticasJugadores();
        ObjectMapper mapper = new ObjectMapper();
        String jugadoresJson = mapper.writeValueAsString(jugadores);
        model.addAttribute("jugadoresJson", jugadoresJson);

        return "estadisticas"; 
    }

    public String cargarPartidosJornada(HttpSession session, Model model) throws IOException {

        // Recuperamos Userinfo de la session
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        // Añadimos userInfo al modelo
        model.addAttribute("userInfo", userInfo);

        // Controlamos si userInfo es null para que no de error por si ha caducado la sesion
        if (userInfo == null) {
        // redirigir al login si no hay sesión
        return "redirect:/api/login";
        }
        
        // Llamamos al servicio
        List<CalendarioJornada> calendarioJornadaData = estadisticasService.getCalendarioJornada();
        model.addAttribute("calendarioJornadaData", calendarioJornadaData);

        return "estadisticas"; 
    }

    public String cargarCalendarioLaLiga(HttpSession session, Model model) throws IOException {

        // Recuperamos Userinfo de la session
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        // Añadimos userInfo al modelo
        model.addAttribute("userInfo", userInfo);

        // Controlamos si userInfo es null para que no de error por si ha caducado la sesion
        if (userInfo == null) {
        // redirigir al login si no hay sesión
        return "redirect:/api/login";
        }
        
        
        // Llamamos al servicio
        List<Jornada> calendarioLaLigaData = estadisticasService.getCalendarioLaLiga();
        model.addAttribute("calendarioLaLigaData", calendarioLaLigaData);

        return "estadisticas"; 
    }

}
