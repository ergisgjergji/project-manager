package com.ergis.projectmanager.exceptions.ProjectExceptions;

public class ProjectIdExceptionResponse {

    private String id;

    public ProjectIdExceptionResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String code) {
        this.id = id;
    }
}
