package com.enrique.comuniowebapp.comuniowebapp.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.enrique.comuniowebapp.comuniowebapp.model.TokenResponse;

@Service
public class ComunioAuthService {

    private final RestTemplate restTemplate;

    public ComunioAuthService(RestTemplateBuilder builder){
        this.restTemplate = builder.build();
    }

    public String getToken(String username, String password){
        String url = "https://api.comunio.es/login";

        Map<String, String> body = new HashMap<>();
        body.put("username", username);
        body.put("password", password);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        return (String) response.getBody().get("access_token");
    }

    
}
