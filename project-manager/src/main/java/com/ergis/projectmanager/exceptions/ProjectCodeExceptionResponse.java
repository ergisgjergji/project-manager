package com.ergis.projectmanager.exceptions;

public class ProjectCodeExceptionResponse {

    private String code;

    public ProjectCodeExceptionResponse(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
