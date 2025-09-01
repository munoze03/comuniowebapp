package com.enrique.comuniowebapp.comuniowebapp.dto;

public class UserInfo {
    private String id;
    private String name;
    private String firstName;
    private String lastName;
    private String teamValue;
    private String teamCount;
    private String teamCountLinedUp;
    private String tactic;
    private String email;
    private String communityId;
    private String communityName;
    private String budget;
    private Boolean isLeader;
    private String lastAction;

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
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firtName) {
        this.firstName = firtName;
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
    public String getBudget() {
        return budget;
    }
    public void setBudget(String budget) {
        this.budget = budget;
    }
    public Boolean getIsLeader() {
        return isLeader;
    }
    public void setIsLeader(Boolean isLeader) {
        this.isLeader = isLeader;
    }
    public String getLastAction() {
        return lastAction;
    }
    public void setLastAction(String lastAction) {
        this.lastAction = lastAction;
    }
    
}
