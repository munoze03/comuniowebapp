package com.enrique.comuniowebapp.comuniowebapp.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import com.enrique.comuniowebapp.comuniowebapp.dto.CalendarioJornada;
import com.enrique.comuniowebapp.comuniowebapp.dto.EquipoLaLiga;
import com.enrique.comuniowebapp.comuniowebapp.dto.EstadisticasJugador;
import com.enrique.comuniowebapp.comuniowebapp.dto.Jornada;

@Service
public class EstadisticasService {

    // @Autowired
    // private RestTemplate restTemplate;  

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

    public List<EquipoLaLiga> getClasificacionLaLiga() throws IOException {

        final String URL = "https://www.comuniazo.com/laliga";

        List<EquipoLaLiga> equiposLaLiga = new ArrayList<>();

        Document doc = Jsoup.connect(URL)
                .userAgent("Mozilla/5.0")
                .get();

        Element tabla = doc.selectFirst(".content-competition table");
        if (tabla != null){
            Elements filas = tabla.select("tr");

            // saltamos cabecera
            for(int i=1; i < filas.size(); i++){
                Elements tds = filas.get(i).select("td");
                if (tds.size() < 10) continue;

                EquipoLaLiga equipo = new EquipoLaLiga();

                // Recuperar la URL del logo
                Element img = tds.get(1).selectFirst("img");
                equipo.setLogoUrl(img != null ? img.attr("src") : "");

                // Recuperamos el resto de datos
                equipo.setPosicion(tds.get(0).text());
                equipo.setNombre(tds.get(1).text());
                equipo.setPuntos(tds.get(2).text());
                equipo.setPj(tds.get(3).text());
                equipo.setPg(tds.get(4).text());
                equipo.setPe(tds.get(5).text());
                equipo.setPp(tds.get(6).text());
                equipo.setGf(tds.get(7).text());
                equipo.setGc(tds.get(8).text());
                equipo.setDg(tds.get(9).text());

                equiposLaLiga.add(equipo);
            }
        }

        return equiposLaLiga;
    }

    public List<CalendarioJornada> getCalendarioJornada() throws IOException {

        final String URL = "https://www.comuniazo.com/laliga";

        List<CalendarioJornada> calendarioJornada = new ArrayList<>();

        Document doc = Jsoup.connect(URL)
                .userAgent("Mozilla/5.0")
                .get();

        // Extraemos la jornada
        Element titulo = doc.selectFirst(".gameweeks .title h3");
        String jornada = titulo != null ? titulo.text() : "";

        // Extraemos los partidos
        Elements partidosHtml = doc.select(".gameweeks .matches a.match-box");
        for(Element partidoEl : partidosHtml){

            CalendarioJornada partido = new CalendarioJornada();
            
            // Recuperamos los datos
            partido.setJornada(jornada);
            partido.setUrlHome(partidoEl.selectFirst(".home img") != null ? partidoEl.selectFirst(".home img").attr("src") : "");
            partido.setUrlAway(partidoEl.selectFirst(".away img") != null ? partidoEl.selectFirst(".away img").attr("src") : "");
            partido.setFechaHora(partidoEl.selectFirst(".mid .date") != null ? partidoEl.selectFirst(".mid .date").text() : "");
            partido.setUrlTV(partidoEl.selectFirst(".mid .tvs img") != null ? partidoEl.selectFirst(".mid .tvs img").attr("src") : "");

            calendarioJornada.add(partido);
        }

        return calendarioJornada;
    }

    public List<Jornada> getCalendarioLaLiga() throws IOException {

        final String URL = "https://www.comuniazo.com/laliga/calendario";

        List<Jornada> jornadas = new ArrayList<>();

        Document doc = Jsoup.connect(URL)
                .userAgent("Mozilla/5.0")
                .get();

        // Extraemos las jornadas
        Elements jornadasHtml = doc.select("div.box-gameweek");

        // Extraemos los partidos de cada jornada
        for (Element jornadaHtml : jornadasHtml){
            Jornada jornada = new Jornada();
            jornada.setNombre(jornadaHtml.select("h2 a").text());

            List<CalendarioJornada> partidos = new ArrayList<>();
            Elements partidosHtml = jornadaHtml.select("ul li");

            for (Element partidoHtml : partidosHtml){
                CalendarioJornada calendarioJornada = new CalendarioJornada();
                calendarioJornada.setEquipoHome(partidoHtml.select(".home").text());
                calendarioJornada.setEquipoAway(partidoHtml.select(".away").text());
                calendarioJornada.setResultado(partidoHtml.select(".score").text());
                calendarioJornada.setUrlHome(partidoHtml.selectFirst(".home").selectFirst("img").attr("src"));
                calendarioJornada.setUrlAway(partidoHtml.selectFirst(".away").selectFirst("img").attr("src"));

                partidos.add(calendarioJornada);
            }

            jornada.setPartidos(partidos);
            jornadas.add(jornada);
        }

        return jornadas;
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
