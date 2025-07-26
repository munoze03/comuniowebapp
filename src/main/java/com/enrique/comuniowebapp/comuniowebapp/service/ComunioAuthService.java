package com.enrique.comuniowebapp.comuniowebapp.service;

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

    public TokenResponse login(String username, String password){
        String url = "https://api.comunio.de/oauth/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "password");
        body.add("username", username);
        body.add("password", password);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<TokenResponse> response = restTemplate.postForEntity(url, request, TokenResponse.class);

        return response.getBody();
    }

    
}
