package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.enrique.comuniowebapp.comuniowebapp.dto.AdministracionForm;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.ComunioUserService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/abono")
public class AdministracionController {

    private final ComunioUserService comunioUserService;

    public AdministracionController(ComunioUserService comunioUserService) {
        this.comunioUserService = comunioUserService;
    }

    @PostMapping("/guardar")
    public String abonoSancion(
        @ModelAttribute AdministracionForm administracionForm,
        @RequestParam String usuarioId,
        HttpSession session,
        RedirectAttributes redirectAttributes) {

        // Recupera usuario y token de sesión
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        String token = (String) session.getAttribute("token");
        String communityId = userInfo.getCommunityId();
        String userId = usuarioId;

        // Confirmamos que la cantidad sea para abono o sancion
        int cantidad = administracionForm.getCantidad();
        if(administracionForm.getTipo().equalsIgnoreCase("Sanción")){
            cantidad = cantidad * -1;
        }

        // Construye el payload para Comunio
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("amount", cantidad);
        payload.put("reason", administracionForm.getConcepto());

        String tipo = administracionForm.getTipo();
        
        try {
            // Llama a la API de Comunio
            comunioUserService.abonoSancion(token, communityId, userId, payload);

            redirectAttributes.addFlashAttribute("mensajeVenta", tipo + " realizada correctamente.");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensajeVenta", "Error al realizar " + tipo);
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        return "redirect:/main";
    }

}
