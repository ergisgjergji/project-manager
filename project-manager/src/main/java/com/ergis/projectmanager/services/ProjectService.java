package com.ergis.projectmanager.services;

import com.ergis.projectmanager.domain.Backlog;
import com.ergis.projectmanager.domain.Project;
import com.ergis.projectmanager.domain.User;
import com.ergis.projectmanager.exceptions.ProjectExceptions.ProjectCodeException;
import com.ergis.projectmanager.exceptions.ProjectExceptions.ProjectIdException;
import com.ergis.projectmanager.repositories.IBacklogRepository;
import com.ergis.projectmanager.repositories.IProjectRepository;
import com.ergis.projectmanager.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private IProjectRepository projectRepository;
    @Autowired
    private IBacklogRepository backlogRepository;
    @Autowired
    private IUserRepository userRepository;

//    public Project saveOrUpdate(Project project, String username) {
//
//        // UPDATE
//        if(project.getId() != null) {
//
//            Project existingProject = projectRepository.findByCode(project.getCode());
//            if(existingProject != null && (!existingProject.getUser().getUsername().equals(username)))
//                throw new ProjectCodeException("Project not found")
//        }
//
//        try {
//            User user = userRepository.findByUsername(username);
//            project.setUser(user);
//
//            project.setCode(project.getCode().toUpperCase());
//
//            // Create
//            if(project.getId() == null) {
//                Backlog backlog = new Backlog();
//                project.setBacklog(backlog);
//                backlog.setProject(project);
//                backlog.setProject_code(project.getCode().toUpperCase());
//            }
//            // Update
//            else {
//                Backlog backlog = backlogRepository.findByProject_code(project.getCode().toUpperCase());
//                project.setBacklog(backlog);
//            }
//            return projectRepository.save(project);
//
//        } catch(Exception e) {
//            throw new ProjectCodeException("Project with code '" + project.getCode().toUpperCase() + "' already exists");
//        }
//    }

    public Project saveOrUpdate(Project project, String username) {

        User user = userRepository.findByUsername(username);

        // CREATE
        if(project.getId() == null) {
            Project existingProject = projectRepository.findByCode(project.getCode());
            if(existingProject != null)
                throw new ProjectCodeException("Project with code '" + project.getCode().toUpperCase() + "' already exists");
            else {
                Backlog backlog = new Backlog();
                backlog.setProject_code(project.getCode().toUpperCase());
                backlog.setProject(project);

                project.setCode(project.getCode().toUpperCase());
                project.setBacklog(backlog);
                project.setUser(user);
                return projectRepository.save(project);
            }
        }
        else {
            // Make sure id is correct (project with id exists)
            // Make sure project belongs to the user
            // Make sure code hasn't changed
            Project existingProject = projectRepository.getById(project.getId());
            if(existingProject == null)
                throw new ProjectIdException("Project with id '" + project.getId() + "' not found");
            if(!existingProject.getUser().getUsername().equals(username))
                throw new ProjectCodeException("Project with code '" + project.getCode().toUpperCase() + "' not found");
            if(!existingProject.getCode().equals(project.getCode()))
                throw new ProjectCodeException("You are no right to change project code");

            Backlog backlog = backlogRepository.findByProject_code(project.getCode().toUpperCase());
            project.setBacklog(backlog);
            return projectRepository.save(project);
        }
    }

    public Project findByCode(String code, String username) {

        Project project = projectRepository.findByCode(code.toUpperCase());

        if(project == null)
            throw new ProjectCodeException("Project with code '" + code.toUpperCase() + "' doesn't exist");
        if(!project.getUser().getUsername().equals(username))
            throw new ProjectCodeException("Project with code '" + code.toUpperCase() + "' not found");

        return projectRepository.findByCode(code.toUpperCase());
    }

    public Iterable<Project> findAll(String username) {

        User user = userRepository.findByUsername(username);
        return projectRepository.findAllByUser(user);
    }

    public void deleteByCode(String code, String username) {

        Project project = findByCode(code.toUpperCase(), username); // We can use this since it already has the logic
        projectRepository.delete(project);
    }
}
