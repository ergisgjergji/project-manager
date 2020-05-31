package com.ergis.projectmanager.exceptions.ProjectExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProjectCodeException extends RuntimeException {

     public ProjectCodeException(String message) {
         super(message);
     }
}
