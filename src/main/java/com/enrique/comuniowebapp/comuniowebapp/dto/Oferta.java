package com.enrique.comuniowebapp.comuniowebapp.dto;

public class Oferta {
    private int id;
    private int idPlayer;
    private String name;
    private String clubName;
    private String logoClub;
    private String fotoJugador;
    private String tipoOferta;
    private String estado;
    private int precio;
    private String nombreUsuario;
    private int userId;
    private String nombreContraparte;
    private boolean esRealizadaPorMi;
    private int credito;

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
    public String getClubName() {
        return clubName;
    }
    public void setClubName(String clubName) {
        this.clubName = clubName;
    }
    public String getLogoClub() {
        return logoClub;
    }
    public void setLogoClub(String logoClub) {
        this.logoClub = logoClub;
    }
    public String getFotoJugador() {
        return fotoJugador;
    }
    public void setFotoJugador(String fotoJugador) {
        this.fotoJugador = fotoJugador;
    }
    public String getTipoOferta() {
        return tipoOferta;
    }
    public void setTipoOferta(String tipoOferta) {
        this.tipoOferta = tipoOferta;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public int getPrecio() {
        return precio;
    }
    public void setPrecio(int precio) {
        this.precio = precio;
    }
    public String getNombreUsuario() {
        return nombreUsuario;
    }
    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
    public String getNombreContraparte() {
        return nombreContraparte;
    }
    public void setNombreContraparte(String nombreContraparte) {
        this.nombreContraparte = nombreContraparte;
    }
    public boolean isEsRealizadaPorMi() {
        return esRealizadaPorMi;
    }
    public void setEsRealizadaPorMi(boolean esRealizadaPorMi) {
        this.esRealizadaPorMi = esRealizadaPorMi;
    }
    public int getCredito() {
        return credito;
    }
    public void setCredito(int credito) {
        this.credito = credito;
    }
    public int getIdPlayer() {
        return idPlayer;
    }
    public void setIdPlayer(int idPlayer) {
        this.idPlayer = idPlayer;
    }
    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
    
}
