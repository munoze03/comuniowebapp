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
    private Boolean linedup;
    
    private String estado;
    private String infoEstado;
    private int partidosJugados;
    private int golesTotales;
    private int golesPenalti;
    private int tarjetasAmarillas;
    private int tarjetasAmarRoja;
    private int tarjetasRojas;

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
    public Boolean getLinedup() {
        return linedup;
    }
    public void setLinedup(Boolean linedup) {
        this.linedup = linedup;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public String getInfoEstado() {
        return infoEstado;
    }
    public void setInfoEstado(String infoEstado) {
        this.infoEstado = infoEstado;
    }
    public int getPartidosJugados() {
        return partidosJugados;
    }
    public void setPartidosJugados(int partidosJugados) {
        this.partidosJugados = partidosJugados;
    }
    public int getGolesTotales() {
        return golesTotales;
    }
    public void setGolesTotales(int golesTotales) {
        this.golesTotales = golesTotales;
    }
    public int getGolesPenalti() {
        return golesPenalti;
    }
    public void setGolesPenalti(int golesPenalti) {
        this.golesPenalti = golesPenalti;
    }
    public int getTarjetasAmarillas() {
        return tarjetasAmarillas;
    }
    public void setTarjetasAmarillas(int tarjetasAmarillas) {
        this.tarjetasAmarillas = tarjetasAmarillas;
    }
    public int getTarjetasAmarRoja() {
        return tarjetasAmarRoja;
    }
    public void setTarjetasAmarRoja(int tarjetasAmarRoja) {
        this.tarjetasAmarRoja = tarjetasAmarRoja;
    }
    public int getTarjetasRojas() {
        return tarjetasRojas;
    }
    public void setTarjetasRojas(int tarjetasRojas) {
        this.tarjetasRojas = tarjetasRojas;
    }
    
}