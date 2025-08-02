package com.enrique.comuniowebapp.comuniowebapp.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.enrique.comuniowebapp.comuniowebapp.dto.Clasificacion;
import com.enrique.comuniowebapp.comuniowebapp.dto.Mercado;
import com.enrique.comuniowebapp.comuniowebapp.dto.News;
import com.enrique.comuniowebapp.comuniowebapp.dto.UserInfo;

@Service
public class ComunioUserService {

    private final RestTemplate restTemplate;

    public ComunioUserService(RestTemplateBuilder builder){
        this.restTemplate = builder.build();
    }

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

        return info;
    }

    public List<News> getUserNews(String token, String communityId, String userId){
        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/news", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        Map<String, Object> newsListMap = (Map<String, Object>) response.getBody().get("newsList");

        List<Map<String, Object>> entries = (List<Map<String, Object>>) newsListMap.get("entries");
        List<News> news = new ArrayList<>();

        for (Map<String, Object> entry : entries){
            News n = new News();
            n.setId(((Number) entry.get("id")).longValue());
            String date = (String) entry.get("date");
            date = date.replaceAll("T", " ");
            //date = date.replaceAll("+0200", " ");            
            n.setDate(date);

            n.setTitle((String) entry.get("title"));

            Map<String, Object> message = (Map<String, Object>) entry.get("message");
            String messageHtml = (String) message.get("text");

            //Limpiamos el mensaje de links
            String cleanedHtml = messageHtml.replaceAll("(?i)<a[^>]*>(.*?)</a>", "$1");
            //Cambiamos palabras en ingles a espanol
            cleanedHtml = cleanedHtml.replaceAll("transfers for", "cambia por");
            cleanedHtml = cleanedHtml.replaceAll("from", "de");
            cleanedHtml = cleanedHtml.replaceAll("to", "a");
            cleanedHtml = cleanedHtml.replaceAll("<br /><br />", " ");
            cleanedHtml = cleanedHtml.replaceAll("\\b\\d{1,2}:\\d{2}\\b - ", " ");

            System.out.println(cleanedHtml);

            n.setMessageHtml(cleanedHtml);

            news.add(n);
        }

        return news;
    }

    public List<Mercado> getMercado(String token, String communityId, String userId){
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
            m.setId(((Number) jugador.get("id")).longValue());
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

            jugadores.add(m);
        }

        return jugadores;
    }

    public List<Clasificacion> getClasificacion(String token, String communityId, String userId){
        String url = String.format("https://www.comunio.es/api/communities/%s/users/%s/prediction_standings", communityId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        Map<String, Object> totalMap = (Map<String, Object>) response.getBody().get("total");
        List<Map<String, Object>> totales = (List<Map<String, Object>>) totalMap.get("standingsPositions");

        List<Clasificacion> clasificacion = new ArrayList<>();
        for (Map<String, Object> total : totales){
            Map<String, Object> user = (Map<String, Object>) total.get("user");

            Clasificacion c = new Clasificacion();
            c.setName((String) user.get("name"));
            c.setPosicion((int) total.get("position"));
            c.setTotalPoints((int) total.get("totalPoints"));
            c.setTotalPointsLastMatchday((int) total.get("totalPoints_lastMatchday"));

            clasificacion.add(c);
        }

        return clasificacion;
    }
    
    public static String traducirPosicion(String posicion) {
        if (posicion == null) return "";
        switch (posicion.toLowerCase()) {
            case "keeper": return "Portero";
            case "defender": return "Defensa";
            case "midfielder": return "Centrocampista";
            case "striker": return "Delantero";
            default: return posicion; // por si hay una nueva no reconocida
        }
    }

        
    
}
