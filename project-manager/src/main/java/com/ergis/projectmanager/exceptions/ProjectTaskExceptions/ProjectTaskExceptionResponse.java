package com.ergis.projectmanager.exceptions.ProjectTaskExceptions;

public class ProjectTaskExceptionResponse {

    private String sequence;

    public ProjectTaskExceptionResponse(String sequence) {
        this.sequence = sequence;
    }

    public String getCode() {
        return sequence;
    }

    public void setCode(String sequence) {
        this.sequence = sequence;
    }
}
