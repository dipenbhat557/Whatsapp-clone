package com.whatsappClone.Payload;

public class AuthResponse {

    private String jwt;
    private boolean isAuth;

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public boolean isAuth() {
        return isAuth;
    }

    public void setAuth(boolean isAuth) {
        this.isAuth = isAuth;
    }

    public AuthResponse() {
    }

    public AuthResponse(String jwt, boolean isAuth) {
        this.jwt = jwt;
        this.isAuth = isAuth;
    }

    @Override
    public String toString() {
        return "AuthResponse [jwt=" + jwt + ", isAuth=" + isAuth + "]";
    }

}
