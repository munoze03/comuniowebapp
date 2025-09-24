package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enrique.comuniowebapp.comuniowebapp.dto.Clasificacion;
import com.enrique.comuniowebapp.comuniowebapp.dto.Player;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.MainService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/clasificacion")
public class ClasificacionController {

    private final MainService comunioUserService;

    public ClasificacionController(MainService comunioUserService) {
        this.comunioUserService = comunioUserService;
    }

    @GetMapping(value = "/mes/{mesSeleccionado}", produces = MediaType.TEXT_HTML_VALUE)
    @ResponseBody
    public String cargarClasificacionMes(
        HttpSession session,
        @PathVariable String mesSeleccionado) {

        // Recupera usuario y token de sesión
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        String token = (String) session.getAttribute("token");
        String communityId = userInfo.getCommunityId();
        
        // Llamamos al servicio
        List<Clasificacion> clasificacionMes = comunioUserService.getClasificacionMes(token, communityId, mesSeleccionado);

        // Construimos el html de la tabla para devolverlo directamente al js
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < clasificacionMes.size(); i++) {
            Clasificacion c = clasificacionMes.get(i);
            sb.append("<tr>")
            .append("<td><span>").append(i + 1).append("</span></td>")
            .append("<td>").append(c.getName()).append("</td>")
            .append("<td class='tipo-mes'>").append(c.getTotalPoints()).append("</td>")
            .append("</tr>");
        }

        return sb.toString();

    }

    @GetMapping("/plantilla/{userId}")
    @ResponseBody
    public List<Player> cargarPlantillaUsuario(
        HttpSession session,
        @PathVariable String userId) {

        // Recupera token de sesión
        String token = (String) session.getAttribute("token");
        
        // Llamamos al servicio
        return comunioUserService.getPlantillaJugador(userId, token);

    }

}
