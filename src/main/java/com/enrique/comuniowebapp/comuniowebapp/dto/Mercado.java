package com.enrique.comuniowebapp.comuniowebapp.dto;

public class Mercado {
    private int id;
    private String namePlayer;
    private String club;
    private String urlPhotoClub;
    private String position;
    private int price;
    private int recommendedPrice;
    private String urlPhoto;
    private String date;
    private int remaining;
    private String owner;
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNamePlayer() {
        return namePlayer;
    }
    public void setNamePlayer(String namePlayer) {
        this.namePlayer = namePlayer;
    }
    public String getClub() {
        return club;
    }
    public void setClub(String club) {
        this.club = club;
    }
    public String getPosition() {
        return position;
    }
    public void setPosition(String position) {
        this.position = position;
    }
    public int getPrice() {
        return price;
    }
    public void setPrice(int price) {
        this.price = price;
    }
    public int getRecommendedPrice() {
        return recommendedPrice;
    }
    public void setRecommendedPrice(int recommendedPrice) {
        this.recommendedPrice = recommendedPrice;
    }
    public String getUrlPhoto() {
        return urlPhoto;
    }
    public void setUrlPhoto(String urlPhoto) {
        this.urlPhoto = urlPhoto;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public int getRemaining() {
        return remaining;
    }
    public void setRemaining(int remaining) {
        this.remaining = remaining;
    }
    public String getOwner() {
        return owner;
    }
    public void setOwner(String owner) {
        this.owner = owner;
    }
    public String getUrlPhotoClub() {
        return urlPhotoClub;
    }
    public void setUrlPhotoClub(String urlPhotoClub) {
        this.urlPhotoClub = urlPhotoClub;
    }

}
