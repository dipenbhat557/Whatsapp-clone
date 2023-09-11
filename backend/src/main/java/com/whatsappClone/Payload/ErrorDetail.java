package com.whatsappClone.Payload;

import java.time.LocalDateTime;

public class ErrorDetail {

    private String error;

    private String message;

    private LocalDateTime timeStamp;

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public ErrorDetail() {
    }

    public ErrorDetail(String error, String message, LocalDateTime timeStamp) {
        this.error = error;
        this.message = message;
        this.timeStamp = timeStamp;
    }

    @Override
    public String toString() {
        return "ErrorDetail [error=" + error + ", message=" + message + ", timeStamp=" + timeStamp + "]";
    }

}
