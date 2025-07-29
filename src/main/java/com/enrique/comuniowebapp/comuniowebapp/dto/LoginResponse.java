package com.enrique.comuniowebapp.comuniowebapp.dto;

public class LoginResponse {
    private String token;
    private String userId;
    private String communityId;
    
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getCommunityId() {
        return communityId;
    }
    public void setCommunityId(String communityId) {
        this.communityId = communityId;
    }
    

}
