package com.enrique.comuniowebapp.comuniowebapp.dto;

public class Alineacion {

    private int position;
    private int id;
    private String name;
    private String photo;
    private String clubName;
    private String clubLogo;
    private int points;
    private String livePoints;
    private String lastPoints;
    private String type;
    private String tactic;

    public int getPosition() {
        return position;
    }
    public void setPosition(int position) {
        this.position = position;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPhoto() {
        return photo;
    }
    public void setPhoto(String photo) {
        this.photo = photo;
    }
    public String getClubName() {
        return clubName;
    }
    public void setClubName(String clubName) {
        this.clubName = clubName;
    }
    public String getClubLogo() {
        return clubLogo;
    }
    public void setClubLogo(String clubLogo) {
        this.clubLogo = clubLogo;
    }
    public int getPoints() {
        return points;
    }
    public void setPoints(int points) {
        this.points = points;
    }
    public String getLivePoints() {
        return livePoints;
    }
    public void setLivePoints(String livePoints) {
        this.livePoints = livePoints;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getTactic() {
        return tactic;
    }
    public void setTactic(String tactic) {
        this.tactic = tactic;
    }
    public String getLastPoints() {
        return lastPoints;
    }
    public void setLastPoints(String lastPoints) {
        this.lastPoints = lastPoints;
    }
    
}
