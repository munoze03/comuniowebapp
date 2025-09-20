package com.enrique.comuniowebapp.comuniowebapp.dto;

public class Clasificacion {
    private int posicion;
    private String name;
    private int totalPoints;
    private int totalPointsLastMatchday;
    private int livePoints;
    private String userId;

    public int getPosicion() {
        return posicion;
    }
    public void setPosicion(int posicion) {
        this.posicion = posicion;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getTotalPoints() {
        return totalPoints;
    }
    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }
    public int getTotalPointsLastMatchday() {
        return totalPointsLastMatchday;
    }
    public void setTotalPointsLastMatchday(int totalPointsLastMatchday) {
        this.totalPointsLastMatchday = totalPointsLastMatchday;
    }
    public int getLivePoints() {
        return livePoints;
    }
    public void setLivePoints(int livePoints) {
        this.livePoints = livePoints;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
}
