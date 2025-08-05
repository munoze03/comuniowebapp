package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.enrique.comuniowebapp.comuniowebapp.dto.Player;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioUserService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/ofertas")
public class OfertasController {

    private final ComunioUserService comunioUserService;


    public OfertasController(ComunioUserService comunioUserService) {
        this.comunioUserService = comunioUserService;
    }

    @PostMapping("/vender")
    
    public String ponerJugadorEnVenta(
        @RequestParam("tradableId") Long tradableId,
        @RequestParam("precio") Integer precio,
        HttpSession session,
        RedirectAttributes redirectAttributes) {

        //Recuperamos plantilla desde session
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        String token = (String) session.getAttribute("token");
        String communityId = userInfo.getCommunityId();
        String userId = userInfo.getId();

        try {
            comunioUserService.ponerJugadorEnVenta(token, communityId, userId, tradableId, precio);
            redirectAttributes.addFlashAttribute("mensaje", "Jugador puesto a la venta correctamente.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error al poner jugador en venta.");
        }

        return "redirect:/main"; // o donde quieras volver
    }
}
