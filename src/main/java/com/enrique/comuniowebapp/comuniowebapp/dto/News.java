package com.enrique.comuniowebapp.comuniowebapp.dto;

public class News {

    private Long id;
    private String date;
    private String title;
    private String messageHtml;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getMessageHtml() {
        return messageHtml;
    }
    public void setMessageHtml(String messageHtml) {
        this.messageHtml = messageHtml;
    }
}