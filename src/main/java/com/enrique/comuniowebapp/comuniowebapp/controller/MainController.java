package com.enrique.comuniowebapp.comuniowebapp.controller;

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

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
    public String mostrarMain(HttpSession session, Model model) throws InterruptedException, ExecutionException{

        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        //Cargamos los datos del usuario en el modelo
        model.addAttribute("userInfo", userInfo);

        // Controlamos si userInfo es null para que no de error por si ha caducado la sesion
        if (userInfo == null) {
            // redirigir al login si no hay sesión
            return "redirect:/api/login";
        }

        // Capturamos el token de la sesion
        String token = (String) session.getAttribute("token");

        // Hacemos las llamadas a todas las apis asincronamente y todas a la vez
        // para mejorar la velocidad de carga de la pagina
        //Capturamos las noticias
        //List<News> news = userService.getUserNews(token, userInfo.getCommunityId(), userInfo.getId());
        CompletableFuture<List<News>> newsFuture = CompletableFuture.supplyAsync(() -> userService.getUserNews(token, userInfo.getCommunityId(), userInfo.getId()));

        //Capturamos el mercado de fichajes
        //List<Mercado> mercado = userService.getMercado(token, userInfo.getCommunityId(), userInfo.getId(), userInfo.getName());
        CompletableFuture<List<Mercado>> mercadoFuture = CompletableFuture.supplyAsync(() -> userService.getMercado(token, userInfo.getCommunityId(), userInfo.getId(), userInfo.getName()));

        //Capturamos la clasificacion
        //List<Clasificacion> clasificacion = userService.getClasificacion(token, userInfo.getCommunityId());
        CompletableFuture<List<Clasificacion>> clasificacionFuture = CompletableFuture.supplyAsync(() -> userService.getClasificacion(token, userInfo.getCommunityId()));

        //Capturamos la alineacion
        //List<Alineacion> alineacion = userService.getAlineacion(token, userInfo.getCommunityId(), userInfo.getId());
        CompletableFuture<List<Alineacion>> alineacionFuture = CompletableFuture.supplyAsync(() -> userService.getAlineacion(token, userInfo.getCommunityId(), userInfo.getId()));

        //Capturamos la plantilla
        //List<Player> plantilla = userService.getPlantilla(token, userInfo.getCommunityId(), userInfo.getId());
        CompletableFuture<List<Player>> plantillaFuture = CompletableFuture.supplyAsync(() -> userService.getPlantilla(token, userInfo.getCommunityId(), userInfo.getId()));

        //Capturamos las ofertas activas
        //List<Oferta> ofertas = userService.getOfertas(token, userInfo.getCommunityId(), userInfo.getId());
        CompletableFuture<List<Oferta>> ofertasFuture = CompletableFuture.supplyAsync(() -> userService.getOfertas(token, userInfo.getCommunityId(), userInfo.getId()));

        //Capturamos el historial de ofertas
        //List<Oferta> historialOfertas = userService.getHistorialOfertas(token, userInfo.getCommunityId(), userInfo.getId());
        CompletableFuture<List<Oferta>> historialOfertasFuture = CompletableFuture.supplyAsync(() -> userService.getHistorialOfertas(token, userInfo.getCommunityId(), userInfo.getId()));

        //Capturamos el historial de transacciones
        //List<Transactions> historialTransacciones = userService.getTransacciones(token, userInfo.getCommunityId(), userInfo.getId());
        CompletableFuture<List<Transactions>> historialTransaccionesFuture = CompletableFuture.supplyAsync(() -> userService.getTransacciones(token, userInfo.getCommunityId(), userInfo.getId()));

        //Capturamos los datos de los usuarios
        //List<UserInfo> datosUsuarios = userService.getListadoIds(token, userInfo.getCommunityId());
        CompletableFuture<List<UserInfo>> datosUsuariosFuture = CompletableFuture.supplyAsync(() -> userService.getListadoIds(token, userInfo.getCommunityId()));
        

        // Esperar a que todas terminen
        CompletableFuture.allOf(newsFuture, mercadoFuture, clasificacionFuture, alineacionFuture, plantillaFuture, ofertasFuture, historialOfertasFuture, historialTransaccionesFuture, datosUsuariosFuture).join();


        //Guardamos las noticias en la sesion
        session.setAttribute("news", newsFuture.get());
        //Cargamos las noticias en el modelo
        model.addAttribute("newsList", newsFuture.get());


        //Ordenamos la plantilla por posicion
        mercadoFuture.get().sort(Comparator.comparingInt(j -> {
            switch (j.getPosition()) {
                case "PO": return 1;
                case "DF": return 2;
                case "ME": return 3;
                case "DL": return 4;
                default: return Integer.MAX_VALUE;
            }
        }));   
        //Guardamos el mercado en la sesion
        session.setAttribute("mercado", mercadoFuture.get());
        //Cargamos el mercado en el modelo
        model.addAttribute("mercadoList", mercadoFuture.get());

        
        //Guardamos la clasificacion en la sesion
        session.setAttribute("clasificacion", clasificacionFuture.get());  
        //Cargamos la clasificacion en el modelo
        model.addAttribute("clasificacion", clasificacionFuture.get());        
        
        
        //Guardamos la alineacion en la sesion
        session.setAttribute("alineacion", alineacionFuture.get());
        //Cargamos la alineacion en el modelo
        model.addAttribute("alineacion", alineacionFuture.get());

        
        //Ordenamos la plantilla por posicion
        plantillaFuture.get().sort(Comparator.comparingInt(j -> {
            switch (j.getPosicion()) {
                case "PO": return 1;
                case "DF": return 2;
                case "ME": return 3;
                case "DL": return 4;
                default: return Integer.MAX_VALUE;
            }
        }));   
        //Guardamos la plantilla en la sesion
        session.setAttribute("plantilla", plantillaFuture.get());
        //Cargamos la plantilla en el modelo
        model.addAttribute("plantilla", plantillaFuture.get());

        
        //Guardamos las ofertas en la sesion
        session.setAttribute("ofertas", ofertasFuture.get());  
        //Cargamos las ofertas en el modelo
        model.addAttribute("ofertas", ofertasFuture.get());

        //Guardamos el historial de ofertas en la sesion
        session.setAttribute("historialOfertas", historialOfertasFuture.get());  
        //Cargamos el historial de ofertas en el modelo
        model.addAttribute("historialOfertas", historialOfertasFuture.get());

        //Guardamos el historial de transacciones en la sesion
        session.setAttribute("historialTransacciones", historialTransaccionesFuture.get());
        //Cargamos el historial de transacciones en el modelo
        model.addAttribute("historialTransacciones", historialTransaccionesFuture.get());

        //Guardamos los datos de los usuarios en la sesion
        session.setAttribute("datosUsuarios", datosUsuariosFuture.get());
        //Cargamos los datos de los usuarios en el modelo
        model.addAttribute("datosUsuarios", datosUsuariosFuture.get());

        return "main";
    }

    
}