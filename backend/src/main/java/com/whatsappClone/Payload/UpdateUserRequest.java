package com.whatsappClone.Payload;

public class UpdateUserRequest {

    private String name;

    private String profile;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public UpdateUserRequest() {
    }

    public UpdateUserRequest(String name, String profile) {
        this.name = name;
        this.profile = profile;
    }

    @Override
    public String toString() {
        return "UpdateUserRequest [name=" + name + ", profile=" + profile + "]";
    }

}
