package com.enrique.comuniowebapp.comuniowebapp.dto;

public class Transactions {

    private int id;
    private int playerId;
    private String name;
    private int purchasePrice;
    private int propietarioId;
    private String propietarioNombre;
    private int compradorId;
    private String compradorNombre;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getPlayerId() {
        return playerId;
    }
    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getPurchasePrice() {
        return purchasePrice;
    }
    public void setPurchasePrice(int purchasePrice) {
        this.purchasePrice = purchasePrice;
    }
    public int getPropietarioId() {
        return propietarioId;
    }
    public void setPropietarioId(int propietarioId) {
        this.propietarioId = propietarioId;
    }
    public String getPropietarioNombre() {
        return propietarioNombre;
    }
    public void setPropietarioNombre(String propietarioNombre) {
        this.propietarioNombre = propietarioNombre;
    }
    public int getCompradorId() {
        return compradorId;
    }
    public void setCompradorId(int compradorId) {
        this.compradorId = compradorId;
    }
    public String getCompradorNombre() {
        return compradorNombre;
    }
    public void setCompradorNombre(String compradorNombre) {
        this.compradorNombre = compradorNombre;
    }

}
