package com.enrique.comuniowebapp.comuniowebapp.service;


import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.regex.Matcher;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.enrique.comuniowebapp.comuniowebapp.dto.Alineacion;
import com.enrique.comuniowebapp.comuniowebapp.dto.Clasificacion;
import com.enrique.comuniowebapp.comuniowebapp.dto.Mercado;
import com.enrique.comuniowebapp.comuniowebapp.dto.News;
import com.enrique.comuniowebapp.comuniowebapp.dto.Player;
import com.enrique.comuniowebapp.comuniowebapp.dto.Transactions;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.enrique.comuniowebapp.comuniowebapp.dto.Oferta;

@Service
public class ComunioUserService {

    @Autowired
    private RestTemplate restTemplate;  

    public UserInfo getUserInfo(String token){
        String url = "https://www.comunio.es/api/";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        Map data = response.getBody();

        UserInfo info = new UserInfo();
        //info.setId(String.valueOf(data.get("user")));
        info.setId(String.valueOf(((Map) data.get("user")).get("id")));
        info.setName(String.valueOf(((Map) data.get("user")).get("name")));
        info.setFirstName(String.valueOf(((Map) data.get("user")).get("firstName")));
        info.setLastName(String.valueOf(((Map) data.get("user")).get("lastName")));
        info.setTeamValue(String.valueOf(((Map) data.get("user")).get("teamValue")));
        info.setTeamCount(String.valueOf(((Map) data.get("user")).get("teamCount")));
        info.setTeamCountLinedUp(String.valueOf(((Map) data.get("user")).get("teamCountLinedup")));
        info.setTactic(String.valueOf(((Map) data.get("user")).get("tactic")));
        info.setEmail(String.valueOf(((Map) data.get("user")).get("email")));
        info.setCommunityId(String.valueOf(((Map) data.get("community")).get("id")));
        info.setCommunityName(String.valueOf(((Map) data.get("community")).get("name")));
        info.setBudget(String.valueOf(((Map) data.get("user")).get("budget")));
        info.setIsLeader(Boolean.valueOf((boolean) ((Map) data.get("user")).get("isLeader")));

        return info;
    }

    public List<News> getUserNews(String token, String communityId, String userId){
        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/news?limit=10", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        Map<String, Object> newsListMap = (Map<String, Object>) response.getBody().get("newsList");

        List<Map<String, Object>> entries = (List<Map<String, Object>>) newsListMap.get("entries");
        // Tomamos solo las 10 primeras
        if (entries.size() > 10) {
            entries = entries.subList(0, 10);
        }

        List<News> news = new ArrayList<>();

        for (Map<String, Object> entry : entries){
            News n = new News();
            n.setId(((Number) entry.get("id")).longValue());
            String date = (String) entry.get("date");
            n.setDate(formatearFecha(date));

            String title = (String) entry.get("title");
            switch (title.toLowerCase()) {
                case "transaction" -> title = "Transacción";
                default -> {
                    if (title.matches("La alineación se ha cambiad.*")) {
                        title = "Cambio en la alineación";
                    }
                }
            }
            n.setTitle(title);

            Map<String, Object> message = (Map<String, Object>) entry.get("message");
            String messageHtml = (String) message.get("text");

            //Limpiamos el mensaje de links
            String cleanedHtml = messageHtml.replaceAll("(?i)<a[^>]*>(.*?)</a>", "$1");
            //Cambiamos palabras en ingles a espanol
            cleanedHtml = cleanedHtml.replaceAll("transfers for", "cambia por");
            cleanedHtml = cleanedHtml.replaceAll("TRANSACTION", "TRANSACCION");
            cleanedHtml = cleanedHtml.replaceAll("from", "de");
            cleanedHtml = cleanedHtml.replaceAll("to", "a");
            cleanedHtml = cleanedHtml.replaceAll("<br /><br />", " ");
            cleanedHtml = cleanedHtml.replaceAll("\\b\\d{1,2}:\\d{2}\\b - ", " ");
            cleanedHtml = cleanedHtml.replaceAll("The transfer of", "El fichaje del jugador");
            cleanedHtml = cleanedHtml.replaceAll("for", "por");
            cleanedHtml = cleanedHtml.replaceAll("was undone by", "ha sido cancelado por");

            n.setMessageHtml(cleanedHtml);

            news.add(n);
        }

        return news;
    }

    public List<Oferta> getOfertas(String token, String communityId, String userId ){
        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/offers?current", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");


        List<Oferta> ofertas = new ArrayList<>();
        for (Map<String, Object> item : items){
            Map<String, Object> tradable = (Map<String, Object>) item.get("tradable");
            Map<String, Object> club = (Map<String, Object>) tradable.get("club");
            Map<String, Object> linksClub = (Map<String, Object>) club.get("_links");
            Map<String, Object> logo = (Map<String, Object>) linksClub.get("logo");
            Map<String, Object> links = (Map<String, Object>) tradable.get("_links");
            Map<String, Object> foto = (Map<String, Object>) links.get("photo");
            Map<String, Object> user = (Map<String, Object>) item.get("user");
            Map<String, Object> tradingPartner = (Map<String, Object>) item.get("tradingPartner");

            Oferta o = new Oferta();
            o.setId((int) item.get("id"));
            o.setIdPlayer((int) tradable.get("id"));
            o.setName((String) tradable.get("name"));
            o.setClubName((String) club.get("name"));
            o.setLogoClub((String) logo.get("href"));
            o.setFotoJugador((String) foto.get("href"));
            o.setTipoOferta((String) item.get("type"));
            String estado = (String) item.get("state");
            if(estado.equals("PENDING")){
                o.setEstado("Pendiente");
            }
            o.setPrecio((int) item.get("price"));
            o.setValor((int) tradable.get("quotedPrice"));
            o.setNombreUsuario((String) user.get("name"));
            o.setUserId((int) user.get("id"));
            o.setNombreContraparte((String) tradingPartner.get("name"));
            o.setCredito((int) response.getBody().get("credit"));
            if(o.getUserId()==Integer.parseInt(userId)){
                o.setEsRealizadaPorMi(true);
            }else{
                o.setEsRealizadaPorMi(false);
            }
            o.setPoints((int) tradable.get("points"));
            o.setPosition((String)tradable.get("position"));

            // Llamamos a la api de info del jugador para rellenar mas campos
            String urlPlayer = String.format("https://www.comunio.es/api/communities/%s/users/%s/players/%s",communityId, userId, o.getIdPlayer());

            HttpHeaders headersPlayer = new HttpHeaders();
            headersPlayer.setBearerAuth(token);
            HttpEntity<Void> entityPlayer = new HttpEntity<>(headersPlayer);

            ResponseEntity<Map> responsePlayer = restTemplate.exchange(urlPlayer, HttpMethod.GET, entityPlayer, Map.class);
            Map<String, Object> general = (Map<String, Object>) responsePlayer.getBody().get("general");
            Map<String, Object> average = (Map<String, Object>) responsePlayer.getBody().get("average");
            Map<String, Object> cards = (Map<String, Object>) responsePlayer.getBody().get("cards");

            o.setEstadoJugador((String) responsePlayer.getBody().get("status"));
            o.setInfoEstado((String) responsePlayer.getBody().get("statusInfo"));
            o.setPartidosJugados((int) general.get("playedGames"));
            o.setGolesTotales((int) general.get("totalGoals"));
            o.setGolesPenalti((int) general.get("totalPenalties"));
            o.setMediaPuntos((String) average.get("points"));
            o.setTarjetasAmarillas((int) cards.get("yellow"));
            o.setTarjetasAmarRoja((int) cards.get("yellowRed"));
            o.setTarjetasRojas((int) cards.get("red"));

            ofertas.add(o);
        }

        return ofertas;
    }

    public List<Oferta> getHistorialOfertas(String token, String communityId, String userId ){
        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/offers?limit=10&sort=datechanged", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");


        List<Oferta> historialOfertas = new ArrayList<>();
        for (Map<String, Object> item : items){
            Map<String, Object> tradable = (Map<String, Object>) item.get("tradable");
            Map<String, Object> club = (Map<String, Object>) tradable.get("club");
            Map<String, Object> linksClub = (Map<String, Object>) club.get("_links");
            Map<String, Object> logo = (Map<String, Object>) linksClub.get("logo");
            Map<String, Object> links = (Map<String, Object>) tradable.get("_links");
            Map<String, Object> foto = (Map<String, Object>) links.get("photo");
            Map<String, Object> user = (Map<String, Object>) item.get("user");
            Map<String, Object> tradingPartner = (Map<String, Object>) item.get("tradingPartner");

            Oferta o = new Oferta();
            o.setId((int) item.get("id"));
            String fecha = (String) item.get("datecreated");
            o.setFecha(formatearFecha(fecha));
            o.setIdPlayer((int) tradable.get("id"));
            o.setName((String) tradable.get("name"));
            o.setClubName((String) club.get("name"));
            o.setLogoClub((String) logo.get("href"));
            o.setFotoJugador((String) foto.get("href"));
            if(((String) item.get("type")).equalsIgnoreCase("SALE")){
                o.setTipoOferta("Venta");
            }else{
                o.setTipoOferta("Compra");
            }
            String estado = (String) item.get("state");
            switch (estado.toUpperCase()) {
                case "PENDING":
                    o.setEstado("Pendiente");
                    break;
                case "DECLINED":
                    o.setEstado("Rechazada");
                    break;
                case "EXPIRED":
                    o.setEstado("Caducada");
                    break;
                case "CANCELLED":
                    o.setEstado("Cancelada");
                    break;
                case "PROCESSED":
                    o.setEstado("Aceptada");
                    break;
                default:
                    o.setEstado("Desconocido"); // Opcional: por si llega otro estado inesperado
                    break;
            }
            o.setPrecio((int) item.get("price"));
            o.setValor((int) tradable.get("quotedPrice"));
            o.setNombreUsuario((String) user.get("name"));
            o.setUserId((int) user.get("id"));
            o.setNombreContraparte((String) tradingPartner.get("name"));
            o.setCredito((int) response.getBody().get("credit"));
            if(o.getUserId()==Integer.parseInt(userId)){
                o.setEsRealizadaPorMi(true);
            }else{
                o.setEsRealizadaPorMi(false);
            }
            o.setPoints((int) tradable.get("points"));

            // Llamamos a la api de info del jugador para rellenar mas campos
            String urlPlayer = String.format("https://www.comunio.es/api/communities/%s/users/%s/players/%s",communityId, userId, o.getIdPlayer());

            HttpHeaders headersPlayer = new HttpHeaders();
            headersPlayer.setBearerAuth(token);
            HttpEntity<Void> entityPlayer = new HttpEntity<>(headersPlayer);

            ResponseEntity<Map> responsePlayer = restTemplate.exchange(urlPlayer, HttpMethod.GET, entityPlayer, Map.class);
            Map<String, Object> general = (Map<String, Object>) responsePlayer.getBody().get("general");
            Map<String, Object> average = (Map<String, Object>) responsePlayer.getBody().get("average");
            Map<String, Object> cards = (Map<String, Object>) responsePlayer.getBody().get("cards");

            o.setEstadoJugador((String) responsePlayer.getBody().get("status"));
            o.setInfoEstado((String) responsePlayer.getBody().get("statusInfo"));
            o.setPartidosJugados((int) general.get("playedGames"));
            o.setGolesTotales((int) general.get("totalGoals"));
            o.setGolesPenalti((int) general.get("totalPenalties"));
            o.setMediaPuntos((String) average.get("points"));
            o.setTarjetasAmarillas((int) cards.get("yellow"));
            o.setTarjetasAmarRoja((int) cards.get("yellowRed"));
            o.setTarjetasRojas((int) cards.get("red"));

            historialOfertas.add(o);
        }

        return historialOfertas;
    }
    
    public List<Mercado> getMercado(String token, String communityId, String userId, String userName){
        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/exchangemarket", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");

        List<Mercado> jugadores = new ArrayList<>();
        for (Map<String, Object> item : items){
            Map<String, Object> embedded = (Map<String, Object>) item.get("_embedded");
            Map<String, Object> jugador = (Map<String, Object>) embedded.get("player");
            Map<String, Object> club = (Map<String, Object>) jugador.get("club");
            Map<String, Object> owner = (Map<String, Object>) embedded.get("owner");
            Map<String, Object> links = (Map<String, Object>) jugador.get("_links");
            Map<String, Object> linksClub = (Map<String, Object>) club.get("_links");
            Map<String, Object> foto = (Map<String, Object>) links.get("photo");
            Map<String, Object> fotoClub = (Map<String, Object>) linksClub.get("logo");

            Mercado m = new Mercado();
            m.setId(((Number) jugador.get("id")).intValue());
            m.setNamePlayer((String) jugador.get("name"));
            m.setClub((String) club.get("name"));
            m.setUrlPhotoClub((String) fotoClub.get("href"));
            m.setPosition(traducirPosicion((String) jugador.get("position")));
            m.setPrice(((Number) jugador.get("quotedPrice")).intValue());
            m.setRecommendedPrice(((Number) jugador.get("recommendedPrice")).intValue());
            m.setUrlPhoto((String) foto.get("href"));
            m.setDate((String) item.get("date"));
            m.setRemaining(((Number) item.get("remaining")).intValue());
            m.setOwner((String) owner.get("name"));
            m.setOwnerId((int) owner.get("id"));
            if (m.getOwnerId() == Integer.parseInt(userId)){
                m.setEsMio(true);
            }else{
                m.setEsMio(false);
            }
            m.setPuntos((String)jugador.get("points"));

            //Llamamos a ofertas para ver si algun jugador del mercado tiene ofertas realizadas por el mismo
            List<Oferta> listaOfertas = getOfertas(token, communityId, userId);

            for(Oferta o : listaOfertas){
                if (o.getIdPlayer()==m.getId()){
                    m.setTieneOferta(true);
                    m.setMiOferta(o.getPrecio());
                    break;
                }else{
                    m.setTieneOferta(false);
                }
            }

            // Llamamos a la api de info del jugador para rellenar mas campos
            String urlPlayer = String.format("https://www.comunio.es/api/communities/%s/users/%s/players/%s",communityId, userId, m.getId());

            HttpHeaders headersPlayer = new HttpHeaders();
            headersPlayer.setBearerAuth(token);
            HttpEntity<Void> entityPlayer = new HttpEntity<>(headersPlayer);

            ResponseEntity<Map> responsePlayer = restTemplate.exchange(urlPlayer, HttpMethod.GET, entityPlayer, Map.class);
            Map<String, Object> general = (Map<String, Object>) responsePlayer.getBody().get("general");
            Map<String, Object> average = (Map<String, Object>) responsePlayer.getBody().get("average");
            Map<String, Object> cards = (Map<String, Object>) responsePlayer.getBody().get("cards");

            m.setEstado((String) responsePlayer.getBody().get("status"));
            m.setInfoEstado((String) responsePlayer.getBody().get("statusInfo"));
            m.setPartidosJugados((int) general.get("playedGames"));
            m.setGolesTotales((int) general.get("totalGoals"));
            m.setGolesPenalti((int) general.get("totalPenalties"));
            m.setMediaPuntos((String) average.get("points"));
            m.setTarjetasAmarillas((int) cards.get("yellow"));
            m.setTarjetasAmarRoja((int) cards.get("yellowRed"));
            m.setTarjetasRojas((int) cards.get("red"));
            m.setLastPoints(String.valueOf((int) responsePlayer.getBody().get("lastPoints")));
            m.setPrecio(String.valueOf((int) responsePlayer.getBody().get("price")));

            jugadores.add(m);
        }

        return jugadores;
    }

    public List<Clasificacion> getClasificacion(String token, String communityId){
        String url = String.format("https://www.comunio.es/api/communities/%s/standings?period=live&wpe=true", communityId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");

        List<Clasificacion> clasificacion = new ArrayList<>();
        for (Map<String, Object> item : items){
            Map<String, Object> embedded = (Map<String, Object>) item.get("_embedded");
            Map<String, Object> user = (Map<String, Object>) embedded.get("user");

            Clasificacion c = new Clasificacion();
            c.setName((String) user.get("name"));
            c.setUserId(String.valueOf((int) user.get("id")));
            c.setPosicion((int) user.get("position"));
            c.setTotalPoints((int) item.get("totalPoints"));
            c.setLivePoints((int) item.get("livePoints"));

            // Creamos un if por si el valor no es int
            if(item.get("lastPoints").getClass().equals(Integer.class)){
                c.setTotalPointsLastMatchday((int) item.get("lastPoints"));
            }else{
                c.setTotalPointsLastMatchday(0);
            }
            
            clasificacion.add(c);
        }

        return clasificacion;
    }
    
    public List<Alineacion> getAlineacion(String token, String communityId, String userId){
        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/lineup",communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        Map<String, Object> items = (Map<String, Object>) response.getBody().get("items");
        Map<String, Object> lineup = (Map<String, Object>) items.get("lineup");

        List<Alineacion> alineacion = new ArrayList<>();
        for(Object obj : lineup.values()){
            Map<String, Object> line = (Map<String, Object>) obj;

            Map<String, Object> club = (Map<String, Object>) line.get("club");
            Map<String, Object> clubLinks = (Map<String, Object>) club.get("_links");
            Map<String, Object> logo = (Map<String, Object>) clubLinks.get("logo");
            Map<String, Object> links = (Map<String, Object>) line.get("_links");
            Map<String, Object> playerPhoto = (Map<String, Object>) links.get("photo");

            Alineacion a = new Alineacion();
            a.setId((int) line.get("id"));
            a.setName((String) line.get("name"));
            a.setPosition((int) line.get("position"));
            a.setPhoto((String) playerPhoto.get("href"));
            a.setClubName((String) club.get("name"));
            a.setClubId((int) club.get("id"));
            a.setClubLogo((String) logo.get("href"));
            a.setPoints((int) line.get("points"));
            a.setLastPoints((String) line.get("lastPoints"));
            a.setLivePoints((String) line.get("livePoints"));
            a.setType(traducirPosicion((String) line.get("type")));
            a.setTactic((String) response.getBody().get("tactic"));

            // Llamamos a la api de info del jugador para rellenar mas campos
            String urlPlayer = String.format("https://www.comunio.es/api/communities/%s/users/%s/players/%s",communityId, userId, a.getId());

            HttpHeaders headersPlayer = new HttpHeaders();
            headersPlayer.setBearerAuth(token);
            HttpEntity<Void> entityPlayer = new HttpEntity<>(headersPlayer);

            ResponseEntity<Map> responsePlayer = restTemplate.exchange(urlPlayer, HttpMethod.GET, entityPlayer, Map.class);
            Map<String, Object> general = (Map<String, Object>) responsePlayer.getBody().get("general");
            Map<String, Object> average = (Map<String, Object>) responsePlayer.getBody().get("average");
            Map<String, Object> cards = (Map<String, Object>) responsePlayer.getBody().get("cards");

            a.setPrice((int) responsePlayer.getBody().get("price"));
            a.setEstado((String) responsePlayer.getBody().get("status"));
            a.setInfoEstado((String) responsePlayer.getBody().get("statusInfo"));
            a.setPartidosJugados((int) general.get("playedGames"));
            a.setGolesTotales((int) general.get("totalGoals"));
            a.setGolesPenalti((int) general.get("totalPenalties"));
            a.setMediaPuntos((String) average.get("points"));
            a.setTarjetasAmarillas((int) cards.get("yellow"));
            a.setTarjetasAmarRoja((int) cards.get("yellowRed"));
            a.setTarjetasRojas((int) cards.get("red"));

            alineacion.add(a);
        }

        return alineacion;
    }

    public List<Player> getPlantilla(String token, String communityId, String userId){
        String url = String.format("https://www.comunio.es/api/users/%s/squad", userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");
        
        List<Player> plantilla = new ArrayList<>();
        for (Map<String, Object> item : items){
            Map<String, Object> club = (Map<String, Object>) item.get("club");
            Map<String, Object> links = (Map<String, Object>) club.get("_links");
            Map<String, Object> logo = (Map<String, Object>) links.get("logo");
            Map<String, Object> playerLinks = (Map<String, Object>) item.get("_links");
            Map<String, Object> foto = (Map<String, Object>) playerLinks.get("photo");

            Player p = new Player();
            p.setClub((String) club.get("name"));
            p.setId((int) item.get("id"));
            p.setHrefClubLogo((String) logo.get("href"));
            p.setHrefFoto((String) foto.get("href"));
            if(item.get("averagePoints").getClass()==String.class){
                p.setMediaPuntos((String) item.get("averagePoints"));
            }else{
                int media = ((int) item.get("averagePoints"));
                p.setMediaPuntos(String.valueOf(media));

            }
            p.setName((String) item.get("name"));
            //Modificamos la posicion para la tarjeta
            String posicion = ((String) item.get("position")).toLowerCase();
            switch (posicion) {
                case "keeper" -> p.setPosicion("PO");
                case "defender" -> p.setPosicion("DF");
                case "midfielder" -> p.setPosicion("ME");
                default -> p.setPosicion("DL");
            }
            p.setPuntosTotales((String) item.get("points"));
            p.setUltimosPuntos((String) item.get("lastPoints"));
            p.setValor((int) item.get("quotedprice"));
            p.setOnMarket((Boolean) item.get("onMarket"));
            p.setLinedup((Boolean) item.get("linedup"));

            // Llamamos a la api de info del jugador para rellenar mas campos
            String urlPlayer = String.format("https://www.comunio.es/api/communities/%s/users/%s/players/%s",communityId, userId, p.getId());

            HttpHeaders headersPlayer = new HttpHeaders();
            headersPlayer.setBearerAuth(token);
            HttpEntity<Void> entityPlayer = new HttpEntity<>(headersPlayer);

            ResponseEntity<Map> responsePlayer = restTemplate.exchange(urlPlayer, HttpMethod.GET, entityPlayer, Map.class);
            Map<String, Object> general = (Map<String, Object>) responsePlayer.getBody().get("general");
            Map<String, Object> cards = (Map<String, Object>) responsePlayer.getBody().get("cards");

            p.setEstado((String) responsePlayer.getBody().get("status"));
            p.setInfoEstado((String) responsePlayer.getBody().get("statusInfo"));
            p.setPartidosJugados((int) general.get("playedGames"));
            p.setGolesTotales((int) general.get("totalGoals"));
            p.setGolesPenalti((int) general.get("totalPenalties"));
            p.setTarjetasAmarillas((int) cards.get("yellow"));
            p.setTarjetasAmarRoja((int) cards.get("yellowRed"));
            p.setTarjetasRojas((int) cards.get("red"));

            plantilla.add(p);
        }

        return plantilla;
    }

    public void ponerJugadorEnVenta(String token, String communityId, String userId, Long tradableId, Integer precio) {
        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/exchangemarket/addplayer", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        // JSON que espera la API
        Map<String, Object> item = new HashMap<>();
        item.put("tradableId", tradableId);
        item.put("price", precio);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("items", List.of(item));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Error al vender jugador: " + response.getStatusCode());
        }
    }

    public void quitarJugadorEnVenta(String token, String communityId, String userId, long tradableId){
        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/exchangemarket/removeplayer", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("tradableIds", List.of(tradableId));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (!response.getStatusCode().is2xxSuccessful()){
            throw new RuntimeException("Error al quitar el jugador de mercado: " + response.getStatusCode());
        }
        
    }

    public void realizarOferta(String token, String communityId, String userId, long tradableId, Integer precio){

        String url = String.format("Https://www.comunio.es/api/communities/%s/users/%s/offers", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        Map<String, Object> offers = new HashMap<>();
        offers.put("price", precio);
        offers.put("type", "NEW");
        offers.put("tradableid", tradableId);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("offers", List.of(offers));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if(!response.getStatusCode().is2xxSuccessful()){
            throw new RuntimeException("Error al realizar la oferta: " + response.getStatusCode());
        }

    }

    public void retirarOferta(String token, String communityId, String userId, long tradableId, Integer precio){

        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/offers", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        // Recuperamos OfferId
        int offerId = buscarOfferId(tradableId, token, communityId, userId);

        Map<String, Object> offer = new HashMap<>();
        offer.put("price", precio);
        offer.put("type", "DELETE");
        offer.put("offerid", offerId);
        offer.put("tradableid", tradableId);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("offers", List.of(offer));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Error al retirar la oferta: " + response.getStatusCode());
        }

    }

    public void modificarOferta(String token, String communityId, String userId, long tradableId, Integer precio){

        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/offers", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        // Recuperamos OfferId
        int offerId = buscarOfferId(tradableId, token, communityId, userId);

        Map<String, Object> offer = new HashMap<>();
        offer.put("price", precio);
        offer.put("type", "CHANGE");
        offer.put("offerid", offerId);
        offer.put("tradableid", tradableId);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("offers", List.of(offer));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Error al retirar la oferta: " + response.getStatusCode());
        }

    }

    public void rechazarOferta(String token, String communityId, String userId, long tradableId, Integer precio){

        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/offers", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        int offerId = buscarOfferId(tradableId, token, communityId, userId);

        Map<String, Object> offer = new HashMap<>();
        offer.put("price", precio);
        offer.put("type", "DECLINE");
        offer.put("offerid", offerId);
        offer.put("tradableid", tradableId);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("offers", List.of(offer));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Error al rechazar la oferta: " + response.getStatusCode());
        }
    }

    public void aceptarOferta(String token, String communityId, String userId, long tradableId, Integer precio){

        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/offers", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        int offerId = buscarOfferId(tradableId, token, communityId, userId);

        Map<String, Object> offer = new HashMap<>();
        offer.put("price", precio);
        offer.put("type", "ACCEPT");
        offer.put("offerid", offerId);
        offer.put("tradableid", tradableId);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("offers", List.of(offer));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Error al aceptar la oferta: " + response.getStatusCode());
        }
    }

    public void modificarAlineacion(String token, String communityId, String userId, Map<String, Object> payload){

        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/lineup", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Fallo guardando alineación en Comunio: " + response.getStatusCode());
        }
    }

    public static String traducirPosicion(String posicion) {
        if (posicion == null) return "";
        switch (posicion.toLowerCase()) {
            case "keeper": return "PO";
            case "defender": return "DF";
            case "midfielder": return "ME";
            case "striker": return "DL";
            default: return posicion; // por si hay una nueva no reconocida
        }
    }

    public static String formatearFecha(String fechaOriginal) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ");
        OffsetDateTime fecha = OffsetDateTime.parse(fechaOriginal, formatter);
        return fecha.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
    }

    public int buscarOfferId(long tradeableId, String token, String communityId, String userId ){

        List<Oferta> listaOfertas = getOfertas(token, communityId, userId);

        int offerId = 0;

        for (Oferta o : listaOfertas){
            if(Integer.valueOf(o.getIdPlayer()) == tradeableId){
                offerId=o.getId();
            }
        }

        return offerId;
    }

    public List<UserInfo> getListadoIds(String token, String communityId){
        String url = String.format("https://www.comunio.es/api/communities/%s/members", communityId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        List<Map<String, Object>> members = (List<Map<String, Object>>) response.getBody().get("members");
        
        List<UserInfo> users = new ArrayList<>();
        for (Map<String, Object> member : members){

            UserInfo u = new UserInfo();
            u.setId(String.valueOf((int)member.get("id")));
            u.setName((String)member.get("login"));
            u.setFirstName((String)member.get("firstName"));
            u.setLastName((String)member.get("lastName"));
            u.setIsLeader((Boolean)member.get("leader"));

            String lastAction = (String)member.get("lastaction");
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ");
            OffsetDateTime fecha = OffsetDateTime.parse(lastAction, formatter);
            long dias = ChronoUnit.DAYS.between(fecha, OffsetDateTime.now());
            if(dias > 5){
                u.setLastAction("naranja");
            }else{
                u.setLastAction("verde");
            }

            users.add(u);
        }

        return users;
    }

    public List<Transactions> getTransacciones(String token, String communityId, String userId){
        String url = String.format("https://www.comunio.es/api/communities/1715327/users/4627585/offers?type=UNDOABLE", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");

        List<Transactions> transacciones = new ArrayList<>();
        for (Map<String, Object> item : items){
            Transactions t = new Transactions();
            t.setId((int)item.get("id"));
            Map<String, Object> tradable = (Map<String, Object>) item.get("tradable");
            t.setPlayerId((int)tradable.get("id"));
            String name = (String)tradable.get("name");
            name = name.replaceAll("for ", "por ");
            t.setName(name);
            t.setPurchasePrice((int)tradable.get("purchasePrice"));
            Map<String, Object> owner = (Map<String, Object>)item.get("owner");
            t.setPropietarioId((int)owner.get("id"));
            t.setPropietarioNombre((String)owner.get("name"));
            Map<String, Object> comprador = (Map<String, Object>)item.get("customer");
            t.setCompradorId((int)comprador.get("id"));
            t.setCompradorNombre((String)comprador.get("name"));

            transacciones.add(t);
        }

        return transacciones;

    }

    public void abonoSancion(String token, String communityId, String userId, Map<String, Object> payload){

        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/penalties", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        if (!response.getStatusCode().is2xxSuccessful()){
            throw new RuntimeException("Fallo guardando Sancion/Abono: " + response.getStatusCode());
        }
    }
    
    public void anularFichajeAdministracion(String token, String communityId, String userId, Map<String, Object> payload){

        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/offers", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Fallo guardando alineación en Comunio: " + response.getStatusCode());
        }
    }

    public Map<String, Object> cargarHistoricoValorJugador(String jugadorName){

        String url = String.format("https://www.comuniazo.com/comunio-apuestas/jugadores/%s", jugadorName);
        Map<String, Object> result = new HashMap<>();

        try {
            Document doc = Jsoup.connect(url).get();

            // Extraemos box-chart (valores de mercado)
            Element script = doc.select("script").stream()
                    .filter(s -> s.html().contains("marketChart(["))
                    .findFirst().orElse(null);

            if (script != null){
                String scriptHtml = script.html();
                Pattern pattern = Pattern.compile("marketChart\\((\\[.*?\\])", Pattern.DOTALL);
                Matcher matcher = pattern.matcher(scriptHtml);

                if (matcher.find()){
                    String jsonArray = matcher.group(1);
                    ObjectMapper mapper = new ObjectMapper();
                    List<Map<String, Object>> valores = mapper.readValue(jsonArray, new TypeReference<>() {});
                    result.put("boxChart", valores);
                }
            }

            return result;

        } catch (Exception e) {
            result.put("error", e.getMessage());
            return result;
        }
    }

    public Map<String, Object> getHistoricoPuntosJugador(String jugadorName){

        //Controlamos las excepciones de los jugadores
        switch (jugadorName) {
            case "roberto-fernandez":
                jugadorName="roberto-fernandez-2";
                break;
            case "miguel-rubio":
                jugadorName="miguel-angel-rubio";
                break;
            case "abdon-prats":
                jugadorName="abdon";
                break;
            default:
                break;
        }

        String url = String.format("https://www.comuniazo.com/comunio-apuestas/jugadores/%s", jugadorName);
        Map<String, Object> result = new HashMap<>();

        try {
            Document doc = Jsoup.connect(url).get();


            // 1. Extraemos box.points
            Element boxPoints = doc.selectFirst("div.box.box-points");
            if(boxPoints != null){
                Map<String, Object> puntosData = new LinkedHashMap<>();

                // Tabla de jornadas
                List<Map<String, Object>> jornadas = new ArrayList<>();
                Elements rows = boxPoints.select("table.points-list tr");
                for(Element row : rows){
                    Map<String, Object> jornada = new HashMap<>();
                    jornada.put("week", row.selectFirst("td.week") != null ? row.selectFirst("td.week").text() : "");

                    // Buscar el span que tiene el número de puntos
                    Element span = row.selectFirst("td:last-child span");
                    String points = span != null ? span.text() : "-";
                    jornada.put("points", points);

                    jornadas.add(jornada);
                }

                puntosData.put("jornadas", jornadas);

                result.put("boxPoints", puntosData);
            }

            return result;

        } catch (Exception e) {
            result.put("error", e.getMessage());
            return result;
        }
    }

    public List<Clasificacion> getClasificacionMes(String token, String communityId, String mesSeleccionado){

        String url;
        if(Integer.parseInt(mesSeleccionado) >= 8 && Integer.parseInt(mesSeleccionado) <= 12){
            url = String.format("https://www.comunio.es/api/communities/%s/standings?period=month&year=2025&month=%s", communityId, mesSeleccionado);
        }else{
            url = String.format("https://www.comunio.es/api/communities/%s/standings?period=month&year=2026&month=%s", communityId, mesSeleccionado);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");

        List<Clasificacion> clasificacionMes = new ArrayList<>();
        for (Map<String, Object> item : items){
            Map<String, Object> embedded = (Map<String, Object>) item.get("_embedded");
            Map<String, Object> user = (Map<String, Object>) embedded.get("user");

            Clasificacion c = new Clasificacion();
            c.setName((String) user.get("name"));
            c.setTotalPoints((int) item.get("totalPoints"));
            
            clasificacionMes.add(c);
        }

        return clasificacionMes;
    }
    
    public List<Player> getPlantillaJugador(String userId, String token){
        String url = String.format("https://www.comunio.es/api/users/%s/squad?state=infoUser", userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");
        
        List<Player> plantilla = new ArrayList<>();
        for (Map<String, Object> item : items){
            Map<String, Object> club = (Map<String, Object>) item.get("club");
            Map<String, Object> links = (Map<String, Object>) club.get("_links");
            Map<String, Object> logo = (Map<String, Object>) links.get("logo");
            Map<String, Object> playerLinks = (Map<String, Object>) item.get("_links");
            Map<String, Object> foto = (Map<String, Object>) playerLinks.get("photo");

            Player p = new Player();
            p.setClub((String) club.get("name"));
            p.setId((int) item.get("id"));
            p.setHrefClubLogo((String) logo.get("href"));
            p.setHrefFoto((String) foto.get("href"));
            p.setName((String) item.get("name"));
            //Modificamos la posicion para la tarjeta
            String posicion = ((String) item.get("position")).toLowerCase();
            switch (posicion) {
                case "keeper":
                    p.setPosicion("PO");
                    p.setPosicionNumber(1);
                    break;
                case "defender":
                    p.setPosicion("DF");
                    p.setPosicionNumber(2);
                    break;
                case "midfielder":
                    p.setPosicion("ME");
                    p.setPosicionNumber(3);
                    break;
                default:
                    p.setPosicion("DL");
                    p.setPosicionNumber(4);
                    break;
            }
            p.setPuntosTotales((String) item.get("points"));
            p.setUltimosPuntos((String) item.get("lastPoints"));
            p.setLinedup((Boolean) item.get("linedup"));

            plantilla.add(p);

        }

        // Ordenamos la plantilla por posicion
        plantilla.sort(Comparator.comparingInt(Player::getPosicionNumber));

        return plantilla;
    }
}
