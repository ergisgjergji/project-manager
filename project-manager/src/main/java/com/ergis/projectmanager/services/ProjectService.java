package com.ergis.projectmanager.services;

import com.ergis.projectmanager.domain.Backlog;
import com.ergis.projectmanager.domain.Project;
import com.ergis.projectmanager.domain.User;
import com.ergis.projectmanager.exceptions.ProjectExceptions.ProjectCodeException;
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

    public Project saveOrUpdate(Project project, String username) {
        try {
            User user = userRepository.findByUsername(username);
            project.setUser(user);

            project.setCode(project.getCode().toUpperCase());

            if(project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProject_code(project.getCode().toUpperCase());
            }
            else {
                project.setBacklog(backlogRepository.findByProject_code(project.getCode().toUpperCase()));
            }
            return projectRepository.save(project);

        } catch(Exception e) {
            throw new ProjectCodeException("Project with code '" + project.getCode().toUpperCase() + "' already exists");
        }
    }

    public Project findByCode(String code) {

        Project project = projectRepository.findByCode(code.toUpperCase());

        if(project == null)
            throw new ProjectCodeException("Project with code '" + code.toUpperCase() + "' doesn't exist");

        return projectRepository.findByCode(code.toUpperCase());
    }

    public Iterable<Project> findAll() {
        return projectRepository.findAll();
    }

    public void deleteByCode(String code) {

        Project project = projectRepository.findByCode(code.toUpperCase());
        if(project == null) throw new ProjectCodeException("Project with code '" + code.toUpperCase() + "' doesn't exist");
        projectRepository.delete(project);
    }
}
