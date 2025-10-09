package com.enrique.comuniowebapp.comuniowebapp.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.enrique.comuniowebapp.comuniowebapp.dto.TokenResponse;




@Service
public class AuthService {

    private final RestTemplate restTemplate;
    

    public AuthService(RestTemplateBuilder builder){
        this.restTemplate = builder.build();
    }

    public TokenResponse getToken(String username, String password){
        String url = "https://api.comunio.es/login";

        Map<String, String> body = new HashMap<>();
        body.put("username", username);
        body.put("password", password);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        TokenResponse tokenResponse = new TokenResponse();

        tokenResponse.setAccessToken((String) response.getBody().get("access_token"));
        tokenResponse.setRefreshToken((String) response.getBody().get("refresh_token"));
        tokenResponse.setExpiresIn((int) response.getBody().get("expires_in"));

        return tokenResponse;
    }

    public TokenResponse refreshAccessToken(String refreshToken) {
        String url = "https://www.comunio.es/api/oauth/refresh";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "refresh_token");
        params.add("refresh_token", refreshToken);
        params.add("client_id", "TU_CLIENT_ID");
        params.add("client_secret", "TU_CLIENT_SECRET");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<TokenResponse> response = restTemplate.exchange(
                url, HttpMethod.POST, request, TokenResponse.class);

        return response.getBody();
    }

}