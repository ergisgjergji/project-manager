package com.ergis.projectmanager.services;

import com.ergis.projectmanager.domain.Project;
import com.ergis.projectmanager.exceptions.ProjectCodeException;
import com.ergis.projectmanager.repositories.IProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private IProjectRepository projectRepository;

    public Project saveOrUpdate(Project project) {
        try {
            project.setCode(project.getCode().toUpperCase());
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
