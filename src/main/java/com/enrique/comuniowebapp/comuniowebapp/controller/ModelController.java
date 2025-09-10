package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.text.Normalizer;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.enrique.comuniowebapp.comuniowebapp.dto.HistorialValor;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioUserService;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/model")
public class ModelController {

    private final ComunioUserService comunioUserService;

    public ModelController(ComunioUserService comunioUserService) {
        this.comunioUserService = comunioUserService;
    }

    @PostMapping("/cargarHistoriaValor/{id}")
    @ResponseBody
    public List<HistorialValor> cargarHistoriaValor(
        @PathVariable Integer id,
        HttpSession session) {

        // Recupera token de sesión
        String token = (String) session.getAttribute("token");
        
        // Llamamos al servicio
        return comunioUserService.getCargarHistoriaValor(token, id);

    }

    @GetMapping("/cargarHistoricoPuntos/{jugadorName}")
    public Map<String, Object> getHistoricoPuntosJugador(
        @PathVariable String jugadorName) {

        // Llamamos al servicio
            return comunioUserService.getHistoricoPuntosJugador(jugadorName);
    }
    
}
