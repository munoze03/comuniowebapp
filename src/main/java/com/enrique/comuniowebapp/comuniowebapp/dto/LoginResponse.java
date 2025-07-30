package com.enrique.comuniowebapp.comuniowebapp.dto;

public class LoginResponse {
    private String token;
    private String userId;
    private String name;
    private String firtName;
    private String lastName;
    private String teamValue;
    private String teamCount;
    private String teamCountLinedUp;
    private String tactic;
    private String email;
    private String communityId;
    private String communityName;

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
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getFirtName() {
        return firtName;
    }
    public void setFirtName(String firtName) {
        this.firtName = firtName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getTeamValue() {
        return teamValue;
    }
    public void setTeamValue(String teamValue) {
        this.teamValue = teamValue;
    }
    public String getTeamCount() {
        return teamCount;
    }
    public void setTeamCount(String teamCount) {
        this.teamCount = teamCount;
    }
    public String getTeamCountLinedUp() {
        return teamCountLinedUp;
    }
    public void setTeamCountLinedUp(String teamCountLinedUp) {
        this.teamCountLinedUp = teamCountLinedUp;
    }
    public String getTactic() {
        return tactic;
    }
    public void setTactic(String tactic) {
        this.tactic = tactic;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getCommunityId() {
        return communityId;
    }
    public void setCommunityId(String communityId) {
        this.communityId = communityId;
    }
    public String getCommunityName() {
        return communityName;
    }
    public void setCommunityName(String communityName) {
        this.communityName = communityName;
    }
}
