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
    private int ownerId;
    private boolean esMio;
    private boolean tieneOferta;
    private int miOferta;
    private String puntos;
    private String lastPoints;
    private String estado;
    private String infoEstado;
    private int partidosJugados;
    private int golesTotales;
    private int golesPenalti;
    private String mediaPuntos;
    private int tarjetasAmarillas;
    private int tarjetasAmarRoja;
    private int tarjetasRojas;
    private String precio;

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
    public Boolean getEsMio() {
        return esMio;
    }
    public int getOwnerId() {
        return ownerId;
    }
    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }
    public void setEsMio(boolean esMio) {
        this.esMio = esMio;
    }
    public boolean isTieneOferta() {
        return tieneOferta;
    }
    public void setTieneOferta(boolean tieneOferta) {
        this.tieneOferta = tieneOferta;
    }
    public int getMiOferta() {
        return miOferta;
    }
    public void setMiOferta(int miOferta) {
        this.miOferta = miOferta;
    }
    public String getPuntos() {
        return puntos;
    }
    public void setPuntos(String puntos) {
        this.puntos = puntos;
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
    public String getMediaPuntos() {
        return mediaPuntos;
    }
    public void setMediaPuntos(String mediaPuntos) {
        this.mediaPuntos = mediaPuntos;
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
    public String getLastPoints() {
        return lastPoints;
    }
    public void setLastPoints(String lastPoints) {
        this.lastPoints = lastPoints;
    }
    public String getPrecio() {
        return precio;
    }
    public void setPrecio(String precio) {
        this.precio = precio;
    }
    
}
