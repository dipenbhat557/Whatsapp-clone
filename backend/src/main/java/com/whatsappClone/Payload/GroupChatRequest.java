package com.whatsappClone.Payload;

import java.util.List;

public class GroupChatRequest {

    private List<Integer> userIds;
    private String chatName;
    private String chatImage;

    public List<Integer> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<Integer> userIds) {
        this.userIds = userIds;
    }

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public String getChatImage() {
        return chatImage;
    }

    public void setChatImage(String chatImage) {
        this.chatImage = chatImage;
    }

    public GroupChatRequest() {
    }

    public GroupChatRequest(List<Integer> userIds, String chatName, String chatImage) {
        this.userIds = userIds;
        this.chatName = chatName;
        this.chatImage = chatImage;
    }

    @Override
    public String toString() {
        return "GroupChatRequest [userIds=" + userIds + ", chatName=" + chatName + ", chatImage=" + chatImage + "]";
    }

}
