package com.enrique.comuniowebapp.comuniowebapp.dto;

import java.util.ArrayList;
import java.util.List;

public class Jornada {
    private String nombre;
    private List<CalendarioJornada> partidos = new ArrayList<>();
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public List<CalendarioJornada> getPartidos() {
        return partidos;
    }
    public void setPartidos(List<CalendarioJornada> partidos) {
        this.partidos = partidos;
    }

    
}
