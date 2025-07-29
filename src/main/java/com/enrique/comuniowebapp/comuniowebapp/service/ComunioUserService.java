package com.enrique.comuniowebapp.comuniowebapp.service;


import java.util.Map;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
        info.setId(String.valueOf(data.get("user_id")));
        info.setCommunityId(String.valueOf(((Map) data.get("community")).get("id")));
        info.setName(String.valueOf(data.get("user_name")));
        info.setBudget(Double.parseDouble(String.valueOf(data.get("budget"))));

        return info;
    }
}
