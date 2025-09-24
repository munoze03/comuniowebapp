package com.enrique.comuniowebapp.comuniowebapp.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.enrique.comuniowebapp.comuniowebapp.service.MainService;

import jakarta.servlet.http.HttpSession;


@Controller
@RequestMapping("/ofertas")
public class OfertasController {

    private final MainService comunioUserService;


    public OfertasController(MainService comunioUserService) {
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
            redirectAttributes.addFlashAttribute("mensajeVenta", "Jugador puesto a la venta correctamente.");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensajeVenta", "Error al poner jugador en venta.");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }

        return "redirect:/main"; // o donde quieras volver
    }

    @PostMapping("/quitar")
    public String quitarJugadorEnVenta(
        @RequestParam("tradableId") long tradableId,
        HttpSession session,
        RedirectAttributes redirectAttributes) {
        
        UserInfo userInfo =  (UserInfo) session.getAttribute("userInfo");
        String token = (String) session.getAttribute("token");

        try{
            comunioUserService.quitarJugadorEnVenta(token, userInfo.getCommunityId(), userInfo.getId(), tradableId);
            redirectAttributes.addFlashAttribute("mensajeVenta", "Jugador retirado del mercado.");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e){
            redirectAttributes.addFlashAttribute("mensajeVenta", "Error al quitar jugador del mercado.");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        
        return "redirect:/main";
    }

    @PostMapping("/pujar")
    public String realizarOferta(
        @RequestParam("tradableId") Integer tradableId,
        @RequestParam("precio") Integer precio,
        HttpSession session,
        RedirectAttributes redirectAttributes){

            UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
            String token = (String) session.getAttribute("token");
            String communityId = userInfo.getCommunityId();
            String userId = userInfo.getId();

            try{
                comunioUserService.realizarOferta(token, communityId, userId, tradableId, precio);
                redirectAttributes.addFlashAttribute("mensajeVenta", "Oferta realizada correctamente");
                redirectAttributes.addFlashAttribute("tipoMensaje", "success");
            }catch(Exception e){
                redirectAttributes.addFlashAttribute("mensajeVenta", "Error al realizar la oferta");
                redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            }

            return "redirect:/main";
        }

    @PostMapping("/retirar")
    public String retirarOferta(
        @RequestParam("price") Integer price,
        @RequestParam("tradableId") Integer tradableId,
        HttpSession session,
        RedirectAttributes redirectAttributes){

            UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
            String token = (String) session.getAttribute("token");
            String communityId = userInfo.getCommunityId();
            String userId = userInfo.getId();

            try{
                comunioUserService.retirarOferta(token, communityId, userId, tradableId, price);
                redirectAttributes.addFlashAttribute("mensajeVenta", "Oferta retirada correctamente");
                redirectAttributes.addFlashAttribute("tipoMensaje", "success");
            }catch (Exception e){
                redirectAttributes.addFlashAttribute("mensajeVenta", "Error al retirar la oferta");
                redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            }

            return "redirect:/main";
        }

    @PostMapping("/modificar")
    public String modificarOferta(
        @RequestParam("price") Integer price,
        @RequestParam("tradableId") Integer tradableId,
        HttpSession session,
        RedirectAttributes redirectAttributes){

            UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
            String token = (String) session.getAttribute("token");
            String communityId = userInfo.getCommunityId();
            String userId = userInfo.getId();

            try{
                comunioUserService.modificarOferta(token, communityId, userId, tradableId, price);
                redirectAttributes.addFlashAttribute("mensajeVenta", "Oferta modificada correctamente");
                redirectAttributes.addFlashAttribute("tipoMensaje", "success");
            }catch (Exception e){
                redirectAttributes.addFlashAttribute("mensajeVenta", "Error al modificar la oferta");
                redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            }

            return "redirect:/main";
        }
    
    @PostMapping("/rechazar")
    public String rechazarOferta(
        @RequestParam("price") Integer price,
        @RequestParam("tradableId") Integer tradableId,
        HttpSession session,
        RedirectAttributes redirectAttributes){

            UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
            String token = (String) session.getAttribute("token");
            String communityId = userInfo.getCommunityId();
            String userId = userInfo.getId();

            try{
                comunioUserService.rechazarOferta(token, communityId, userId, tradableId, price);
                redirectAttributes.addFlashAttribute("mensajeVenta", "Oferta rechazada correctamente");
                redirectAttributes.addFlashAttribute("tipoMensaje", "success");
            }catch (Exception e){
                redirectAttributes.addFlashAttribute("mensajeVenta", "Error al rechazar la oferta");
                redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            }

            return "redirect:/main";
        }   

    @PostMapping("/aceptar")
    public String aceptarOferta(
        @RequestParam("price") Integer price,
        @RequestParam("tradableId") Integer tradableId,
        HttpSession session,
        RedirectAttributes redirectAttributes){

            UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
            String token = (String) session.getAttribute("token");
            String communityId = userInfo.getCommunityId();
            String userId = userInfo.getId();

            try{
                comunioUserService.aceptarOferta(token, communityId, userId, tradableId, price);
                redirectAttributes.addFlashAttribute("mensajeVenta", "Oferta aceptada correctamente");
                redirectAttributes.addFlashAttribute("tipoMensaje", "success");
            }catch (Exception e){
                redirectAttributes.addFlashAttribute("mensajeVenta", "Error al aceptar la oferta");
                redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            }

            return "redirect:/main";
        }   
}
