package com.enrique.comuniowebapp.comuniowebapp.dto;

import java.util.Map;

public class AlineacionForm {
    private String tactic;
    private Map<String, String> lineup; // clave: posición "1", valor: id jugador
    private Map<String, String> substitutes; // clave: "striker", etc.
    private String type;
    public String getTactic() {
        return tactic;
    }
    public void setTactic(String tactic) {
        this.tactic = tactic;
    }
    public Map<String, String> getLineup() {
        return lineup;
    }
    public void setLineup(Map<String, String> lineup) {
        this.lineup = lineup;
    }
    public Map<String, String> getSubstitutes() {
        return substitutes;
    }
    public void setSubstitutes(Map<String, String> substitutes) {
        this.substitutes = substitutes;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

}
