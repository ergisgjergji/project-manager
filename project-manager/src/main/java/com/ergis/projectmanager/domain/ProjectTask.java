package com.ergis.projectmanager.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false)
    private String project_sequence;
    @Column(updatable = false)
    private String code;
    @NotBlank(message = "Please include a task summary")
    private String summary;
    private String acceptance_criteria;
    private String status;
    private Integer priority;
    private Date due_date;
    private Date created_date;
    private Date updated_date;

    // ManyToOne with Backlog

    @PrePersist
    protected void onCreate(){
        this.created_date = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_date = new Date();
    }

    public ProjectTask(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProject_sequence() {
        return project_sequence;
    }

    public void setProject_sequence(String project_sequence) {
        this.project_sequence = project_sequence;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getAcceptance_criteria() {
        return acceptance_criteria;
    }

    public void setAcceptance_criteria(String acceptance_criteria) {
        this.acceptance_criteria = acceptance_criteria;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Date getDue_date() {
        return due_date;
    }

    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }

    public Date getUpdated_date() {
        return updated_date;
    }

    public void setUpdated_date(Date updated_date) {
        this.updated_date = updated_date;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}