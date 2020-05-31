package com.ergis.projectmanager.domain;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Username needs to be an email")
    @NotBlank(message = "Username field is required")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Please enter your full name")
    private String full_name;

    @NotBlank(message = "Password field is required")
    private String password;

    @Transient // This field will not be persisted in the database. It is just for validation mechanism on the code part
    private String confirm_password;

    private Date created_date;
    private Date updated_date;

    // OneToMany with Project

    public User() {
    }

    @PrePersist
    protected void onCreate(){
        this.created_date = new Date();
        this.updated_date = this.created_date;
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_date = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirm_password() {
        return confirm_password;
    }

    public void setConfirm_password(String confirm_password) {
        this.confirm_password = confirm_password;
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
}
