package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.enrique.comuniowebapp.comuniowebapp.service.ComunioUserService;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/model")
public class ModelController {

    private final ComunioUserService comunioUserService;

    public ModelController(ComunioUserService comunioUserService) {
        this.comunioUserService = comunioUserService;
    }

    @GetMapping("/cargarHistoricoPuntos/{jugadorName}")
    @ResponseBody
    public Map<String, Object> cargarHistoricoPuntosJugador(
        @PathVariable String jugadorName) {
        
        // Llamamos al servicio
        return comunioUserService.getHistoricoPuntosJugador(jugadorName);

    }

    @GetMapping("/cargarHistoricoValor/{jugadorName}")
    public Map<String, Object> cargarHistoricoValorJugador(
        @PathVariable String jugadorName) {

        // Llamamos al servicio
        return comunioUserService.cargarHistoricoValorJugador(jugadorName);
    }
    
}
