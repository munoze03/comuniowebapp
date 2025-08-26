package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioUserService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/alineacion")
public class AlineacionController {

    private final ComunioUserService comunioUserService;


    public AlineacionController(ComunioUserService comunioUserService) {
        this.comunioUserService = comunioUserService;
    }

    @PostMapping("/modificar")
    public String modificarAlineacion(
        @ModelAttribute AlineacionFormDTO alineacionForm,
        HttpSession session,
        RedirectAttributes redirectAttributes) {

        // Recupera usuario y token de sesión
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        String token = (String) session.getAttribute("token");
        String communityId = userInfo.getCommunityId();
        String userId = userInfo.getId();

        // Construye el payload para Comunio
        Map<String, Object> payload = new HashMap<>();
        payload.put("tactic", alineacionForm.getTactic());
        payload.put("lineup", alineacionForm.getLineup());
        payload.put("substitutes", alineacionForm.getSubstitutes());
        payload.put("type", alineacionForm.getType());

        try {
            // Llama a la API de Comunio
            comunioUserService.modificarAlineacion(token, communityId, userId, payload);

            redirectAttributes.addFlashAttribute("mensajeVenta", "Alineación cambiada correctamente.");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensajeVenta", "Error al cambiar la alineación.");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        return "redirect:/main";
    }


}
