package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.enrique.comuniowebapp.comuniowebapp.dto.AdministracionForm;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.MainService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/administracion")
public class AdministracionController {

    private final MainService comunioUserService;

    public AdministracionController(MainService comunioUserService) {
        this.comunioUserService = comunioUserService;
    }

    @PostMapping("/abonoSancion")
    public String abonoSancion(
        @ModelAttribute AdministracionForm administracionForm,
        HttpSession session,
        RedirectAttributes redirectAttributes) {

        // Recupera usuario y token de sesión
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        String token = (String) session.getAttribute("token");
        String communityId = userInfo.getCommunityId();
        String userId = administracionForm.getId();

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

    @PostMapping("/anularFichajeAdministracion")
    public String eliminarTransaccion(
        @RequestParam("ids") List<String> ids,
        HttpSession session,
        RedirectAttributes redirectAttributes){

        // Recupera usuario y token de sesión
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        String token = (String) session.getAttribute("token");
        String communityId = userInfo.getCommunityId();
        String userId = userInfo.getId();

        // Construye el payload para Comunio
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("offerIds", ids);

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("data", data);

        try {
            // Llama a la API de Comunio
            comunioUserService.anularFichajeAdministracion(token, communityId, userId, payload);

            redirectAttributes.addFlashAttribute("mensajeVenta", "Transacción eliminada correctamente.");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensajeVenta", "Error al eliminar la transacción.");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        
        return "redirect:/main";

    }
}
