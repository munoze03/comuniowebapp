package com.enrique.comuniowebapp.comuniowebapp.service;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ComunioApiService {


    private final RestTemplate restTemplate;

    public ComunioApiService(RestTemplateBuilder builder){
        this.restTemplate = builder.build();
    }

    public String getEquipo(String accessToken){
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
            "https://api.comunio.de/user/team", // ejemplo
            HttpMethod.GET,
            entity,
            String.class
            );

            return response.getBody();
    }
}
