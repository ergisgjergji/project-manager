package com.ergis.projectmanager.web;

import com.ergis.projectmanager.domain.Project;
import com.ergis.projectmanager.services.MapValidationErrorService;
import com.ergis.projectmanager.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        Project project1 = projectService.saveOrUpdate(project);
        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> getProjectByCode(@PathVariable String code) {

        Project project = projectService.findByCode(code);

        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects() { return projectService.findAll(); }

    @DeleteMapping("/{code}")
    public ResponseEntity<?> deleteProject(@PathVariable String code) {

        projectService.deleteByCode(code);

        return new ResponseEntity<String>("Project with code '" + code.toUpperCase() + "' was successfully deleted", HttpStatus.OK);
    }
}
