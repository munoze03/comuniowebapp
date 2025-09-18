package com.enrique.comuniowebapp.comuniowebapp.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.enrique.comuniowebapp.comuniowebapp.dto.EstadisticasJugador;

@Service
public class EstadisticasService {

    @Autowired
    private RestTemplate restTemplate;  

    public List<EstadisticasJugador> getEstadisticasJugadores() throws IOException {

        final String URL = "https://www.comuniazo.com/comunio-apuestas/jugadores";

        List<EstadisticasJugador> EstadisticasJugadores = new ArrayList<>();

        Document doc = Jsoup.connect(URL)
                .userAgent("Mozilla/5.0")
                .get();

        Elements filas = doc.select("div.scroll-content table tbody tr.btn");

        for (Element fila : filas) {
            Elements cols = fila.select("td");

            EstadisticasJugador j = new EstadisticasJugador();
            j.setNombre(cols.get(0).select("strong").text());
            System.out.println(j.getNombre());
            j.setEnlace(cols.get(0).select("a").attr("href"));
            j.setEquipoLogo(cols.get(0).select("img").attr("src"));

            // 🔹 Extraer la posición desde la clase CSS
            String posClass = cols.get(0).select("span.player-position").attr("class"); // ej: "player-position pos-4"
            String pos = posClass.replace("player-position", "").trim(); // -> "pos-4"
            j.setPosicion(conversorPosicion(pos));

            j.setPuntos(cols.get(1).text());
            j.setMedia(cols.get(2).text());
            j.setLocalPuntos(cols.get(3).text());
            j.setLocalMedia(cols.get(4).text());
            j.setVisitantePuntos(cols.get(5).text());
            j.setVisitanteMedia(cols.get(6).text());
            j.setValor(cols.get(7).text());

            List<String> racha = new ArrayList<>();
            for (Element span : cols.get(8).select("span")) {
                racha.add(span.text());
            }
            j.setRacha(racha);

            EstadisticasJugadores.add(j);
        }

        return EstadisticasJugadores;
    }

    private String conversorPosicion(String posicion){
        
        switch (posicion.toLowerCase()) {
            case "pos-4":
                return "DE";
            case "pos-3":
                return "ME";
            case "pos-2":
                return "DF";
            case "pos-1":
                return "PO";
            default:
                return "-";
        }
    }

    
}
