package com.ergis.projectmanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer PTSequence = 0;
    private String project_code;

    // OneToOne with Project
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIgnore
    private Project project;

    // OneToMany with ProjectTask

    public Backlog() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPTSequence() {
        return PTSequence;
    }

    public void setPTSequence(Integer PTSequence) {
        this.PTSequence = PTSequence;
    }

    public String getProject_code() {
        return project_code;
    }

    public void setProject_code(String project_code) {
        this.project_code = project_code;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
