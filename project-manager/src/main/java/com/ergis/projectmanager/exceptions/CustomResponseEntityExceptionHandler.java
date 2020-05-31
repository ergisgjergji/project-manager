package com.ergis.projectmanager.exceptions;

import com.ergis.projectmanager.exceptions.ProjectExceptions.ProjectCodeException;
import com.ergis.projectmanager.exceptions.ProjectExceptions.ProjectCodeExceptionResponse;
import com.ergis.projectmanager.exceptions.ProjectTaskExceptions.ProjectTaskException;
import com.ergis.projectmanager.exceptions.ProjectTaskExceptions.ProjectTaskExceptionResponse;
import com.ergis.projectmanager.exceptions.UserExceptions.UsernameException;
import com.ergis.projectmanager.exceptions.UserExceptions.UsernameExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectException(ProjectCodeException ex, WebRequest request) {
        ProjectCodeExceptionResponse exceptionResponse = new ProjectCodeExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectTaskException(ProjectTaskException ex, WebRequest request) {
        ProjectTaskExceptionResponse exceptionResponse = new ProjectTaskExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameException(UsernameException ex, WebRequest request) {
        UsernameExceptionResponse exceptionResponse = new UsernameExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
