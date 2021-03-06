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
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Create a ProjectTask
    @PostMapping("/{code}")
    public ResponseEntity<?> createProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String code, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationError(result);
        if(errorMap != null) return errorMap;

        ProjectTask projectTask1 = projectTaskService.save(code, projectTask, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }

    // Get Backlog
    @GetMapping("/{code}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String code, Principal principal){

        return projectTaskService.findByCode(code, principal.getName());
    }

    // Get ProjectTask by sequence
    @GetMapping("/{code}/{sequence}")
    public ResponseEntity<?> getProjectTask(@PathVariable String code, @PathVariable String sequence, Principal principal) {

        ProjectTask projectTask = projectTaskService.findBySequence(code, sequence, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    // Update ProjectTask
    @PatchMapping("/{code}/{sequence}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String code, @PathVariable String sequence,
                                               Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationError(result);
        if(errorMap != null) return errorMap;

        ProjectTask updatedProjectTask = projectTaskService.update(projectTask, code, sequence, principal.getName());

        return new ResponseEntity<ProjectTask>(updatedProjectTask, HttpStatus.OK);
    }

    // Delete ProjectTask
    @DeleteMapping("/{code}/{sequence}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String code, @PathVariable String sequence, Principal principal) {

        projectTaskService.deleteBySequence(code, sequence, principal.getName());
        return new ResponseEntity<String>("Task '" + sequence + "' was successfully deleted", HttpStatus.OK);
    }
}
