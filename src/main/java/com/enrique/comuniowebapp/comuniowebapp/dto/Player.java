package com.enrique.comuniowebapp.comuniowebapp.dto;

public class Player {
    private String name;
    private int id;
    private String club;
    private String hrefClubLogo;
    private String hrefFoto;
    private String puntosTotales;
    private String ultimosPuntos;
    private String mediaPuntos;
    private String posicion;
    private int valor;
    private Boolean onMarket;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getClub() {
        return club;
    }
    public void setClub(String club) {
        this.club = club;
    }
    public String getHrefClubLogo() {
        return hrefClubLogo;
    }
    public void setHrefClubLogo(String hrefClubLogo) {
        this.hrefClubLogo = hrefClubLogo;
    }
    public String getHrefFoto() {
        return hrefFoto;
    }
    public void setHrefFoto(String hrefFoto) {
        this.hrefFoto = hrefFoto;
    }
    public String getPuntosTotales() {
        return puntosTotales;
    }
    public void setPuntosTotales(String puntosTotales) {
        this.puntosTotales = puntosTotales;
    }
    public String getUltimosPuntos() {
        return ultimosPuntos;
    }
    public void setUltimosPuntos(String ultimosPuntos) {
        this.ultimosPuntos = ultimosPuntos;
    }
    public String getMediaPuntos() {
        return mediaPuntos;
    }
    public void setMediaPuntos(String mediaPuntos) {
        this.mediaPuntos = mediaPuntos;
    }
    public String getPosicion() {
        return posicion;
    }
    public void setPosicion(String posicion) {
        this.posicion = posicion;
    }
    public int getValor() {
        return valor;
    }
    public void setValor(int valor) {
        this.valor = valor;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Boolean getOnMarket() {
        return onMarket;
    }
    public void setOnMarket(Boolean onMarket) {
        this.onMarket = onMarket;
    }
}