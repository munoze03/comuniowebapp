package com.enrique.comuniowebapp.comuniowebapp.dto;

import java.util.List;

public class EstadisticasJugador {

    private String nombre;
    private int id;
    private String enlace;
    private String equipoLogo;
    private String posicion;
    private String puntos;
    private String media;
    private String localPuntos;
    private String localMedia;
    private String visitantePuntos;
    private String visitanteMedia;
    private String valor;
    private List<String> racha;
    private String propietario;

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getEnlace() {
        return enlace;
    }
    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }
    public String getEquipoLogo() {
        return equipoLogo;
    }
    public void setEquipoLogo(String equipoLogo) {
        this.equipoLogo = equipoLogo;
    }
    public String getPuntos() {
        return puntos;
    }
    public void setPuntos(String puntos) {
        this.puntos = puntos;
    }
    public String getMedia() {
        return media;
    }
    public void setMedia(String media) {
        this.media = media;
    }
    public String getLocalPuntos() {
        return localPuntos;
    }
    public void setLocalPuntos(String localPuntos) {
        this.localPuntos = localPuntos;
    }
    public String getLocalMedia() {
        return localMedia;
    }
    public void setLocalMedia(String localMedia) {
        this.localMedia = localMedia;
    }
    public String getVisitantePuntos() {
        return visitantePuntos;
    }
    public void setVisitantePuntos(String visitantePuntos) {
        this.visitantePuntos = visitantePuntos;
    }
    public String getVisitanteMedia() {
        return visitanteMedia;
    }
    public void setVisitanteMedia(String visitanteMedia) {
        this.visitanteMedia = visitanteMedia;
    }
    public String getValor() {
        return valor;
    }
    public void setValor(String valor) {
        this.valor = valor;
    }
    public List<String> getRacha() {
        return racha;
    }
    public void setRacha(List<String> racha) {
        this.racha = racha;
    }
    public String getPosicion() {
        return posicion;
    }
    public void setPosicion(String posicion) {
        this.posicion = posicion;
    }

    // Metodo para darle color a las celdas de la racha en funcion a la puntuacion
    public String getClaseRacha(String punto) {
        if (punto.equals("-")){
            return "rachaGris";
        } else{
            int puntuacion = Integer.parseInt(punto);
            if (puntuacion <= 0) return "rachaRojo";
            if (puntuacion <= 4) return "rachaNaranja";
            if (puntuacion <= 9) return "rachaVerde";
            if (puntuacion > 9) return "rachaAzul";
        }
        return "rachaGris";
    }
    public String getPropietario() {
        return propietario;
    }
    public void setPropietario(String propietario) {
        this.propietario = propietario;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    
}
