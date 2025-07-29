package com.enrique.comuniowebapp.comuniowebapp.dto;

public class UserInfo {
    private String id;
    private String name;
    private double budget;
    private String communityId;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public double getBudget() {
        return budget;
    }
    public void setBudget(double budget) {
        this.budget = budget;
    }
    public String getCommunityId() {
        return communityId;
    }
    public void setCommunityId(String communityId) {
        this.communityId = communityId;
    }

}
