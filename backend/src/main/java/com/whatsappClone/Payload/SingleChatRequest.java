package com.whatsappClone.Payload;

public class SingleChatRequest {

    private Integer userId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public SingleChatRequest() {
    }

    public SingleChatRequest(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "SingleChatRequest [userId=" + userId + "]";
    }

}
