package com.ergis.projectmanager.web;

import com.ergis.projectmanager.domain.ProjectTask;
import com.ergis.projectmanager.services.MapValidationErrorService;
import com.ergis.projectmanager.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{code}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String code){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationError(result);
        if(errorMap != null) return errorMap;

        ProjectTask projectTask1 = projectTaskService.saveOrUpdate(code, projectTask);
        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }
}
